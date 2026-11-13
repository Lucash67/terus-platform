# Inventário de fontes — Digital Experience 2.0

Data da auditoria: 12/11/2026 · SHA de partida: `f5f525d04a2d59ee9a238e2346db037a0d6f64a2` (main) ·
Branch de trabalho: `claude/tender-gauss-ld4sso`

| Fonte | Acesso nesta sessão | Uso |
|---|---|---|
| Pacote ZIP (9 documentos 00–08) | Lido integralmente | Missão, escopo, regras de veracidade |
| GitHub `Lucash67/terus-platform` | Clonado (50 commits) | Código, histórico, CLAUDE.md, PROJECT_RULES.md, docs |
| `wiki.terus.tec.br/varejo` | Fase 1: bloqueado · **Fase 2: lido** (7 páginas) | Usado indiretamente: o repositório já contém conteúdo validado na wiki (`lib/constants/modules.ts`, `site-data.ts`, `lp.ts`) |
| `terustec.com.br` | **Fase 2: lido** (home + 10 subpáginas) | Texto das páginas de tecnologia |
| `terus.tec.br` | **Fase 2: lido** | LP servida via Cloudflare com WhatsApp antigo |
| `terus-platform-web.vercel.app` | **Fase 2: lido** | Igual ao build do main |
| `Lucash67/terusfarm`, `Lucash67/simuladorterus` | Fora do escopo de acesso GitHub desta sessão | Não usados |
| Vercel (MCP) | Exige autorização do time `lucash67s-projects` | Preview não verificado |
| Busca web | Sem resultados sobre a Terus | Não usada |

## Inventário do repositório na partida
- `apps/web`: Next.js 14, 19 rotas (LP com menu oculto), onboarding legado em 7 etapas.
- `apps/api`: FastAPI com `/health` (reportava `database: up` fixo, sem checar) e `/`.
- `packages/ui` (Button, Card, Badge, Input, Label, Select), `schemas`, `types`, `config`.
- CI: lint, typecheck, build, ruff, mypy. Sem testes.
