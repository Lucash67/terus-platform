"""Autenticação: conta, sessão por cookies HttpOnly, recuperação de acesso."""

from fastapi import APIRouter, Depends, Request, Response, status

from app.api.deps import (
    REFRESH_COOKIE,
    CurrentUser,
    UoW,
    clear_session_cookies,
    rate_limit_auth,
    set_session_cookies,
)
from app.api.mappers import session_out
from app.api.schemas.auth import (
    LoginRequest,
    MessageResponse,
    RecoverRequest,
    RecoverResponse,
    RegisterRequest,
    ResetPasswordRequest,
    SessionResponse,
)
from app.core.identity.service import IdentityService
from app.core.identity.use_cases import RegisterInput
from app.infrastructure.security import decode_access_token
from app.shared.exceptions import NotAuthenticated

router = APIRouter(prefix="/v1/auth", tags=["auth"])
RateLimited = Depends(rate_limit_auth)


@router.post(
    "/register",
    response_model=SessionResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[RateLimited],
)
async def register(body: RegisterRequest, response: Response, uow: UoW) -> SessionResponse:
    tokens = await IdentityService(uow).register(RegisterInput(**body.model_dump()))
    set_session_cookies(response, tokens)
    return session_out(tokens.user)


@router.post("/login", response_model=SessionResponse, dependencies=[RateLimited])
async def login(body: LoginRequest, response: Response, uow: UoW) -> SessionResponse:
    tokens = await IdentityService(uow).login(body.email, body.password)
    set_session_cookies(response, tokens)
    return session_out(tokens.user)


@router.post("/refresh", response_model=SessionResponse, dependencies=[RateLimited])
async def refresh(request: Request, response: Response, uow: UoW) -> SessionResponse:
    token = request.cookies.get(REFRESH_COOKIE)
    if not token:
        clear_session_cookies(response)
        raise NotAuthenticated("Sessão expirada. Entre novamente.")
    tokens = await IdentityService(uow).refresh(token)
    set_session_cookies(response, tokens)
    return session_out(tokens.user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(request: Request, response: Response, uow: UoW) -> Response:
    access = request.cookies.get("terus_at")
    claims = decode_access_token(access) if access else None
    await IdentityService(uow).logout(
        request.cookies.get(REFRESH_COOKIE), claims.session_id if claims else None
    )
    response.status_code = status.HTTP_204_NO_CONTENT
    clear_session_cookies(response)
    return response


@router.get("/session", response_model=SessionResponse)
async def current_session(user: CurrentUser) -> SessionResponse:
    return session_out(user)


@router.post("/recover", response_model=RecoverResponse, dependencies=[RateLimited])
async def recover(body: RecoverRequest, uow: UoW) -> RecoverResponse:
    delivery = await IdentityService(uow).request_password_reset(body.email)
    if delivery == "not_configured":
        return RecoverResponse(
            delivery=delivery,
            message=(
                "O envio automático de e-mail ainda não está configurado. "
                "Fale com a equipe Terus para recuperar o acesso."
            ),
        )
    return RecoverResponse(
        delivery=delivery,
        message="Se houver uma conta com este e-mail, enviamos um link válido por 1 hora.",
    )


@router.post("/reset-password", response_model=MessageResponse, dependencies=[RateLimited])
async def reset_password(body: ResetPasswordRequest, uow: UoW) -> MessageResponse:
    await IdentityService(uow).reset_password(body.token, body.new_password)
    return MessageResponse(message="Senha atualizada. Entre com a nova senha.")
