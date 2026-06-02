# CLAUDE.md — Terus Platform
# Contexto permanente para Claude Code, Windsurf e agentes de IA

> Leia este arquivo inteiro antes de gerar qualquer código.
> Documento completo: `PROJECT_RULES.md` — consultar para detalhes.

---

## PRODUTO

**Terus Tecnologia** é uma plataforma SaaS de **Supply Chain Intelligence**.
Integra varejo, indústria e distribuição em tempo real. Resolve ruptura de gôndola,
excesso de estoque e automação de reposição.

**Posicionamento obrigatório:** "Supply Chain Intelligence" — nunca "integração de dados".

**Módulos oficiais (nomenclatura definitiva):**
- Terus Alert · Terus Strategy · Terus Order · Terus Task · Terus Log · Terus Pulse

**Critério de sucesso do MVP:**
> Cliente varejo com ERP Winthor ou RMS completa o onboarding sem intervenção manual da Terus.

---

## STACK OFICIAL

### Frontend
```
Next.js 14        App Router OBRIGATÓRIO. Pages Router PROIBIDO.
TypeScript 5.x    strict mode. Sem `any` explícito.
Tailwind CSS 3.x  Utility-first. CSS modules PROIBIDO.
shadcn/ui + Radix Componentes base via packages/ui
Zustand 4.x       Estado global. Context API PROIBIDO para estado global.
React Hook Form   + Zod. Sem Formik. Sem validação manual.
TanStack Query 5  Fetch de API. Fetch direto em componente PROIBIDO.
pnpm 8.x          npm e yarn PROIBIDOS.
```

### Backend
```
FastAPI 0.110+    Async OBRIGATÓRIO.
Python 3.12+
SQLAlchemy 2.x    Async. SQL raw PROIBIDO na aplicação.
Alembic           Toda mudança de schema via migration.
Pydantic v2       Schema para TODO request e response.
Celery 5.x        Workers assíncronos. Com Redis como broker.
Redis 7.x         Cache, sessões, filas.
Ruff              Linter + formatter. Substitui black + flake8.
mypy              Strict mode.
```

### Infraestrutura e Serviços
```
PostgreSQL 16     Schema-per-tenant. RLS como única proteção PROIBIDO.
HashiCorp Vault   Credenciais de cliente. NUNCA em variável de ambiente.
Cloudflare        CDN, WAF, DNS, R2 storage.
D4Sign            Contratos digitais. DocuSign PROIBIDO.
Sanity            CMS headless para módulos e cases.
Sentry            Error tracking desde Sprint 0.
Plausible/PostHog Analytics. Google Analytics PROIBIDO.
```

### Fontes Tipográficas
```
DM Sans          Display/Heading (500, 600, 700)
IBM Plex Sans    Corpo/Interface (400, 500)
IBM Plex Mono    Código/Técnico (400, 500)
Inter/Roboto/Arial PROIBIDAS como fonte primária.
```

---

## ESTRUTURA DO MONOREPO

```
terus-platform/
├── apps/
│   ├── web/          Next.js 14 — frontend
│   └── api/          FastAPI — backend
├── packages/
│   ├── ui/           Design system (shadcn/ui customizados)
│   ├── types/        TypeScript types compartilhados
│   ├── schemas/      Zod schemas compartilhados
│   └── config/       ESLint, TypeScript, Tailwind configs
├── infra/
│   ├── docker/       docker-compose local
│   ├── k8s/          Kubernetes (base + overlays)
│   └── vault/        Políticas do Vault
├── docs/
│   ├── architecture/ Fases 1–3.5
│   └── decisions/    ADRs
├── CLAUDE.md         ← este arquivo
└── PROJECT_RULES.md  ← constituição técnica completa
```

### Grupos de Rotas Next.js
```
(marketing)   → Navbar completa + Footer
               Home, Plataforma, Módulos, Ecossistema, Cases, Sobre, Status

(onboarding)  → Navbar simplificada + Stepper
               /onboarding/* (7 etapas)

(tecnico)     → Navbar + Sidebar técnica
               /central-tecnica/*

(admin)       → Sidebar + Auth guard
               /admin/* (área interna Terus)
```

### Camadas Backend
```
api/            Roteamento HTTP + schemas Pydantic. SEM lógica de negócio.
core/           Domínio: service → use_case → repository → model
infrastructure/ Implementações: database, cache, vault, queue, notifications
workers/        Celery tasks: diagnostic, provisioning, contracts, notifications
shared/         Transversais: exceptions, pagination, audit
```

---

## CONVENÇÕES

### Nomenclatura
```
Arquivos React/TS    kebab-case          diagnostic-panel.tsx
Componentes          PascalCase          DiagnosticPanel
Hooks                use + camelCase     useOnboardingStore
Arquivos Python      snake_case          diagnostic_service.py
Classes Python       PascalCase          DiagnosticService
Funções Python       snake_case          run_nat_test()
Endpoints            kebab-case          /v1/onboarding-sessions
Tabelas banco        snake_case plural   onboarding_sessions
Colunas banco        snake_case          created_at, tenant_id
Branches             type/scope-desc     feat/onboarding-step-1
Env vars             UPPER_SNAKE_CASE    DATABASE_URL
CSS tokens           --namespace-name    --color-brand-primary
```

### Commits (Conventional Commits obrigatório)
```
feat(scope): descrição em português
fix(scope): descrição
chore(scope): descrição
docs(scope): descrição
test(scope): descrição
refactor(scope): descrição
```

---

## REGRAS DE ARQUITETURA

### Camadas Backend (inviolável)
```
Router    → recebe request, valida Pydantic, chama service, retorna response
Service   → orquestra use cases. NÃO acessa banco diretamente.
Use Case  → UMA responsabilidade. Chama repository.
Repository→ ÚNICO ponto de acesso ao banco.
```

Dependência em um único sentido: `Router → Service → Use Case → Repository`

### Componentes Frontend (inviolável)
```
packages/ui          → Presentacional puro. Sem fetch, sem Zustand, sem domain types.
components/sections  → Pode usar TanStack Query. Sem Zustand.
components/onboarding→ Pode usar Zustand e TanStack Query.
app/**/page.tsx      → Apenas composição de seções. Sem lógica.
```

### Multi-tenancy
```
Estratégia: schema-per-tenant no PostgreSQL.
Schema público: public (plataforma), onboarding, audit
Schema cliente: tenant_{uuid_curto}
Cross-tenant queries: PROIBIDAS.
RLS como única proteção: PROIBIDO.
```

### Filas Celery
```
diagnostic.high      → 4 workers, crítica, cliente aguardando
provisioning.default → 2 workers, alta prioridade
contracts.default    → 2 workers, média
notifications.default→ 2 workers, média
audit.low            → 1 worker, baixa
```

Toda fila tem DLQ configurada. Toda task é idempotente. Toda task tem timeout.

---

## REGRAS DE BANCO

```
PK                → UUID em toda tabela. Auto-increment PROIBIDO.
Timestamps        → TimestampMixin obrigatório (created_at, updated_at TIMESTAMPTZ).
Dados sensíveis   → Senhas: bcrypt hash. Credenciais cliente: vault_path APENAS.
Tipos             → ENUM PostgreSQL para campos de valor fixo. VARCHAR livre EVITADO.
Migrations        → Toda mudança via Alembic. SQL direto em produção PROIBIDO.
Downgrade         → Toda migration tem upgrade() e downgrade() funcionais.
Naming migration  → {timestamp}_{descricao}.py
Queries           → Via SQLAlchemy. SQL raw PROIBIDO. Paginação OBRIGATÓRIA em listas.
N+1               → PROIBIDO. Usar selectinload ou joinedload.
Índices           → Obrigatório em FKs, filtros frequentes, colunas UNIQUE.
```

### Schemas Oficiais
```
public       → tenants, platform_users, erp_catalog, module_catalog, tenant_modules
onboarding   → onboarding_sessions, onboarding_step_data, onboarding_db_configs,
               diagnostic_jobs, diagnostic_items, contract_documents
audit        → audit_logs (imutável — sem UPDATE ou DELETE)
tenant_NNN   → stores, products, stock_snapshots, alerts, order_requests, tasks
```

---

## REGRAS DE API

```
Versionamento → prefixo /v1/. Breaking change → /v2/.
Schemas       → Pydantic obrigatório para request body e response. dict PROIBIDO.
REST semântico→ GET leitura, POST criação/ação, PUT atualização, PATCH parcial, DELETE remoção.
Status codes  → 200 sucesso, 201 criado, 204 sem corpo, 400 negócio, 401 não autenticado,
                403 não autorizado, 404 não encontrado, 409 conflito, 500 erro interno.
Erro padrão   → {"error": "CODE", "message": "Legível", "detail": [...]}
Auditoria     → Toda operação crítica registra em audit.audit_logs antes de retornar.
```

### Autenticação por área
```
Site público       → Sem auth
Onboarding         → Session token (JWT sub:session_id, TTL 72h)
Cliente autenticado→ Access token JWT RS256 (15min) + Refresh HttpOnly cookie (7d)
Admin Terus        → JWT RS256 + RBAC + MFA (Enterprise)
```

### Catálogo de APIs MVP
```
GET  /health
POST /v1/auth/login
POST /v1/auth/refresh
POST /v1/auth/logout
POST /v1/onboarding/sessions
GET  /v1/onboarding/sessions/{id}
PUT  /v1/onboarding/sessions/{id}/cadastro
PUT  /v1/onboarding/sessions/{id}/integracao
GET  /v1/onboarding/sessions/{id}/erp-instructions
PUT  /v1/onboarding/sessions/{id}/configuracao-banco
POST /v1/onboarding/sessions/{id}/erp-nao-homologado
POST /v1/diagnostic/jobs
GET  /v1/diagnostic/jobs/{id}
GET  /v1/diagnostic/jobs/{id}/items
POST /v1/onboarding/sessions/{id}/contratos
GET  /v1/onboarding/sessions/{id}/contratos/status
POST /v1/webhooks/dsign
GET  /v1/admin/onboardings
GET  /v1/admin/onboardings/{id}
POST /v1/admin/onboardings/{id}/approve
POST /v1/provisioning/tenants           (internal)
GET  /v1/provisioning/tenants/{id}/status
```

---

## REGRAS DE FRONTEND

```
TypeScript    → Obrigatório. .js/.jsx PROIBIDOS. `any` explícito PROIBIDO.
Fetch         → Sempre via TanStack Query (useQuery/useMutation). Fetch direto PROIBIDO.
Formulários   → React Hook Form + Zod. Formik PROIBIDO. Validação manual PROIBIDA.
Estado global → Zustand. Context API PROIBIDA para estado global.
Componentes   → packages/ui para primitivos. Não criar Button/Input/Card fora do DS.
Server/Client → Server Components por padrão. "use client" apenas quando necessário.
Cores         → Apenas CSS variables (--color-*). Hex hardcoded PROIBIDO.
Fontes        → DM Sans, IBM Plex Sans, IBM Plex Mono. Outras PROIBIDAS como primária.
Espaçamento   → Escala de 4px. Valores fora da escala PROIBIDOS.
Imagens       → next/image obrigatório. <img> direto PROIBIDO.
Links         → <Link> do Next.js. <a href> apenas para links externos.
```

### Estratégia de Renderização
```
ISR  → Home, Módulos, Ecossistema, Cases (revalidação configurada)
SSG  → Plataforma, Sobre
SSR  → Status, Onboarding/*, Admin/*
```

### Design Tokens de Cor (obrigatórios)
```css
--surface-base:          #050A14   /* background raiz */
--surface-elevated-1:    #0A1628   /* cards primários */
--surface-elevated-2:    #0F1E36   /* cards aninhados */
--surface-elevated-3:    #162440   /* hover states */
--surface-border:        #1E3256   /* bordas padrão */
--brand-primary:         #00C2FF   /* CTAs, links ativos */
--brand-primary-dim:     #00C2FF1A /* backgrounds de badge */
--brand-secondary:       #0066CC   /* botões secundários */
--status-success:        #00E676
--status-warning:        #FFB300
--status-error:          #FF3D57
--status-neutral:        #546E8A
--text-primary:          #E8F4FF
--text-secondary:        #8BA9C5
--text-tertiary:         #546E8A
--text-link:             #00C2FF
```

---

## REGRAS DE BACKEND

```
Camadas     → Router → Service → Use Case → Repository. Sentido único.
SQLAlchemy  → Apenas em models.py e repository.py. PROIBIDO em service, use_case, router.
Pydantic    → Schema para TODO endpoint (request + response). dict PROIBIDO como retorno.
Async       → Toda função que acessa banco ou I/O é async/await.
Idempotência→ Toda Celery task é idempotente (mesmo task_id = no-op em 2ª execução).
Timeout     → Toda task Celery tem timeout explícito. Workers sem timeout PROIBIDOS.
DLQ         → Toda fila tem dead letter queue configurada.
Vault       → Credenciais de cliente: TTL 5min, revogação obrigatória após uso.
Logs        → JSON estruturado obrigatório. Senhas/tokens NUNCA em log.
```

### Estrutura de Use Case (padrão)
```python
# Uma classe = uma responsabilidade
# Input via dataclass ou Pydantic model
# Output via dataclass ou Pydantic model
# Registra em audit_log ao final de operação crítica
# Exceções via shared/exceptions.py — nunca Exception genérica
```

### Runners de Diagnóstico
```
NatRunner         → TCP connectivity, timeout 5s
AuthRunner        → Login no banco, timeout 10s
PermissionRunner  → SELECT em tabelas, timeout 10s
QueryRunner       → Queries por ERP do erp_catalog, timeout 15s
PerformanceRunner → Latência básica, timeout 20s
```

---

## AUDITORIA (obrigatória)

Registrar em `audit.audit_logs` obrigatoriamente para:

```
onboarding.session.created     onboarding.step.saved
diagnostic.job.started         diagnostic.job.completed
diagnostic.item.result         onboarding.approved
contract.sent                  contract.signed
tenant.created                 tenant.modules.configured
auth.login.success             auth.login.failed
auth.token.refreshed           auth.logout
admin.tenant.accessed          *.deleted (qualquer deleção)
```

Tabela `audit_logs` é **imutável**. Usuário de banco não tem permissão de UPDATE/DELETE nela.

---

## ANTI-PADRÕES PROIBIDOS

```
❌ Credenciais de banco de cliente fora do Vault
❌ Senhas, tokens ou connection strings em logs
❌ .env commitado no repositório
❌ Endpoint sem autenticação em área protegida
❌ JWT com HS256 (usar RS256)
❌ Refresh token em localStorage (usar HttpOnly cookie)
❌ SQL raw na aplicação (sempre SQLAlchemy)
❌ Fetch direto em componente React
❌ any explícito no TypeScript
❌ Cor hexadecimal hardcoded (sempre CSS variable)
❌ Tabela sem UUID como PK
❌ Tabela sem TimestampMixin
❌ Migration sem downgrade()
❌ SQL direto em banco de produção (sempre migration)
❌ Query cross-tenant (de um schema para outro)
❌ RLS como única proteção de tenant
❌ Lógica de negócio em page.tsx
❌ Lógica de negócio em router FastAPI
❌ SQLAlchemy importado fora de models.py e repository.py
❌ Celery task sem timeout
❌ Celery task sem DLQ
❌ npm ou yarn (usar pnpm)
❌ Pages Router (usar App Router)
❌ Google Analytics
❌ DocuSign (usar D4Sign)
❌ Adicionar biblioteca fora da stack sem ADR
❌ Criar rota fora do sitemap sem aprovação
❌ Alterar ADR sem criar novo ADR
❌ Deploy sem aprovação humana
```

---

## FLUXO DE DESENVOLVIMENTO

### Branches
```
main      → produção (protegido, 2 aprovações)
develop   → staging (protegido, 1 aprovação)
feat/*    fix/*    chore/*    docs/*    test/*    refactor/*
```

### Sprints MVP
```
Sprint 0  (sem 1–2)   Fundação: ambiente, CI, banco, health endpoint
Sprint 1  (sem 3–4)   Auth + Design System + layouts
Sprint 2  (sem 5–6)   Onboarding etapas 1–2 + banco base
Sprint 3  (sem 7–8)   Assistente de integração + Vault
Sprint 4  (sem 9–10)  Diagnóstico automatizado
Sprint 5  (sem 11–12) Site institucional + Admin base
Sprint 6  (sem 13–14) Contratos + Provisionamento + MVP Go Live
```

### Antes de gerar código
1. Ler este arquivo inteiro
2. Identificar o módulo/camada exata onde a tarefa ocorre
3. Ler o `CONTEXT.md` do módulo se existir
4. Identificar arquivo de referência mais parecido já existente
5. Confirmar que a tarefa está no escopo do sprint atual

### Tamanho de tarefa ideal para IA
```
< 20 linhas    → micro (um endpoint, um hook simples)
20–100 linhas  → pequeno (um use case, um componente)
100–300 linhas → médio (com contexto explícito no prompt)
> 300 linhas   → DIVIDIR em subtarefas antes de executar
```

---

## O QUE A IA PODE E NÃO PODE FAZER

### Pode
```
✅ Implementar use cases conforme especificação
✅ Criar componentes seguindo o design system
✅ Escrever schemas Pydantic
✅ Implementar runners de diagnóstico individuais
✅ Escrever testes unitários e de integração
✅ Criar migrations para tabelas especificadas
✅ Implementar endpoints conforme catálogo de APIs
✅ Refatorar mantendo comportamento e padrões
✅ Identificar e reportar violações deste documento
```

### Não pode
```
❌ Alterar ADRs
❌ Criar tabela não especificada na arquitetura
❌ Modificar políticas do Vault
❌ Fazer deploy de qualquer natureza
❌ Adicionar biblioteca fora da stack
❌ Criar rota fora do sitemap
❌ Modificar migrations já commitadas
❌ Alterar regras deste documento ou do PROJECT_RULES.md
❌ Gerar código que viole qualquer anti-padrão listado acima
```

### Se identificar inconsistência
1. Parar a implementação
2. Reportar qual regra está sendo violada
3. Sugerir como implementar dentro das regras
4. Aguardar aprovação humana antes de prosseguir

---

## REFERÊNCIAS

```
PROJECT_RULES.md          → Constituição técnica completa (fonte de verdade)
docs/architecture/fase-1  → Arquitetura do produto, sitemap, jornadas
docs/architecture/fase-2  → UX/UI, wireframes, design system
docs/architecture/fase-3  → Arquitetura técnica detalhada
docs/architecture/fase-3.5→ Plano de execução, roadmap de sprints
docs/decisions/ADR-*.md   → Decisões arquiteturais com justificativas
apps/api/app/core/*/CONTEXT.md → Contexto por módulo de backend
```

---

*Terus Platform · Supply Chain Intelligence · v1.0.0*
