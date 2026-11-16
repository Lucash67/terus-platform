"""Orquestração da jornada de aquisição (cliente) e da gestão comercial (equipe Terus)."""

import uuid
from dataclasses import dataclass, field
from typing import Any, Literal

from app.core.accounts.models import Tenant
from app.core.accounts.repository import TenantRepository
from app.core.acquisition.models import (
    CommercialRequest,
    CommercialRequestEvent,
    OnboardingSession,
)
from app.core.acquisition.qualification import ProfileAnswers
from app.core.acquisition.repository import (
    CommercialRequestRepository,
    LeadRow,
    OnboardingRepository,
)
from app.core.acquisition.use_cases import (
    AddRequestNote,
    AssignRequest,
    AuthorizeTenantAccess,
    ChangeRequestStatus,
    CommercialInput,
    OrganizationInput,
    RegisterOrganization,
    RequestCommercialContact,
    SaveProfile,
    UpdateOrganization,
    ensure_staff,
)
from app.core.identity.models import PlatformUser
from app.core.identity.repository import UserRepository
from app.infrastructure.database import UnitOfWork
from app.settings import get_settings
from app.shared.audit.models import AuditLog
from app.shared.audit.repository import AuditRepository
from app.shared.enums import (
    CommercialStatus,
    JourneyStatus,
    MemberRole,
    OnboardingStep,
    TenantStatus,
)
from app.shared.exceptions import NotFound

CheckStatus = Literal["concluido", "informado", "pendente", "nao_configurado", "nao_iniciado"]


@dataclass(frozen=True)
class ImplementationItem:
    key: str
    label: str
    status: CheckStatus
    detail: str


@dataclass(frozen=True)
class RequestView:
    request: CommercialRequest
    events: list[CommercialRequestEvent]


@dataclass(frozen=True)
class JourneyView:
    tenant: Tenant
    role: MemberRole | None
    session: OnboardingSession
    steps: dict[OnboardingStep, dict[str, Any]]
    requests: list[RequestView]
    implementation: list[ImplementationItem] = field(default_factory=list)


@dataclass(frozen=True)
class LeadDetail:
    journey: JourneyView
    owner: PlatformUser | None
    audit: list[AuditLog]


@dataclass(frozen=True)
class LeadListItem:
    row: LeadRow
    latest_request: CommercialRequest | None


def implementation_checklist(
    tenant: Tenant, steps: dict[OnboardingStep, dict[str, Any]], requests: list[RequestView]
) -> list[ImplementationItem]:
    settings = get_settings()
    contracted = next(
        (rv.request for rv in requests if rv.request.status == CommercialStatus.CONTRACTED), None
    )
    profile = steps.get(OnboardingStep.PERFIL, {})
    return [
        ImplementationItem(
            "contrato",
            "Contrato",
            "concluido" if contracted else "pendente",
            "Registrado pela equipe Terus com referência do documento assinado."
            if contracted
            else "Depende da proposta e do aceite. Nada é dado como assinado sem comprovante.",
        ),
        ImplementationItem(
            "assinatura_eletronica",
            "Assinatura eletrônica no portal",
            "nao_configurado" if settings.signature_backend == "not_configured" else "pendente",
            "Integração com provedor de assinatura (D4Sign) ainda não configurada.",
        ),
        ImplementationItem(
            "responsavel_ti",
            "Responsável de TI",
            "informado" if profile.get("has_it_contact") else "pendente",
            "Pessoa que libera o acesso de leitura ao banco ou à API do ERP.",
        ),
        ImplementationItem(
            "acesso_erp",
            "Acesso de leitura ao ERP (Agent)",
            "nao_configurado" if settings.erp_agent_backend == "not_configured" else "pendente",
            "Configurado com a equipe técnica da Terus. Este portal ainda não executa "
            "verificação automática de conexão.",
        ),
        ImplementationItem(
            "ativacao",
            "Ativação dos módulos",
            "concluido" if tenant.status == TenantStatus.ACTIVE else "nao_iniciado",
            "Só aparece como ativa após confirmação do provisionamento pela Terus.",
        ),
    ]


class AcquisitionService:
    def __init__(self, uow: UnitOfWork) -> None:
        self.uow = uow
        s = uow.session
        self.tenants = TenantRepository(s)
        self.onboarding = OnboardingRepository(s)
        self.requests = CommercialRequestRepository(s)
        self.users = UserRepository(s)
        self.audit = AuditRepository(s)

    # --- Cliente -----------------------------------------------------------------
    async def list_my_organizations(self, user: PlatformUser) -> list[JourneyView]:
        views = []
        for tenant, role in await self.tenants.list_for_user(user.id):
            views.append(await self._journey(tenant, role, customer_view=True))
        return views

    async def create_organization(
        self, user: PlatformUser, data: OrganizationInput, source: dict[str, Any] | None
    ) -> JourneyView:
        tenant = await RegisterOrganization(self.tenants, self.onboarding, self.audit).execute(
            user, data, source
        )
        await self.uow.commit()
        return await self._journey(tenant, MemberRole.OWNER, customer_view=True)

    async def get_journey(self, user: PlatformUser, tenant_id: uuid.UUID) -> JourneyView:
        tenant = await AuthorizeTenantAccess(self.tenants).execute(user, tenant_id)
        membership = await self.tenants.get_membership(tenant_id, user.id)
        return await self._journey(tenant, membership.role if membership else None, True)

    async def update_organization(
        self, user: PlatformUser, tenant_id: uuid.UUID, data: OrganizationInput
    ) -> JourneyView:
        tenant = await AuthorizeTenantAccess(self.tenants).execute(user, tenant_id)
        await UpdateOrganization(self.tenants, self.onboarding, self.audit).execute(
            user, tenant, data
        )
        await self.uow.commit()
        return await self.get_journey(user, tenant_id)

    async def save_profile(
        self, user: PlatformUser, tenant_id: uuid.UUID, answers: ProfileAnswers, notes: str | None
    ) -> JourneyView:
        tenant = await AuthorizeTenantAccess(self.tenants).execute(user, tenant_id)
        await SaveProfile(self.onboarding, self.audit).execute(user, tenant, answers, notes)
        await self.uow.commit()
        return await self.get_journey(user, tenant_id)

    async def request_commercial(
        self, user: PlatformUser, tenant_id: uuid.UUID, data: CommercialInput
    ) -> JourneyView:
        tenant = await AuthorizeTenantAccess(self.tenants).execute(user, tenant_id)
        await RequestCommercialContact(self.onboarding, self.requests, self.audit).execute(
            user, tenant, data
        )
        await self.uow.commit()
        return await self.get_journey(user, tenant_id)

    # --- Equipe Terus -------------------------------------------------------------
    async def list_leads(
        self,
        actor: PlatformUser,
        *,
        status: JourneyStatus | None,
        query: str | None,
        assigned_to: uuid.UUID | None,
        page: int,
        page_size: int,
    ) -> tuple[list[LeadListItem], int]:
        ensure_staff(actor)
        rows, total = await self.onboarding.list_leads(
            status=status,
            query=query,
            assigned_to=assigned_to,
            offset=(page - 1) * page_size,
            limit=page_size,
        )
        grouped = await self.requests.list_for_tenants([r.tenant.id for r in rows])
        items = [
            LeadListItem(row=r, latest_request=next(iter(grouped.get(r.tenant.id, [])), None))
            for r in rows
        ]
        return items, total

    async def funnel(self, actor: PlatformUser) -> dict[str, int]:
        ensure_staff(actor)
        counts = await self.onboarding.funnel_counts()
        return {status.value: counts.get(status.value, 0) for status in JourneyStatus}

    async def lead_detail(self, actor: PlatformUser, tenant_id: uuid.UUID) -> LeadDetail:
        ensure_staff(actor)
        tenant = await self.tenants.get(tenant_id)
        if tenant is None:
            raise NotFound("Organização não encontrada.")
        journey = await self._journey(tenant, None, customer_view=False)
        await self.audit.record(
            "admin.tenant.accessed", actor_id=actor.id, tenant_id=tenant.id, entity="tenant"
        )
        await self.uow.commit()
        rows, _ = await self.onboarding.list_leads(
            status=None, query=tenant.cnpj, assigned_to=None, offset=0, limit=1
        )
        owner = rows[0].owner if rows else None
        return LeadDetail(
            journey=journey, owner=owner, audit=await self.audit.list_for_tenant(tenant.id)
        )

    async def change_request_status(
        self,
        actor: PlatformUser,
        request_id: uuid.UUID,
        to_status: CommercialStatus,
        note: str | None,
        contract_evidence: str | None,
    ) -> uuid.UUID:
        request = await ChangeRequestStatus(
            self.tenants, self.onboarding, self.requests, self.audit
        ).execute(actor, request_id, to_status, note, contract_evidence)
        await self.uow.commit()
        return request.tenant_id

    async def assign_request(
        self, actor: PlatformUser, request_id: uuid.UUID, assignee_id: uuid.UUID | None
    ) -> uuid.UUID:
        request = await AssignRequest(self.users, self.requests, self.audit).execute(
            actor, request_id, assignee_id
        )
        await self.uow.commit()
        return request.tenant_id

    async def add_note(
        self, actor: PlatformUser, request_id: uuid.UUID, note: str, visible: bool
    ) -> None:
        await AddRequestNote(self.requests, self.audit).execute(actor, request_id, note, visible)
        await self.uow.commit()

    async def list_staff(self, actor: PlatformUser) -> list[PlatformUser]:
        ensure_staff(actor)
        return await self.users.list_staff()

    # --- interno ------------------------------------------------------------------
    async def _journey(
        self, tenant: Tenant, role: MemberRole | None, customer_view: bool
    ) -> JourneyView:
        session = await self.onboarding.get_by_tenant(tenant.id)
        if session is None:
            raise NotFound("Jornada de onboarding não encontrada.")
        steps = await self.onboarding.get_steps(session.id)
        requests = (await self.requests.list_for_tenants([tenant.id])).get(tenant.id, [])
        events = await self.requests.list_events([r.id for r in requests], customer_view)
        request_views = [RequestView(r, events.get(r.id, [])) for r in requests]
        return JourneyView(
            tenant=tenant,
            role=role,
            session=session,
            steps=steps,
            requests=request_views,
            implementation=implementation_checklist(tenant, steps, request_views),
        )
