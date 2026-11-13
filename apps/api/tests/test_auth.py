import re

import pytest
from httpx import AsyncClient
from sqlalchemy import text

from app.infrastructure.database import get_engine
from app.infrastructure.notifications import get_memory_outbox
from tests.conftest import new_client
from tests.factories import PASSWORD, register


async def test_health_reports_real_dependencies(client: AsyncClient) -> None:
    body = (await client.get("/health")).json()
    assert body["services"]["database"] == "up"
    assert body["services"]["signature"] == "not_configured"
    assert body["services"]["erp_agent"] == "not_configured"


async def test_register_creates_session_cookie_and_consents(client: AsyncClient) -> None:
    data = await register(client, "ana@example.com", marketing_opt_in=False)
    assert data["user"]["role"] == "customer"
    assert data["email_verification"] == "pending_provider_not_configured"
    assert (await client.get("/v1/auth/session")).status_code == 200
    async with get_engine().connect() as conn:
        kinds = (await conn.execute(text("select kind, granted from public.consents"))).all()
        stored = (await conn.execute(text("select password_hash from public.platform_users"))).one()
    assert {k for k, _ in kinds} == {"terms", "privacy", "marketing"}
    assert stored[0].startswith("$2b$") and PASSWORD not in stored[0]


@pytest.mark.parametrize(
    ("override", "status"),
    [
        ({"password": "curta"}, 400),
        ({"password": "semnumerosnenhum"}, 400),
        ({"accept_terms": False}, 400),
        ({"email": "invalido"}, 400),
    ],
)
async def test_register_rejects_invalid_input(
    client: AsyncClient, override: dict, status: int
) -> None:  # type: ignore[type-arg]
    body = {
        "email": "x@example.com",
        "full_name": "Fulano",
        "password": PASSWORD,
        "accept_terms": True,
        "accept_privacy": True,
        **override,
    }
    response = await client.post("/v1/auth/register", json=body)
    assert response.status_code == status
    assert response.json()["error"] == "VALIDATION_FAILED"


async def test_duplicate_email_conflicts(client: AsyncClient) -> None:
    await register(client, "dup@example.com")
    response = await client.post(
        "/v1/auth/register",
        json={
            "email": "DUP@example.com",
            "full_name": "Outro",
            "password": PASSWORD,
            "accept_terms": True,
            "accept_privacy": True,
        },
    )
    assert response.status_code == 409


async def test_login_logout_revokes_session(client: AsyncClient) -> None:
    await register(client, "bia@example.com")
    stolen_access = client.cookies.get("terus_at")
    assert (await client.post("/v1/auth/logout")).status_code == 204
    assert (await client.get("/v1/auth/session")).status_code == 401
    # O access token antigo deixa de valer mesmo antes de expirar.
    async with await new_client() as other:
        other.cookies.set("terus_at", stolen_access or "")
        assert (await other.get("/v1/auth/session")).status_code == 401
    bad = await client.post(
        "/v1/auth/login", json={"email": "bia@example.com", "password": "Errada12345"}
    )
    assert bad.status_code == 401
    ok = await client.post(
        "/v1/auth/login", json={"email": "bia@example.com", "password": PASSWORD}
    )
    assert ok.status_code == 200
    assert (await client.get("/v1/auth/session")).status_code == 200


async def test_refresh_rotates_token(client: AsyncClient) -> None:
    await register(client, "rot@example.com")
    first = client.cookies.get("terus_rt", path="/v1/auth")
    assert (await client.post("/v1/auth/refresh")).status_code == 200
    second = client.cookies.get("terus_rt", path="/v1/auth")
    assert first and second and first != second
    async with await new_client() as replay:
        replay.cookies.set("terus_rt", first, path="/v1/auth")
        assert (await replay.post("/v1/auth/refresh")).status_code == 401


async def test_csrf_header_required_for_mutations() -> None:
    from httpx import ASGITransport

    from app.main import app

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        response = await c.post("/v1/auth/login", json={"email": "a@b.com", "password": "x"})
    assert response.status_code == 403
    assert response.json()["error"] == "CSRF"


async def test_login_rate_limited(client: AsyncClient) -> None:
    codes = [
        (
            await client.post("/v1/auth/login", json={"email": "z@z.com", "password": "x"})
        ).status_code
        for _ in range(22)
    ]
    assert 429 in codes


async def test_password_recovery_full_flow_with_memory_mailer(client: AsyncClient) -> None:
    await register(client, "rec@example.com")
    response = await client.post("/v1/auth/recover", json={"email": "rec@example.com"})
    assert response.json()["delivery"] == "sent"
    unknown = await client.post("/v1/auth/recover", json={"email": "ninguem@example.com"})
    assert unknown.json() == response.json()  # não revela existência da conta
    token = re.search(r"token=([\w-]+)", get_memory_outbox()[0].body).group(1)  # type: ignore[union-attr]
    new_password = "NovaSenha456"
    assert (
        await client.post(
            "/v1/auth/reset-password", json={"token": token, "new_password": new_password}
        )
    ).status_code == 200
    # sessões anteriores revogadas
    assert (await client.get("/v1/auth/session")).status_code == 401
    reuse = await client.post(
        "/v1/auth/reset-password", json={"token": token, "new_password": "OutraSenha789"}
    )
    assert reuse.status_code == 400
    login = await client.post(
        "/v1/auth/login", json={"email": "rec@example.com", "password": new_password}
    )
    assert login.status_code == 200


async def test_recovery_reports_not_configured_honestly(
    client: AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    from app.infrastructure import notifications

    monkeypatch.setattr(notifications, "get_mailer", lambda: notifications.NotConfiguredMailer())
    from app.core.identity import service

    monkeypatch.setattr(service, "get_mailer", lambda: notifications.NotConfiguredMailer())
    response = await client.post("/v1/auth/recover", json={"email": "x@example.com"})
    assert response.json()["delivery"] == "not_configured"
    assert get_memory_outbox() == []


async def test_audit_log_is_immutable(client: AsyncClient) -> None:
    await register(client, "aud@example.com")
    async with get_engine().connect() as conn:
        with pytest.raises(Exception, match="imutável"):
            await conn.execute(text("update audit.audit_logs set action = 'x'"))
