"""Enums de domínio (mapeados para ENUM PostgreSQL nos models)."""

from enum import StrEnum


class PlatformRole(StrEnum):
    CUSTOMER = "customer"
    TERUS_SALES = "terus_sales"
    TERUS_ADMIN = "terus_admin"


class MemberRole(StrEnum):
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"


class TenantStatus(StrEnum):
    PROSPECT = "prospect"
    CONTRACTED = "contracted"
    IMPLEMENTING = "implementing"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    ARCHIVED = "archived"


class Segment(StrEnum):
    SUPERMERCADO = "supermercado"
    ATACAREJO = "atacarejo"
    FARMACIA = "farmacia"
    MATERIAL_CONSTRUCAO = "material_construcao"
    INDUSTRIA = "industria"
    DISTRIBUIDOR = "distribuidor"
    OUTRO = "outro"


class SizeBand(StrEnum):
    LOJA_UNICA = "1"
    DE_2_A_10 = "2-10"
    DE_11_A_50 = "11-50"
    ACIMA_50 = "51+"


class JourneyTrack(StrEnum):
    NEW_CUSTOMER = "new_customer"
    IMPLEMENTATION = "implementation"


class JourneyStatus(StrEnum):
    """Estados da trilha A (novo cliente)."""

    DRAFT = "draft"
    REGISTRATION_COMPLETE = "registration_complete"
    QUALIFICATION_COMPLETE = "qualification_complete"
    PROPOSAL_REQUESTED = "proposal_requested"
    UNDER_REVIEW = "under_review"
    PROPOSAL_SENT = "proposal_sent"
    ACCEPTANCE_PENDING = "acceptance_pending"
    CONTRACTED = "contracted"
    ARCHIVED = "archived"


class OnboardingStep(StrEnum):
    EMPRESA = "empresa"
    PERFIL = "perfil"
    SOLICITACAO = "solicitacao"


class CommercialKind(StrEnum):
    PROPOSAL = "proposal"
    SPECIALIST_CONTACT = "specialist_contact"


class CommercialStatus(StrEnum):
    RECEIVED = "received"
    IN_REVIEW = "in_review"
    PROPOSAL_SENT = "proposal_sent"
    ACCEPTANCE_PENDING = "acceptance_pending"
    CONTRACTED = "contracted"
    LOST = "lost"
    ARCHIVED = "archived"


class ConsentKind(StrEnum):
    TERMS = "terms"
    PRIVACY = "privacy"
    MARKETING = "marketing"
