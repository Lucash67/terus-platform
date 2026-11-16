"""Configuração da API via variáveis de ambiente (pydantic-settings).

Nenhum segredo tem valor padrão utilizável em produção: chaves JWT ausentes
em produção fazem a aplicação falhar na inicialização.
"""

from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: Literal["development", "test", "preview", "production"] = "development"
    database_url: str = "postgresql+asyncpg://postgres@127.0.0.1:5433/terus_dev"

    # JWT RS256 (PEM). Em development/test, um par efêmero é gerado se ausente.
    jwt_private_key: str | None = None
    jwt_public_key: str | None = None
    jwt_issuer: str = "terus-platform"
    access_token_ttl_seconds: int = 15 * 60
    refresh_token_ttl_seconds: int = 7 * 24 * 60 * 60
    password_reset_ttl_seconds: int = 60 * 60

    # Cookies — o navegador acessa a API pelo proxy do Next (/api/v1/*).
    cookie_secure: bool = False
    cookie_domain: str | None = None
    refresh_cookie_path: str = "/api/v1/auth"

    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])

    # Provedor de e-mail: "not_configured" (padrão honesto) ou "memory" (testes).
    mailer_backend: Literal["not_configured", "memory"] = "not_configured"
    public_web_url: str = "http://localhost:3000"

    # Integrações externas — permanecem "not_configured" até haver credencial real.
    crm_backend: Literal["not_configured"] = "not_configured"
    signature_backend: Literal["not_configured"] = "not_configured"
    erp_agent_backend: Literal["not_configured"] = "not_configured"

    rate_limit_auth_per_minute: int = 20

    @property
    def is_production_like(self) -> bool:
        return self.environment in ("preview", "production")


@lru_cache
def get_settings() -> Settings:
    return Settings()
