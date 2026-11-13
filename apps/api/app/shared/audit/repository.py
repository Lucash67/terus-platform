import uuid
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.shared.audit.models import AuditLog


class AuditRepository:
    """Somente INSERT e SELECT — a tabela rejeita UPDATE/DELETE por trigger."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def record(
        self,
        action: str,
        *,
        actor_id: uuid.UUID | None = None,
        tenant_id: uuid.UUID | None = None,
        entity: str | None = None,
        entity_id: uuid.UUID | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> None:
        self.session.add(
            AuditLog(
                action=action,
                actor_id=actor_id,
                tenant_id=tenant_id,
                entity=entity,
                entity_id=entity_id,
                metadata_=metadata,
            )
        )
        await self.session.flush()

    async def list_for_tenant(self, tenant_id: uuid.UUID, limit: int = 100) -> list[AuditLog]:
        result = await self.session.execute(
            select(AuditLog)
            .where(AuditLog.tenant_id == tenant_id)
            .order_by(AuditLog.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars())

    async def list_actions(self, action: str, limit: int = 50) -> list[AuditLog]:
        result = await self.session.execute(
            select(AuditLog)
            .where(AuditLog.action == action)
            .order_by(AuditLog.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars())
