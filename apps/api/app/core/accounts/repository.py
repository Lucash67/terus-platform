import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.accounts.models import Tenant, TenantMember
from app.shared.enums import MemberRole


class TenantRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get(self, tenant_id: uuid.UUID) -> Tenant | None:
        return await self.session.get(Tenant, tenant_id)

    async def get_by_cnpj(self, cnpj: str) -> Tenant | None:
        result = await self.session.execute(select(Tenant).where(Tenant.cnpj == cnpj))
        return result.scalar_one_or_none()

    async def add(self, tenant: Tenant) -> Tenant:
        self.session.add(tenant)
        await self.session.flush()
        return tenant

    async def add_member(self, tenant_id: uuid.UUID, user_id: uuid.UUID, role: MemberRole) -> None:
        self.session.add(TenantMember(tenant_id=tenant_id, user_id=user_id, role=role))
        await self.session.flush()

    async def get_membership(self, tenant_id: uuid.UUID, user_id: uuid.UUID) -> TenantMember | None:
        result = await self.session.execute(
            select(TenantMember).where(
                TenantMember.tenant_id == tenant_id, TenantMember.user_id == user_id
            )
        )
        return result.scalar_one_or_none()

    async def list_for_user(self, user_id: uuid.UUID) -> list[tuple[Tenant, MemberRole]]:
        result = await self.session.execute(
            select(Tenant, TenantMember.role)
            .join(TenantMember, TenantMember.tenant_id == Tenant.id)
            .where(TenantMember.user_id == user_id)
            .order_by(Tenant.created_at)
            .limit(50)
        )
        return [(row[0], row[1]) for row in result.all()]
