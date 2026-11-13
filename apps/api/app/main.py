import logging
import time
from collections.abc import AsyncIterator, Awaitable, Callable
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.health import router as health_router
from app.api.v1.admin import router as admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.organizations import router as organizations_router
from app.infrastructure.database import dispose_engine
from app.infrastructure.logging import configure_logging
from app.infrastructure.security import get_key_pair
from app.settings import get_settings
from app.shared.exceptions import DomainError

logger = logging.getLogger("terus.api")
UNSAFE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}
CSRF_HEADER = "x-terus-client"


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    configure_logging()
    get_key_pair()  # falha cedo se faltarem chaves fora de dev/test
    yield
    await dispose_engine()


app = FastAPI(
    title="Terus Platform API",
    description="Supply Chain Intelligence — Self Onboarding 2.0",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["content-type", CSRF_HEADER],
)


@app.middleware("http")
async def security_middleware(
    request: Request, call_next: Callable[[Request], Awaitable[Response]]
) -> Response:
    """CSRF: requisições que mudam estado exigem o header customizado do cliente web.

    Um site de terceiros não consegue enviá-lo sem passar pelo preflight CORS,
    que só aceita as origens configuradas. Cookies são SameSite=Lax.
    """
    if request.method in UNSAFE_METHODS and request.url.path.startswith("/v1/"):
        if request.headers.get(CSRF_HEADER) != "web":
            return JSONResponse(
                status_code=403,
                content={"error": "CSRF", "message": "Requisição recusada.", "detail": []},
            )
    started = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Cache-Control"] = "no-store"
    logger.info(
        "request",
        extra={
            "method": request.method,
            "path": request.url.path,
            "status": response.status_code,
            "duration_ms": round((time.perf_counter() - started) * 1000, 1),
        },
    )
    return response


@app.exception_handler(DomainError)
async def domain_error_handler(_: Request, exc: DomainError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.code, "message": exc.message, "detail": exc.detail},
    )


@app.exception_handler(RequestValidationError)
async def validation_error_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    detail = [
        {"field": ".".join(str(p) for p in err["loc"][1:]), "message": err["msg"]}
        for err in exc.errors()
    ]
    return JSONResponse(
        status_code=400,
        content={
            "error": "VALIDATION_FAILED",
            "message": "Revise os campos destacados.",
            "detail": detail,
        },
    )


app.include_router(health_router, tags=["health"])
app.include_router(auth_router)
app.include_router(organizations_router)
app.include_router(admin_router)
