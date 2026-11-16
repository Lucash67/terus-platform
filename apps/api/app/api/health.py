from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

from app.infrastructure.health import database_is_up
from app.settings import get_settings

router = APIRouter()

ServiceState = Literal["up", "down", "not_configured"]


class HealthResponse(BaseModel):
    status: Literal["healthy", "degraded"]
    version: str
    environment: str
    timestamp: str
    services: dict[str, ServiceState]


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Estado real das dependências — nada é reportado como "up" sem checagem."""
    settings = get_settings()
    db: ServiceState = "up" if await database_is_up() else "down"
    services: dict[str, ServiceState] = {
        "database": db,
        "email": "not_configured" if settings.mailer_backend == "not_configured" else "up",
        "crm": "not_configured",
        "signature": "not_configured",
        "erp_agent": "not_configured",
        "vault": "not_configured",
    }
    return HealthResponse(
        status="healthy" if db == "up" else "degraded",
        version="1.1.0",
        environment=settings.environment,
        timestamp=datetime.now(UTC).isoformat(),
        services=services,
    )
