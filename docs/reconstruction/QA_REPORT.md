# Relatório de QA

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
