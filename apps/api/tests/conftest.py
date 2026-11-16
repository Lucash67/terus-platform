"""Testes de integração contra PostgreSQL real (DATABASE_URL de teste).

Pré-requisito: banco vazio acessível em TEST_DATABASE_URL
(padrão: postgresql+asyncpg://postgres@127.0.0.1:5433/terus_test).
"""

import os
import subprocess
import sys
from collections.abc import AsyncIterator
from pathlib import Path

import pytest

os.environ["ENVIRONMENT"] = "test"
os.environ["DATABASE_URL"] = os.environ.get(
    "TEST_DATABASE_URL", "postgresql+asyncpg://postgres@127.0.0.1:5433/terus_test"
)
os.environ["MAILER_BACKEND"] = "memory"
os.environ["REFRESH_COOKIE_PATH"] = "/v1/auth"

from httpx import ASGITransport, AsyncClient  # noqa: E402
from sqlalchemy import text  # noqa: E402

from app.infrastructure.database import dispose_engine, get_engine  # noqa: E402
from app.infrastructure.notifications import get_memory_outbox  # noqa: E402
from app.infrastructure.rate_limit import limiter  # noqa: E402
from app.main import app  # noqa: E402

API_DIR = Path(__file__).resolve().parents[1]
TABLES = (
    "audit.audit_logs, onboarding.commercial_request_events, onboarding.commercial_requests, "
    "onboarding.onboarding_step_data, onboarding.onboarding_sessions, public.tenant_members, "
    "public.tenants, public.consents, public.password_reset_tokens, public.auth_sessions, "
    "public.platform_users"
)


def pytest_sessionstart(session: pytest.Session) -> None:
    alembic = [sys.executable, "-m", "alembic"]
    subprocess.run([*alembic, "downgrade", "base"], cwd=API_DIR, check=True, env=os.environ)
    subprocess.run([*alembic, "upgrade", "head"], cwd=API_DIR, check=True, env=os.environ)


@pytest.fixture(autouse=True)
async def clean_state() -> AsyncIterator[None]:
    async with get_engine().begin() as conn:
        await conn.execute(text(f"TRUNCATE {TABLES} CASCADE"))
    limiter.reset()
    get_memory_outbox().clear()
    yield
    await dispose_engine()


@pytest.fixture
async def client() -> AsyncIterator[AsyncClient]:
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
        headers={"x-terus-client": "web"},
    ) as c:
        yield c


async def new_client() -> AsyncClient:
    return AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
        headers={"x-terus-client": "web"},
    )
