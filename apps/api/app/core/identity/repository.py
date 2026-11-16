import uuid
from datetime import UTC, datetime

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.identity.models import AuthSession, Consent, PasswordResetToken, PlatformUser
from app.shared.enums import ConsentKind, PlatformRole


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_email(self, email: str) -> PlatformUser | None:
        result = await self.session.execute(select(PlatformUser).where(PlatformUser.email == email))
        return result.scalar_one_or_none()

    async def get(self, user_id: uuid.UUID) -> PlatformUser | None:
        return await self.session.get(PlatformUser, user_id)

    async def add(self, user: PlatformUser) -> PlatformUser:
        self.session.add(user)
        await self.session.flush()
        return user

    async def list_staff(self) -> list[PlatformUser]:
        result = await self.session.execute(
            select(PlatformUser)
            .where(PlatformUser.role.in_([PlatformRole.TERUS_SALES, PlatformRole.TERUS_ADMIN]))
            .where(PlatformUser.is_active.is_(True))
            .order_by(PlatformUser.full_name)
            .limit(200)
        )
        return list(result.scalars())


class AuthSessionRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def add(self, auth_session: AuthSession) -> AuthSession:
        self.session.add(auth_session)
        await self.session.flush()
        return auth_session

    async def get_by_hash(self, token_hash: str) -> AuthSession | None:
        result = await self.session.execute(
            select(AuthSession).where(AuthSession.refresh_token_hash == token_hash)
        )
        return result.scalar_one_or_none()

    async def get(self, session_id: uuid.UUID) -> AuthSession | None:
        return await self.session.get(AuthSession, session_id)

    async def revoke_all_for_user(self, user_id: uuid.UUID) -> None:
        await self.session.execute(
            update(AuthSession)
            .where(AuthSession.user_id == user_id, AuthSession.revoked_at.is_(None))
            .values(revoked_at=datetime.now(UTC))
        )


class PasswordResetRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def add(self, token: PasswordResetToken) -> None:
        self.session.add(token)
        await self.session.flush()

    async def get_by_hash(self, token_hash: str) -> PasswordResetToken | None:
        result = await self.session.execute(
            select(PasswordResetToken).where(PasswordResetToken.token_hash == token_hash)
        )
        return result.scalar_one_or_none()


class ConsentRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def record(
        self, user_id: uuid.UUID, kind: ConsentKind, version: str, granted: bool
    ) -> None:
        self.session.add(
            Consent(user_id=user_id, kind=kind, document_version=version, granted=granted)
        )
        await self.session.flush()

    async def list_for_user(self, user_id: uuid.UUID) -> list[Consent]:
        result = await self.session.execute(
            select(Consent).where(Consent.user_id == user_id).order_by(Consent.created_at)
        )
        return list(result.scalars())
