from sqlalchemy import text

from app.infrastructure.database import get_engine


async def database_is_up() -> bool:
    try:
        async with get_engine().connect() as connection:
            await connection.execute(text("SELECT 1"))
        return True
    except Exception:  # noqa: BLE001 — health check reporta qualquer falha como "down"
        return False
