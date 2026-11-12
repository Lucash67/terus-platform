# Decisões de arquitetura

Resumo; detalhes em `docs/decisions/ADR-010-self-onboarding-aquisicao.md` e `ADR-011-e2e-playwright.md`.

- **Mesma stack, sem servidor duplicado:** Next.js 14 (App Router) + FastAPI async + PostgreSQL 16 + Alembic.
- **Camadas do backend:** Router → Service → Use Case → Repository; SQLAlchemy só em `models.py`,
  `repository.py` e na infraestrutura de banco.
- **Fonte de verdade:** o progresso da jornada fica em `onboarding.onboarding_sessions` /
  `onboarding_step_data`. O front não guarda estado de negócio no navegador (só UTM em
  `sessionStorage` até o cadastro).
- **Isolamento:** toda rota de cliente valida pertencimento (`tenant_members`); não-membro recebe
  404 (evita enumeração). Admin exige papel `terus_sales`/`terus_admin`.
- **Sessão:** JWT RS256 (15 min) + refresh opaco rotativo (7 d), cookies HttpOnly, sessão revogável.
- **Auditoria imutável:** trigger no banco rejeita UPDATE/DELETE em `audit.audit_logs`.
- **Integrações externas:** adaptadores com estado `not_configured` (e-mail, CRM, assinatura, Agent).
- **Feature flag:** `NEXT_PUBLIC_ONBOARDING_ENABLED` mantém as áreas autenticadas fora da produção.
- **Proxy same-origin:** `next.config.js` reescreve `/api/v1/*` para `API_INTERNAL_URL` quando definida.
- **Motion:** CSS/SVG + `IntersectionObserver` existente; sem Framer Motion/Three.js (sem ganho que
  justifique o peso); tudo respeita `prefers-reduced-motion`.
