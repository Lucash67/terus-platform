"""Exceções de domínio. Convertidas no formato de erro padrão pela camada HTTP:
{"error": "CODE", "message": "Legível", "detail": [...]}
"""

from typing import Any


class DomainError(Exception):
    status_code: int = 400
    code: str = "BUSINESS_RULE"

    def __init__(self, message: str, detail: list[Any] | None = None) -> None:
        super().__init__(message)
        self.message = message
        self.detail = detail or []


class ValidationFailed(DomainError):
    status_code = 400
    code = "VALIDATION_FAILED"


class NotAuthenticated(DomainError):
    status_code = 401
    code = "NOT_AUTHENTICATED"


class Forbidden(DomainError):
    status_code = 403
    code = "FORBIDDEN"


class NotFound(DomainError):
    status_code = 404
    code = "NOT_FOUND"


class Conflict(DomainError):
    status_code = 409
    code = "CONFLICT"


class InvalidTransition(DomainError):
    status_code = 409
    code = "INVALID_TRANSITION"


class RateLimited(DomainError):
    status_code = 429
    code = "RATE_LIMITED"
