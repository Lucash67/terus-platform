"""Use cases de identidade. Cada classe = uma responsabilidade."""

import uuid
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from app.core.identity.models import AuthSession, PasswordResetToken, PlatformUser
from app.core.identity.repository import (
    AuthSessionRepository,
    ConsentRepository,
    PasswordResetRepository,
    UserRepository,
)
from app.infrastructure.notifications import DeliveryStatus, Mailer, OutgoingEmail
from app.infrastructure.security import (
    DUMMY_PASSWORD_HASH,
    hash_password,
    hash_token,
    issue_access_token,
    new_opaque_token,
    verify_password,
)
from app.settings import get_settings
from app.shared.audit.repository import AuditRepository
from app.shared.enums import ConsentKind, PlatformRole
from app.shared.exceptions import Conflict, NotAuthenticated, ValidationFailed
from app.shared.validators import password_problems

LEGAL_DOCUMENT_VERSION = "2026-11"


@dataclass(frozen=True)
class RegisterInput:
    email: str
    full_name: str
    password: str
    phone: str | None
    job_title: str | None
    accept_terms: bool
    accept_privacy: bool
    marketing_opt_in: bool


@dataclass(frozen=True)
class IssuedTokens:
    user: PlatformUser
    access_token: str
    refresh_token: str


def _ensure_password(password: str) -> None:
    problems = password_problems(password)
    if problems:
        raise ValidationFailed("Senha fraca.", detail=problems)


class RegisterUser:
    def __init__(self, users: UserRepository, consents: ConsentRepository, audit: AuditRepository):
        self.users, self.consents, self.audit = users, consents, audit

    async def execute(self, data: RegisterInput) -> PlatformUser:
        if not (data.accept_terms and data.accept_privacy):
            raise ValidationFailed(
                "É preciso aceitar os Termos de Uso e a Política de Privacidade."
            )
        _ensure_password(data.password)
        email = data.email.strip().lower()
        if await self.users.get_by_email(email):
            raise Conflict("Já existe uma conta com este e-mail. Entre ou recupere o acesso.")
        user = await self.users.add(
            PlatformUser(
                email=email,
                full_name=data.full_name.strip(),
                phone=data.phone,
                job_title=data.job_title,
                password_hash=hash_password(data.password),
                role=PlatformRole.CUSTOMER,
            )
        )
        await self.consents.record(user.id, ConsentKind.TERMS, LEGAL_DOCUMENT_VERSION, True)
        await self.consents.record(user.id, ConsentKind.PRIVACY, LEGAL_DOCUMENT_VERSION, True)
        await self.consents.record(
            user.id, ConsentKind.MARKETING, LEGAL_DOCUMENT_VERSION, data.marketing_opt_in
        )
        await self.audit.record(
            "auth.account.created", actor_id=user.id, entity="platform_user", entity_id=user.id
        )
        return user


class IssueSession:
    def __init__(self, sessions: AuthSessionRepository):
        self.sessions = sessions

    async def execute(self, user: PlatformUser) -> IssuedTokens:
        settings = get_settings()
        refresh = new_opaque_token()
        auth_session = await self.sessions.add(
            AuthSession(
                user_id=user.id,
                refresh_token_hash=hash_token(refresh),
                expires_at=datetime.now(UTC)
                + timedelta(seconds=settings.refresh_token_ttl_seconds),
            )
        )
        access = issue_access_token(user.id, auth_session.id, user.role.value)
        return IssuedTokens(user=user, access_token=access, refresh_token=refresh)


class AuthenticateUser:
    def __init__(self, users: UserRepository, audit: AuditRepository):
        self.users, self.audit = users, audit

    async def execute(self, email: str, password: str) -> PlatformUser:
        user = await self.users.get_by_email(email.strip().lower())
        if user is None:
            verify_password(password, DUMMY_PASSWORD_HASH)  # tempo constante
            await self.audit.record("auth.login.failed", metadata={"reason": "unknown_email"})
            raise NotAuthenticated("E-mail ou senha incorretos.")
        if not user.is_active or not verify_password(password, user.password_hash):
            await self.audit.record(
                "auth.login.failed", actor_id=user.id, metadata={"reason": "bad_credentials"}
            )
            raise NotAuthenticated("E-mail ou senha incorretos.")
        await self.audit.record("auth.login.success", actor_id=user.id)
        return user


class RotateRefreshToken:
    def __init__(
        self, users: UserRepository, sessions: AuthSessionRepository, audit: AuditRepository
    ):
        self.users, self.sessions, self.audit = users, sessions, audit

    async def execute(self, refresh_token: str) -> IssuedTokens:
        current = await self.sessions.get_by_hash(hash_token(refresh_token))
        now = datetime.now(UTC)
        if current is None or current.revoked_at is not None or current.expires_at <= now:
            raise NotAuthenticated("Sessão expirada. Entre novamente.")
        user = await self.users.get(current.user_id)
        if user is None or not user.is_active:
            raise NotAuthenticated("Sessão expirada. Entre novamente.")
        current.revoked_at = now
        tokens = await IssueSession(self.sessions).execute(user)
        await self.audit.record("auth.token.refreshed", actor_id=user.id)
        return tokens


class Logout:
    def __init__(self, sessions: AuthSessionRepository, audit: AuditRepository):
        self.sessions, self.audit = sessions, audit

    async def execute(self, refresh_token: str | None, session_id: uuid.UUID | None) -> None:
        target = None
        if refresh_token:
            target = await self.sessions.get_by_hash(hash_token(refresh_token))
        if target is None and session_id is not None:
            target = await self.sessions.get(session_id)
        if target is not None and target.revoked_at is None:
            target.revoked_at = datetime.now(UTC)
            await self.audit.record("auth.logout", actor_id=target.user_id)


class RequestPasswordReset:
    def __init__(
        self,
        users: UserRepository,
        resets: PasswordResetRepository,
        audit: AuditRepository,
        mailer: Mailer,
    ):
        self.users, self.resets, self.audit, self.mailer = users, resets, audit, mailer

    async def execute(self, email: str) -> DeliveryStatus:
        """Retorna o status do canal de entrega, nunca se o e-mail existe."""
        if self.mailer.backend == "not_configured":
            await self.audit.record("auth.recovery.unavailable")
            return "not_configured"
        user = await self.users.get_by_email(email.strip().lower())
        if user is None:
            return "sent"
        settings = get_settings()
        token = new_opaque_token()
        await self.resets.add(
            PasswordResetToken(
                user_id=user.id,
                token_hash=hash_token(token),
                expires_at=datetime.now(UTC)
                + timedelta(seconds=settings.password_reset_ttl_seconds),
            )
        )
        link = f"{settings.public_web_url}/redefinir-senha?token={token}"
        await self.mailer.send(
            OutgoingEmail(
                to=user.email,
                subject="Terus — redefinição de senha",
                body=f"Para criar uma nova senha, acesse: {link}\nO link expira em 1 hora.",
            )
        )
        await self.audit.record("auth.recovery.requested", actor_id=user.id)
        return "sent"


class ResetPassword:
    def __init__(
        self,
        users: UserRepository,
        resets: PasswordResetRepository,
        sessions: AuthSessionRepository,
        audit: AuditRepository,
    ):
        self.users, self.resets, self.sessions, self.audit = users, resets, sessions, audit

    async def execute(self, token: str, new_password: str) -> None:
        record = await self.resets.get_by_hash(hash_token(token))
        now = datetime.now(UTC)
        if record is None or record.used_at is not None or record.expires_at <= now:
            raise ValidationFailed("Link inválido ou expirado. Peça um novo.")
        _ensure_password(new_password)
        user = await self.users.get(record.user_id)
        if user is None:
            raise ValidationFailed("Link inválido ou expirado. Peça um novo.")
        user.password_hash = hash_password(new_password)
        record.used_at = now
        await self.sessions.revoke_all_for_user(user.id)
        await self.audit.record("auth.password.reset", actor_id=user.id)
