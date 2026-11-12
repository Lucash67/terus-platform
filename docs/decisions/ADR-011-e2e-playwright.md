# ADR-011 — E2E com Playwright sem nova dependência de runtime

**Status:** Proposto · **Data:** 12/11/2026

**Decisão.** Os testes ponta a ponta (`apps/web/e2e/*.e2e.ts`) usam o Playwright já instalado
no ambiente de execução e rodam com o Node 22 (type stripping), sem adicionar
`@playwright/test` ao `package.json`. Rodam contra a stack real (Next + FastAPI + PostgreSQL)
com dados sintéticos.

**Justificativa.** Cumpre a exigência de E2E do pacote DX 2.0 sem incluir biblioteca fora da
stack. Se a equipe quiser E2E na CI, um ADR futuro pode adotar `@playwright/test` com runner.

**Consequência.** O diretório `e2e/` é excluído do `tsc` do app (o módulo global não tem tipos).
