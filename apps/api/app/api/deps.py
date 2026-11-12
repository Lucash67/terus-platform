"""Dependências HTTP: sessão de banco, usuário autenticado, cookies e rate limit."""

from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import Depends, Request, Response

from app.core.identity.models import PlatformUser
from app.core.identity.service import IdentityService
from app.core.identity.use_cases import IssuedTokens
from app.infrastructure.database import UnitOfWork, session_scope
from app.infrastructure.rate_limit import limiter
from app.infrastructure.security import AccessClaims, decode_access_token
from app.settings import get_settings
from app.shared.exceptions import NotAuthenticated

ACCESS_COOKIE = "terus_at"
REFRESH_COOKIE = "terus_rt"


async def get_uow() -> AsyncIterator[UnitOfWork]:
    async for session in session_scope():
        yield UnitOfWork(session)


UoW = Annotated[UnitOfWork, Depends(get_uow)]


def get_claims(request: Request) -> AccessClaims:
    token = request.cookies.get(ACCESS_COOKIE)
    claims = decode_access_token(token) if token else None
    if claims is None:
        raise NotAuthenticated("Entre na sua conta para continuar.")
    return claims


async def get_current_user(
    uow: UoW, claims: Annotated[AccessClaims, Depends(get_claims)]
) -> PlatformUser:
    return await IdentityService(uow).resolve_active_user(claims.user_id, claims.session_id)


CurrentUser = Annotated[PlatformUser, Depends(get_current_user)]


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit_auth(request: Request) -> None:
    limiter.hit(
        f"auth:{request.url.path}:{client_ip(request)}", get_settings().rate_limit_auth_per_minute
    )


def set_session_cookies(response: Response, tokens: IssuedTokens) -> None:
    settings = get_settings()
    response.set_cookie(
        ACCESS_COOKIE,
        tokens.access_token,
        max_age=settings.access_token_ttl_seconds,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        domain=settings.cookie_domain,
        path="/",
    )
    response.set_cookie(
        REFRESH_COOKIE,
        tokens.refresh_token,
        max_age=settings.refresh_token_ttl_seconds,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        domain=settings.cookie_domain,
        path=settings.refresh_cookie_path,
    )


def clear_session_cookies(response: Response) -> None:
    settings = get_settings()
    response.delete_cookie(ACCESS_COOKIE, path="/", domain=settings.cookie_domain)
    response.delete_cookie(
        REFRESH_COOKIE, path=settings.refresh_cookie_path, domain=settings.cookie_domain
    )
