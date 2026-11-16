"""Conversão de objetos de domínio em schemas de resposta."""

from app.api.schemas.admin import AuditOut, LeadDetailOut, LeadOut, OwnerOut
from app.api.schemas.auth import SessionResponse, UserResponse
from app.api.schemas.onboarding import (
    CommercialRequestOut,
    EventOut,
    ImplementationItemOut,
    JourneyOut,
    OrganizationOut,
    ProfileOut,
    ReasonOut,
    RecommendationOut,
)
from app.core.acquisition.service import JourneyView, LeadDetail, LeadListItem
from app.core.identity.models import PlatformUser
from app.shared.enums import OnboardingStep


def user_out(user: PlatformUser) -> UserResponse:
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        phone=user.phone,
        job_title=user.job_title,
        role=user.role.value,
        email_verified=user.email_verified_at is not None,
        created_at=user.created_at,
    )


def session_out(user: PlatformUser) -> SessionResponse:
    return SessionResponse(
        user=user_out(user),
        email_verification="verified"
        if user.email_verified_at
        else "pending_provider_not_configured",
    )


def journey_out(view: JourneyView, customer_view: bool = True) -> JourneyOut:
    t, s = view.tenant, view.session
    perfil = view.steps.get(OnboardingStep.PERFIL)
    return JourneyOut(
        organization=OrganizationOut(
            id=t.id,
            legal_name=t.legal_name,
            trade_name=t.trade_name,
            cnpj=t.cnpj,
            segment=t.segment,
            size_band=t.size_band,
            city=t.city,
            state=t.state,
            status=t.status.value,
        ),
        membership_role=view.role.value if view.role else None,
        session_id=s.id,
        track=s.track.value,
        status=s.status,
        completed_steps=sorted(step.value for step in view.steps),
        profile=ProfileOut(
            erp=perfil["erp"],
            erp_other=perfil.get("erp_other"),
            stores_band=perfil["stores_band"],
            priorities=list(perfil.get("priorities", [])),
            has_it_contact=bool(perfil.get("has_it_contact")),
            timeline=perfil["timeline"],
            notes=perfil.get("notes"),
        )
        if perfil
        else None,
        recommendations=[RecommendationOut(**r) for r in (s.recommendations or [])],
        requests=[
            CommercialRequestOut(
                id=rv.request.id,
                kind=rv.request.kind,
                status=rv.request.status,
                preferred_contact=rv.request.preferred_contact,
                message=rv.request.message,
                assigned_to=None if customer_view else rv.request.assigned_to,
                contract_evidence=None if customer_view else rv.request.contract_evidence,
                created_at=rv.request.created_at,
                updated_at=rv.request.updated_at,
                events=[
                    EventOut(
                        id=e.id,
                        event_type=e.event_type,
                        from_status=e.from_status,
                        to_status=e.to_status,
                        note=e.note,
                        visible_to_customer=e.visible_to_customer,
                        created_at=e.created_at,
                    )
                    for e in rv.events
                ],
            )
            for rv in view.requests
        ],
        implementation=[
            ImplementationItemOut(key=i.key, label=i.label, status=i.status, detail=i.detail)
            for i in view.implementation
        ],
        updated_at=s.updated_at,
    )


def lead_out(item: LeadListItem) -> LeadOut:
    r, req = item.row, item.latest_request
    return LeadOut(
        tenant_id=r.tenant.id,
        legal_name=r.tenant.legal_name,
        trade_name=r.tenant.trade_name,
        cnpj=r.tenant.cnpj,
        segment=r.tenant.segment.value,
        size_band=r.tenant.size_band.value,
        status=r.session.status,
        qualification_score=r.session.qualification_score,
        owner_name=r.owner.full_name if r.owner else None,
        owner_email=r.owner.email if r.owner else None,
        utm_source=(r.session.source or {}).get("utm_source"),
        latest_request_id=req.id if req else None,
        latest_request_status=req.status if req else None,
        assigned_to=req.assigned_to if req else None,
        created_at=r.session.created_at,
        updated_at=r.session.updated_at,
    )


def lead_detail_out(detail: LeadDetail) -> LeadDetailOut:
    session = detail.journey.session
    return LeadDetailOut(
        journey=journey_out(detail.journey, customer_view=False),
        owner=OwnerOut(
            full_name=detail.owner.full_name,
            email=detail.owner.email,
            phone=detail.owner.phone,
            job_title=detail.owner.job_title,
        )
        if detail.owner
        else None,
        qualification_score=session.qualification_score,
        qualification_reasons=[ReasonOut(**r) for r in (session.qualification_reasons or [])],
        source=session.source,
        audit=[
            AuditOut(
                id=a.id,
                action=a.action,
                actor_id=a.actor_id,
                entity=a.entity,
                metadata=a.metadata_,
                created_at=a.created_at,
            )
            for a in detail.audit
        ],
    )
