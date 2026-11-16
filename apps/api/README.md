# Terus API

Backend da Terus Platform — FastAPI async, SQLAlchemy 2, Alembic, PostgreSQL 16.

Hoje cobre o Self Onboarding 2.0 (ADR-010): autenticação (JWT RS256 + refresh em cookies
HttpOnly), organizações, jornada de aquisição, solicitações comerciais, painel da equipe Terus
e auditoria imutável.

Execução, variáveis e testes: `docs/reconstruction/DEPLOYMENT.md`.
