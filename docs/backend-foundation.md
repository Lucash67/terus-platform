# Sprint 1 — Backend Foundation

> Baseline de planejamento para a próxima fase do projeto.  
> **Status:** Planejado — **NÃO iniciado**  
> **Pré-requisito concluído:** v0.4.0 — Institutional Layer Complete (`5b50ec1`)

Este documento **não autoriza implementação imediata**. Serve como ponto de partida oficial quando a Sprint 1 for iniciada.

---

## Objetivo

Estabelecer a fundação técnica do backend e da autenticação, preparando o monorepo para as fases de onboarding funcional (Fase 4) sem alterar a baseline institucional congelada em v0.4.0.

---

## Arquitetura prevista

```
apps/web (Next.js 14)
  ├── (marketing)/     ← CONGELADO v0.4.0
  ├── (onboarding)/    ← NOVO: layouts + stepper (Sprint 1)
  └── (admin)/         ← NOVO: layout base + auth guard (Sprint 1)

apps/api (FastAPI async)
  ├── api/v1/          ← routers HTTP
  ├── core/            ← service → use case → repository
  ├── infrastructure/  ← database, cache, vault (stubs Sprint 1)
  └── shared/          ← exceptions, pagination

PostgreSQL 16         ← schema public + onboarding + audit
Redis 7               ← cache, sessões, filas (preparação)
```

**Padrão inviolável:** `Router → Service → Use Case → Repository`

Referência completa: `PROJECT_RULES.md`, `docs/architecture.md`, `CLAUDE.md`.

---

## Escopo

### Dentro do escopo (Sprint 1)

| Entrega | Detalhe |
|---------|---------|
| **Auth base** | JWT RS256 (access 15min) + refresh HttpOnly cookie (7d) |
| **FastAPI estruturado** | Camadas router/service/use_case/repository (health expandido) |
| **PostgreSQL** | Migrations Alembic: schemas `public`, `onboarding`, `audit` base |
| **Route groups frontend** | `(onboarding)` e `(admin)` — layouts apenas, sem lógica de negócio |
| **Design System** | Expandir `@terus/ui` conforme wireframes Fase 2 |
| **Integração mínima** | Frontend consome `GET /health` e endpoints auth via TanStack Query |
| **CI** | Manter pipelines existentes + cobertura API |

### Fora do escopo (Sprint 1)

| Item | Motivo |
|------|--------|
| Onboarding funcional (7 etapas) | Sprint 2+ |
| Vault / credenciais ERP | Sprint 3 |
| Diagnóstico automatizado | Sprint 4 |
| Contratos D4Sign | Sprint 5 |
| Provisionamento multi-tenant | Sprint 6 |
| Alterações na camada institucional v0.4.0 | Baseline congelada |
| Novas rotas marketing | Exige ADR |
| CMS Sanity | Pós-MVP parcial |

---

## Entregáveis

1. `POST /v1/auth/login`, `/refresh`, `/logout` funcionais
2. Schemas Alembic iniciais (`tenants`, `platform_users`, `audit_logs` base)
3. Layouts `(onboarding)/layout.tsx` e `(admin)/layout.tsx` com guards
4. TanStack Query wired em `apps/web/lib/api/`
5. `@terus/schemas` populado com Zod schemas de auth
6. Documentação ADR para decisões Sprint 1 (se aplicável)
7. Testes unitários auth + health integration

---

## Critérios de sucesso

- [ ] Login/logout funcional em ambiente staging
- [ ] Refresh token via HttpOnly cookie (nunca localStorage)
- [ ] JWT RS256 (nunca HS256)
- [ ] Camadas backend respeitam Router → Service → Use Case → Repository
- [ ] Migrations com `upgrade()` e `downgrade()` funcionais
- [ ] CI verde: lint, typecheck, build, python-lint, python-typecheck
- [ ] Site institucional v0.4.0 **inalterado** em produção
- [ ] `pnpm typecheck` e `pnpm build` sem regressão

---

## Dependências

| Dependência | Status |
|-------------|--------|
| v0.4.0 Institutional Layer | ✅ Concluído (`5b50ec1`) |
| Monorepo Turborepo + pnpm | ✅ Ativo |
| FastAPI Sprint 0 (health) | ✅ Ativo |
| PostgreSQL / Redis docker-compose | ⚠️ Validar ambiente local |
| Chaves RSA para JWT | ⏳ Gerar em staging |
| Vercel frontend | ✅ Produção estável |

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Regressão no site institucional | Route group `(marketing)` isolado; CI build obrigatório |
| Escopo creep para onboarding funcional | Escopo Sprint 1 limitado a layouts + auth |
| Inconsistência TS/Python types | Expandir `@terus/types` e `@terus/schemas` em paralelo |
| Auth em localStorage | Code review + regra PROJECT_RULES inviolável |
| Migrations sem downgrade | Checklist Alembic obrigatório |

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Baseline anterior |
| [`docs/project-state.md`](project-state.md) | Estado permanente |
| [`docs/project-roadmap.md`](project-roadmap.md) | Histórico de fases |
| [`docs/current-phase.md`](current-phase.md) | Fase ativa |
| [`docs/architecture.md`](architecture.md) | Arquitetura implementada |
| [`docs/deployment-flow.md`](deployment-flow.md) | Fluxo de deploy |
| [`docs/vercel.md`](vercel.md) | Infra frontend |
| [`PROJECT_RULES.md`](../PROJECT_RULES.md) | Constituição técnica |
| [`CLAUDE.md`](../CLAUDE.md) | Contexto para IAs |
