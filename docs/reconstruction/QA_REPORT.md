# Relatório de QA

## Fase 2 — 12/11/2026 (estado atual)

| Verificação | Resultado |
|---|---|
| CI do Draft PR #1 (Lint, Type Check, Build, Python Lint, Python Type Check, Python Tests com PostgreSQL 16) | ✅ 6/6 |
| API: `pytest` (26 testes) com FastAPI 0.162 / Starlette 1.10 | ✅ 26 passed |
| API: `pip-audit` | ✅ nenhuma vulnerabilidade conhecida (antes: Starlette 0.37.2 com várias) |
| E2E da jornada (`apps/site/e2e/journey.e2e.ts`) | ✅ 11/11 |
| QA de páginas: 22 páginas × 1440 px, 1024 px, iPhone 13 (HTTP 200, 1 h1, sem rolagem lateral, títulos únicos) | ✅ (falhava em 1024 px antes da correção do menu) |
| Preservação da LP | ✅ ver `LP_PRESERVATION_AUDIT.md` |

### Acessibilidade automatizada (axe-core 4.14, WCAG 2.0/2.1/2.2 A e AA, 1440 e 390 px)
| | LP atual (8 páginas) | Novo site (21 páginas) |
|---|---|---|
| Contraste | 472 nós | 15 nós (numerais decorativos `aria-hidden` e cartões 3D em transição) |
| Nome acessível ≠ texto visível | 14 | 0 |
| Região rolável sem teclado | 1 | 0 |

### Lighthouse 12.8 (local, `next start`, celular simulado salvo indicação)
| Página | Perf. | Acess. | Boas práticas | SEO | LCP |
|---|---|---|---|---|---|
| Novo · home (celular) | 81 | 100 | 100 | 100 | 4,3 s |
| Novo · plataforma (celular) | 86 | 100 | 100 | 100 | 4,2 s |
| Novo · tecnologia/agent (celular) | 94 | 100 | 100 | 100 | 3,1 s |
| Novo · começar (celular) | 85 | 100 | 100 | 100 | 4,4 s |
| Novo · criar conta (celular) | 90 | 100 | 96¹ | 66² | 3,5 s |
| LP · home (celular) | 88 | 96 | 100 | 100 | 3,8 s |
| Novo · home (desktop) | 99 | 96 | 100 | 100 | 0,8 s |
| LP · home (desktop) | 99 | 96 | 100 | 100 | 0,9 s |

¹ 401 esperado no console ao checar sessão de quem não entrou. ² `noindex` proposital.

### Dependências (pnpm audit)
- **Next.js 14.2.35** (LP e novo site): avisos altos/moderados corrigidos só a partir da 15.5.x
  (DoS em Server Components, SSRF/smuggling em rewrites, cache poisoning). O novo site usa
  rewrites para a API com destino fixo por variável de ambiente. Atualizar exige ADR (a stack
  fixa Next 14) e vale também para a LP em produção.
- Ferramentas de desenvolvimento (eslint 8, turbo 1.13, brace-expansion, js-yaml): avisos
  sem efeito no site publicado; atualizar junto com a migração do Next.

---

## Fase 1 (histórico)

Executado em 12/11/2026 no container da sessão (Node 22, Python 3.13, PostgreSQL 16 local,
Chromium do Playwright). Dados 100% sintéticos (CNPJs gerados, e-mails `example.com`).

## Backend — `apps/api`
| Verificação | Comando | Resultado |
|---|---|---|
| Lint | `ruff check app tests alembic` | ✅ sem erros |
| Formatação | `ruff format --check` | ✅ 55 arquivos |
| Tipos (strict) | `mypy app` | ✅ 46 arquivos, 0 erros |
| Migrations | `alembic upgrade head` → `downgrade base` → `upgrade head` | ✅ |
| Integração | `pytest -q` | ✅ **26 passed** |

Cobertura funcional dos testes: registro (validações, duplicidade, hash bcrypt, consentimentos),
login/logout com revogação do access token antigo, rotação e anti-replay do refresh, CSRF,
rate limit, recuperação completa (mailer de teste) e honesta (`not_configured`), imutabilidade
da auditoria, jornada vertical com logout/login em outro cliente, CNPJ inválido e duplicado
sem vazar dono, **bloqueio cross-tenant** (GET/PUT/POST em empresa alheia = 404, admin = 403),
fluxo completo do admin (busca por nome/CNPJ, filtros, transições inválidas, evidência
obrigatória para "contratado", responsável, notas internas invisíveis ao cliente, funil,
reabertura com histórico), regras de CNPJ/senha/score/recomendação.

## Frontend — `apps/web`
| Verificação | Resultado |
|---|---|
| `pnpm lint` (ESLint + Prettier) | ✅ sem avisos |
| `pnpm typecheck` | ✅ |
| `pnpm build` (sem flag, igual produção) | ✅ |
| `pnpm build` com `NEXT_PUBLIC_ONBOARDING_ENABLED=true` + `API_INTERNAL_URL` | ✅ |

## E2E — `apps/web/e2e/journey.e2e.ts` (stack real)
```
✔ 1. Home → módulo → Começar agora
✔ 9a. Formulário de conta inválido mostra erros claros
✔ 2. Criar conta (sessão por cookie HttpOnly)
✔ 9b + 3. CNPJ inválido é recusado; empresa cadastrada
✔ 4. Qualificação (ERP, prioridades, prazo)
✔ 5. Solicitação de proposta gravada no servidor
✔ 10. Dependências externas não aparecem como concluídas
✔ 6. Logout → login em outro dispositivo → progresso íntegro
✔ 8. Outra organização não acessa os dados
✔ 7. Equipe Terus vê e gerencia a solicitação
✔ Recuperação de acesso informa que o e-mail não está configurado
11/11 cenários passaram
```
Os 10 casos mínimos do doc 07 do pacote estão cobertos.

## Páginas públicas — `apps/web/e2e/screenshots.e2e.ts`
15 páginas × 2 viewports (1440 px e iPhone 13): HTTP 200, exatamente um `h1`, **sem rolagem
horizontal**, títulos únicos. Capturas em `docs/reconstruction/screenshots/`.

## Produção protegida (build sem flag)
`/`, `/plataforma`, `/comecar`, `/privacidade` → 200; `/criar-conta`, `/portal`, `/admin`,
`/onboarding/empresa`, `/api/v1/*` → 404; sem link "Entrar"; `/comecar` usa o pré-cadastro por WhatsApp.

## Bugs encontrados e corrigidos durante o QA
1. Após cadastrar a empresa, o cache da lista estava vazio e a guarda devolvia o usuário à
   etapa anterior → cache atualizado com a resposta do servidor.
2. A origem UTM nunca era capturada → `AttributionCapture` nos layouts; validado no E2E.
3. Painel ilustrativo da home exibia "Online" → rotulado "Ilustração".
4. `/health` reportava serviços como "up" sem checar → checagem real.

## Não executado
Lighthouse, leitor de tela real, teste de carga, varredura de dependências. Ficam como pendência.
