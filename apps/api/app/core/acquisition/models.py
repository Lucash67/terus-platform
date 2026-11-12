import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.identity.models import pg_enum
from app.infrastructure.database import Base, TimestampMixin, UUIDPrimaryKey
from app.shared.enums import (
    CommercialKind,
    CommercialStatus,
    JourneyStatus,
    JourneyTrack,
    OnboardingStep,
)


class OnboardingSession(UUIDPrimaryKey, TimestampMixin, Base):
    """Jornada de onboarding de uma organização — fonte de verdade do progresso."""

    __tablename__ = "onboarding_sessions"
    __table_args__ = {"schema": "onboarding"}

    tenant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.tenants.id"), unique=True, nullable=False
    )
    track: Mapped[JourneyTrack] = mapped_column(
        pg_enum(JourneyTrack, "journey_track", "onboarding"), nullable=False
    )
    status: Mapped[JourneyStatus] = mapped_column(
        pg_enum(JourneyStatus, "journey_status", "onboarding"), index=True, nullable=False
    )
    qualification_score: Mapped[int | None] = mapped_column(Integer)
    qualification_reasons: Mapped[list[dict[str, Any]] | None] = mapped_column(JSONB)
    recommendations: Mapped[list[dict[str, Any]] | None] = mapped_column(JSONB)
    source: Mapped[dict[str, Any] | None] = mapped_column(JSONB)


class OnboardingStepData(UUIDPrimaryKey, TimestampMixin, Base):
    __tablename__ = "onboarding_step_data"
    __table_args__ = (UniqueConstraint("session_id", "step"), {"schema": "onboarding"})

    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("onboarding.onboarding_sessions.id"),
        index=True,
        nullable=False,
    )
    step: Mapped[OnboardingStep] = mapped_column(
        pg_enum(OnboardingStep, "onboarding_step", "onboarding"), nullable=False
    )
    data: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False)


class CommercialRequest(UUIDPrimaryKey, TimestampMixin, Base):
    __tablename__ = "commercial_requests"
    __table_args__ = {"schema": "onboarding"}

    tenant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.tenants.id"), index=True, nullable=False
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("onboarding.onboarding_sessions.id"),
        index=True,
        nullable=False,
    )
    requested_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )
    kind: Mapped[CommercialKind] = mapped_column(
        pg_enum(CommercialKind, "commercial_kind", "onboarding"), nullable=False
    )
    status: Mapped[CommercialStatus] = mapped_column(
        pg_enum(CommercialStatus, "commercial_status", "onboarding"), index=True, nullable=False
    )
    preferred_contact: Mapped[str] = mapped_column(String(20), nullable=False)
    message: Mapped[str | None] = mapped_column(Text)
    assigned_to: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True
    )
    contract_evidence: Mapped[str | None] = mapped_column(Text)


class CommercialRequestEvent(UUIDPrimaryKey, Base):
    """Histórico append-only da solicitação (visível ao cliente e ao time Terus)."""

    __tablename__ = "commercial_request_events"
    __table_args__ = {"schema": "onboarding"}

    request_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("onboarding.commercial_requests.id"),
        index=True,
        nullable=False,
    )
    actor_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True
    )
    event_type: Mapped[str] = mapped_column(String(40), nullable=False)
    from_status: Mapped[str | None] = mapped_column(String(30))
    to_status: Mapped[str | None] = mapped_column(String(30))
    note: Mapped[str | None] = mapped_column(Text)
    visible_to_customer: Mapped[bool] = mapped_column(nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
