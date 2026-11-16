"""Use cases da trilha A (novo cliente) e da gestão comercial pela equipe Terus."""

import uuid
from dataclasses import asdict, dataclass
from typing import Any

from app.core.accounts.models import Tenant
from app.core.accounts.repository import TenantRepository
from app.core.acquisition.models import (
    CommercialRequest,
    CommercialRequestEvent,
    OnboardingSession,
)
from app.core.acquisition.qualification import ProfileAnswers, qualify, recommend
from app.core.acquisition.repository import CommercialRequestRepository, OnboardingRepository
from app.core.identity.models import PlatformUser
from app.core.identity.repository import UserRepository
from app.settings import get_settings
from app.shared.audit.repository import AuditRepository
from app.shared.enums import (
    CommercialKind,
    CommercialStatus,
    JourneyStatus,
    JourneyTrack,
    MemberRole,
    OnboardingStep,
    PlatformRole,
    Segment,
    SizeBand,
    TenantStatus,
)
from app.shared.exceptions import Conflict, Forbidden, InvalidTransition, NotFound, ValidationFailed
from app.shared.validators import is_valid_cnpj, only_digits

STAFF_ROLES = (PlatformRole.TERUS_SALES, PlatformRole.TERUS_ADMIN)


def ensure_staff(user: PlatformUser) -> None:
    if user.role not in STAFF_ROLES:
        raise Forbidden("Área restrita à equipe Terus.")


class AuthorizeTenantAccess:
    """Cliente só acessa organizações das quais é membro. 404 evita enumeração."""

    def __init__(self, tenants: TenantRepository):
        self.tenants = tenants

    async def execute(self, user: PlatformUser, tenant_id: uuid.UUID) -> Tenant:
        membership = await self.tenants.get_membership(tenant_id, user.id)
        tenant = await self.tenants.get(tenant_id) if membership else None
        if tenant is None:
            raise NotFound("Organização não encontrada.")
        return tenant


@dataclass(frozen=True)
class OrganizationInput:
    legal_name: str
    trade_name: str | None
    cnpj: str
    segment: Segment
    size_band: SizeBand
    city: str | None
    state: str | None


class RegisterOrganization:
    def __init__(
        self, tenants: TenantRepository, onboarding: OnboardingRepository, audit: AuditRepository
    ):
        self.tenants, self.onboarding, self.audit = tenants, onboarding, audit

    async def execute(
        self, user: PlatformUser, data: OrganizationInput, source: dict[str, Any] | None
    ) -> Tenant:
        cnpj = only_digits(data.cnpj)
        if not is_valid_cnpj(cnpj):
            raise ValidationFailed("CNPJ inválido. Confira os 14 dígitos.")
        if await self.tenants.get_by_cnpj(cnpj):
            # Não revela quem cadastrou: pede contato para vincular com segurança.
            raise Conflict(
                "Este CNPJ já está cadastrado. Peça acesso a quem cadastrou "
                "ou fale com a Terus para vincular sua conta."
            )
        tenant = await self.tenants.add(
            Tenant(
                legal_name=data.legal_name.strip(),
                trade_name=(data.trade_name or "").strip() or None,
                cnpj=cnpj,
                segment=data.segment,
                size_band=data.size_band,
                city=data.city,
                state=data.state.upper() if data.state else None,
                status=TenantStatus.PROSPECT,
                created_by=user.id,
            )
        )
        await self.tenants.add_member(tenant.id, user.id, MemberRole.OWNER)
        session = await self.onboarding.add(
            OnboardingSession(
                tenant_id=tenant.id,
                track=JourneyTrack.NEW_CUSTOMER,
                status=JourneyStatus.REGISTRATION_COMPLETE,
                source=source,
            )
        )
        await self.onboarding.upsert_step(
            session.id, OnboardingStep.EMPRESA, _organization_snapshot(tenant)
        )
        await self.audit.record(
            "onboarding.session.created",
            actor_id=user.id,
            tenant_id=tenant.id,
            entity="onboarding_session",
            entity_id=session.id,
            metadata={"track": "new_customer", "utm_source": (source or {}).get("utm_source")},
        )
        return tenant


class UpdateOrganization:
    def __init__(
        self, tenants: TenantRepository, onboarding: OnboardingRepository, audit: AuditRepository
    ):
        self.tenants, self.onboarding, self.audit = tenants, onboarding, audit

    async def execute(self, user: PlatformUser, tenant: Tenant, data: OrganizationInput) -> Tenant:
        cnpj = only_digits(data.cnpj)
        if cnpj != tenant.cnpj:
            raise ValidationFailed("O CNPJ não pode ser alterado. Fale com a Terus.")
        tenant.legal_name = data.legal_name.strip()
        tenant.trade_name = (data.trade_name or "").strip() or None
        tenant.segment = data.segment
        tenant.size_band = data.size_band
        tenant.city = data.city
        tenant.state = data.state.upper() if data.state else None
        session = await _require_session(self.onboarding, tenant.id)
        await self.onboarding.upsert_step(
            session.id, OnboardingStep.EMPRESA, _organization_snapshot(tenant)
        )
        await self.audit.record(
            "onboarding.step.saved",
            actor_id=user.id,
            tenant_id=tenant.id,
            entity="onboarding_session",
            entity_id=session.id,
            metadata={"step": "empresa"},
        )
        return tenant


class SaveProfile:
    def __init__(self, onboarding: OnboardingRepository, audit: AuditRepository):
        self.onboarding, self.audit = onboarding, audit

    async def execute(
        self, user: PlatformUser, tenant: Tenant, answers: ProfileAnswers, notes: str | None
    ) -> OnboardingSession:
        if answers.erp == "outro" and not (answers.erp_other or "").strip():
            raise ValidationFailed("Informe qual é o ERP.")
        session = await _require_session(self.onboarding, tenant.id)
        if session.status == JourneyStatus.ARCHIVED:
            raise InvalidTransition("Esta jornada foi arquivada. Fale com a Terus para reabrir.")
        qualification = qualify(answers)
        session.qualification_score = qualification.score
        session.qualification_reasons = [asdict(r) for r in qualification.reasons]
        session.recommendations = [asdict(r) for r in recommend(answers.priorities)]
        if session.status in (JourneyStatus.DRAFT, JourneyStatus.REGISTRATION_COMPLETE):
            session.status = JourneyStatus.QUALIFICATION_COMPLETE
        data = asdict(answers) | {"notes": notes, "qualification_band": qualification.band}
        await self.onboarding.upsert_step(session.id, OnboardingStep.PERFIL, data)
        await self.audit.record(
            "onboarding.step.saved",
            actor_id=user.id,
            tenant_id=tenant.id,
            entity="onboarding_session",
            entity_id=session.id,
            metadata={"step": "perfil", "score": qualification.score},
        )
        return session


@dataclass(frozen=True)
class CommercialInput:
    kind: CommercialKind
    preferred_contact: str
    message: str | None


class RequestCommercialContact:
    def __init__(
        self,
        onboarding: OnboardingRepository,
        requests: CommercialRequestRepository,
        audit: AuditRepository,
    ):
        self.onboarding, self.requests, self.audit = onboarding, requests, audit

    async def execute(
        self, user: PlatformUser, tenant: Tenant, data: CommercialInput
    ) -> CommercialRequest:
        session = await _require_session(self.onboarding, tenant.id)
        if session.status in (JourneyStatus.DRAFT, JourneyStatus.REGISTRATION_COMPLETE):
            raise InvalidTransition("Complete o perfil da operação antes de solicitar a proposta.")
        if session.status in (JourneyStatus.ARCHIVED, JourneyStatus.CONTRACTED):
            raise InvalidTransition("Esta jornada não aceita novas solicitações.")
        existing = await self.requests.get_open_for_tenant(tenant.id)
        if existing is not None:
            raise Conflict("Já existe uma solicitação em andamento para esta empresa.")
        request = await self.requests.add(
            CommercialRequest(
                tenant_id=tenant.id,
                session_id=session.id,
                requested_by=user.id,
                kind=data.kind,
                status=CommercialStatus.RECEIVED,
                preferred_contact=data.preferred_contact,
                message=(data.message or "").strip() or None,
            )
        )
        await self.requests.add_event(
            CommercialRequestEvent(
                request_id=request.id,
                actor_id=user.id,
                event_type="created",
                to_status=CommercialStatus.RECEIVED.value,
                note="Solicitação registrada.",
            )
        )
        crm_configured = get_settings().crm_backend != "not_configured"
        await self.requests.add_event(
            CommercialRequestEvent(
                request_id=request.id,
                actor_id=None,
                event_type="notification",
                note=(
                    "Encaminhada ao CRM."
                    if crm_configured
                    else "Aviso automático ao time comercial ainda não configurado: "
                    "a solicitação aparece no painel interno da Terus."
                ),
            )
        )
        session.status = JourneyStatus.PROPOSAL_REQUESTED
        await self.onboarding.upsert_step(
            session.id,
            OnboardingStep.SOLICITACAO,
            {"request_id": str(request.id), "kind": data.kind.value},
        )
        await self.audit.record(
            "commercial.request.created",
            actor_id=user.id,
            tenant_id=tenant.id,
            entity="commercial_request",
            entity_id=request.id,
            metadata={"kind": data.kind.value},
        )
        return request


# --- Gestão comercial (equipe Terus) -------------------------------------------------

TRANSITIONS: dict[CommercialStatus, set[CommercialStatus]] = {
    CommercialStatus.RECEIVED: {
        CommercialStatus.IN_REVIEW,
        CommercialStatus.LOST,
        CommercialStatus.ARCHIVED,
    },
    CommercialStatus.IN_REVIEW: {
        CommercialStatus.PROPOSAL_SENT,
        CommercialStatus.LOST,
        CommercialStatus.ARCHIVED,
    },
    CommercialStatus.PROPOSAL_SENT: {
        CommercialStatus.ACCEPTANCE_PENDING,
        CommercialStatus.IN_REVIEW,
        CommercialStatus.LOST,
        CommercialStatus.ARCHIVED,
    },
    CommercialStatus.ACCEPTANCE_PENDING: {
        CommercialStatus.CONTRACTED,
        CommercialStatus.PROPOSAL_SENT,
        CommercialStatus.LOST,
        CommercialStatus.ARCHIVED,
    },
    CommercialStatus.CONTRACTED: set(),
    CommercialStatus.LOST: {CommercialStatus.IN_REVIEW},
    CommercialStatus.ARCHIVED: {CommercialStatus.IN_REVIEW},
}

JOURNEY_FOR_REQUEST: dict[CommercialStatus, JourneyStatus] = {
    CommercialStatus.RECEIVED: JourneyStatus.PROPOSAL_REQUESTED,
    CommercialStatus.IN_REVIEW: JourneyStatus.UNDER_REVIEW,
    CommercialStatus.PROPOSAL_SENT: JourneyStatus.PROPOSAL_SENT,
    CommercialStatus.ACCEPTANCE_PENDING: JourneyStatus.ACCEPTANCE_PENDING,
    CommercialStatus.CONTRACTED: JourneyStatus.CONTRACTED,
    CommercialStatus.LOST: JourneyStatus.ARCHIVED,
    CommercialStatus.ARCHIVED: JourneyStatus.ARCHIVED,
}


class ChangeRequestStatus:
    def __init__(
        self,
        tenants: TenantRepository,
        onboarding: OnboardingRepository,
        requests: CommercialRequestRepository,
        audit: AuditRepository,
    ):
        self.tenants, self.onboarding, self.requests, self.audit = (
            tenants,
            onboarding,
            requests,
            audit,
        )

    async def execute(
        self,
        actor: PlatformUser,
        request_id: uuid.UUID,
        to_status: CommercialStatus,
        note: str | None,
        contract_evidence: str | None,
    ) -> CommercialRequest:
        ensure_staff(actor)
        request = await self.requests.get(request_id)
        if request is None:
            raise NotFound("Solicitação não encontrada.")
        if to_status not in TRANSITIONS[request.status]:
            raise InvalidTransition(
                f"Transição não permitida: {request.status.value} → {to_status.value}."
            )
        if to_status == CommercialStatus.CONTRACTED:
            if not (contract_evidence or "").strip():
                raise ValidationFailed(
                    "Registrar 'contratado' exige a referência do contrato assinado "
                    "(ex.: identificador do documento no provedor de assinatura)."
                )
            request.contract_evidence = contract_evidence
        from_status = request.status
        request.status = to_status
        session = await _require_session(self.onboarding, request.tenant_id)
        session.status = JOURNEY_FOR_REQUEST[to_status]
        if to_status == CommercialStatus.CONTRACTED:
            tenant = await self.tenants.get(request.tenant_id)
            if tenant is not None:
                tenant.status = TenantStatus.CONTRACTED
        await self.requests.add_event(
            CommercialRequestEvent(
                request_id=request.id,
                actor_id=actor.id,
                event_type="status_changed",
                from_status=from_status.value,
                to_status=to_status.value,
                note=(note or "").strip() or None,
            )
        )
        await self.audit.record(
            "commercial.request.status_changed",
            actor_id=actor.id,
            tenant_id=request.tenant_id,
            entity="commercial_request",
            entity_id=request.id,
            metadata={"from": from_status.value, "to": to_status.value},
        )
        return request


class AssignRequest:
    def __init__(
        self, users: UserRepository, requests: CommercialRequestRepository, audit: AuditRepository
    ):
        self.users, self.requests, self.audit = users, requests, audit

    async def execute(
        self, actor: PlatformUser, request_id: uuid.UUID, assignee_id: uuid.UUID | None
    ) -> CommercialRequest:
        ensure_staff(actor)
        request = await self.requests.get(request_id)
        if request is None:
            raise NotFound("Solicitação não encontrada.")
        assignee_name = None
        if assignee_id is not None:
            assignee = await self.users.get(assignee_id)
            if assignee is None or assignee.role not in STAFF_ROLES:
                raise ValidationFailed("Responsável precisa ser da equipe Terus.")
            assignee_name = assignee.full_name
        request.assigned_to = assignee_id
        await self.requests.add_event(
            CommercialRequestEvent(
                request_id=request.id,
                actor_id=actor.id,
                event_type="assigned",
                note=f"Responsável: {assignee_name}" if assignee_name else "Responsável removido.",
                visible_to_customer=False,
            )
        )
        await self.audit.record(
            "commercial.request.assigned",
            actor_id=actor.id,
            tenant_id=request.tenant_id,
            entity="commercial_request",
            entity_id=request.id,
        )
        return request


class AddRequestNote:
    def __init__(self, requests: CommercialRequestRepository, audit: AuditRepository):
        self.requests, self.audit = requests, audit

    async def execute(
        self, actor: PlatformUser, request_id: uuid.UUID, note: str, visible_to_customer: bool
    ) -> None:
        ensure_staff(actor)
        request = await self.requests.get(request_id)
        if request is None:
            raise NotFound("Solicitação não encontrada.")
        await self.requests.add_event(
            CommercialRequestEvent(
                request_id=request.id,
                actor_id=actor.id,
                event_type="note",
                note=note.strip(),
                visible_to_customer=visible_to_customer,
            )
        )
        await self.audit.record(
            "commercial.request.note_added",
            actor_id=actor.id,
            tenant_id=request.tenant_id,
            entity="commercial_request",
            entity_id=request.id,
        )


async def _require_session(
    onboarding: OnboardingRepository, tenant_id: uuid.UUID
) -> OnboardingSession:
    session = await onboarding.get_by_tenant(tenant_id)
    if session is None:
        raise NotFound("Jornada de onboarding não encontrada.")
    return session


def _organization_snapshot(tenant: Tenant) -> dict[str, Any]:
    return {
        "legal_name": tenant.legal_name,
        "trade_name": tenant.trade_name,
        "cnpj": tenant.cnpj,
        "segment": tenant.segment.value,
        "size_band": tenant.size_band.value,
        "city": tenant.city,
        "state": tenant.state,
    }
