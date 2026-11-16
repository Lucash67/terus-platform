import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from app.core.acquisition.qualification import ErpChoice, Priority, StoresBand, Timeline
from app.shared.enums import CommercialKind, CommercialStatus, JourneyStatus, Segment, SizeBand
from app.shared.validators import only_digits

UF = Literal[
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]  # fmt: skip


class SourceInfo(BaseModel):
    utm_source: str | None = Field(default=None, max_length=100)
    utm_medium: str | None = Field(default=None, max_length=100)
    utm_campaign: str | None = Field(default=None, max_length=100)
    utm_content: str | None = Field(default=None, max_length=100)
    landing_path: str | None = Field(default=None, max_length=200)
    cta: str | None = Field(default=None, max_length=60)


class OrganizationRequest(BaseModel):
    legal_name: str = Field(min_length=2, max_length=200)
    trade_name: str | None = Field(default=None, max_length=200)
    cnpj: str = Field(min_length=14, max_length=18)
    segment: Segment
    size_band: SizeBand
    city: str | None = Field(default=None, max_length=120)
    state: UF | None = None
    source: SourceInfo | None = None

    @field_validator("cnpj")
    @classmethod
    def _digits(cls, value: str) -> str:
        digits = only_digits(value)
        if len(digits) != 14:
            raise ValueError("CNPJ deve ter 14 dígitos")
        return digits


class ProfileRequest(BaseModel):
    erp: ErpChoice
    erp_other: str | None = Field(default=None, max_length=80)
    stores_band: StoresBand
    priorities: list[Priority] = Field(min_length=1, max_length=9)
    has_it_contact: bool
    timeline: Timeline
    notes: str | None = Field(default=None, max_length=1000)


class CommercialRequestBody(BaseModel):
    kind: CommercialKind
    preferred_contact: Literal["email", "telefone", "whatsapp"]
    message: str | None = Field(default=None, max_length=2000)


class OrganizationOut(BaseModel):
    id: uuid.UUID
    legal_name: str
    trade_name: str | None
    cnpj: str
    segment: Segment
    size_band: SizeBand
    city: str | None
    state: str | None
    status: str


class ReasonOut(BaseModel):
    factor: str
    points: int
    explanation: str


class RecommendationOut(BaseModel):
    module: str
    name: str
    reason: str


class EventOut(BaseModel):
    id: uuid.UUID
    event_type: str
    from_status: str | None
    to_status: str | None
    note: str | None
    visible_to_customer: bool
    created_at: datetime


class CommercialRequestOut(BaseModel):
    id: uuid.UUID
    kind: CommercialKind
    status: CommercialStatus
    preferred_contact: str
    message: str | None
    assigned_to: uuid.UUID | None
    contract_evidence: str | None
    created_at: datetime
    updated_at: datetime
    events: list[EventOut]


class ImplementationItemOut(BaseModel):
    key: str
    label: str
    status: Literal["concluido", "informado", "pendente", "nao_configurado", "nao_iniciado"]
    detail: str


class ProfileOut(BaseModel):
    erp: str
    erp_other: str | None
    stores_band: str
    priorities: list[str]
    has_it_contact: bool
    timeline: str
    notes: str | None


class JourneyOut(BaseModel):
    organization: OrganizationOut
    membership_role: str | None
    session_id: uuid.UUID
    track: str
    status: JourneyStatus
    completed_steps: list[str]
    profile: ProfileOut | None
    recommendations: list[RecommendationOut]
    requests: list[CommercialRequestOut]
    implementation: list[ImplementationItemOut]
    updated_at: datetime


class JourneyListOut(BaseModel):
    items: list[JourneyOut]
