"""Ambiente Alembic assíncrono. URL vem de DATABASE_URL (app.settings)."""

import asyncio

from sqlalchemy.ext.asyncio import create_async_engine

from alembic import context
from app.core.accounts import models as _accounts  # noqa: F401
from app.core.acquisition import models as _acquisition  # noqa: F401
from app.core.identity import models as _identity  # noqa: F401
from app.infrastructure.database import Base
from app.settings import get_settings
from app.shared.audit import models as _audit  # noqa: F401

target_metadata = Base.metadata


def do_run_migrations(connection) -> None:  # type: ignore[no-untyped-def]
    context.configure(connection=connection, target_metadata=target_metadata, include_schemas=True)
    with context.begin_transaction():
        context.run_migrations()


async def run_async() -> None:
    engine = create_async_engine(get_settings().database_url)
    async with engine.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await engine.dispose()


asyncio.run(run_async())
