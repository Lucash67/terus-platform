# Terus Platform — Arquitetura Técnica

> Documentação da arquitetura **implementada** no repositório.
> Complementa `PROJECT_RULES.md` (visão alvo) com o estado real do código.
>
> **Referência de commit:** `5b50ec1` · v0.4.0 — Institutional Layer Complete

---

## Visão geral

Monorepo **Turborepo + pnpm workspaces** com separação clara entre aplicações (`apps/`) e bibliotecas compartilhadas (`packages/`). O frontend Next.js consome packages internos via workspace protocol (`workspace:*`).

---

## Diagrama de dependências

```
apps/web
  ↓
  ├── @terus/ui        (componentes visuais)
  ├── @terus/types     (tipos TypeScript)
  ├── @terus/schemas   (Zod — base)
  └── @terus/config    (Tailwind, ESLint, TS — dev)

packages/ui
  ↓
  └── @terus/config    (Tailwind tokens — dev)

packages/types         (sem dependências internas)
packages/schemas       (sem dependências internas)

apps/api               (independente do frontend — Python/Poetry)
```

### Diagrama textual completo

```
┌─────────────────────────────────────────────────────────┐
│                     apps/web (Next.js 14)               │
│  app/(marketing)/* · components/* · lib/constants/*     │
└────────────┬──────────────┬──────────────┬──────────────┘
             │              │              │
             ▼              ▼              ▼
     ┌───────────┐  ┌────────────┐  ┌─────────────┐
     │ @terus/ui │  │@terus/types│  │@terus/schemas│
     │ Button    │  │ RedeCompany│  │ (base)      │
     │ Card      │  │ CaseStudy  │  └─────────────┘
     │ Badge     │  └────────────┘
     └─────┬─────┘
           ▼
     ┌─────────────┐
     │@terus/config│
     │ tailwind    │
     │ eslint      │
     └─────────────┘

┌─────────────────────────────────────────────────────────┐
│              apps/api (FastAPI — fundação)              │
│  app/main.py · app/api/health.py                        │
└─────────────────────────────────────────────────────────┘
        (sem dependência de packages TS)
```

---

## Apps existentes

### `apps/web` — Frontend (produção)

| Aspecto | Detalhe |
|---------|---------|
| Framework | Next.js 14 App Router |
| Entry | `app/layout.tsx` + `app/(marketing)/layout.tsx` |
| Build output | `.next/` · 19 páginas estáticas/SSG |
| Deploy | Vercel · root `apps/web` |
| Bundle Home | ~101 kB First Load JS |

**Transpile packages:** `@terus/ui`, `@terus/types`, `@terus/schemas` (via `next.config.js`).

### `apps/api` — Backend (fundação)

| Aspecto | Detalhe |
|---------|---------|
| Framework | FastAPI async |
| Endpoints | `GET /`, `GET /health` |
| Deps | Poetry · `package-mode = false` |
| CI | Ruff lint + mypy strict |
| Status | Sprint 0 — sem domínio de negócio |

---

## Packages existentes

### `@terus/ui`

```
packages/ui/src/
├── index.ts
├── lib/utils.ts          ← cn() via clsx + tailwind-merge
└── components/
    ├── button.tsx        ← CVA variants
    ├── card.tsx
    └── badge.tsx
```

**Regra:** componentes puramente presentacionais. Sem fetch, sem Zustand, sem tipos de domínio específicos.

### `@terus/types`

Tipos compartilhados frontend/backend (contrato futuro):

- `RedeCompany`, `CompanyLogos`, `CaseStudy`
- `Tenant`, `OnboardingSession`, `DiagnosticJob`
- `ApiResponse`, `ApiError`

### `@terus/schemas`

Estrutura Zod base. Pouco populado — expansão prevista no Sprint 2+.

### `@terus/config`

Configs compartilhadas:

- `tailwind.config.js` — cores, fontes, spacing, animações
- `eslint-base.js`, `eslint-next.js`
- `tsconfig.json`
- `postcss.config.js`

`apps/web/tailwind.config.js` re-exporta `@terus/config`.

---

## Fluxo de renderização

### Estratégia por rota (implementado)

| Rota | Estratégia Next.js |
|------|-------------------|
| `/`, `/plataforma`, `/cases`, etc. | Static (SSG no build) |
| `/modulos/[slug]` | SSG via `generateStaticParams()` |

### Camadas de renderização

```
1. app/layout.tsx
   └── Fontes (DM Sans, IBM Plex Sans, IBM Plex Mono)
   └── globals.css (tokens)
   └── metadata global

2. app/(marketing)/layout.tsx
   └── Navbar (client — menu mobile)
   └── {children}
   └── Footer (server)

3. app/(marketing)/*/page.tsx
   └── Composição de Section components (server por padrão)
```

**Client components:** apenas `Navbar` (`"use client"` — estado mobile menu).

### Fluxo de uma request em produção (Vercel)

```
Browser → Vercel Edge → Static HTML/JS (pre-rendered)
                      → Sem SSR dinâmico
                      → Sem API routes ativas
```

---

## Fluxo de dados

### Estado atual (v0.4.0 — Institutional Layer Complete)

```
site-data.ts / site.ts / modules.ts / copy.ts / navigation.ts / conversion.ts
        ↓ (import estático)
Section Components
        ↓ (composição)
page.tsx
        ↓
HTML estático (build time)
```

**Não há:**
- Fetch de API em runtime
- TanStack Query wired
- Zustand stores
- CMS headless
- Estado global

### Fluxo de dados alvo (MVP — referência PROJECT_RULES)

```
FastAPI /v1/*
        ↓
apps/web/lib/api/* (futuro)
        ↓
TanStack Query (futuro)
        ↓
Section / Onboarding components
```

---

## Organização das constantes

| Arquivo | Responsabilidade | Mutabilidade |
|---------|------------------|--------------|
| `lib/constants/site-data.ts` | Dados operacionais, empresas, cases, vídeos | Alta (conteúdo) |
| `lib/constants/site.ts` | Copy institucional, pilares, valores | Média |
| `lib/constants/copy.ts` | Copy Fase 3C (CTA, footer, about) | Média |
| `lib/constants/conversion.ts` | CTAs, WhatsApp, demo page | Baixa |
| `lib/constants/modules.ts` | Definição dos 6 módulos Terus | Baixa |
| `lib/constants/navigation.ts` | Links Navbar e Footer | Baixa |

**Princípio:** dados que alimentam múltiplas seções vivem em `site-data.ts`. Copy reutilizável em `site.ts`.

---

## Organização dos componentes

```
components/
├── layout/           ← infraestrutura visual (nav, footer, logo)
│   ├── navbar.tsx       [client]
│   ├── footer.tsx       [server]
│   ├── container.tsx    [server]
│   └── terus-logo.tsx   [server]
│
└── sections/         ← blocos de página (podem importar site-data)
    ├── hero-section.tsx
    ├── real-results-section.tsx
    ├── rede-terus-section.tsx
    ├── module-card.tsx
    └── ... (27 arquivos)
```

### Regras de camada (frontend)

| Camada | Pode importar | Não pode |
|--------|---------------|----------|
| `packages/ui` | `@terus/ui` utils | site-data, fetch, Zustand |
| `components/sections` | site-data, @terus/ui, next/image | lógica de negócio complexa |
| `app/**/page.tsx` | sections | lógica, fetch, estado |

---

## Padrões adotados no frontend

1. **Server Components por padrão** — `"use client"` só quando necessário.
2. **Composição sobre lógica** — pages são listas de sections.
3. **Dados centralizados** — single source of truth em constants.
4. **Tipagem estrita** — `RedeCompany`, `CaseStudy` de `@terus/types`.
5. **Design system** — primitivos exclusivamente de `@terus/ui`.
6. **Path aliases** — `@/components/*`, `@/lib/*` via tsconfig.
7. **Static generation** — site inteiro pre-renderizado no build.

---

## Convenções de nomenclatura

| Contexto | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos React | kebab-case | `hero-section.tsx` |
| Componentes | PascalCase | `HeroSection` |
| Constantes export | SCREAMING_SNAKE | `REDE_TERUS` |
| Rotas URL | kebab-case | `/solicitar-demo` |
| Slugs de módulo | lowercase | `alert`, `strategy` |
| Logos path | `/logos/{tipo}/{slug}.{ext}` | `/logos/clientes/cometa.png` |
| Packages npm | `@terus/*` | `@terus/ui` |

---

## Backend — arquitetura alvo (referência)

Camadas planejadas (não implementadas além de health):

```
Router → Service → Use Case → Repository
```

Estrutura futura em `apps/api/app/`:

```
api/v1/          ← endpoints HTTP
core/            ← domínio
infrastructure/  ← db, cache, vault
workers/         ← Celery
shared/          ← exceptions, audit
```

---

## CI/CD — arquitetura de pipelines

### GitHub Actions (`.github/workflows/ci.yml`)

| Job | Escopo |
|-----|--------|
| Lint | pnpm lint (ui + web) |
| Type Check | pnpm typecheck (all packages) |
| Build | pnpm build (web) |
| Python Lint | ruff em apps/api |
| Python Type Check | mypy em apps/api |

### Vercel (produção frontend)

Deploy automático independente do CI — triggered por push em `main`.

---

## Estratégia de escalabilidade futura

### Frontend

| Evolução | Estratégia |
|----------|------------|
| Novas páginas marketing | Adicionar em `(marketing)/` |
| Onboarding (Sprint 2+) | Novo route group `(onboarding)/` |
| Admin (Sprint 5+) | Route group `(admin)/` com auth guard |
| Data fetching | TanStack Query + `lib/api/` |
| CMS | Sanity headless (pós-MVP parcial) |
| i18n | Constantes em `site.ts` preparadas para extração |

### Backend

| Evolução | Estratégia |
|----------|------------|
| Novos domínios | `core/{modulo}/` com use cases isolados |
| Multi-tenant | schema-per-tenant PostgreSQL |
| Workers | Celery + Redis filas nomeadas |
| Credenciais | Vault exclusivo |

### Monorepo

| Evolução | Estratégia |
|----------|------------|
| Novos packages | `packages/{nome}/` com workspace |
| Shared validation | Expandir `@terus/schemas` |
| Deploy API | Separado da Vercel (K8s planejado) |

---

## Referências cruzadas

| Documento | Conteúdo |
|-----------|----------|
| [`docs/project-state.md`](project-state.md) | Estado completo do produto |
| [`docs/current-phase.md`](current-phase.md) | Fase ativa (Institutional Layer — COMPLETED) |
| [`docs/project-roadmap.md`](project-roadmap.md) | Histórico oficial de fases |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/vercel.md`](vercel.md) | Deploy e produção |
| [`docs/deployment-flow.md`](deployment-flow.md) | Fluxo de entrega |
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Release v0.4.0 |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog oficial |
| [`PROJECT_RULES.md`](../PROJECT_RULES.md) | Regras invioláveis |
| [`CLAUDE.md`](../CLAUDE.md) | Contexto resumido para IAs |
