import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import CITEXT, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.infrastructure.database import Base, TimestampMixin, UUIDPrimaryKey
from app.shared.enums import ConsentKind, PlatformRole


def pg_enum(enum_cls: type, name: str, schema: str = "public") -> Enum:
    return Enum(
        enum_cls,
        name=name,
        schema=schema,
        values_callable=lambda e: [m.value for m in e],
        create_type=False,
    )


class PlatformUser(UUIDPrimaryKey, TimestampMixin, Base):
    __tablename__ = "platform_users"
    __table_args__ = {"schema": "public"}

    email: Mapped[str] = mapped_column(CITEXT, unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(160), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20))
    job_title: Mapped[str | None] = mapped_column(String(120))
    password_hash: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[PlatformRole] = mapped_column(
        pg_enum(PlatformRole, "platform_role"), nullable=False, default=PlatformRole.CUSTOMER
    )
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)


class AuthSession(UUIDPrimaryKey, TimestampMixin, Base):
    """Sessão de refresh token (hash). Revogada no logout e na troca de senha."""

    __tablename__ = "auth_sessions"
    __table_args__ = {"schema": "public"}

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )
    refresh_token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class PasswordResetToken(UUIDPrimaryKey, TimestampMixin, Base):
    __tablename__ = "password_reset_tokens"
    __table_args__ = {"schema": "public"}

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class Consent(UUIDPrimaryKey, TimestampMixin, Base):
    """Registro imutável de consentimento (LGPD): cada aceite/revogação é uma linha."""

    __tablename__ = "consents"
    __table_args__ = {"schema": "public"}

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("public.platform_users.id"), index=True, nullable=False
    )
    kind: Mapped[ConsentKind] = mapped_column(pg_enum(ConsentKind, "consent_kind"), nullable=False)
    document_version: Mapped[str] = mapped_column(String(20), nullable=False)
    granted: Mapped[bool] = mapped_column(Boolean, nullable=False)
