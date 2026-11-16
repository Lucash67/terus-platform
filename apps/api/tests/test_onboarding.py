from httpx import AsyncClient

from tests.conftest import new_client
from tests.factories import PASSWORD, PROFILE, make_cnpj, org_body, register

CNPJ_A = make_cnpj("112223330001")
CNPJ_B = make_cnpj("445556660001")


async def test_new_customer_vertical_journey_survives_logout(client: AsyncClient) -> None:
    await register(client, "dona@rede.com")
    invalid = await client.post("/v1/organizations", json=org_body("11222333000100"))
    assert invalid.status_code == 400

    created = await client.post("/v1/organizations", json=org_body(CNPJ_A))
    assert created.status_code == 201, created.text
    journey = created.json()
    tenant_id = journey["organization"]["id"]
    assert journey["status"] == "registration_complete"
    assert journey["membership_role"] == "owner"

    early = await client.post(
        f"/v1/organizations/{tenant_id}/commercial-requests",
        json={"kind": "proposal", "preferred_contact": "email"},
    )
    assert early.status_code == 409  # perfil antes da solicitação

    profile = await client.put(f"/v1/organizations/{tenant_id}/profile", json=PROFILE)
    assert profile.status_code == 200
    body = profile.json()
    assert body["status"] == "qualification_complete"
    assert {r["module"] for r in body["recommendations"]} == {"alert", "task", "order"}
    assert "qualification_score" not in body  # score é interno

    req = await client.post(
        f"/v1/organizations/{tenant_id}/commercial-requests",
        json={
            "kind": "proposal",
            "preferred_contact": "whatsapp",
            "message": "Quero entender o Alert",
        },
    )
    assert req.status_code == 201
    after = req.json()
    assert after["status"] == "proposal_requested"
    events = after["requests"][0]["events"]
    assert any("ainda não configurado" in (e["note"] or "") for e in events)

    dup = await client.post(
        f"/v1/organizations/{tenant_id}/commercial-requests",
        json={"kind": "proposal", "preferred_contact": "email"},
    )
    assert dup.status_code == 409

    impl = {i["key"]: i["status"] for i in after["implementation"]}
    assert impl["contrato"] == "pendente"
    assert impl["acesso_erp"] == "nao_configurado"
    assert impl["ativacao"] == "nao_iniciado"

    await client.post("/v1/auth/logout")
    async with await new_client() as device2:
        login = await device2.post(
            "/v1/auth/login", json={"email": "dona@rede.com", "password": PASSWORD}
        )
        assert login.status_code == 200
        listing = (await device2.get("/v1/organizations")).json()["items"]
        assert len(listing) == 1
        assert listing[0]["status"] == "proposal_requested"
        assert listing[0]["profile"]["erp"] == "consinco"
        assert set(listing[0]["completed_steps"]) == {"empresa", "perfil", "solicitacao"}


async def test_duplicate_cnpj_is_rejected_without_leaking_owner(client: AsyncClient) -> None:
    await register(client, "a@rede.com")
    assert (await client.post("/v1/organizations", json=org_body(CNPJ_A))).status_code == 201
    async with await new_client() as other:
        await register(other, "b@rede.com")
        response = await other.post("/v1/organizations", json=org_body(CNPJ_A))
        assert response.status_code == 409
        assert "a@rede.com" not in response.text


async def test_cross_tenant_access_is_blocked(client: AsyncClient) -> None:
    await register(client, "a@rede.com")
    tenant_a = (await client.post("/v1/organizations", json=org_body(CNPJ_A))).json()[
        "organization"
    ]["id"]
    async with await new_client() as intruder:
        await register(intruder, "b@rede.com")
        await intruder.post("/v1/organizations", json=org_body(CNPJ_B, "Outra Rede"))
        assert (await intruder.get(f"/v1/organizations/{tenant_a}")).status_code == 404
        assert (
            await intruder.put(f"/v1/organizations/{tenant_a}/profile", json=PROFILE)
        ).status_code == 404
        assert (
            await intruder.put(f"/v1/organizations/{tenant_a}", json=org_body(CNPJ_A, "Hack"))
        ).status_code == 404
        hit = await intruder.post(
            f"/v1/organizations/{tenant_a}/commercial-requests",
            json={"kind": "proposal", "preferred_contact": "email"},
        )
        assert hit.status_code == 404
        names = [
            i["organization"]["legal_name"]
            for i in (await intruder.get("/v1/organizations")).json()["items"]
        ]
        assert names == ["Outra Rede"]
        assert (await intruder.get("/v1/admin/leads")).status_code == 403
    assert (await client.get(f"/v1/organizations/{tenant_a}")).json()["organization"][
        "legal_name"
    ] == "Rede Sintética Ltda"


async def test_unauthenticated_requests_are_rejected(client: AsyncClient) -> None:
    assert (await client.get("/v1/organizations")).status_code == 401
    response = await client.post("/v1/organizations", json=org_body(CNPJ_A))
    assert response.status_code == 401
    assert response.json()["error"] == "NOT_AUTHENTICATED"


async def test_profile_other_erp_requires_name(client: AsyncClient) -> None:
    await register(client, "a@rede.com")
    tenant = (await client.post("/v1/organizations", json=org_body(CNPJ_A))).json()["organization"][
        "id"
    ]
    response = await client.put(
        f"/v1/organizations/{tenant}/profile", json={**PROFILE, "erp": "outro"}
    )
    assert response.status_code == 400
