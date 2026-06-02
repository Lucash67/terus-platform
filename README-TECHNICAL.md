# Terus Platform - Sprint 0

Fundação técnica da plataforma Terus - Supply Chain Intelligence.

## Status

**Sprint 0** - Fundação técnica completa ✓

## Estrutura do Monorepo

```
terus-platform/
├── apps/
│   ├── web/          Next.js 14 - Frontend
│   └── api/          FastAPI - Backend
├── packages/
│   ├── ui/           Design system (shadcn/ui customizados)
│   ├── types/        TypeScript types compartilhados
│   ├── schemas/      Zod schemas compartilhados
│   └── config/       ESLint, TypeScript, Tailwind configs
├── infra/
│   └── docker/       Docker Compose local (PostgreSQL + Redis)
├── docs/
│   ├── architecture/ Documentação de arquitetura
│   └── decisions/    ADRs (Architecture Decision Records)
├── CLAUDE.md         Contexto para IAs
├── PROJECT_RULES.md  Constituição técnica completa
└── turbo.json        Configuração Turborepo
```

## Stack Tecnológica

### Frontend
- Next.js 14 (App Router)
- TypeScript 5.x
- Tailwind CSS 3.x
- shadcn/ui + Radix UI
- Zustand (estado global)
- React Hook Form + Zod
- TanStack Query 5
- pnpm 8.x

### Backend
- FastAPI 0.110+
- Python 3.12+
- SQLAlchemy 2.x (async)
- Alembic (migrations)
- Pydantic v2
- Celery 5.x + Redis 7.x
- Ruff (linter + formatter)
- mypy (strict mode)

### Infraestrutura
- PostgreSQL 16
- Redis 7.x
- Docker Compose (desenvolvimento local)

## Pré-requisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Python 3.12+
- Poetry
- Docker & Docker Compose

## Setup Local

### 1. Instalar dependências do monorepo

```bash
pnpm install
```

### 2. Iniciar PostgreSQL e Redis

```bash
cd infra/docker
docker-compose up -d
```

### 3. Configurar variáveis de ambiente

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local

# Backend
cp apps/api/.env.example apps/api/.env
```

### 4. Instalar dependências Python

```bash
cd apps/api
poetry install
```

## Comandos de Desenvolvimento

### Monorepo

```bash
pnpm dev          # Iniciar todos os serviços
pnpm build        # Build de todos os pacotes
pnpm lint         # Lint de todos os pacotes
pnpm typecheck    # Typecheck de todos os pacotes
```

### Frontend (apps/web)

```bash
cd apps/web
pnpm dev          # Iniciar Next.js em http://localhost:3000
pnpm build        # Build para produção
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

### Backend (apps/api)

```bash
cd apps/api
poetry run uvicorn app.main:app --reload  # Iniciar FastAPI em http://localhost:8000
poetry run ruff check app/               # Lint
poetry run mypy app/                     # Type check
```

## Endpoints Disponíveis

### Health Check

```bash
GET http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-06-01T00:00:00",
  "services": {
    "database": "up",
    "redis": "up",
    "vault": "skipped"
  }
}
```

### API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Próximos Passos (Sprint 1)

- Autenticação (JWT + RBAC)
- Design System completo (mais componentes)
- Layouts (Navbar, Footer, Sidebar)
- Configuração de Sentry

## Documentação

- `CLAUDE.md` - Contexto para IAs (Windsurf, Claude Code)
- `PROJECT_RULES.md` - Constituição técnica completa
- `docs/architecture/` - Documentação de arquitetura
- `docs/decisions/` - ADRs aprovados

## Convenções

- Commits: Conventional Commits (feat, fix, chore, docs, test, refactor)
- Branches: `type/scope-description` (ex: feat/onboarding-step-1)
- Nomenclatura: kebab-case para arquivos, PascalCase para componentes

## Suporte

Para dúvidas ou problemas, consulte a documentação em `docs/architecture/` ou entre em contato com o time técnico.
