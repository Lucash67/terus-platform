import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field

from app.api.schemas.onboarding import JourneyOut, ReasonOut
from app.shared.enums import CommercialStatus, JourneyStatus


class StaffOut(BaseModel):
    id: uuid.UUID
    full_name: str
    email: str
    role: str


class LeadOut(BaseModel):
    tenant_id: uuid.UUID
    legal_name: str
    trade_name: str | None
    cnpj: str
    segment: str
    size_band: str
    status: JourneyStatus
    qualification_score: int | None
    owner_name: str | None
    owner_email: str | None
    utm_source: str | None
    latest_request_id: uuid.UUID | None
    latest_request_status: CommercialStatus | None
    assigned_to: uuid.UUID | None
    created_at: datetime
    updated_at: datetime


class LeadPage(BaseModel):
    items: list[LeadOut]
    total: int
    page: int
    page_size: int


class FunnelOut(BaseModel):
    counts: dict[str, int]


class AuditOut(BaseModel):
    id: uuid.UUID
    action: str
    actor_id: uuid.UUID | None
    entity: str | None
    metadata: dict[str, Any] | None
    created_at: datetime


class OwnerOut(BaseModel):
    full_name: str
    email: str
    phone: str | None
    job_title: str | None


class LeadDetailOut(BaseModel):
    journey: JourneyOut
    owner: OwnerOut | None
    qualification_score: int | None
    qualification_reasons: list[ReasonOut]
    source: dict[str, Any] | None
    audit: list[AuditOut]


class StatusChangeRequest(BaseModel):
    to_status: CommercialStatus
    note: str | None = Field(default=None, max_length=2000)
    contract_evidence: str | None = Field(default=None, max_length=500)


class AssignBody(BaseModel):
    assignee_id: uuid.UUID | None


class NoteBody(BaseModel):
    note: str = Field(min_length=2, max_length=2000)
    visible_to_customer: bool = False
