import uuid

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.identity.models import pg_enum
from app.infrastructure.database import Base, TimestampMixin, UUIDPrimaryKey
from app.shared.enums import MemberRole, Segment, SizeBand, TenantStatus


class Tenant(UUIDPrimaryKey, TimestampMixin, Base):
    """Organização (empresa). Nasce como `prospect` no self onboarding.

    O schema operacional `tenant_{uuid_curto}` só é criado no provisionamento,
    que não faz parte deste fluxo.
    """

    __tablename__ = "tenants"
    __table_args__ = {"schema": "public"}

    legal_name: Mapped[str] = mapped_column(String(200), nullable=False)
    trade_name: Mapped[str | None] = mapped_column(String(200))
    cnpj: Mapped[str] = mapped_column(String(14), unique=True, nullable=False)
    segment: Mapped[Segment] = mapped_column(pg_enum(Segment, "tenant_segment"), nullable=False)
    size_band: Mapped[SizeBand] = mapped_column(
        pg_enum(SizeBand, "tenant_size_band"), nullable=False
    )
    city: Mapped[str | None] = mapped_column(String(120))
    state: Mapped[str | None] = mapped_column(String(2))
    status: Mapped[TenantStatus] = mapped_column(
        pg_enum(TenantStatus, "tenant_status"),
        index=True,
        nullable=False,
        default=TenantStatus.PROSPECT,
    )
    created_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )


class TenantMember(UUIDPrimaryKey, TimestampMixin, Base):
    __tablename__ = "tenant_members"
    __table_args__ = (UniqueConstraint("tenant_id", "user_id"), {"schema": "public"})

    tenant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.tenants.id"), index=True, nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )
    role: Mapped[MemberRole] = mapped_column(pg_enum(MemberRole, "member_role"), nullable=False)
