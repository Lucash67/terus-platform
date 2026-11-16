"""aquisição self onboarding: identidade, organizações, jornada, solicitações, auditoria

Revision ID: 202611121900
Revises:
Create Date: 2026-11-12 19:00

Ver docs/decisions/ADR-010-self-onboarding-aquisicao.md.
"""

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql as pg

from alembic import op

revision = "202611121900"
down_revision = None
branch_labels = None
depends_on = None

ENUMS: list[tuple[str, str, list[str]]] = [
    ("public", "platform_role", ["customer", "terus_sales", "terus_admin"]),
    ("public", "member_role", ["owner", "admin", "member"]),
    (
        "public",
        "tenant_status",
        ["prospect", "contracted", "implementing", "active", "suspended", "archived"],
    ),
    (
        "public",
        "tenant_segment",
        [
            "supermercado",
            "atacarejo",
            "farmacia",
            "material_construcao",
            "industria",
            "distribuidor",
            "outro",
        ],
    ),
    ("public", "tenant_size_band", ["1", "2-10", "11-50", "51+"]),
    ("public", "consent_kind", ["terms", "privacy", "marketing"]),
    ("onboarding", "journey_track", ["new_customer", "implementation"]),
    (
        "onboarding",
        "journey_status",
        [
            "draft",
            "registration_complete",
            "qualification_complete",
            "proposal_requested",
            "under_review",
            "proposal_sent",
            "acceptance_pending",
            "contracted",
            "archived",
        ],
    ),
    ("onboarding", "onboarding_step", ["empresa", "perfil", "solicitacao"]),
    ("onboarding", "commercial_kind", ["proposal", "specialist_contact"]),
    (
        "onboarding",
        "commercial_status",
        [
            "received",
            "in_review",
            "proposal_sent",
            "acceptance_pending",
            "contracted",
            "lost",
            "archived",
        ],
    ),
]


def enum(schema: str, name: str) -> pg.ENUM:
    return pg.ENUM(name=name, schema=schema, create_type=False)


def uuid_pk() -> sa.Column:  # type: ignore[type-arg]
    return sa.Column("id", pg.UUID(as_uuid=True), primary_key=True)


def timestamps() -> list[sa.Column]:  # type: ignore[type-arg]
    return [
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    ]


def fk_user(name: str, nullable: bool = False) -> sa.Column:  # type: ignore[type-arg]
    return sa.Column(
        name, pg.UUID(as_uuid=True), sa.ForeignKey("public.platform_users.id"), nullable=nullable
    )


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS citext")
    op.execute("CREATE SCHEMA IF NOT EXISTS onboarding")
    op.execute("CREATE SCHEMA IF NOT EXISTS audit")
    for schema, name, values in ENUMS:
        pg.ENUM(*values, name=name, schema=schema).create(op.get_bind(), checkfirst=True)

    op.create_table(
        "platform_users",
        uuid_pk(),
        sa.Column("email", pg.CITEXT(), nullable=False, unique=True),
        sa.Column("full_name", sa.String(160), nullable=False),
        sa.Column("phone", sa.String(20)),
        sa.Column("job_title", sa.String(120)),
        sa.Column("password_hash", sa.String(100), nullable=False),
        sa.Column("role", enum("public", "platform_role"), nullable=False),
        sa.Column("email_verified_at", sa.DateTime(timezone=True)),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        *timestamps(),
        schema="public",
    )
    op.create_table(
        "auth_sessions",
        uuid_pk(),
        fk_user("user_id"),
        sa.Column("refresh_token_hash", sa.String(64), nullable=False, unique=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("revoked_at", sa.DateTime(timezone=True)),
        *timestamps(),
        schema="public",
    )
    op.create_index("ix_auth_sessions_user_id", "auth_sessions", ["user_id"], schema="public")
    op.create_table(
        "password_reset_tokens",
        uuid_pk(),
        fk_user("user_id"),
        sa.Column("token_hash", sa.String(64), nullable=False, unique=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("used_at", sa.DateTime(timezone=True)),
        *timestamps(),
        schema="public",
    )
    op.create_index(
        "ix_password_reset_tokens_user_id", "password_reset_tokens", ["user_id"], schema="public"
    )
    op.create_table(
        "consents",
        uuid_pk(),
        fk_user("user_id"),
        sa.Column("kind", enum("public", "consent_kind"), nullable=False),
        sa.Column("document_version", sa.String(20), nullable=False),
        sa.Column("granted", sa.Boolean(), nullable=False),
        *timestamps(),
        schema="public",
    )
    op.create_index("ix_consents_user_id", "consents", ["user_id"], schema="public")

    op.create_table(
        "tenants",
        uuid_pk(),
        sa.Column("legal_name", sa.String(200), nullable=False),
        sa.Column("trade_name", sa.String(200)),
        sa.Column("cnpj", sa.String(14), nullable=False, unique=True),
        sa.Column("segment", enum("public", "tenant_segment"), nullable=False),
        sa.Column("size_band", enum("public", "tenant_size_band"), nullable=False),
        sa.Column("city", sa.String(120)),
        sa.Column("state", sa.String(2)),
        sa.Column("status", enum("public", "tenant_status"), nullable=False),
        fk_user("created_by"),
        *timestamps(),
        schema="public",
    )
    op.create_index("ix_tenants_created_by", "tenants", ["created_by"], schema="public")
    op.create_index("ix_tenants_status", "tenants", ["status"], schema="public")
    op.create_table(
        "tenant_members",
        uuid_pk(),
        sa.Column(
            "tenant_id", pg.UUID(as_uuid=True), sa.ForeignKey("public.tenants.id"), nullable=False
        ),
        fk_user("user_id"),
        sa.Column("role", enum("public", "member_role"), nullable=False),
        *timestamps(),
        sa.UniqueConstraint("tenant_id", "user_id", name="uq_tenant_members_tenant_id"),
        schema="public",
    )
    op.create_index("ix_tenant_members_tenant_id", "tenant_members", ["tenant_id"], schema="public")
    op.create_index("ix_tenant_members_user_id", "tenant_members", ["user_id"], schema="public")

    op.create_table(
        "onboarding_sessions",
        uuid_pk(),
        sa.Column(
            "tenant_id",
            pg.UUID(as_uuid=True),
            sa.ForeignKey("public.tenants.id"),
            nullable=False,
            unique=True,
        ),
        sa.Column("track", enum("onboarding", "journey_track"), nullable=False),
        sa.Column("status", enum("onboarding", "journey_status"), nullable=False),
        sa.Column("qualification_score", sa.Integer()),
        sa.Column("qualification_reasons", pg.JSONB()),
        sa.Column("recommendations", pg.JSONB()),
        sa.Column("source", pg.JSONB()),
        *timestamps(),
        schema="onboarding",
    )
    op.create_index(
        "ix_onboarding_sessions_status", "onboarding_sessions", ["status"], schema="onboarding"
    )
    op.create_table(
        "onboarding_step_data",
        uuid_pk(),
        sa.Column(
            "session_id",
            pg.UUID(as_uuid=True),
            sa.ForeignKey("onboarding.onboarding_sessions.id"),
            nullable=False,
        ),
        sa.Column("step", enum("onboarding", "onboarding_step"), nullable=False),
        sa.Column("data", pg.JSONB(), nullable=False),
        *timestamps(),
        sa.UniqueConstraint("session_id", "step", name="uq_onboarding_step_data_session_id"),
        schema="onboarding",
    )
    op.create_index(
        "ix_onboarding_step_data_session_id",
        "onboarding_step_data",
        ["session_id"],
        schema="onboarding",
    )
    op.create_table(
        "commercial_requests",
        uuid_pk(),
        sa.Column(
            "tenant_id", pg.UUID(as_uuid=True), sa.ForeignKey("public.tenants.id"), nullable=False
        ),
        sa.Column(
            "session_id",
            pg.UUID(as_uuid=True),
            sa.ForeignKey("onboarding.onboarding_sessions.id"),
            nullable=False,
        ),
        fk_user("requested_by"),
        sa.Column("kind", enum("onboarding", "commercial_kind"), nullable=False),
        sa.Column("status", enum("onboarding", "commercial_status"), nullable=False),
        sa.Column("preferred_contact", sa.String(20), nullable=False),
        sa.Column("message", sa.Text()),
        fk_user("assigned_to", nullable=True),
        sa.Column("contract_evidence", sa.Text()),
        *timestamps(),
        schema="onboarding",
    )
    for col in ("tenant_id", "session_id", "requested_by", "assigned_to", "status"):
        op.create_index(
            f"ix_commercial_requests_{col}", "commercial_requests", [col], schema="onboarding"
        )
    op.create_table(
        "commercial_request_events",
        uuid_pk(),
        sa.Column(
            "request_id",
            pg.UUID(as_uuid=True),
            sa.ForeignKey("onboarding.commercial_requests.id"),
            nullable=False,
        ),
        fk_user("actor_id", nullable=True),
        sa.Column("event_type", sa.String(40), nullable=False),
        sa.Column("from_status", sa.String(30)),
        sa.Column("to_status", sa.String(30)),
        sa.Column("note", sa.Text()),
        sa.Column("visible_to_customer", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        schema="onboarding",
    )
    op.create_index(
        "ix_commercial_request_events_request_id",
        "commercial_request_events",
        ["request_id"],
        schema="onboarding",
    )
    op.create_index(
        "ix_commercial_request_events_actor_id",
        "commercial_request_events",
        ["actor_id"],
        schema="onboarding",
    )

    op.create_table(
        "audit_logs",
        uuid_pk(),
        sa.Column("action", sa.String(60), nullable=False),
        sa.Column("actor_id", pg.UUID(as_uuid=True)),
        sa.Column("tenant_id", pg.UUID(as_uuid=True)),
        sa.Column("entity", sa.String(60)),
        sa.Column("entity_id", pg.UUID(as_uuid=True)),
        sa.Column("metadata", pg.JSONB()),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        schema="audit",
    )
    for col in ("action", "actor_id", "tenant_id", "created_at"):
        op.create_index(f"ix_audit_logs_{col}", "audit_logs", [col], schema="audit")
    # Imutabilidade garantida no banco, independentemente do usuário da aplicação.
    op.execute(
        """
        CREATE OR REPLACE FUNCTION audit.reject_mutation() RETURNS trigger AS $$
        BEGIN
          RAISE EXCEPTION 'audit.audit_logs é imutável';
        END;
        $$ LANGUAGE plpgsql;
        """
    )
    op.execute(
        "CREATE TRIGGER audit_logs_immutable BEFORE UPDATE OR DELETE ON audit.audit_logs "
        "FOR EACH ROW EXECUTE FUNCTION audit.reject_mutation()"
    )


def downgrade() -> None:
    op.execute("DROP TRIGGER IF EXISTS audit_logs_immutable ON audit.audit_logs")
    op.execute("DROP FUNCTION IF EXISTS audit.reject_mutation()")
    op.drop_table("audit_logs", schema="audit")
    op.drop_table("commercial_request_events", schema="onboarding")
    op.drop_table("commercial_requests", schema="onboarding")
    op.drop_table("onboarding_step_data", schema="onboarding")
    op.drop_table("onboarding_sessions", schema="onboarding")
    op.drop_table("tenant_members", schema="public")
    op.drop_table("tenants", schema="public")
    op.drop_table("consents", schema="public")
    op.drop_table("password_reset_tokens", schema="public")
    op.drop_table("auth_sessions", schema="public")
    op.drop_table("platform_users", schema="public")
    for schema, name, _ in reversed(ENUMS):
        pg.ENUM(name=name, schema=schema).drop(op.get_bind(), checkfirst=True)
    op.execute("DROP SCHEMA IF EXISTS audit")
    op.execute("DROP SCHEMA IF EXISTS onboarding")
