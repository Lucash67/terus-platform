from httpx import AsyncClient

from tests.conftest import new_client
from tests.factories import PASSWORD, PROFILE, create_staff, make_cnpj, org_body, register

CNPJ = make_cnpj("778889990001")


async def _lead_with_request(client: AsyncClient) -> tuple[str, str]:
    await register(client, "cliente@rede.com")
    tenant = (await client.post("/v1/organizations", json=org_body(CNPJ))).json()["organization"][
        "id"
    ]
    await client.put(f"/v1/organizations/{tenant}/profile", json=PROFILE)
    journey = (
        await client.post(
            f"/v1/organizations/{tenant}/commercial-requests",
            json={"kind": "proposal", "preferred_contact": "email"},
        )
    ).json()
    return tenant, journey["requests"][0]["id"]


async def _login_staff(staff: AsyncClient, email: str = "equipe-admin@example.com") -> None:
    create_staff(email)
    response = await staff.post("/v1/auth/login", json={"email": email, "password": PASSWORD})
    assert response.status_code == 200


async def test_admin_manages_lead_end_to_end(client: AsyncClient) -> None:
    tenant, request_id = await _lead_with_request(client)
    async with await new_client() as staff:
        await _login_staff(staff)
        page = (await staff.get("/v1/admin/leads", params={"q": "Sintética"})).json()
        assert page["total"] == 1
        lead = page["items"][0]
        assert lead["owner_email"] == "cliente@rede.com"
        assert lead["latest_request_status"] == "received"
        assert lead["utm_source"] == "teste"
        assert (await staff.get("/v1/admin/leads", params={"q": CNPJ[:6]})).json()["total"] == 1
        assert (await staff.get("/v1/admin/leads", params={"status": "contracted"})).json()[
            "total"
        ] == 0

        detail = (await staff.get(f"/v1/admin/leads/{tenant}")).json()
        assert detail["qualification_score"] >= 70
        assert any(r["factor"] == "erp" for r in detail["qualification_reasons"])
        assert any(a["action"] == "commercial.request.created" for a in detail["audit"])

        bad = await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/status", json={"to_status": "contracted"}
        )
        assert bad.status_code == 409

        for step in ("in_review", "proposal_sent", "acceptance_pending"):
            r = await staff.post(
                f"/v1/admin/commercial-requests/{request_id}/status",
                json={"to_status": step, "note": f"→ {step}"},
            )
            assert r.status_code == 200, r.text

        no_evidence = await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/status", json={"to_status": "contracted"}
        )
        assert no_evidence.status_code == 400

        staff_id = (await staff.get("/v1/admin/staff")).json()[0]["id"]
        assigned = await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/assign", json={"assignee_id": staff_id}
        )
        assert assigned.json()["journey"]["requests"][0]["assigned_to"] == staff_id
        await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/notes",
            json={"note": "Nota interna", "visible_to_customer": False},
        )
        await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/notes",
            json={"note": "Enviamos a proposta por e-mail", "visible_to_customer": True},
        )

        done = await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/status",
            json={"to_status": "contracted", "contract_evidence": "D4Sign doc ABC-123 (sintético)"},
        )
        assert done.status_code == 200
        assert done.json()["journey"]["status"] == "contracted"
        funnel = (await staff.get("/v1/admin/funnel")).json()["counts"]
        assert funnel["contracted"] == 1

    customer = (await client.get(f"/v1/organizations/{tenant}")).json()
    assert customer["status"] == "contracted"
    notes = [e["note"] for e in customer["requests"][0]["events"]]
    assert "Nota interna" not in notes
    assert "Enviamos a proposta por e-mail" in notes
    assert customer["requests"][0]["contract_evidence"] is None
    assert customer["requests"][0]["assigned_to"] is None
    impl = {i["key"]: i["status"] for i in customer["implementation"]}
    assert impl["contrato"] == "concluido"
    assert impl["ativacao"] == "nao_iniciado"


async def test_customer_cannot_use_admin_endpoints(client: AsyncClient) -> None:
    _, request_id = await _lead_with_request(client)
    assert (await client.get("/v1/admin/funnel")).status_code == 403
    response = await client.post(
        f"/v1/admin/commercial-requests/{request_id}/status", json={"to_status": "in_review"}
    )
    assert response.status_code == 403


async def test_reopen_archived_request_keeps_history(client: AsyncClient) -> None:
    tenant, request_id = await _lead_with_request(client)
    async with await new_client() as staff:
        await _login_staff(staff)
        await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/status",
            json={"to_status": "archived", "note": "sem retorno"},
        )
        reopened = await staff.post(
            f"/v1/admin/commercial-requests/{request_id}/status",
            json={"to_status": "in_review", "note": "cliente voltou"},
        )
        events = reopened.json()["journey"]["requests"][0]["events"]
        assert [e["to_status"] for e in events if e["event_type"] == "status_changed"] == [
            "archived",
            "in_review",
        ]
        assert reopened.json()["journey"]["status"] == "under_review"
