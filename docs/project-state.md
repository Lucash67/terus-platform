# Terus Platform — Estado do Projeto

> Documento oficial e permanente do estado atual da plataforma.
> **Última atualização:** v0.4.0 — Institutional Layer Complete · commit de referência `5b50ec1`  
> **Status:** Camada institucional finalizada · Produção estável · Próximo: Sprint 1 — Backend Foundation
>
> Leia este arquivo **antes de qualquer alteração** no repositório.
> Fonte complementar de regras invioláveis: `PROJECT_RULES.md` e `CLAUDE.md`.

---

## Visão geral

A **Terus Platform** é uma plataforma SaaS de **Supply Chain Intelligence** que integra horizontalmente varejo, indústria e distribuição em tempo real. O repositório atual opera como **monorepo** com frontend institucional navegável em produção e backend em fundação (Sprint 0).

**Posicionamento oficial:** Supply Chain Intelligence — nunca "integração de dados", "BI" ou "relatórios genéricos".

**URL de produção (frontend):** https://terus-platform-web.vercel.app

**Versão institucional:** v0.4.0 — Institutional Layer Complete

### Documentação relacionada

| Documento | Conteúdo |
|-----------|----------|
| [`docs/current-phase.md`](current-phase.md) | Fase ativa (Institutional Layer — COMPLETED) |
| [`docs/project-roadmap.md`](project-roadmap.md) | Histórico oficial de fases |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Release notes v0.4.0 |
| [`docs/assets/README.md`](assets/README.md) | Arquivos institucionais (screenshots, vídeos, apresentações) |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog Keep a Changelog |

---

## Objetivo do produto

Permitir que clientes varejo com ERP **Winthor** ou **RMS** completem todo o fluxo de onboarding — do cadastro ao ambiente ativo — **sem intervenção manual** da equipe técnica Terus.

**Estado atual:** camada institucional **concluída e congelada** (v0.4.0). Site enterprise em produção. Onboarding funcional, backend de produto, autenticação e integrações reais são o escopo da **Sprint 1+**.

---

## Público-alvo

| Persona | Necessidade |
|---------|-------------|
| **Diretor / CEO** | ROI, resultados operacionais, credibilidade da plataforma |
| **Gerente de TI / Arquiteto** | Integrações, ERPs, requisitos técnicos |
| **Analista de Integração** | Jornada de conexão, diagnóstico, configuração |
| **Cliente em onboarding** | Assistente guiado (futuro) |
| **Admin Terus** | Painel interno (futuro) |
| **Investidor / executivo (Rodrigo)** | Apresentação visual da plataforma, cases, Rede Terus |

---

## Proposta de valor

1. **Inteligência operacional em tempo real** — sinais da operação transformados em ações automáticas.
2. **Automação de reposição** — pedidos baseados em demanda real, não em julgamento manual inconsistente.
3. **Execução rastreada** — da detecção de ruptura à ação em loja, com auditoria completa.
4. **Onboarding autônomo** — ativação sem dependência da equipe técnica Terus (roadmap MVP).
5. **Rede Terus** — ecossistema de varejos e distribuidores integrados com resultados validados.

---

## Stack tecnológica atual

### Frontend (ativo em produção)

| Tecnologia | Versão / nota |
|------------|---------------|
| Next.js | 14.x · App Router |
| TypeScript | 5.x · strict |
| Tailwind CSS | 3.x |
| shadcn/ui + Radix | via `@terus/ui` |
| pnpm | 8.x |
| Turborepo | 1.x |

### Backend (fundação — não em produção)

| Tecnologia | Versão / nota |
|------------|---------------|
| FastAPI | 0.110+ · async |
| Python | 3.12+ |
| SQLAlchemy 2 | async (planejado) |
| Poetry | gerenciador de deps |
| Ruff + mypy | lint e typecheck |

### Infraestrutura

| Serviço | Uso atual |
|---------|-----------|
| **Vercel** | Deploy do frontend (`apps/web`) |
| **GitHub** | Repositório + CI |
| **GitHub Actions** | lint, typecheck, build, python-lint, python-typecheck |
| PostgreSQL / Redis / Vault | planejados · docker-compose local |

---

## Arquitetura do monorepo

```
terus-platform/
├── apps/
│   ├── web/          ← Next.js 14 (PRODUÇÃO)
│   └── api/          ← FastAPI (fundação Sprint 0)
├── packages/
│   ├── ui/           ← Design system
│   ├── types/        ← TypeScript types compartilhados
│   ├── schemas/      ← Zod schemas (estrutura base)
│   └── config/       ← ESLint, TS, Tailwind, PostCSS
├── docs/             ← Documentação (este diretório)
├── infra/docker/     ← PostgreSQL + Redis local
├── .github/workflows/← CI
├── CLAUDE.md         ← Contexto para IAs
└── PROJECT_RULES.md  ← Constituição técnica
```

---

## Estrutura de diretórios — `apps/web`

```
apps/web/
├── app/
│   ├── layout.tsx              ← Root layout (fontes, metadata)
│   ├── globals.css             ← Design tokens CSS
│   └── (marketing)/            ← Route group institucional
│       ├── layout.tsx          ← Navbar + Footer
│       ├── page.tsx            ← Home
│       ├── plataforma/
│       ├── modulos/ + [slug]/
│       ├── ecossistema/
│       ├── cases/
│       ├── conteudos/
│       ├── sobre/
│       └── solicitar-demo/
├── components/
│   ├── layout/                 ← navbar, footer, container, terus-logo
│   └── sections/               ← seções compostas da Home e páginas
├── lib/constants/
│   ├── site-data.ts            ← DADOS CENTRALIZADOS (fonte de verdade visual)
│   ├── site.ts                 ← copy institucional estática
│   ├── modules.ts              ← definição dos 6 módulos
│   └── navigation.ts           ← links de nav e footer
└── public/logos/               ← assets de logo
    ├── terus/
    ├── clientes/               ← 12 varejos
    └── distribuidores/         ← 8 distribuidores
```

---

## Packages existentes

| Package | Nome npm | Função |
|---------|----------|--------|
| `packages/ui` | `@terus/ui` | Button, Card, Badge, `cn()` |
| `packages/types` | `@terus/types` | RedeCompany, CaseStudy, tipos de domínio |
| `packages/schemas` | `@terus/schemas` | Zod schemas (base, pouco populado) |
| `packages/config` | `@terus/config` | Tailwind, ESLint, TS configs compartilhados |

---

## Aplicações existentes

| App | Status | Descrição |
|-----|--------|-----------|
| `apps/web` | **Produção** | Site institucional navegável, 19 rotas estáticas (v0.4.0) |
| `apps/api` | **Fundação** | FastAPI com `GET /health` e root endpoint apenas |

---

## Páginas existentes

| Rota | Página | Renderização |
|------|--------|--------------|
| `/` | Home (16 seções) | Static |
| `/plataforma` | Arquitetura e pilares | Static |
| `/modulos` | Grid dos 6 módulos | Static |
| `/modulos/alert` | Terus Alert | SSG |
| `/modulos/strategy` | Terus Strategy | SSG |
| `/modulos/order` | Terus Order | SSG |
| `/modulos/task` | Terus Task | SSG |
| `/modulos/log` | Terus Log | SSG |
| `/modulos/pulse` | Terus Pulse | SSG |
| `/ecossistema` | Ecossistema e integrações | Static |
| `/cases` | Cases de sucesso | Static |
| `/conteudos` | Conteúdos institucionais | Static |
| `/sobre` | Página institucional | Static |
| `/solicitar-demo` | CTA comercial (WhatsApp) | Static |

---

## Componentes mais importantes

### Layout

| Componente | Arquivo | Função |
|------------|---------|--------|
| `Navbar` | `components/layout/navbar.tsx` | Nav sticky, mobile menu, CTA demo |
| `Footer` | `components/layout/footer.tsx` | Links plataforma, módulos, comercial |
| `TerusLogo` | `components/layout/terus-logo.tsx` | Logo oficial via `BRAND.logos.primary` |
| `Container` | `components/layout/container.tsx` | Wrapper responsivo max-w-7xl |

### Seções da Home (ordem de renderização)

1. `HeroSection`
2. `RealResultsSection`
3. `StatsSection`
4. `PositioningSection`
5. `ModulesSection`
6. `EcosystemSection`
7. `IntegrationsEcosystemSection`
8. `OperationalResultsSection`
9. `PlatformIndicatorsSection`
10. `CompaniesSection`
11. `SecurityGovernanceSection`
12. `RedeTerusSection`
13. `InstitutionalVideosSection`
14. `EducationalVideosSection`
15. `SocialProofSection`
16. `ReliabilitySection`
17. `CtaSection`

### Seções reutilizáveis

- `PageHero` — hero interno de páginas secundárias
- `ModuleCard` — card de módulo com link
- `CasesResultsSection`, `EducationalContentSection`, etc.

---

## Módulos existentes

Nomenclatura oficial e definitiva:

| Módulo | Slug | Métrica destacada |
|--------|------|-------------------|
| Terus Alert | `/modulos/alert` | < 5min detecção |
| Terus Strategy | `/modulos/strategy` | 360° visão |
| Terus Order | `/modulos/order` | 40% redução ruptura |
| Terus Task | `/modulos/task` | 3x execução |
| Terus Log | `/modulos/log` | 100% rastreabilidade |
| Terus Pulse | `/modulos/pulse` | 1 ponto de controle |

Definição completa em `apps/web/lib/constants/modules.ts`.

---

## Integrações atuais

| Integração | Status |
|------------|--------|
| GitHub → Vercel | **Ativa** · deploy automático em `main` |
| GitHub Actions CI | **Ativa** · lint, typecheck, build |
| WhatsApp (CTA demo) | **Ativa** · link em `/solicitar-demo` |
| Backend API | **Não integrado** ao frontend |
| CMS (Sanity) | **Não integrado** |
| ERPs (Winthor/RMS) | **Referenciados** · sem conexão real |
| Autenticação | **Não implementada** |
| TanStack Query | **Dependência instalada** · não wired |

---

## Identidade visual adotada (Fase 3A)

Tema **enterprise claro** (evoluído na Fase 3A):

| Token | Valor atual |
|-------|-------------|
| `--surface-base` | `#FFFFFF` |
| `--brand-primary` | `#2F63F5` |
| `--brand-dark` | `#1E3A8A` |
| `--text-primary` | `#111827` |

**Fontes:** DM Sans (display), IBM Plex Sans (corpo), IBM Plex Mono (código) — via `next/font`.

**Logo oficial:** `/logos/terus/terus.jpg` — consumido por `TerusLogo`.

> **Nota:** `PROJECT_RULES.md` descreve tokens dark originais (`#050A14`). A identidade **em produção** segue `apps/web/app/globals.css`. Alterações de tokens exigem aprovação explícita.

---

## Padrões de UI

- **Composição:** páginas (`page.tsx`) apenas compõem seções — sem lógica de negócio.
- **Dados:** seções consomem constantes de `lib/constants/` — nunca hardcoded em componente.
- **Componentes base:** sempre via `@terus/ui` (Button, Card, Badge).
- **Links internos:** `<Link>` do Next.js.
- **Imagens de logo:** `next/image` nas seções de Rede Terus; `TerusLogo` usa `<img>` (exceção atual).
- **Responsividade:** mobile-first, grid Tailwind, menu hamburger na Navbar.
- **CTAs comerciais:** "Agendar demonstração" → `/solicitar-demo` → WhatsApp.

---

## Sistema de design

- **Package:** `@terus/ui` (Button, Card, Badge, `cn`)
- **Tokens:** CSS variables em `globals.css` + Tailwind em `@terus/config`
- **Utilitários custom:** `.text-gradient`, `.cta-gradient`
- **Sombras:** `--shadow-card`, `--shadow-elevated`, `--shadow-floating`

---

## Decisões arquitetônicas importantes

| Decisão | Detalhe |
|---------|---------|
| Monorepo Turborepo + pnpm | ADR-001 |
| Next.js 14 App Router | ADR-002 |
| FastAPI backend | ADR-003 |
| Schema-per-tenant PostgreSQL | ADR-004 (planejado) |
| Dados visuais centralizados | `site-data.ts` como fonte única |
| Route group `(marketing)` | Layout compartilhado Navbar + Footer |
| Deploy Vercel separado | Projeto `terus-platform-web`, root `apps/web` |
| `package-mode = false` no Poetry | API é app, não pacote publicável |

---

## Convenções adotadas

- **Arquivos React:** kebab-case (`hero-section.tsx`)
- **Componentes:** PascalCase (`HeroSection`)
- **Commits:** Conventional Commits em português
- **Branches:** `main` (produção), `feat/*`, `fix/*`, `chore/*`
- **Gerenciador:** pnpm exclusivamente
- **Constantes de texto:** `lib/constants/site.ts` e `site-data.ts`

---

## Regras de negócio importantes

1. Posicionamento sempre **Supply Chain Intelligence**.
2. Módulos usam nomenclatura oficial: Alert, Strategy, Order, Task, Log, Pulse.
3. Resultados operacionais exibidos são **dados reais validados** (digitalização 96%, ticket médio, 31.881 pedidos, etc.).
4. Logos de clientes respeitam `permissionLevel` (`logo`, `case`, `public`).
5. Rede Terus: 12 varejos + 8 distribuidores com logos em `public/logos/`.
6. Demo comercial via WhatsApp até formulário interno estar pronto.
7. Botão "Acessar plataforma" permanece **desabilitado** (auth não implementada).

---

## Limitações atuais

| Limitação | Impacto |
|-----------|---------|
| Sem backend integrado | Nenhum dado dinâmico |
| Sem autenticação | Login desabilitado |
| Vídeos e depoimentos | Ocultos até conteúdo autorizado (arrays vazios) |
| CMS não conectado | Conteúdo editável apenas via código |
| API com health only | Sprint 0 backend |
| Onboarding / diagnóstico | Não implementados |
| `packages/schemas` | Pouco populado |
| ESLint Next.js plugin | Warning no build (não bloqueante) |

---

## Roadmap técnico conhecido

| Fase | Escopo |
|------|--------|
| **Sprint 0** | ✅ Fundação, CI, health endpoint |
| **Fase 3A** | ✅ Site visual enterprise, logos, Rede Terus, cases |
| **Fase 3B** | ✅ Hero, SEO, conversão, auditoria executiva |
| **Fase 3C** | ✅ Executive polish, CTA/footer premium, Lighthouse ≥ 90 |
| **v0.4.0** | ✅ **Institutional Layer Complete** — baseline permanente |
| **Sprint 1** | ⏳ Backend Foundation — ver [`docs/backend-foundation.md`](backend-foundation.md) |
| **Sprint 2–6** | Onboarding, Vault, diagnóstico, contratos, MVP Go Live |

Histórico completo: [`docs/project-roadmap.md`](project-roadmap.md)  
Detalhamento MVP: `PROJECT_RULES.md` §17.3

---

## Itens que NÃO podem ser alterados sem aprovação explícita

- `PROJECT_RULES.md` e `CLAUDE.md`
- ADRs em `docs/decisions/`
- Nomenclatura dos 6 módulos Terus
- Posicionamento "Supply Chain Intelligence"
- Estrutura do monorepo (apps/, packages/)
- Route group `(marketing)` e rotas publicadas
- Projeto Vercel `terus-platform-web` e branch `main` de produção
- Dados operacionais reais em `site-data.ts` (métricas validadas)
- Logos oficiais em `public/logos/`
- Design tokens em `globals.css` (identidade Fase 3A)
- Configuração `package-mode = false` no Poetry
- Fluxo GitHub → Vercel de deploy automático

---

# Protected Architecture

Elementos protegidos que **não devem ser reestruturados** sem aprovação do Tech Lead.

## Estrutura do monorepo

```
apps/web          → frontend (único app em produção)
apps/api          → backend (fundação)
packages/ui       → design system
packages/types    → tipos compartilhados
packages/schemas  → validação Zod
packages/config   → configs compartilhadas
```

Não mover frontend para fora de `apps/web`. Não criar segundo app web.

## Organização das rotas

```
app/(marketing)/          ← grupo institucional (Navbar + Footer)
  page.tsx                ← /
  plataforma/page.tsx
  modulos/page.tsx
  modulos/[slug]/page.tsx ← SSG para 6 slugs
  ecossistema/page.tsx
  cases/page.tsx
  conteudos/page.tsx
  sobre/page.tsx
  solicitar-demo/page.tsx
```

Não usar Pages Router. Não criar rotas fora do sitemap aprovado sem ADR.

## Design tokens

Definidos em `apps/web/app/globals.css` (`:root`). Consumidos via classes Tailwind (`bg-surface-base`, `text-brand-primary`, etc.).

Não hardcodar hex em componentes. Não substituir tokens sem PR de design system.

## Estrutura dos módulos

Definição canônica: `apps/web/lib/constants/modules.ts`

6 slugs fixos: `alert`, `strategy`, `order`, `task`, `log`, `pulse`.

Páginas dinâmicas via `generateStaticParams()` em `modulos/[slug]/page.tsx`.

## Sistema de logos

```
public/logos/terus/terus.jpg          ← logo Terus (BRAND.logos.primary)
public/logos/clientes/*.png|webp      ← 12 varejos
public/logos/distribuidores/*.png     ← 8 distribuidores
```

Metadados de empresas: `RedeCompany` em `@terus/types`, instanciados em `site-data.ts`.

Campos obrigatórios: `name`, `slug`, `category`, `logos.primary`, `permissionLevel`.

Componente de exibição: `RedeTerusSection`, `CompaniesSection`, `TerusLogo`.

## Integração GitHub → Vercel

| Item | Valor protegido |
|------|-----------------|
| Repositório | `Lucash67/terus-platform` |
| Projeto Vercel | `terus-platform-web` |
| Team | `lucash67s-projects` |
| Branch produção | `main` |
| Root directory | `apps/web` |
| URL produção | https://terus-platform-web.vercel.app |

Deploy automático a cada push em `main`. Não recriar projeto. Não alterar root directory sem validar build.

## Sistema de dados centralizados — `site-data.ts`

**Fonte única de verdade** para conteúdo dinâmico do site.

Exports protegidos:

| Export | Consumido por |
|--------|---------------|
| `RESULTADOS_OPERACIONAIS` | OperationalResultsSection |
| `INDICADORES_PLATAFORMA` | PlatformIndicatorsSection |
| `EMPRESAS_CLIENTES` | CompaniesSection |
| `DEPOIMENTOS` | SocialProofSection |
| `CASES_DE_SUCESSO` | SocialProofSection |
| `INTEGRACOES` | IntegrationsEcosystemSection |
| `CERTIFICACOES` | SecurityGovernanceSection, ReliabilitySection |
| `VAREJOS` / `DISTRIBUIDORES` | RedeTerusSection |
| `REDE_TERUS` | RedeTerusSection |
| `VIDEOS_INSTITUCIONAIS` | InstitutionalVideosSection |
| `VIDEOS_EDUCACIONAIS` | EducationalVideosSection |
| `CONTEUDOS_*` | Páginas de conteúdo |
| `CONTEUDOS_CASES` | CasesPage, CasesResultsSection |

**Regra:** componentes de seção importam de `site-data.ts`. Não duplicar dados em componentes.

Copy estática institucional permanece em `site.ts`, `modules.ts` e `copy.ts`.

---

## Version Archives

Registro permanente de cada grande versão da Terus Platform.  
Convenções: [`docs/assets/README.md`](assets/README.md)

### v0.4.0 — Institutional Layer Complete

| Artefato | Localização | Status |
|----------|-------------|--------|
| **Documentação técnica** | [`docs/project-state.md`](project-state.md), [`docs/architecture.md`](architecture.md) | ✅ Completo |
| **Release notes** | [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | ✅ Completo |
| **Release checklist** | [`docs/releases/release-checklist-v0.4.0.md`](releases/release-checklist-v0.4.0.md) | ✅ Completo |
| **Screenshots oficiais** | [`docs/assets/screenshots/v0.4.0/`](assets/screenshots/v0.4.0/) · [`INDEX.md`](assets/screenshots/v0.4.0/INDEX.md) · 51 capturas | ✅ Concluído |
| **Vídeos oficiais** | [`docs/assets/videos/v0.4.0/`](assets/videos/v0.4.0/) · [`INDEX.md`](assets/videos/v0.4.0/INDEX.md) · 1 tour | ✅ Concluído |
| **Apresentações** | [`docs/assets/presentations/v0.4.0/`](assets/presentations/v0.4.0/) | ⏳ Infraestrutura pronta — materiais pendentes |
| **Changelog** | [`CHANGELOG.md`](../CHANGELOG.md) · seção `[0.4.0]` | ✅ Completo |
| **Commit baseline (código)** | `5b50ec1` | ✅ Em produção |
| **Commit baseline (docs)** | `c1748bf` | ✅ Em `main` |
| **Tag Git** | `v0.4.0` | ✅ Publicada em `origin` |
| **Release GitHub** | [GitHub Releases · v0.4.0](https://github.com/Lucash67/terus-platform/releases/tag/v0.4.0) | ✅ Publicada · 1 jul 2026 |

Estes itens compõem a **baseline permanente** da camada institucional congelada.

**v0.4.0 encerrada:** baseline visual (51 screenshots + 1 vídeo) e GitHub Release oficialmente completos em 1 de julho de 2026. Apresentações permanecem opcionais.

---

## Referências cruzadas

| Documento | Conteúdo |
|-----------|----------|
| [`docs/current-phase.md`](current-phase.md) | Fase ativa |
| [`docs/project-roadmap.md`](project-roadmap.md) | Histórico de fases |
| [`docs/architecture.md`](architecture.md) | Arquitetura técnica |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/deployment-flow.md`](deployment-flow.md) | Fluxo de deploy |
| [`docs/vercel.md`](vercel.md) | Infra Vercel |
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Release v0.4.0 |
| [`docs/assets/README.md`](assets/README.md) | Arquivos institucionais |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog |
| [`PROJECT_RULES.md`](../PROJECT_RULES.md) | Regras invioláveis |
| [`CLAUDE.md`](../CLAUDE.md) | Contexto para IAs |
