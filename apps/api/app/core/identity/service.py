import uuid

from app.core.identity.models import PlatformUser
from app.core.identity.repository import (
    AuthSessionRepository,
    ConsentRepository,
    PasswordResetRepository,
    UserRepository,
)
from app.core.identity.use_cases import (
    AuthenticateUser,
    IssuedTokens,
    IssueSession,
    Logout,
    RegisterInput,
    RegisterUser,
    RequestPasswordReset,
    ResetPassword,
    RotateRefreshToken,
)
from app.infrastructure.database import UnitOfWork
from app.infrastructure.notifications import DeliveryStatus, get_mailer
from app.shared.audit.repository import AuditRepository
from app.shared.exceptions import NotAuthenticated


class IdentityService:
    def __init__(self, uow: UnitOfWork) -> None:
        self.uow = uow
        s = uow.session
        self.users = UserRepository(s)
        self.sessions = AuthSessionRepository(s)
        self.resets = PasswordResetRepository(s)
        self.consents = ConsentRepository(s)
        self.audit = AuditRepository(s)

    async def register(self, data: RegisterInput) -> IssuedTokens:
        user = await RegisterUser(self.users, self.consents, self.audit).execute(data)
        tokens = await IssueSession(self.sessions).execute(user)
        await self.uow.commit()
        return tokens

    async def login(self, email: str, password: str) -> IssuedTokens:
        try:
            user = await AuthenticateUser(self.users, self.audit).execute(email, password)
        except NotAuthenticated:
            await self.uow.commit()  # persiste auth.login.failed
            raise
        tokens = await IssueSession(self.sessions).execute(user)
        await self.uow.commit()
        return tokens

    async def refresh(self, refresh_token: str) -> IssuedTokens:
        tokens = await RotateRefreshToken(self.users, self.sessions, self.audit).execute(
            refresh_token
        )
        await self.uow.commit()
        return tokens

    async def logout(self, refresh_token: str | None, session_id: uuid.UUID | None) -> None:
        await Logout(self.sessions, self.audit).execute(refresh_token, session_id)
        await self.uow.commit()

    async def request_password_reset(self, email: str) -> DeliveryStatus:
        status = await RequestPasswordReset(
            self.users, self.resets, self.audit, get_mailer()
        ).execute(email)
        await self.uow.commit()
        return status

    async def reset_password(self, token: str, new_password: str) -> None:
        await ResetPassword(self.users, self.resets, self.sessions, self.audit).execute(
            token, new_password
        )
        await self.uow.commit()

    async def resolve_active_user(self, user_id: uuid.UUID, session_id: uuid.UUID) -> PlatformUser:
        """Valida que o access token pertence a uma sessão não revogada."""
        auth_session = await self.sessions.get(session_id)
        if auth_session is None or auth_session.revoked_at is not None:
            raise NotAuthenticated("Sessão encerrada. Entre novamente.")
        user = await self.users.get(user_id)
        if user is None or not user.is_active or auth_session.user_id != user.id:
            raise NotAuthenticated("Sessão encerrada. Entre novamente.")
        return user
