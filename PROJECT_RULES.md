# PROJECT_RULES.md
# Constituição Técnica da Plataforma Terus Tecnologia

> **Este documento é a fonte única de verdade para todo desenvolvimento da plataforma Terus.**
> Toda IA (Windsurf, Claude Code, Cursor ou equivalente), todo desenvolvedor e todo revisor
> deve obedecer este documento integralmente. Nenhuma decisão arquitetural, de design,
> de segurança ou de processo pode ser tomada em contradição com o que está aqui definido
> sem a criação explícita de um ADR (Architecture Decision Record) que substitua a regra anterior.
>
> **Versão:** 1.0.0
> **Baseado em:** Fases 1, 2, 3 e 3.5 do projeto estratégico Terus
> **Status:** Vigente — não alterar sem ADR aprovado

---

## ÍNDICE

1. [Visão do Produto](#1-visão-do-produto)
2. [Objetivos do MVP](#2-objetivos-do-mvp)
3. [Stack Oficial](#3-stack-oficial)
4. [Arquitetura Oficial](#4-arquitetura-oficial)
5. [Estrutura de Pastas](#5-estrutura-de-pastas)
6. [Convenções de Código](#6-convenções-de-código)
7. [Regras de Frontend](#7-regras-de-frontend)
8. [Regras de Backend](#8-regras-de-backend)
9. [Regras de Banco de Dados](#9-regras-de-banco-de-dados)
10. [Regras de Segurança](#10-regras-de-segurança)
11. [Regras de Multi-tenancy](#11-regras-de-multi-tenancy)
12. [Regras de Auditoria](#12-regras-de-auditoria)
13. [Regras de UX](#13-regras-de-ux)
14. [Regras de Design System](#14-regras-de-design-system)
15. [O Que Nunca Deve Ser Feito](#15-o-que-nunca-deve-ser-feito)
16. [ADRs Obrigatórias](#16-adrs-obrigatórias)
17. [Processo de Desenvolvimento](#17-processo-de-desenvolvimento)
18. [Guia de Uso para IAs](#18-guia-de-uso-para-ias)

---

## 1. VISÃO DO PRODUTO

### 1.1 O que é a Terus

A Terus Tecnologia é uma **plataforma SaaS de Supply Chain Intelligence** que integra
horizontalmente varejo, indústria e distribuição em tempo real. Não é um site institucional,
não é um sistema de relatórios e não é uma ferramenta de BI genérica.

A Terus resolve três problemas de missão crítica no varejo:

- **Ruptura de gôndola:** produtos em falta que representam perda direta de receita
- **Excesso de estoque:** capital imobilizado que degrada o fluxo de caixa
- **Execução manual:** processos de reposição e pedidos que dependem de julgamento humano
  inconsistente

### 1.2 Posicionamento Oficial

> A Terus não é apresentada como "empresa de integração de dados".
> O posicionamento oficial é: **plataforma de Supply Chain Intelligence com automação
> operacional em tempo real.**

Toda copy, headline, descrição de produto e conteúdo de interface deve refletir este
posicionamento. Palavras banidas em textos principais: "integração de dados", "BI",
"relatórios", "dashboard genérico".

### 1.3 O Produto como Plataforma

O novo site Terus funciona simultaneamente como:

- Site institucional (camada comercial)
- Central técnica (camada de documentação)
- Portal de Self-Onboarding (camada operacional)
- Hub de ativação de clientes (camada de produto)

Estas quatro camadas coexistem no mesmo domínio com layouts distintos por grupo de rotas.

### 1.4 Módulos Oficiais do Produto

Os seis módulos abaixo são a nomenclatura oficial e definitiva. Nenhum outro nome deve
ser usado em código, URLs, conteúdo ou documentação.

| Módulo | Slug de URL | Função Principal |
|--------|-------------|-----------------|
| Terus Alert | `/modulos/alert` | Alertas críticos operacionais em tempo real |
| Terus Strategy | `/modulos/strategy` | Painéis estratégicos e gerenciais |
| Terus Order | `/modulos/order` | Reposição e pedidos automatizados |
| Terus Task | `/modulos/task` | App mobile de execução para encarregados |
| Terus Log | `/modulos/log` | Evidências e monitoramento de execução |
| Terus Pulse | `/modulos/pulse` | Hub central do cliente |

Agent e IaProc são componentes de infraestrutura interna, não módulos de produto.
Não devem aparecer no site público como produtos.

---

## 2. OBJETIVOS DO MVP

### 2.1 Critério Único de Sucesso do MVP

> **Um cliente varejo com ERP Winthor ou RMS consegue completar todo o fluxo de
> onboarding — do cadastro ao ambiente ativo — sem intervenção manual da equipe
> técnica da Terus.**

Tudo que não contribui para este critério não entra no MVP.

### 2.2 O que Obrigatoriamente Entra no MVP

| Componente | Justificativa |
|-----------|---------------|
| Fluxo de onboarding completo (7 etapas) | É o produto |
| Diagnóstico automatizado (Winthor + RMS) | Elimina intervenção técnica manual |
| Assistente dinâmico de integração (Winthor + RMS) | Sem isso o cliente não sabe configurar |
| Armazenamento seguro de credenciais via Vault | Segurança não é opcional |
| Contratos digitais via D4Sign (NDA + Comercial) | Sem contrato, sem ativação |
| Provisionamento básico de tenant | Sem isso não há produto para o cliente |
| Painel admin de onboarding | Time Terus precisa aprovar e acompanhar |
| Home + páginas dos 4 módulos principais | Credibilidade para quem recebe o link |
| Autenticação de admin com RBAC | Segurança do painel interno |
| Audit log de todas as operações críticas | LGPD + rastreabilidade |

### 2.3 O que Pode Ser Mockado no MVP

| Componente | O que é mock |
|-----------|-------------|
| Status Page | Dados de uptime hardcoded ("Operacional 99.9%") |
| ERPs além de Winthor/RMS no assistente | Retorna "Entre em contato com nosso time técnico" |
| E-mail de boas-vindas | Template simples, sem design elaborado |

### 2.4 O que Fica para Pós-MVP

- Central Técnica com Swagger embeddado
- Status Page com dados reais de uptime
- Módulos Log e Pulse (páginas de produto)
- Fluxo de integração via API REST no onboarding
- MFA para admin
- Blog e base de conhecimento
- Internacionalização (ES/EN)
- Marketplace de integrações

---

## 3. STACK OFICIAL

### 3.1 Regra de Stack

**A stack abaixo é definitiva e fechada para o MVP e Enterprise Fase 1.**
Qualquer adição de biblioteca, framework ou serviço requer criação de ADR com justificativa,
alternativas avaliadas e aprovação do Tech Lead. A IA não pode sugerir ou implementar
tecnologias fora desta lista sem ADR aprovado.

### 3.2 Frontend

| Camada | Tecnologia | Versão Mínima | Observações |
|--------|-----------|---------------|-------------|
| Framework | Next.js | 14.x | App Router obrigatório. Pages Router proibido. |
| Linguagem | TypeScript | 5.x | strict mode obrigatório. Sem `any` explícito. |
| Estilização | Tailwind CSS | 3.x | Utility-first. CSS modules proibido. |
| Componentes base | shadcn/ui + Radix UI | latest | Customizados via `packages/ui` |
| Estado global | Zustand | 4.x | Apenas para estado cross-componente real |
| Formulários | React Hook Form + Zod | latest | Sem Formik. Sem validação manual. |
| Data fetching | TanStack Query | 5.x | Sem SWR. Sem fetch direto em componente. |
| Gerenciador de pacotes | pnpm | 8.x+ | npm e yarn são proibidos |
| Build/monorepo | Turborepo | latest | — |

### 3.3 Backend

| Camada | Tecnologia | Versão Mínima | Observações |
|--------|-----------|---------------|-------------|
| Framework | FastAPI | 0.110+ | Async obrigatório. Flask/Django proibidos. |
| Linguagem | Python | 3.12+ | — |
| ORM | SQLAlchemy | 2.x (async) | Queries raw SQL proibidas fora de migrations |
| Migrations | Alembic | latest | Toda mudança de schema via migration |
| Validação | Pydantic | v2 | Schemas para todo request e response |
| Filas | Celery | 5.x | Com Redis como broker |
| Cache/Sessões | Redis | 7.x | — |
| Linter | Ruff | latest | Substitui flake8 + black + isort |
| Typechecker | mypy | latest | Strict mode |

### 3.4 Banco de Dados

| Componente | Tecnologia | Observações |
|-----------|-----------|-------------|
| Banco principal | PostgreSQL | 16.x |
| Estratégia | Schema-per-tenant | Row-level security puro é proibido como única proteção |

### 3.5 Infraestrutura e Serviços

| Componente | Tecnologia | Observações |
|-----------|-----------|-------------|
| Secrets | HashiCorp Vault | 1.15+ — credenciais de cliente nunca fora do Vault |
| CDN/WAF | Cloudflare | Edge, WAF incluso, R2 para assets |
| Container | Docker | Multi-stage build obrigatório |
| Orquestração | Kubernetes | Kustomize para overlays de ambiente |
| Observabilidade | OpenTelemetry + Grafana Stack | Sem vendor lock-in |
| Error tracking | Sentry | Configurado desde Sprint 0 |
| Contratos digitais | D4Sign | DocuSign proibido (LGPD + custo) |
| CMS headless | Sanity | Para módulos, cases e conteúdo institucional |
| Analytics | Plausible ou PostHog | Privacy-first. Google Analytics proibido. |

### 3.6 Fontes Tipográficas Oficiais

| Papel | Família | Weights |
|-------|---------|---------|
| Display / Heading | DM Sans | 500, 600, 700 |
| Corpo / Interface | IBM Plex Sans | 400, 500 |
| Código / Técnico | IBM Plex Mono | 400, 500 |

Inter, Roboto, Arial e System fonts são **proibidas** como fontes primárias.
Space Grotesk é proibido (saturação no mercado SaaS).

---

## 4. ARQUITETURA OFICIAL

### 4.1 Visão Macro

```
Cloudflare (Edge / CDN / WAF)
        │
        ├── Frontend (Next.js) ◄──► API Gateway (NGINX)
        │                                    │
        │              ┌─────────────────────┼──────────────────┐
        │              ▼                     ▼                  ▼
        │         API Principal        Serviço de          Serviço de
        │         (FastAPI Core)       Diagnóstico         Provisionamento
        │              │               (Celery isolado)    (Celery)
        │              │                     │                  │
        │              └─────────────────────┴──────────────────┘
        │                                    │
        │                    ┌───────────────┼──────────┐
        │                    ▼               ▼          ▼
        │               PostgreSQL         Redis      Vault
        │               (multi-schema)     (filas)    (secrets)
        │
        └── Static Assets (Cloudflare R2 + CDN)
```

### 4.2 Grupos de Rotas Next.js

```
(marketing)   → Layout: Navbar completa + Footer
               Páginas: Home, Plataforma, Módulos, Ecossistema, Cases, Sobre, Status

(onboarding)  → Layout: Navbar simplificada + Stepper
               Páginas: /onboarding/* (7 etapas)

(tecnico)     → Layout: Navbar + Sidebar técnica
               Páginas: /central-tecnica/*

(admin)       → Layout: Sidebar admin + Auth guard
               Páginas: /admin/* (área interna Terus)
```

### 4.3 Camadas Backend

```
api/          → Roteamento HTTP, schemas Pydantic, sem lógica de negócio
core/         → Domínio: services, use_cases, repositories, models
infrastructure/ → Implementações: database, cache, vault, queue, notifications
workers/      → Celery tasks: diagnostic, provisioning, contracts, notifications
shared/       → Utilitários transversais: exceptions, pagination, audit
```

### 4.4 Personas e Modos de Interface

| Persona | Modo | Comportamento |
|---------|------|---------------|
| Diretor / CEO | Executivo | Linguagem de resultado de negócio, ROI, cases, métricas |
| Gerente de TI / Arquiteto | Técnico | APIs, requisitos de infraestrutura, protocolos, latências |
| Analista de Integração | Técnico | Swagger, payloads, scripts SQL, guias passo a passo |
| Cliente em Onboarding | Operacional | Assistente guiado, feedback imediato, zero ambiguidade |
| Admin Terus | Interno | Painel de onboardings, aprovações, SLA |

O toggle Executivo/Técnico é implementado via `ModeStore` (Zustand) e afeta conteúdo
renderizado condicionalmente. Não cria rotas separadas.

---

## 5. ESTRUTURA DE PASTAS

### 5.1 Estrutura Raiz (Monorepo)

```
terus-platform/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-staging.yml
│   │   ├── deploy-production.yml
│   │   └── security-scan.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
│
├── apps/
│   ├── web/                    ← Next.js 14
│   └── api/                    ← FastAPI
│
├── packages/
│   ├── ui/                     ← Design system (shadcn/ui customizados)
│   ├── types/                  ← TypeScript types compartilhados
│   ├── schemas/                ← Zod schemas compartilhados
│   └── config/                 ← ESLint, TypeScript, Tailwind configs
│
├── infra/
│   ├── docker/
│   ├── k8s/
│   │   ├── base/
│   │   └── overlays/
│   │       ├── staging/
│   │       └── production/
│   ├── vault/
│   └── scripts/
│
├── docs/
│   ├── architecture/           ← Fases 1, 2, 3, 3.5
│   ├── decisions/              ← ADRs
│   ├── api/
│   ├── runbooks/
│   └── onboarding-dev/
│
├── CLAUDE.md                   ← Contexto para IAs (lido automaticamente)
├── PROJECT_RULES.md            ← Este documento
├── turbo.json
├── pnpm-workspace.yaml
└── .env.example
```

### 5.2 Estrutura apps/web

```
apps/web/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── plataforma/page.tsx
│   │   ├── modulos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── ecossistema/page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sobre/page.tsx
│   │   └── status/page.tsx
│   ├── (onboarding)/
│   │   ├── layout.tsx
│   │   └── onboarding/
│   │       ├── cadastro/page.tsx
│   │       ├── integracao/page.tsx
│   │       ├── assistente/page.tsx
│   │       ├── diagnostico/page.tsx
│   │       ├── resultado/page.tsx
│   │       ├── contratos/page.tsx
│   │       └── ativacao/page.tsx
│   ├── (tecnico)/
│   │   ├── layout.tsx
│   │   └── central-tecnica/
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                     ← Componentes base (sem lógica de negócio)
│   ├── layout/                 ← Navbar, Footer, Sidebar
│   │   ├── navbar/
│   │   │   ├── navbar.tsx
│   │   │   ├── mega-menu-modules.tsx
│   │   │   ├── mega-menu-ecosystem.tsx
│   │   │   └── mode-toggle.tsx
│   │   ├── footer/
│   │   └── sidebar/
│   ├── sections/               ← Seções compostas (sem store global)
│   ├── onboarding/             ← Componentes do fluxo (podem usar store)
│   └── shared/                 ← Componentes transversais
│
├── lib/
│   ├── api/                    ← Funções de fetch por domínio
│   ├── auth/
│   ├── validations/            ← Schemas Zod locais
│   └── utils/
│
├── store/
│   ├── onboarding-store.ts
│   ├── mode-store.ts
│   └── ui-store.ts
│
├── types/
├── content/
└── public/
```

### 5.3 Estrutura apps/api

```
apps/api/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── router.py
│   │   │   ├── auth/
│   │   │   ├── onboarding/
│   │   │   ├── diagnostic/
│   │   │   ├── provisioning/
│   │   │   └── admin/
│   │   └── health.py
│   │
│   ├── core/
│   │   ├── onboarding/
│   │   │   ├── service.py
│   │   │   ├── use_cases.py
│   │   │   ├── models.py
│   │   │   ├── repository.py
│   │   │   └── CONTEXT.md      ← Contexto para IAs
│   │   ├── diagnostic/
│   │   │   ├── service.py
│   │   │   ├── runners/
│   │   │   │   ├── nat_runner.py
│   │   │   │   ├── auth_runner.py
│   │   │   │   ├── permission_runner.py
│   │   │   │   ├── query_runner.py
│   │   │   │   └── performance_runner.py
│   │   │   └── repository.py
│   │   ├── provisioning/
│   │   ├── auth/
│   │   └── contracts/
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── cache/
│   │   ├── vault/
│   │   ├── queue/
│   │   └── notifications/
│   │
│   ├── workers/
│   │   ├── diagnostic_worker.py
│   │   ├── provisioning_worker.py
│   │   ├── contract_worker.py
│   │   └── notification_worker.py
│   │
│   └── shared/
│       ├── exceptions.py
│       ├── pagination.py
│       └── audit.py
│
├── migrations/
│   ├── env.py
│   └── versions/
│
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 6. CONVENÇÕES DE CÓDIGO

### 6.1 Nomenclatura Geral

| Contexto | Convenção | Exemplo |
|----------|-----------|---------|
| Arquivos React/TS | kebab-case | `diagnostic-panel.tsx` |
| Componentes exportados | PascalCase | `DiagnosticPanel` |
| Hooks React | camelCase com prefixo `use` | `useOnboardingStore` |
| Arquivos Python | snake_case | `diagnostic_service.py` |
| Classes Python | PascalCase | `DiagnosticService` |
| Funções/variáveis Python | snake_case | `run_nat_test()` |
| Endpoints de API | kebab-case | `/v1/onboarding-sessions` |
| Schemas de banco | snake_case | `tenant_001` |
| Tabelas de banco | snake_case plural | `onboarding_sessions` |
| Colunas de banco | snake_case | `created_at`, `tenant_id` |
| Branches Git | `type/scope-description` | `feat/onboarding-step-1` |
| Tags de release | semver | `v1.2.3` |
| Variáveis de ambiente | UPPER_SNAKE_CASE | `DATABASE_URL`, `VAULT_ADDR` |
| Design tokens CSS | kebab-case com namespace | `--color-brand-primary` |

### 6.2 Commits

Seguir Conventional Commits obrigatoriamente:

```
<type>(<scope>): <descrição em português>

Types válidos:
  feat     → nova funcionalidade
  fix      → correção de bug
  chore    → manutenção, dependências
  docs     → documentação
  test     → testes
  refactor → refatoração sem mudança de comportamento
  perf     → melhoria de performance
  ci       → mudanças de CI/CD

Exemplos válidos:
  feat(onboarding): adicionar validação de CNPJ na etapa 1
  fix(diagnostic): corrigir timeout no NatRunner para 5s
  docs(adr): adicionar ADR-005 sobre escolha do D4Sign
  test(auth): adicionar testes de refresh token expirado
```

### 6.3 Tamanho de Arquivo

| Tipo | Limite recomendado | Ação se exceder |
|------|--------------------|-----------------|
| Componente React | 200 linhas | Extrair sub-componentes |
| Use Case Python | 100 linhas | Extrair use cases menores |
| Service Python | 150 linhas | Extrair para use cases |
| Router Python | 80 linhas | Dividir em sub-routers |
| Store Zustand | 150 linhas | Dividir em stores por domínio |

### 6.4 Comentários

- Comentários explicam **por quê**, não **o quê**
- Código auto-explicativo não precisa de comentário
- Comentários obrigatórios: decisões não óbvias de segurança, workarounds de biblioteca,
  regras de negócio complexas
- TODOs aceitáveis apenas com número de issue: `# TODO(#123): migrar para Vault HA`
- Comentários em português são preferidos no contexto do projeto

---

## 7. REGRAS DE FRONTEND

### 7.1 Regras de Componentes

**R-FE-01** — Todo componente é TypeScript. `.tsx` para componentes, `.ts` para utilitários.
Arquivos `.js` e `.jsx` são proibidos.

**R-FE-02** — Componentes em `packages/ui` são puramente presentacionais. Proibido:
fetch de API, uso de TanStack Query, uso de Zustand, importação de types de domínio
específicos do app.

**R-FE-03** — Componentes em `components/sections` podem usar TanStack Query mas
não Zustand (estado local via `useState` se necessário).

**R-FE-04** — Componentes em `components/onboarding` podem usar Zustand e TanStack Query.

**R-FE-05** — Páginas (`page.tsx`) são apenas composição de seções. Nenhuma lógica de
negócio, nenhum fetch direto, nenhum estado local relevante em `page.tsx`.

**R-FE-06** — Todo fetch de API usa TanStack Query. `useQuery` para leitura, `useMutation`
para escrita. Fetch direto com `fetch()` ou `axios()` em componente é proibido.

**R-FE-07** — Toda função de fetch fica em `apps/web/lib/api/`. Uma arquivo por domínio
(ex: `onboarding.ts`, `diagnostic.ts`). Funções exportadas são tipadas com os types
de `packages/types`.

**R-FE-08** — Validação de formulários usa Zod. Schemas ficam em `packages/schemas`
se compartilhados com backend, ou em `apps/web/lib/validations/` se exclusivos do frontend.
React Hook Form + `zodResolver` são o padrão. Validação manual de campos é proibida.

**R-FE-09** — Estado global só vai para Zustand se for necessário em 3 ou mais componentes
não relacionados na árvore. Estado local preferível. Context API proibida para estado global
(use Zustand).

**R-FE-10** — `localStorage` só é acessado via hooks customizados, nunca diretamente
em componentes. O `useOnboardingStore` gerencia persistência do onboarding automaticamente.

**R-FE-11** — Nenhuma string de texto hardcoded em componente sem possibilidade de
internacionalização futura. Constantes de texto vão em `lib/utils/constants.ts`.

**R-FE-12** — Server Components por padrão. `"use client"` apenas quando necessário:
interatividade (onClick, onChange), hooks de estado, APIs de browser. Documentar motivo
quando adicionar `"use client"`.

**R-FE-13** — Estratégia de renderização por página (conforme Fase 3):
- ISR: Home, Módulos, Ecossistema, Cases (revalidação configurada)
- SSG: Plataforma, Sobre (deploy trigger)
- SSR: Status, Onboarding, Admin (sem cache)

**R-FE-14** — Loading states usam Suspense boundaries por seção, nunca por página inteira.
Skeleton components para conteúdo em carregamento. Spinners apenas para ações pontuais.

**R-FE-15** — Erros de API são exibidos inline no formulário ou componente relevante,
nunca em alerts globais genéricos. Mensagens de erro são específicas e incluem ação
corretiva quando possível.

### 7.2 Regras de Rotas e Navegação

**R-FE-16** — Toda rota nova deve estar mapeada no sitemap da Fase 1 ou ter ADR
justificando sua adição.

**R-FE-17** — Links entre páginas sempre usam o componente `<Link>` do Next.js.
`<a href>` para links externos com `target="_blank" rel="noopener noreferrer"`.

**R-FE-18** — Breadcrumbs obrigatórios em todas as páginas de profundidade ≥ 2.

**R-FE-19** — Toda página de módulo individual (`/modulos/[slug]`) tem estrutura idêntica
conforme especificado na Fase 2. Desvios requerem aprovação de design.

### 7.3 Regras de Performance

**R-FE-20** — Meta de LCP < 2.5s em todas as páginas públicas (medido com Lighthouse).
Hero sem imagens externas de alta resolução. SVGs inline para diagramas.

**R-FE-21** — Fontes carregadas via `next/font` com `display: 'optional'`. Sem fontes
de CDN externo em runtime.

**R-FE-22** — Imagens sempre via `next/image` com dimensões explícitas. `loading="lazy"`
em imagens fora do viewport inicial. Formato WebP/AVIF via Next.js automático.

**R-FE-23** — Bundle size inicial < 200KB gzipped. Verificar com `next build` + Bundle Analyzer
em cada sprint. Code splitting por rota é automático no App Router — não contornar.

**R-FE-24** — Animações complexas (diagrama do Hero, contadores) são lazy loaded após LCP.
Nenhuma animação bloqueia o carregamento inicial.

---

## 8. REGRAS DE BACKEND

### 8.1 Regras de Arquitetura em Camadas

**R-BE-01** — A separação de camadas é inviolável:

```
Router    → recebe request, valida schema Pydantic, chama service, retorna response
Service   → orquestra use cases, não acessa banco diretamente
Use Case  → uma única responsabilidade de negócio, chama repository
Repository → único ponto de acesso ao banco, retorna modelos de domínio
```

**R-BE-02** — Router não contém lógica de negócio. A única lógica permitida no router
é extração de parâmetros, chamada de service e formatação de response.

**R-BE-03** — Service não acessa banco diretamente. Qualquer acesso a banco passa
pelo repository correspondente.

**R-BE-04** — Use Case tem uma única responsabilidade. Se um use case está fazendo
duas coisas distintas de negócio, deve ser dividido em dois.

**R-BE-05** — Repository não chama service. Dependência em um único sentido:
Router → Service → Use Case → Repository.

**R-BE-06** — SQLAlchemy é importado apenas em `infrastructure/database/` e em `core/*/models.py`
e `core/*/repository.py`. Proibido em service, use_case, router ou worker.

### 8.2 Regras de API

**R-BE-07** — Todo endpoint tem schema Pydantic de request (quando há body) e de response.
Sem `dict` ou `Any` como tipo de retorno em endpoints.

**R-BE-08** — Versionamento de API via prefixo de URL: `/v1/`. Nova versão (`/v2/`) só
é criada quando há breaking change inevitável.

**R-BE-09** — Endpoints seguem REST semântico:
- `GET` para leitura (idempotente, sem side effects)
- `POST` para criação ou ações
- `PUT` para atualização completa de recurso
- `PATCH` para atualização parcial
- `DELETE` para remoção

**R-BE-10** — Responses de erro seguem formato padrão:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Mensagem legível para o usuário",
  "detail": [{"field": "cnpj", "message": "CNPJ inválido"}]
}
```

**R-BE-11** — HTTP status codes corretos obrigatoriamente:
- 200: sucesso com corpo
- 201: criado com sucesso
- 204: sucesso sem corpo
- 400: erro de validação/negócio
- 401: não autenticado
- 403: não autorizado (autenticado mas sem permissão)
- 404: recurso não encontrado
- 409: conflito (ex: CNPJ já cadastrado)
- 422: erro de validação Pydantic
- 500: erro interno (nunca expor detalhes em produção)

**R-BE-12** — Toda operação de escrita crítica registra em `audit.audit_logs` antes de
retornar response. Falha no audit log não deve impedir a operação principal (log assíncrono
em fila de baixa prioridade).

### 8.3 Regras de Workers (Celery)

**R-BE-13** — Toda task Celery é idempotente. A mesma task executada duas vezes com
o mesmo `task_id` deve resultar no mesmo estado final sem duplicar recursos.

**R-BE-14** — O `task_id` do Celery é usado como chave de idempotência no Redis.
Segunda execução do mesmo task_id é no-op com log de warning.

**R-BE-15** — Toda task tem timeout explícito configurado. Workers sem timeout são proibidos.

**R-BE-16** — Toda fila tem DLQ (Dead Letter Queue) configurada. Jobs que excedem o
número máximo de retries vão para DLQ e disparam notificação automática para o time técnico.

**R-BE-17** — Workers de diagnóstico executam em processo isolado da API principal.
Falha de worker de diagnóstico não pode derrubar a API.

**R-BE-18** — Credenciais de banco de cliente nunca ficam em memória de worker por mais
de 5 minutos. Token do Vault com TTL de 5min. Worker revoga o token após uso.

### 8.4 Regras de Validação

**R-BE-19** — Validação acontece em duas camadas independentes:
1. Frontend (Zod): UX, feedback imediato
2. Backend (Pydantic): segurança, fonte de verdade

Nunca confiar apenas na validação do frontend.

**R-BE-20** — Dados de entrada do cliente (especialmente em formulários de onboarding)
são tratados como não confiáveis. Validação estrita de tipos, formatos e ranges.

**R-BE-21** — Parâmetros de conexão de banco fornecidos pelo cliente são validados
rigidamente antes do diagnóstico:
- Host: deve ser IP público válido (regex)
- Porta: deve ser inteiro entre 1024 e 65535
- Service name/SID: apenas alfanumérico e underscore
- Usuário: apenas alfanumérico, underscore e hífen

---

## 9. REGRAS DE BANCO DE DADOS

### 9.1 Estrutura de Schemas

**R-DB-01** — Schemas do PostgreSQL são fixos e com propósito definido:

| Schema | Conteúdo | Quem acessa |
|--------|----------|-------------|
| `public` | Infraestrutura da plataforma: tenants, usuários, catálogos | API principal |
| `onboarding` | Sessões e dados de onboarding (pré-tenant) | API principal |
| `audit` | Logs de auditoria imutáveis | API principal (escrita), análise (leitura) |
| `tenant_NNN` | Dados operacionais do cliente N | API principal (com contexto de tenant) |

**R-DB-02** — Novos schemas além dos listados acima requerem ADR.

### 9.2 Regras de Tabelas

**R-DB-03** — Toda tabela usa UUID como chave primária. Auto-increment inteiro é proibido
(previsibilidade de IDs é risco de segurança).

**R-DB-04** — Toda tabela tem o mixin `TimestampMixin` com `created_at TIMESTAMPTZ`
e `updated_at TIMESTAMPTZ`. Sem exceções.

**R-DB-05** — `updated_at` é atualizado automaticamente via trigger PostgreSQL ou
SQLAlchemy event. Nunca via atualização manual no código da aplicação.

**R-DB-06** — Dados sensíveis nunca em tabela de banco:
- Senhas: apenas hash bcrypt (cost 12)
- Credenciais de banco de cliente: apenas `vault_path` (o dado vai para o Vault)
- Tokens de autenticação: apenas hash ou referência ao Redis
- Documentos de contrato: apenas URL do D4Sign (documento vai no D4Sign)

**R-DB-07** — Toda coluna tem tipo explícito e constraint de NOT NULL quando aplicável.
Colunas nullable são a exceção, não a regra.

**R-DB-08** — ENUMs do PostgreSQL são preferidos a VARCHAR livre para campos com
valores fixos (status, tipo, role). Mudança de ENUM requer migration explícita.

### 9.3 Regras de Migrations

**R-DB-09** — Toda mudança de schema — criação de tabela, adição de coluna, alteração
de tipo, criação de índice, criação de ENUM — é feita via migration Alembic. Nunca
via execução manual de SQL em banco de produção.

**R-DB-10** — Toda migration tem `upgrade()` e `downgrade()` implementados e testados.
Migration sem `downgrade` funcional é recusada no code review.

**R-DB-11** — Migrations são backward-compatible: o código da versão anterior deve
funcionar com o schema novo. Se não for possível, o deploy é em dois steps:
Step 1: migration + deploy do código compatível. Step 2: migration de limpeza.

**R-DB-12** — Nomenclatura de migration: `{timestamp}_{descricao_clara}.py`
Exemplo: `20240601_120000_create_onboarding_sessions.py`

**R-DB-13** — Migrations em produção têm step separado com aprovação manual antes
do deploy do código. Nunca migration e deploy simultâneos.

### 9.4 Regras de Índices

**R-DB-14** — Índices obrigatórios para:
- Todas as foreign keys
- Colunas usadas em filtros frequentes (status, tenant_id, created_at)
- Colunas com constraint UNIQUE
- Colunas usadas em JOINs

**R-DB-15** — Índices compostos quando queries filtram por 2+ colunas juntas frequentemente.
A ordem das colunas no índice composto segue a seletividade (mais seletiva primeiro).

**R-DB-16** — Índices parciais para queries em subsets de dados (ex: apenas registros ativos).

### 9.5 Regras de Queries

**R-DB-17** — Queries são escritas via SQLAlchemy ORM ou SQLAlchemy Core. SQL raw
é proibido na aplicação. Exceção: migrations Alembic.

**R-DB-18** — Queries com N+1 são proibidas. Relacionamentos são carregados via
`selectinload` ou `joinedload` quando necessários. Nenhum loop que executa query por item.

**R-DB-19** — Paginação é obrigatória em toda query que retorna lista. Sem `SELECT *`
sem `LIMIT`. Limite padrão: 20 itens. Limite máximo: 100 itens.

---

## 10. REGRAS DE SEGURANÇA

### 10.1 Credenciais e Secrets

**R-SEC-01** — **REGRA ABSOLUTA:** Credenciais de banco de cliente nunca são
armazenadas fora do HashiCorp Vault. Não em variáveis de ambiente, não em tabelas
de banco, não em logs, não em arquivos de configuração, não em memória por mais de
5 minutos. Violação desta regra é bloqueante e requer post-mortem imediato.

**R-SEC-02** — Nenhuma variável de ambiente é lida diretamente na aplicação em produção.
Toda configuração sensível vem do Vault via External Secrets Operator.

**R-SEC-03** — O arquivo `.env` existe apenas para desenvolvimento local.
`.env` nunca é commitado no repositório. `.env.example` documenta todas as variáveis
necessárias sem valores reais.

**R-SEC-04** — Tokens do Vault para diagnóstico têm TTL máximo de 5 minutos e são
revogados explicitamente após uso. Workers revogam tokens ao finalizar a task.

**R-SEC-05** — Rotação de credenciais: API keys e segredos de serviço são rotacionados
a cada 90 dias. Procedimento documentado em `docs/runbooks/credential-rotation.md`.

### 10.2 Autenticação e Tokens

**R-SEC-06** — Access tokens JWT têm TTL de 15 minutos. Refresh tokens têm TTL de 7 dias
para usuários regulares e 1 dia para admins.

**R-SEC-07** — Refresh tokens são armazenados em HttpOnly cookies com atributos
`SameSite=Strict` e `Secure`. Nunca em `localStorage`.

**R-SEC-08** — Tokens JWT usam algoritmo RS256 (assimétrico). HS256 é proibido
(chave compartilhada é risco operacional).

**R-SEC-09** — Toda autenticação falha é registrada em `audit.audit_logs` com IP e
user agent. Após 5 falhas consecutivas do mesmo IP, rate limiting estrito é aplicado.

**R-SEC-10** — Sessões de onboarding (sem login) usam JWT com `sub: session_id`.
Estes tokens têm TTL de 72h e são distintos dos tokens de usuário autenticado.

### 10.3 Rate Limiting

**R-SEC-11** — Rate limits configurados no NGINX:

| Tipo de rota | Limite | Janela |
|-------------|--------|--------|
| Rotas públicas gerais | 100 req/IP | 1 minuto |
| `POST /v1/auth/login` | 10 req/IP | 1 hora |
| `POST /v1/onboarding/sessions` | 5 req/IP | 1 hora |
| `POST /v1/diagnostic/jobs` | 3 req/sessão | 1 hora |
| Rotas admin | 200 req/usuário | 1 minuto |

### 10.4 Dados em Trânsito e em Repouso

**R-SEC-12** — TLS 1.3 mínimo em todas as conexões externas. TLS 1.0 e 1.1 são proibidos.

**R-SEC-13** — Dados em repouso: credenciais no Vault com AES-256-GCM. Backups
criptografados com AES-256 antes do upload. Hashes de senha com bcrypt (cost factor 12).

**R-SEC-14** — Security headers obrigatórios em todas as responses HTTP:
`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`.

### 10.5 Logs e Informações Sensíveis

**R-SEC-15** — **REGRA ABSOLUTA:** As seguintes informações nunca aparecem em logs
em nenhum ambiente:
- Senhas ou hashes de senha
- Connection strings com credenciais
- Tokens JWT completos (apenas `jti` é permitido)
- Dados pessoais além de `user_id` (nunca nome, e-mail, CNPJ em logs de sistema)
- Vault tokens ou caminhos de segredo que revelem a estrutura

**R-SEC-16** — Middleware de sanitização de logs é obrigatório no worker de diagnóstico.
Qualquer string que pareça uma senha (baseado em contexto de chave-valor) é mascarada
como `[REDACTED]`.

### 10.6 LGPD

**R-SEC-17** — Consentimento explícito é coletado na etapa 1 do onboarding com
timestamp e IP registrados em `audit.audit_logs`.

**R-SEC-18** — Dados pessoais coletados são os mínimos necessários por etapa.
Nenhum campo adicional é coletado "para o futuro" sem uso imediato.

**R-SEC-19** — Implementar e manter endpoints de direitos do titular:
- `GET /v1/me/data` — acesso aos próprios dados
- `DELETE /v1/me` — direito ao esquecimento (soft delete de dados pessoais,
  audit log anonimizado é mantido)
- `GET /v1/me/export` — portabilidade em JSON

**R-SEC-20** — Retenção de dados:
- Sessões de onboarding expiradas: 2 anos, depois anonimização
- Dados operacionais de tenant: enquanto contrato ativo + 5 anos
- Audit logs: 5 anos (primeiros 90 dias em banco ativo, restante em storage frio)

---

## 11. REGRAS DE MULTI-TENANCY

### 11.1 Estratégia Oficial

**R-MT-01** — A estratégia de multi-tenancy é **schema-per-tenant** no PostgreSQL.
Row-level security como única camada de isolamento é **proibido** (dependência de
corretude de query é risco inaceitável de vazamento de dados entre tenants).

**R-MT-02** — Cada tenant tem um schema PostgreSQL isolado nomeado `tenant_{uuid_curto}`.
O mapeamento entre `tenant_id` e `schema_name` está em `public.tenants.schema_name`.

**R-MT-03** — Operações de dados de cliente sempre especificam o schema correto via
`set search_path to tenant_NNN` ou via SQLAlchemy `schema=` explícito. Nunca queries
sem schema explícito que possam atingir dados do schema errado.

### 11.2 Criação e Gerenciamento de Tenants

**R-MT-04** — A criação de schema de tenant é responsabilidade exclusiva do
`CreateTenantUseCase` no módulo de provisioning. Nenhum outro código cria schemas.

**R-MT-05** — A criação de tenant é idempotente. Se chamado duas vezes para o mesmo
tenant (retry), o segundo chamado verifica se o schema já existe e é no-op com log
de warning.

**R-MT-06** — Rollback de criação de tenant executa `DROP SCHEMA tenant_NNN CASCADE`
apenas se o schema foi criado nesta execução e o provisionamento falhou. Nunca
droppar schema de tenant com dados de cliente.

### 11.3 Isolamento em Queries

**R-MT-07** — Nenhuma query atravessa schemas de tenants diferentes. Não existe
query que leia `tenant_001.orders` e `tenant_002.orders` simultaneamente.
Queries cross-tenant são proibidas.

**R-MT-08** — Relatórios e métricas agregadas da plataforma (para o painel admin da Terus)
são construídos via queries em `public.*` (metadados) ou via agregações separadas por tenant
com merge na aplicação. Nunca via UNION de schemas de tenants.

### 11.4 Migrations de Tenant

**R-MT-09** — Migrations que alteram schema de tenant são aplicadas em todos os schemas
de tenant ativos de forma sequencial e controlada. O script de migration itera sobre
`SELECT schema_name FROM public.tenants WHERE status = 'active'`.

**R-MT-10** — Migrations de tenant são testadas em um schema de tenant de staging antes
de serem aplicadas em produção. Rollback de migration de tenant é testado explicitamente.

---

## 12. REGRAS DE AUDITORIA

### 12.1 O que é Auditado Obrigatoriamente

**R-AUD-01** — As seguintes operações registram em `audit.audit_logs` sem exceção:

| Operação | Ação registrada |
|----------|----------------|
| Criação de sessão de onboarding | `onboarding.session.created` |
| Salvamento de qualquer etapa | `onboarding.step.saved` |
| Início de diagnóstico | `diagnostic.job.started` |
| Resultado de diagnóstico | `diagnostic.job.completed` |
| Resultado por item de diagnóstico | `diagnostic.item.result` |
| Aprovação manual de onboarding | `onboarding.approved` |
| Envio de contratos | `contract.sent` |
| Assinatura de contrato | `contract.signed` |
| Criação de tenant | `tenant.created` |
| Provisionamento de módulos | `tenant.modules.configured` |
| Login bem-sucedido | `auth.login.success` |
| Falha de login | `auth.login.failed` |
| Refresh de token | `auth.token.refreshed` |
| Logout | `auth.logout` |
| Acesso admin a dados de cliente | `admin.tenant.accessed` |
| Qualquer operação de deleção | `*.deleted` |

### 12.2 Estrutura do Registro de Auditoria

**R-AUD-02** — Todo registro em `audit.audit_logs` contém obrigatoriamente:

```
id            → UUID gerado
tenant_id     → UUID do tenant (null para operações de plataforma)
user_id       → UUID do usuário (null para operações de sistema/worker)
session_id    → ID da sessão de onboarding (quando aplicável)
action        → string no formato "recurso.operacao" (ex: "onboarding.step.saved")
resource_type → tipo do recurso afetado
resource_id   → ID do recurso afetado
ip_address    → IP de origem (obrigatório para operações de usuário)
user_agent    → User agent (obrigatório para operações de usuário)
success       → boolean
error_message → mensagem de erro (null se sucesso)
created_at    → timestamp com timezone
```

`before_state` e `after_state` são opcionais e usados apenas para operações de atualização
onde o histórico do estado é relevante para auditoria de conformidade.

### 12.3 Imutabilidade dos Logs

**R-AUD-03** — Registros em `audit.audit_logs` são imutáveis. Não existe endpoint de
UPDATE ou DELETE para esta tabela. Nenhum código de aplicação pode alterar registros
de auditoria existentes.

**R-AUD-04** — O usuário de banco da aplicação (`terus_app`) não tem permissão de
UPDATE ou DELETE na tabela `audit.audit_logs`. Apenas INSERT e SELECT.

**R-AUD-05** — Audit logs são retidos por 5 anos. Após 90 dias em banco ativo, são
movidos para Cloudflare R2 em formato comprimido e criptografado.

---

## 13. REGRAS DE UX

### 13.1 Princípios Invioláveis de UX

**R-UX-01** — **Confiança antes de conversão.** CTAs de cadastro ou onboarding
aparecem após prova social (cases, métricas, credibilidade técnica). Não é pedido
dado pessoal antes de demonstrar valor.

**R-UX-02** — **Uma etapa de cada vez.** O fluxo de onboarding nunca mostra mais
de uma etapa na tela. O stepper mostra progresso global, mas o formulário ativo é
apenas da etapa corrente.

**R-UX-03** — **Feedback imediato.** Erros de formulário aparecem no blur do campo
(não ao digitar, não apenas no submit). Diagnóstico mostra cada teste em tempo real
(não aguarda todos terminarem para mostrar resultado).

**R-UX-04** — **Ação específica para cada erro.** Mensagens de erro nunca são genéricas.
Todo erro de diagnóstico tem: o que falhou, por que falhou e o que o cliente deve fazer.

**R-UX-05** — **Estado sempre recuperável.** O estado do onboarding é salvo automaticamente.
O usuário pode fechar o browser e retomar de onde parou. Mensagem de "continuar de onde
parei" está visível desde a primeira tela.

**R-UX-06** — **Zero dead ends.** Se um ERP não está homologado, há fluxo alternativo.
Se o diagnóstico falha, há ação de correção. Se o usuário está perdido, há link de suporte
contextual. Nenhuma tela termina sem próxima ação clara.

### 13.2 Modo Executivo e Modo Técnico

**R-UX-07** — O toggle Executivo/Técnico é persistido em `localStorage` via `ModeStore`.
Ao retornar ao site, o último modo selecionado é mantido.

**R-UX-08** — No modo Executivo, linguagem de produto usa: resultado de negócio,
ROI, redução de ruptura, ganho operacional, velocidade. Proibido: jargão técnico,
protocolos, tipos de banco, APIs.

**R-UX-09** — No modo Técnico, seções adicionais ficam visíveis: requisitos de
infraestrutura, métodos de integração, latências, endpoints de API, protocolos.
Não substitui o conteúdo executivo — adiciona camadas.

### 13.3 Onboarding UX

**R-UX-10** — O stepper mostra estimativa de tempo por etapa ("~3 minutos").

**R-UX-11** — Campos condicionais (ex: "Quantidade de lojas" aparece apenas se
segmento = Varejo) são mostrados com transição suave. Não causam layout shift.

**R-UX-12** — Máximo de 3 reexecuções do diagnóstico. Após o limite, o botão é
desabilitado e aparece opção de contato com suporte.

**R-UX-13** — O painel de diagnóstico mostra os testes em execução em tempo real,
não apenas o resultado final. Cada linha aparece com animação de entrada sequencial.

**R-UX-14** — A tela de provisionamento mostra progresso em tempo real com mensagens
específicas ("Criando seu ambiente...", "Configurando módulos...", "Gerando credenciais...").
Não é uma tela de loading genérica.

### 13.4 Acessibilidade

**R-UX-15** — WCAG 2.1 nível AA é o padrão mínimo. Sem exceções para páginas de onboarding
(fluxo crítico de negócio).

**R-UX-16** — Todos os elementos interativos são navegáveis por teclado. Tab order lógico
em formulários de múltiplas colunas (coluna 1 top→bottom, depois coluna 2).

**R-UX-17** — Focus ring visível em todos os elementos focados. O focus ring usa
`brand-primary` com offset de 2px.

**R-UX-18** — Erros de formulário nunca são indicados apenas por cor. Sempre há ícone
+ texto descritivo associado ao campo via `aria-describedby`.

**R-UX-19** — `prefers-reduced-motion` é respeitado em todos os componentes com animação.
Quando ativo, animações de entrada e transições são desabilitadas.

**R-UX-20** — Contraste mínimo WCAG AA para todo texto. Usar os tokens de cor definidos
no Design System — eles foram calculados para respeitar os ratios corretos.

---

## 14. REGRAS DE DESIGN SYSTEM

### 14.1 Tokens de Cor (uso obrigatório)

Os tokens abaixo são os únicos valores de cor permitidos. Valores hexadecimais hardcoded
em componentes são proibidos. Todo valor de cor vem de CSS variable.

**Superfícies:**

| Token CSS Variable | Hex | Uso |
|-------------------|-----|-----|
| `--surface-base` | `#050A14` | Background raiz |
| `--surface-elevated-1` | `#0A1628` | Cards, painéis primários |
| `--surface-elevated-2` | `#0F1E36` | Cards aninhados, dropdowns |
| `--surface-elevated-3` | `#162440` | Hover states, selecionados |
| `--surface-overlay` | `#1A2B4A` | Modais, popovers |
| `--surface-border` | `#1E3256` | Bordas padrão |
| `--surface-border-subtle` | `#152A4A` | Divisores sutis |

**Marca:**

| Token CSS Variable | Hex | Uso |
|-------------------|-----|-----|
| `--brand-primary` | `#00C2FF` | CTAs, links ativos, highlights |
| `--brand-primary-hover` | `#00A8E0` | Hover de botões primários |
| `--brand-primary-dim` | `#00C2FF1A` | Backgrounds de badges |
| `--brand-secondary` | `#0066CC` | Botões secundários |
| `--brand-glow` | `#00C2FF33` | Efeito glow em elementos críticos |

**Status:**

| Token CSS Variable | Hex | Uso |
|-------------------|-----|-----|
| `--status-success` | `#00E676` | Conectado, ativo, homologado |
| `--status-success-dim` | `#00E6761A` | Background badge success |
| `--status-warning` | `#FFB300` | Parcial, atenção, pendente |
| `--status-warning-dim` | `#FFB3001A` | Background badge warning |
| `--status-error` | `#FF3D57` | Falha, bloqueado, crítico |
| `--status-error-dim` | `#FF3D571A` | Background badge error |
| `--status-neutral` | `#546E8A` | Inativo, desabilitado |
| `--status-neutral-dim` | `#546E8A1A` | Background badge neutral |

**Texto:**

| Token CSS Variable | Hex | Uso |
|-------------------|-----|-----|
| `--text-primary` | `#E8F4FF` | Corpo principal, headings |
| `--text-secondary` | `#8BA9C5` | Subtítulos, metadados |
| `--text-tertiary` | `#546E8A` | Placeholders, auxiliares |
| `--text-disabled` | `#2D4A6A` | Estados desabilitados |
| `--text-link` | `#00C2FF` | Links e ações inline |

### 14.2 Escala Tipográfica (uso obrigatório)

| Token | Tamanho | Line Height | Família | Weight | Uso |
|-------|---------|-------------|---------|--------|-----|
| `display-2xl` | 64px | 1.1 | DM Sans | 700 | Hero headline |
| `display-xl` | 48px | 1.15 | DM Sans | 700 | Headings de seção major |
| `display-lg` | 36px | 1.2 | DM Sans | 600 | Headings de página |
| `heading-xl` | 28px | 1.3 | DM Sans | 600 | Subheadings principais |
| `heading-lg` | 22px | 1.35 | DM Sans | 600 | Card titles |
| `heading-md` | 18px | 1.4 | DM Sans | 500 | Títulos de componente |
| `body-lg` | 16px | 1.6 | IBM Plex Sans | 400 | Corpo principal |
| `body-md` | 14px | 1.55 | IBM Plex Sans | 400 | Corpo secundário |
| `body-sm` | 13px | 1.5 | IBM Plex Sans | 400 | Labels, metadados |
| `caption` | 11px | 1.4 | IBM Plex Sans | 500 | Tags, badges, overlines |
| `code-md` | 13px | 1.6 | IBM Plex Mono | 400 | Snippets, endpoints |
| `code-sm` | 12px | 1.5 | IBM Plex Mono | 400 | Inline code |

Tamanhos fora desta escala são proibidos. Se um tamanho novo for necessário,
adicionar à escala via PR de design system.

### 14.3 Espaçamento (uso obrigatório)

Escala baseada em múltiplos de 4px. Valores fora desta escala são proibidos.

`4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px · 80px · 96px · 128px`

### 14.4 Componentes — Regras de Uso

**R-DS-01** — Componentes do `packages/ui` são a única fonte de componentes base.
Não criar componentes primitivos (Button, Input, Badge, Card) fora do design system.

**R-DS-02** — Variantes de componente são definidas no design system e documentadas
no Storybook. Não criar variantes ad-hoc em componentes de feature.

**R-DS-03** — Animações seguem os tokens de duração definidos:
- Hover/focus: 100ms
- Tooltips, badges: 150ms
- Dropdowns, accordions: 200ms
- Modais, sheets: 300ms
- Page transitions: 500ms
- Contadores, narrativas: 800ms

**R-DS-04** — Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)`. Outros easings
são permitidos apenas com justificativa documentada no componente.

**R-DS-05** — Background base da aplicação é `--surface-base` (`#050A14`). Não é
preto puro. Não é substituído por preto em nenhum componente.

**R-DS-06** — Gradientes são usados apenas em: CTAs primários, backgrounds de hero,
bordas luminosas de cards premium. Não em texto corrido, ícones ou fundos de cards comuns.

**R-DS-07** — Ícones usam Lucide Icons com stroke-width 1.5px. Ícones filled
e ícones de outras bibliotecas são proibidos sem aprovação de design.

---

## 15. O QUE NUNCA DEVE SER FEITO

Esta seção lista ações proibidas absolutas. Nenhuma justificativa de prazo, conveniência
ou "é apenas temporário" autoriza violar estas regras.

### 15.1 Segurança — Proibições Absolutas

```
❌ Armazenar credenciais de banco de cliente fora do Vault
❌ Logar senhas, tokens completos ou dados de conexão de cliente
❌ Commitar arquivos .env com valores reais
❌ Criar endpoint sem autenticação em área protegida
❌ Usar HS256 para JWT (usar RS256)
❌ Armazenar refresh token em localStorage (usar HttpOnly cookie)
❌ Executar SQL raw fornecido pelo cliente sem sanitização
❌ Desabilitar validação de input "temporariamente" para testar
❌ Expor stack traces de erro em responses de produção
❌ Criar usuário de banco com permissões de escrita onde só leitura é necessária
```

### 15.2 Arquitetura — Proibições Absolutas

```
❌ Alterar decisões de ADR sem criar novo ADR aprovado
❌ Adicionar biblioteca não listada na stack sem ADR
❌ Criar nova rota que não está no sitemap aprovado sem aprovação
❌ Acessar banco diretamente no router ou service (apenas via repository)
❌ Importar SQLAlchemy fora de models.py e repository.py
❌ Criar endpoint sem schema Pydantic de response
❌ Fazer fetch de API diretamente em componente React
❌ Usar Pages Router em vez de App Router
❌ Usar npm ou yarn em vez de pnpm
❌ Criar worker Celery sem timeout explícito
❌ Criar worker sem política de DLQ
❌ Usar row-level security como única camada de isolamento de tenant
❌ Executar query cross-tenant (de um schema de tenant para outro)
❌ Criar tabela sem UUID como PK
❌ Criar tabela sem TimestampMixin
❌ Criar migration sem downgrade() funcional
❌ Executar SQL diretamente em banco de produção (sempre via migration)
```

### 15.3 Frontend — Proibições Absolutas

```
❌ Usar valores hexadecimais de cor hardcoded (sempre CSS variables)
❌ Usar fontes diferentes das três fontes oficiais como fonte primária
❌ Criar componente primitivo fora do packages/ui
❌ Usar tamanho de fonte fora da escala tipográfica
❌ Usar valor de espaçamento fora da escala de 4px
❌ Usar Google Analytics (proibido por LGPD e política de privacidade)
❌ Usar .js ou .jsx (apenas .ts e .tsx)
❌ Usar any explícito no TypeScript
❌ Criar lógica de negócio em page.tsx
❌ Usar Context API para estado global (usar Zustand)
❌ Criar loading state por página inteira (usar Suspense por seção)
❌ Usar Inter, Roboto, Arial ou System fonts como fonte primária
❌ Usar roxo/violeta como cor de destaque (reservado para outros produtos)
```

### 15.4 Produto — Proibições Absolutas

```
❌ Adicionar funcionalidade que não está na arquitetura aprovada sem ADR
❌ Criar nova página de produto além das definidas no sitemap
❌ Usar nomenclatura de módulo diferente da oficial (Alert, Strategy, Order, Task, Log, Pulse)
❌ Apresentar Agent e IaProc como módulos de produto no site público
❌ Usar posicionamento de "empresa de integração de dados" em nenhum texto
❌ Criar calculadora de ROI ou simuladores não previstos
❌ Criar landing pages paralelas fora da estrutura aprovada
❌ Fazer deploy em produção sem aprovação de 2 revisores
❌ Alterar schema de banco de produção sem migration aprovada
❌ Fazer rollback de migration em produção sem aprovação do Tech Lead
```

---

## 16. ADRS OBRIGATÓRIAS

As seguintes Architecture Decision Records estão aprovadas e são imutáveis sem novo ADR.

### ADR-001 — Monorepo com Turborepo

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Repositório único com Turborepo e pnpm workspaces.

**Justificativa:** Frontend, backend e infraestrutura compartilham tipos, schemas de validação
e constantes de domínio. Repositórios separados geram drift de contrato e overhead de PR.
Turborepo oferece pipelines isoladas por workspace e cache de build compartilhado.

**Alternativas descartadas:** Múltiplos repositórios (overhead de sincronização).

---

### ADR-002 — Next.js 14 com App Router

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Next.js 14 com App Router obrigatório. Pages Router proibido.

**Justificativa:** ISR nativo para páginas institucionais, Server Components para
performance, Route Groups para layouts distintos por área do produto, SEO de primeira
classe para páginas públicas.

**Alternativas descartadas:** SPA (Vite+React) — impossível SSG/ISR e SEO comprometido.
Remix — menor ecossistema no Brasil.

---

### ADR-003 — FastAPI com Python

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** FastAPI (Python 3.12) para o backend.

**Justificativa:** Async nativo para workers de diagnóstico, OpenAPI automático elimina
drift de documentação, Pydantic para validação tipada, ecossistema Python para ML futuro.

**Alternativas descartadas:** Django (síncrono), Node.js (perde tipagem e ecossistema ML),
Go (curva de aprendizado, sem ecossistema ML).

---

### ADR-004 — Schema-per-tenant no PostgreSQL

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Schema separado por tenant no PostgreSQL. Row-level security proibido
como única camada de isolamento.

**Justificativa:** Isolamento sem dependência de corretude de query — um bug que omite
filtro de tenant_id não vaza dados entre tenants. Backup granular por tenant possível.

**Alternativas descartadas:** RLS puro (risco de vazamento por bug de query),
database-per-tenant (connection pool insustentável em escala).

---

### ADR-005 — HashiCorp Vault para Credenciais de Cliente

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Credenciais de banco de cliente armazenadas exclusivamente no Vault.
Nenhum outro mecanismo é permitido.

**Justificativa:** Dynamic secrets com TTL de 5min, audit log nativo de acesso,
revogação imediata possível, policies por serviço. Alternativas (K8s Secrets, variáveis
de ambiente) são inaceitáveis para credenciais de produção de clientes.

**Alternativas descartadas:** AWS Secrets Manager (vendor lock-in), K8s Secrets
(base64 não é criptografia), variáveis de ambiente (inaceitável).

---

### ADR-006 — Celery + Redis para Filas

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Celery com Redis como broker para processamento assíncrono.

**Justificativa:** Diagnóstico de banco é assíncrono por natureza (até 60s). Retry
automático com backoff exponencial. DLQ nativa. Redis já presente na stack.

**Alternativas descartadas:** SQS (vendor lock-in AWS), RabbitMQ (tecnologia adicional),
background tasks síncronos (sem retry, sem DLQ, perda em crash).

---

### ADR-007 — D4Sign para Contratos Digitais

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** D4Sign para assinatura eletrônica de contratos.

**Justificativa:** Conformidade nativa com LGPD e ICP-Brasil, custo menor que DocuSign
para PME/mid-market, API documentada em português.

**Alternativas descartadas:** DocuSign (custo elevado, empresa americana, considerações LGPD),
implementação própria (complexidade legal e de auditoria).

---

### ADR-008 — Cloudflare para CDN, WAF e DNS

**Status:** Aprovado · **Data:** Sprint 0

**Decisão:** Cloudflare para CDN, WAF, DNS e storage de assets (R2).

**Justificativa:** WAF incluso no plano Pro sem custo adicional, DDoS protection automática,
R2 sem egress fees, PoPs em São Paulo para menor latência no Brasil.

**Alternativas descartadas:** AWS CloudFront (custo de egress, WAF separado),
Fastly (pricing mais elevado, menos PoPs no Brasil).

---

### Template para Novo ADR

Ao criar novo ADR, usar obrigatoriamente o formato:

```markdown
# ADR-NNN — Título da Decisão

**Status:** Proposto | Aprovado | Substituído por ADR-NNN
**Data:** YYYY-MM-DD
**Autor:** Nome do responsável
**Revisores:** Nomes dos revisores

## Contexto
Por que esta decisão está sendo tomada. Qual o problema.

## Decisão
O que foi decidido. Em uma frase clara.

## Justificativa
Por que esta é a melhor opção para o contexto da Terus.

## Alternativas Avaliadas
- Alternativa A: por que foi descartada
- Alternativa B: por que foi descartada

## Consequências
O que muda com esta decisão. Riscos e benefícios.

## Regras resultantes
Quais regras neste PROJECT_RULES.md são afetadas ou criadas.
```

---

## 17. PROCESSO DE DESENVOLVIMENTO

### 17.1 Fluxo de Branches

```
main         → produção. Protegido. Só recebe merge via PR com 2 aprovações.
develop      → staging. Protegido. Recebe merges de feature branches via PR com 1 aprovação.
feat/*       → novas funcionalidades
fix/*        → correções de bug
chore/*      → manutenção, dependências, configuração
docs/*       → documentação
test/*       → adição ou correção de testes
refactor/*   → refatoração sem mudança de comportamento
```

### 17.2 Critério de PR

Um PR só pode ser mergeado quando:

- [ ] CI pipeline passa (lint, typecheck, testes)
- [ ] Sem conflitos com a branch de destino
- [ ] Revisão de pelo menos 1 aprovador (develop) ou 2 aprovadores (main)
- [ ] Nenhum comentário de revisão aberto sem resposta
- [ ] Migrations (se houver) testadas em staging
- [ ] Se feature nova: está no sitemap/arquitetura aprovada ou tem ADR

### 17.3 Ordem de Implementação por Sprint

A ordem exata de sprints está definida na Fase 3.5, Parte 12. Resumo:

| Sprint | Semanas | Foco |
|--------|---------|------|
| 0 | 1–2 | Fundação, ambiente, CI/CD, banco base |
| 1 | 3–4 | Autenticação, Design System, layouts |
| 2 | 5–6 | Onboarding etapas 1–2 |
| 3 | 7–8 | Assistente de integração, Vault |
| 4 | 9–10 | Diagnóstico automatizado |
| 5 | 11–12 | Site institucional, Admin base |
| 6 | 13–14 | Contratos, Provisionamento, MVP Go Live |

### 17.4 Critério de MVP Go Live

O MVP só vai para produção quando **todos** os critérios abaixo estão atendidos:

| Critério | Validador |
|----------|-----------|
| Fluxo completo executado por cliente real sem ajuda | Product Owner |
| Zero credenciais de cliente em logs ou banco | Tech Lead (auditoria) |
| LCP < 2.5s na Home (Lighthouse production) | Frontend Lead |
| Zero vulnerabilidades críticas no Trivy scan | DevOps |
| Backup de banco testado e procedimento documentado | DevOps |
| Rollback testado em staging com sucesso | DevOps |
| Política de privacidade publicada e revisada juridicamente | Jurídico |
| Contratos NDA e Comercial revisados juridicamente | Jurídico |
| Smoke tests passando em produção | DevOps |
| Time de suporte briefado sobre o fluxo de onboarding | Product Owner |

### 17.5 Checklist Pré-desenvolvimento (Sprint 0)

Antes da primeira linha de código de produto:

**Produto:**
- [ ] Lista oficial dos 6 módulos confirmada com stakeholders
- [ ] ERPs prioritários para MVP confirmados (Winthor e RMS)
- [ ] Fluxo de aprovação manual definido (quem aprova, SLA)
- [ ] 2 cases reais com métricas disponíveis
- [ ] Métricas reais da Terus para a Home confirmadas e aprovadas
- [ ] Política de privacidade e termos de uso redigidos

**Infraestrutura:**
- [ ] Cluster Kubernetes provisionado (staging e production)
- [ ] PostgreSQL provisionado (staging e production)
- [ ] Redis provisionado
- [ ] HashiCorp Vault provisionado e inicializado
- [ ] Cloudflare configurado (DNS, CDN, WAF)
- [ ] Container registry configurado
- [ ] SMTP configurado (Resend ou Amazon SES)
- [ ] Conta D4Sign criada e API key obtida
- [ ] IP fixo da Terus confirmado para diagnóstico

**Repositório:**
- [ ] GitHub com proteção de branch em `main` e `develop`
- [ ] CODEOWNERS configurado
- [ ] Secrets do GitHub Actions configurados
- [ ] Dependabot habilitado
- [ ] Sentry configurado
- [ ] `.env.example` completo
- [ ] `./infra/scripts/setup-local.sh` testado em máquina limpa

**Design:**
- [ ] Logos da Terus em SVG disponíveis
- [ ] Logos de ERPs em SVG disponíveis (ou permissão de uso)
- [ ] Sanity CMS criado com schemas de módulos e cases
- [ ] Conteúdo dos 4 módulos MVP redigido
- [ ] Instruções técnicas Winthor validadas por especialista
- [ ] Instruções técnicas RMS validadas por especialista

---

## 18. GUIA DE USO PARA IAS

Esta seção é específica para Windsurf, Claude Code e outras IAs que trabalham neste projeto.

### 18.1 Antes de Gerar Qualquer Código

1. **Ler este documento inteiro** antes de começar qualquer tarefa.
2. **Ler o arquivo `CLAUDE.md`** na raiz do projeto.
3. **Ler o `CONTEXT.md`** do módulo específico onde vai trabalhar.
4. **Confirmar que a tarefa está dentro do escopo** do sprint atual e da arquitetura aprovada.
5. **Identificar o arquivo de referência mais parecido** já existente no projeto para seguir
   o mesmo padrão.

### 18.2 Tamanho Ideal de Tarefa

| Tamanho | Linhas | Adequado |
|---------|--------|----------|
| Micro | < 20 | Sim — um único endpoint, um hook simples |
| Pequeno | 20–100 | Sim — um use case, um componente de formulário |
| Médio | 100–300 | Sim, com contexto explícito no prompt |
| Grande | 300–800 | Dividir em subtarefas antes de executar |
| Muito grande | > 800 | Não executar — redecompor obrigatoriamente |

### 18.3 O que a IA Pode Fazer

```
✅ Implementar use cases individuais conforme especificação
✅ Criar componentes React seguindo o design system
✅ Escrever schemas Pydantic de request e response
✅ Implementar runners de diagnóstico individuais
✅ Escrever testes unitários e de integração
✅ Criar migrations Alembic para tabelas especificadas
✅ Implementar endpoints seguindo os contratos de API definidos
✅ Refatorar código mantendo o comportamento e os padrões
✅ Documentar código com comentários explicativos
✅ Identificar e reportar inconsistências com as regras deste documento
```

### 18.4 O que a IA Não Pode Fazer

```
❌ Alterar qualquer ADR
❌ Criar tabela não especificada na arquitetura sem aprovação humana
❌ Modificar políticas do Vault
❌ Fazer qualquer tipo de deploy
❌ Escrever SQL raw (bypassing SQLAlchemy)
❌ Criar endpoint sem autenticação em área protegida
❌ Modificar migrations já commitadas
❌ Adicionar biblioteca não listada na stack sem ADR
❌ Criar rota fora do sitemap aprovado sem aprovação
❌ Alterar qualquer regra deste documento
❌ Gerar código que viole qualquer regra da seção 15
```

### 18.5 Template de Prompt para Backend

```
# Contexto
Projeto: Terus Platform
Documento de regras: PROJECT_RULES.md (lido e respeitado)
Módulo: [nome do módulo]
CONTEXT.md do módulo: [conteúdo relevante do CONTEXT.md]

# Tarefa
Implementar: [NomeUseCase] em apps/api/app/core/[módulo]/use_cases.py

# Responsabilidade
[Uma frase do CONTEXT.md descrevendo o que este use case faz]

# Input
[Schema Pydantic já definido ou descrição dos campos]

# Output
[Schema Pydantic de retorno ou descrição]

# Regras de negócio obrigatórias
- [Regra 1]
- [Regra 2]

# Restrições técnicas
- Usar AsyncSession do SQLAlchemy
- Registrar em audit.audit_logs ao final
- Não armazenar [campo sensível] fora do Vault
- Seguir o padrão do arquivo [arquivo_de_referencia.py]
- Retornar a exceção [NomeException] de shared/exceptions.py em caso de [erro]

# Não implementar nesta tarefa
- [O que não deve ser incluído]
```

### 18.6 Template de Prompt para Frontend

```
# Contexto
Projeto: Terus Platform
Documento de regras: PROJECT_RULES.md (lido e respeitado)
Design System: Fase 2 do projeto (tokens de cor, tipografia, espaçamento)

# Tarefa
Implementar: [NomeComponente]
Localização: apps/web/components/[pasta]/[nome-componente].tsx

# Props interface
[Descrição da interface TypeScript esperada]

# Estados visuais
[Ex: default, hover, active, disabled, loading, error — conforme Fase 2]

# Design tokens obrigatórios
- Cor: [--token específico]
- Tipografia: [escala específica da Fase 2]
- Espaçamento: [valores da escala de 4px]

# Comportamento
- [Animação conforme tokens de duração da Fase 2]
- [Interação esperada]

# Restrições
- Componente é presentacional — sem fetch de API, sem Zustand
- Usar apenas CSS variables para cores
- Seguir o padrão do componente [componente_de_referência.tsx]

# Não incluir
- [O que não deve estar neste componente]
```

### 18.7 Como Reportar Inconsistência

Se durante a implementação for identificada uma inconsistência entre o que está sendo
pedido e o que está definido neste documento, a IA deve:

1. **Parar a implementação**
2. **Reportar explicitamente** qual regra está sendo violada e por quê
3. **Sugerir como implementar dentro das regras**
4. **Aguardar aprovação humana** antes de prosseguir

Implementar algo sabidamente em violação às regras "porque foi pedido" não é comportamento
correto. O desenvolvedor humano pode não saber que a regra existe.

---

## APÊNDICE A — Máquina de Estados do Onboarding

```
INITIATED
  → STEP_1_COMPLETE (após cadastro válido)
  → STEP_2_COMPLETE (após escolha de integração)
  → STEP_3_COMPLETE (após configuração de banco ou API)
  → DIAGNOSTIC_PENDING (job criado, aguardando worker)
  → DIAGNOSTIC_RUNNING (worker ativo)
  → DIAGNOSTIC_COMPLETE (todos os testes concluídos)
  → DIAGNOSTIC_FAILED (falha crítica — retorna para STEP_3_COMPLETE após correção)
  → CONTRACTS_PENDING (aguardando aprovação interna Terus)
  → CONTRACTS_SENT (D4Sign enviou os documentos)
  → CONTRACTS_SIGNED (todos os documentos assinados)
  → PROVISIONING_PENDING (aguardando worker)
  → PROVISIONING_RUNNING (worker ativo)
  → ACTIVE (tenant criado e operacional)
  → FAILED (falha não recuperável — requer intervenção manual)
```

---

## APÊNDICE B — Catálogo de APIs MVP

| Método | Endpoint | Auth | Sprint |
|--------|----------|------|--------|
| GET | `/health` | Nenhuma | 0 |
| POST | `/v1/auth/login` | Nenhuma | 1 |
| POST | `/v1/auth/refresh` | Refresh cookie | 1 |
| POST | `/v1/auth/logout` | JWT | 1 |
| POST | `/v1/onboarding/sessions` | Nenhuma | 2 |
| GET | `/v1/onboarding/sessions/{id}` | Session token | 2 |
| PUT | `/v1/onboarding/sessions/{id}/cadastro` | Session token | 2 |
| PUT | `/v1/onboarding/sessions/{id}/integracao` | Session token | 2 |
| GET | `/v1/onboarding/sessions/{id}/erp-instructions` | Session token | 2 |
| PUT | `/v1/onboarding/sessions/{id}/configuracao-banco` | Session token | 3 |
| POST | `/v1/onboarding/sessions/{id}/erp-nao-homologado` | Session token | 3 |
| POST | `/v1/diagnostic/jobs` | Session token | 4 |
| GET | `/v1/diagnostic/jobs/{id}` | Session token | 4 |
| GET | `/v1/diagnostic/jobs/{id}/items` | Session token | 4 |
| POST | `/v1/onboarding/sessions/{id}/contratos` | Session token | 6 |
| GET | `/v1/onboarding/sessions/{id}/contratos/status` | Session token | 6 |
| POST | `/v1/webhooks/dsign` | HMAC signature | 6 |
| GET | `/v1/admin/onboardings` | JWT + role:commercial | 5 |
| GET | `/v1/admin/onboardings/{id}` | JWT + role:commercial | 5 |
| POST | `/v1/admin/onboardings/{id}/approve` | JWT + role:commercial | 5 |
| POST | `/v1/provisioning/tenants` | Internal service key | 6 |
| GET | `/v1/provisioning/tenants/{id}/status` | JWT + role:admin | 6 |

---

## APÊNDICE C — Índices de Banco Obrigatórios

| Tabela | Coluna(s) | Tipo | Sprint |
|--------|-----------|------|--------|
| `platform_users` | `email` | UNIQUE | 1 |
| `tenants` | `slug` | UNIQUE | 1 |
| `tenants` | `schema_name` | UNIQUE | 1 |
| `onboarding_sessions` | `expires_at` | BTREE | 2 |
| `onboarding_sessions` | `status` | BTREE | 2 |
| `diagnostic_jobs` | `session_id` | BTREE | 4 |
| `diagnostic_jobs` | `status, created_at` | BTREE composto | 4 |
| `diagnostic_items` | `job_id` | BTREE | 4 |
| `audit_logs` | `tenant_id, created_at` | BTREE composto | 1 |
| `audit_logs` | `action, created_at` | BTREE composto | 1 |
| `erp_catalog` | `is_homologated` | BTREE parcial | 2 |
| `stock_snapshots` (tenant) | `store_id, product_id, snapshot_at` | BTREE composto | 6 |
| `alerts` (tenant) | `store_id, status, severity` | BTREE composto | 6 |

---

*Este documento é mantido pelo Tech Lead do projeto Terus Tecnologia.*
*Última atualização: baseada nas Fases 1, 2, 3 e 3.5 do projeto estratégico.*
*Para propor alterações: criar ADR em `docs/decisions/ADR-NNN-titulo.md` e abrir PR.*
