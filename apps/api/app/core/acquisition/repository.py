import uuid
from dataclasses import dataclass
from typing import Any

from sqlalchemy import func, or_, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.accounts.models import Tenant, TenantMember
from app.core.acquisition.models import (
    CommercialRequest,
    CommercialRequestEvent,
    OnboardingSession,
    OnboardingStepData,
)
from app.core.identity.models import PlatformUser
from app.shared.enums import CommercialStatus, JourneyStatus, MemberRole, OnboardingStep

OPEN_REQUEST_STATUSES = (
    CommercialStatus.RECEIVED,
    CommercialStatus.IN_REVIEW,
    CommercialStatus.PROPOSAL_SENT,
    CommercialStatus.ACCEPTANCE_PENDING,
)


@dataclass(frozen=True)
class LeadRow:
    session: OnboardingSession
    tenant: Tenant
    owner: PlatformUser | None


class OnboardingRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def add(self, onboarding: OnboardingSession) -> OnboardingSession:
        self.session.add(onboarding)
        await self.session.flush()
        return onboarding

    async def get_by_tenant(self, tenant_id: uuid.UUID) -> OnboardingSession | None:
        result = await self.session.execute(
            select(OnboardingSession).where(OnboardingSession.tenant_id == tenant_id)
        )
        return result.scalar_one_or_none()

    async def upsert_step(
        self, session_id: uuid.UUID, step: OnboardingStep, data: dict[str, Any]
    ) -> None:
        stmt = insert(OnboardingStepData).values(
            id=uuid.uuid4(), session_id=session_id, step=step, data=data
        )
        stmt = stmt.on_conflict_do_update(
            constraint="uq_onboarding_step_data_session_id",
            set_={"data": stmt.excluded.data, "updated_at": func.now()},
        )
        await self.session.execute(stmt)

    async def get_steps(self, session_id: uuid.UUID) -> dict[OnboardingStep, dict[str, Any]]:
        result = await self.session.execute(
            select(OnboardingStepData).where(OnboardingStepData.session_id == session_id)
        )
        return {row.step: row.data for row in result.scalars()}

    async def list_leads(
        self,
        *,
        status: JourneyStatus | None,
        query: str | None,
        assigned_to: uuid.UUID | None,
        offset: int,
        limit: int,
    ) -> tuple[list[LeadRow], int]:
        owner = (
            select(TenantMember.tenant_id, TenantMember.user_id)
            .where(TenantMember.role == MemberRole.OWNER)
            .subquery()
        )
        base = (
            select(OnboardingSession, Tenant, PlatformUser)
            .join(Tenant, Tenant.id == OnboardingSession.tenant_id)
            .outerjoin(owner, owner.c.tenant_id == Tenant.id)
            .outerjoin(PlatformUser, PlatformUser.id == owner.c.user_id)
        )
        if status is not None:
            base = base.where(OnboardingSession.status == status)
        if query:
            like = f"%{query.strip()}%"
            digits = "".join(ch for ch in query if ch.isdigit())
            conditions = [
                Tenant.legal_name.ilike(like),
                Tenant.trade_name.ilike(like),
                PlatformUser.email.ilike(like),
                PlatformUser.full_name.ilike(like),
            ]
            if digits:
                conditions.append(Tenant.cnpj.like(f"%{digits}%"))
            base = base.where(or_(*conditions))
        if assigned_to is not None:
            assigned = select(CommercialRequest.tenant_id).where(
                CommercialRequest.assigned_to == assigned_to
            )
            base = base.where(Tenant.id.in_(assigned))
        total = (
            await self.session.execute(select(func.count()).select_from(base.subquery()))
        ).scalar_one()
        result = await self.session.execute(
            base.order_by(OnboardingSession.updated_at.desc()).offset(offset).limit(limit)
        )
        rows = [LeadRow(session=r[0], tenant=r[1], owner=r[2]) for r in result.all()]
        return rows, int(total)

    async def funnel_counts(self) -> dict[str, int]:
        result = await self.session.execute(
            select(OnboardingSession.status, func.count()).group_by(OnboardingSession.status)
        )
        return {str(row[0].value): int(row[1]) for row in result.all()}


class CommercialRequestRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def add(self, request: CommercialRequest) -> CommercialRequest:
        self.session.add(request)
        await self.session.flush()
        return request

    async def get(self, request_id: uuid.UUID) -> CommercialRequest | None:
        return await self.session.get(CommercialRequest, request_id)

    async def get_open_for_tenant(self, tenant_id: uuid.UUID) -> CommercialRequest | None:
        result = await self.session.execute(
            select(CommercialRequest)
            .where(
                CommercialRequest.tenant_id == tenant_id,
                CommercialRequest.status.in_(OPEN_REQUEST_STATUSES),
            )
            .limit(1)
        )
        return result.scalar_one_or_none()

    async def list_for_tenants(
        self, tenant_ids: list[uuid.UUID]
    ) -> dict[uuid.UUID, list[CommercialRequest]]:
        if not tenant_ids:
            return {}
        result = await self.session.execute(
            select(CommercialRequest)
            .where(CommercialRequest.tenant_id.in_(tenant_ids))
            .order_by(CommercialRequest.created_at.desc())
        )
        grouped: dict[uuid.UUID, list[CommercialRequest]] = {}
        for request in result.scalars():
            grouped.setdefault(request.tenant_id, []).append(request)
        return grouped

    async def add_event(self, event: CommercialRequestEvent) -> None:
        self.session.add(event)
        await self.session.flush()

    async def list_events(
        self, request_ids: list[uuid.UUID], customer_view: bool
    ) -> dict[uuid.UUID, list[CommercialRequestEvent]]:
        if not request_ids:
            return {}
        stmt = select(CommercialRequestEvent).where(
            CommercialRequestEvent.request_id.in_(request_ids)
        )
        if customer_view:
            stmt = stmt.where(CommercialRequestEvent.visible_to_customer.is_(True))
        result = await self.session.execute(stmt.order_by(CommercialRequestEvent.created_at))
        grouped: dict[uuid.UUID, list[CommercialRequestEvent]] = {}
        for event in result.scalars():
            grouped.setdefault(event.request_id, []).append(event)
        return grouped
