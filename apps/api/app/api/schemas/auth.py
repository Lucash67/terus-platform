import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=3, max_length=160)
    password: str = Field(min_length=10, max_length=128)
    phone: str | None = Field(default=None, max_length=20, pattern=r"^[0-9()+\-\s]*$")
    job_title: str | None = Field(default=None, max_length=120)
    accept_terms: bool
    accept_privacy: bool
    marketing_opt_in: bool = False


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class RecoverRequest(BaseModel):
    email: EmailStr


class RecoverResponse(BaseModel):
    delivery: Literal["sent", "not_configured"]
    message: str


class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=20, max_length=200)
    new_password: str = Field(min_length=10, max_length=128)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str
    full_name: str
    phone: str | None
    job_title: str | None
    role: Literal["customer", "terus_sales", "terus_admin"]
    email_verified: bool
    created_at: datetime


class SessionResponse(BaseModel):
    user: UserResponse
    email_verification: Literal["verified", "pending_provider_not_configured"]


class MessageResponse(BaseModel):
    message: str
