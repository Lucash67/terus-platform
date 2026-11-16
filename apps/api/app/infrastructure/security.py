"""Hash de senha (bcrypt), tokens opacos e JWT RS256."""

import hashlib
import logging
import secrets
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from functools import lru_cache

import bcrypt
import jwt
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

from app.settings import get_settings

logger = logging.getLogger("terus.security")


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=12)).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except ValueError:
        return False


# Hash fixo usado para equalizar o tempo de resposta quando o e-mail não existe.
DUMMY_PASSWORD_HASH = hash_password("terus-timing-equalizer")


def new_opaque_token() -> str:
    return secrets.token_urlsafe(48)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class KeyPair:
    private_pem: str
    public_pem: str


@lru_cache
def get_key_pair() -> KeyPair:
    settings = get_settings()
    if settings.jwt_private_key and settings.jwt_public_key:
        return KeyPair(settings.jwt_private_key, settings.jwt_public_key)
    if settings.is_production_like:
        raise RuntimeError("JWT_PRIVATE_KEY/JWT_PUBLIC_KEY são obrigatórias fora de dev/test")
    logger.warning("jwt_ephemeral_keys_generated", extra={"environment": settings.environment})
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    private_pem = key.private_bytes(
        serialization.Encoding.PEM,
        serialization.PrivateFormat.PKCS8,
        serialization.NoEncryption(),
    ).decode()
    public_pem = (
        key.public_key()
        .public_bytes(serialization.Encoding.PEM, serialization.PublicFormat.SubjectPublicKeyInfo)
        .decode()
    )
    return KeyPair(private_pem, public_pem)


@dataclass(frozen=True)
class AccessClaims:
    user_id: uuid.UUID
    session_id: uuid.UUID
    role: str


def issue_access_token(user_id: uuid.UUID, session_id: uuid.UUID, role: str) -> str:
    settings = get_settings()
    now = datetime.now(UTC)
    payload = {
        "sub": str(user_id),
        "sid": str(session_id),
        "role": role,
        "iss": settings.jwt_issuer,
        "iat": now,
        "exp": now + timedelta(seconds=settings.access_token_ttl_seconds),
        "typ": "access",
    }
    return jwt.encode(payload, get_key_pair().private_pem, algorithm="RS256")


def decode_access_token(token: str) -> AccessClaims | None:
    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            get_key_pair().public_pem,
            algorithms=["RS256"],
            issuer=settings.jwt_issuer,
            options={"require": ["exp", "sub", "sid", "iss"]},
        )
    except jwt.PyJWTError:
        return None
    if payload.get("typ") != "access":
        return None
    try:
        return AccessClaims(
            uuid.UUID(payload["sub"]), uuid.UUID(payload["sid"]), str(payload["role"])
        )
    except (KeyError, ValueError):
        return None
