# Execução local e implantação

## Rodar localmente
Pré-requisitos: Node 18+, pnpm 8, Python 3.12+, Poetry, PostgreSQL 16.

```bash
# 1. Banco
createdb terus_dev            # ou: docker compose -f infra/docker/docker-compose.yml up -d

# 2. API
cd apps/api
poetry install
export DATABASE_URL=postgresql+asyncpg://postgres@127.0.0.1:5432/terus_dev
poetry run alembic upgrade head
TERUS_STAFF_PASSWORD='TroqueEsta123' poetry run python -m app.cli create-staff \
  --email voce@empresa.com --name "Seu nome" --role terus_admin
poetry run uvicorn app.main:app --port 8000

# 3. Web (outro terminal)
cd apps/web && pnpm install
NEXT_PUBLIC_ONBOARDING_ENABLED=true API_INTERNAL_URL=http://127.0.0.1:8000 pnpm dev
```
Abra http://localhost:3000 → "Começar agora". Painel: http://localhost:3000/admin.

## Testes
```bash
cd apps/api && TEST_DATABASE_URL=postgresql+asyncpg://postgres@127.0.0.1:5432/terus_test poetry run pytest -q
cd apps/web && STAFF_EMAIL=... STAFF_PASSWORD=... node e2e/journey.e2e.ts   # com a stack rodando
cd apps/web && node e2e/screenshots.e2e.ts
```

## Variáveis
| Onde | Variável | Observação |
|---|---|---|
| API | `ENVIRONMENT` | `production`/`preview` exigem chaves JWT |
| API | `DATABASE_URL` | PostgreSQL 16 (asyncpg) |
| API | `JWT_PRIVATE_KEY`, `JWT_PUBLIC_KEY` | PEM RSA 2048; em secret manager, nunca no repo |
| API | `COOKIE_SECURE=true` | obrigatório em HTTPS |
| API | `CORS_ORIGINS`, `PUBLIC_WEB_URL` | domínio do site |
| Web | `NEXT_PUBLIC_ONBOARDING_ENABLED` | `true` só no ambiente que tiver API |
| Web | `API_INTERNAL_URL` | URL da API; lida no build (rewrites) |

## Implantação (não realizada — exige aprovação)
1. **Produção do site não foi alterada.** Nada foi enviado ao `main`.
2. Para uma prévia com a jornada funcionando é preciso: PostgreSQL gerenciado, hospedagem da
   API (container), chaves RS256 e, na Vercel (ambiente *Preview*), as variáveis
   `NEXT_PUBLIC_ONBOARDING_ENABLED=true` e `API_INTERNAL_URL`.
3. Sem essas variáveis, um deploy da branch mostra só o site institucional (a jornada fica
   oculta, como em produção).
4. Rollback: as migrations têm `downgrade`; o site volta revertendo o merge.
