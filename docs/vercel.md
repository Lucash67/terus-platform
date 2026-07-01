# Terus Platform — Vercel

> Documentação oficial da infraestrutura de deploy frontend na Vercel.
> **Não recriar projeto. Não alterar configurações sem aprovação.**

---

## Identificação do projeto

| Campo | Valor |
|-------|-------|
| **Projeto Vercel** | `terus-platform-web` |
| **Team** | `lucash67s-projects` |
| **Repositório GitHub** | `Lucash67/terus-platform` |
| **Root Directory** | `apps/web` |
| **Framework** | Next.js |
| **Branch de produção** | `main` |
| **URL de produção** | https://terus-platform-web.vercel.app |
| **Versão em produção** | v0.4.0 — Institutional Layer Complete |
| **Commit em produção** | `5b50ec1` — *feat(web): executive polish and launch readiness — Fase 3C* |

---

## Integração GitHub → Vercel

### Status

| Item | Status |
|------|--------|
| Repositório conectado | ✅ Ativo |
| Deploy automático | ✅ Ativo em push para `main` |
| Preview deploys | ✅ Branches/PRs (padrão Vercel) |
| Variáveis de ambiente | Não necessárias (site estático) |

### Fluxo de deploy

```
git push origin main
        ↓
GitHub webhook → Vercel
        ↓
Vercel detecta push em main
        ↓
Install: pnpm install (raiz do monorepo)
        ↓
Build: next build (apps/web)
        ↓
Deploy → terus-platform-web.vercel.app
```

### Configuração protegida

| Setting | Valor | Não alterar |
|---------|-------|-------------|
| Root Directory | `apps/web` | ✅ |
| Production Branch | `main` | ✅ |
| Framework Preset | Next.js | ✅ |
| Node.js Version | 18.x+ | Verificar compatibilidade |

---

## Processo de rollback

### Via dashboard Vercel

1. Acesse [vercel.com](https://vercel.com) → projeto `terus-platform-web`
2. Aba **Deployments**
3. Localize o deploy estável anterior
4. Clique **⋯** → **Promote to Production**

### Via Git (preferido)

1. Identifique o commit estável: `git log --oneline`
2. Reverta ou restaure:
   ```bash
   git revert <commit-problemático>
   git push origin main
   ```
3. Vercel dispara novo deploy automaticamente

### Rollback de emergência

Se produção quebrar após push:

```bash
git revert HEAD
git push origin main
```

Aguardar deploy (~1 min) e validar URL.

---

## Processo de auditoria

### Auditoria rápida (pré-apresentação)

1. Confirmar commit local = remoto:
   ```bash
   git log -1 --oneline
   git status
   ```
2. Abrir produção: https://terus-platform-web.vercel.app
3. Verificar Navbar, Home, Rede Terus, logos
4. Testar rotas críticas: `/cases`, `/modulos`, `/solicitar-demo`

### Auditoria completa (pré-deploy)

Ver `docs/deployment-flow.md` — checklists pré e pós-deploy.

### Auditoria via browser (Cursor MCP)

O agente pode validar produção via **cursor-ide-browser**:

```
browser_navigate → https://terus-platform-web.vercel.app
browser_snapshot → verificar estrutura da página
```

Útil para confirmar deploy sem CLI autenticada.

---

## Utilização do MCP (Cursor)

### Browser MCP — validação de produção

| Tool | Uso |
|------|-----|
| `browser_navigate` | Abrir URL de produção ou preview |
| `browser_snapshot` | Inspecionar DOM e links |
| `browser_take_screenshot` | Evidência visual pós-deploy |

**Workflow recomendado pós-deploy:**

1. Navegar para URL de produção
2. Snapshot da Home — confirmar hero, módulos, Rede Terus
3. Navegar `/cases` e `/modulos/alert`
4. Reportar regressões visuais

### Limitações MCP

- Não substitui logs de build da Vercel
- Não acessa dashboard Vercel (requer login)
- Não confirma commit SHA em produção (usar dashboard ou CLI)

---

## Utilização do Cursor Ultra

### Contexto permanente para agentes

Antes de qualquer alteração, o agente deve ler:

1. `CLAUDE.md`
2. `PROJECT_RULES.md`
3. `docs/project-state.md` ← **este conjunto de docs**
4. `docs/deployment-flow.md`

### Workflow recomendado com Cursor Ultra

```
1. Ler docs/project-state.md
2. Identificar escopo da tarefa (Fase 3B, Sprint N)
3. Implementar alterações mínimas
4. Executar: pnpm typecheck && pnpm lint && pnpm build
5. Commit + push main
6. Aguardar deploy Vercel (~1 min)
7. Validar produção via browser MCP
8. Reportar commit em produção
```

### Regras para agentes

- **Nunca** recriar projeto Vercel
- **Nunca** alterar root directory sem validar build
- **Nunca** fazer deploy manual se push em `main` já dispara automático
- **Sempre** validar produção após push em `main`

---

## Boas práticas para deploy seguro

1. **Build local antes do push** — `pnpm build` deve passar
2. **Diff revisado** — confirmar que logos e `site-data.ts` estão corretos
3. **Um commit por correção** — facilita rollback
4. **Não push direto em main** para mudanças grandes — usar branch + PR quando possível
5. **Validar produção** após cada push em `main`
6. **Não commitar** `.env`, secrets ou `.vercel/`
7. **Manter root `apps/web`** — monorepo depende disso
8. **Aguardar deploy** antes de apresentar ao stakeholder

---

## Variáveis de ambiente

| Variável | Necessária? | Nota |
|----------|-------------|------|
| Nenhuma | — | Site 100% estático no build time |

Quando auth e API forem integrados (Sprint 1+), documentar aqui:

```
NEXT_PUBLIC_API_URL=     (futuro)
```

---

## Troubleshooting

| Problema | Causa provável | Solução |
|----------|----------------|---------|
| 404 DEPLOYMENT_NOT_FOUND | URL errada ou projeto deletado | Usar URL oficial acima |
| Build fail na Vercel | Lint/typecheck no `next build` | Reproduzir local: `pnpm build` |
| Logos não aparecem | Path errado em site-data.ts | Verificar `public/logos/` |
| Deploy não dispara | Webhook GitHub desconectado | Reconectar repo no dashboard Vercel |
| Preview OK, prod quebrada | Promote acidental | Rollback via dashboard |

---

# Commands

> Requer `vercel login` ou `VERCEL_TOKEN` configurado.
> Instalação: `npm i -g vercel` ou `npx vercel@latest`

## Consultar logs

```bash
# Logs do último deploy de produção
npx vercel logs terus-platform-web.vercel.app

# Logs de deployment específico
npx vercel logs <deployment-url>
```

## Consultar deploys

```bash
# Listar deploys recentes
npx vercel ls terus-platform-web

# Inspecionar deploy específico
npx vercel inspect <deployment-url>
```

## Verificar produção

```bash
# Status HTTP
curl -I https://terus-platform-web.vercel.app

# Confirmar título da página
curl -s https://terus-platform-web.vercel.app | findstr /i "Terus Platform"
```

**Via browser MCP (Cursor):**

```
browser_navigate: https://terus-platform-web.vercel.app
```

## Validar runtime errors

```bash
# Abrir DevTools via browser MCP
browser_navigate → produção
browser_cdp → Runtime.enable, Log.enable
# Reproduzir navegação e inspecionar console
```

**Via Vercel dashboard:**

1. Deployments → último deploy → **Functions** / **Runtime Logs**
2. Para site estático: erros são raros — verificar build logs

## Comandos GitHub (deployments API)

```bash
# Requer gh auth login
gh api repos/Lucash67/terus-platform/deployments?per_page=5
```

## Comandos locais pré-deploy

```bash
pnpm typecheck
pnpm lint
pnpm build
git status
git push origin main
```

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| [`docs/deployment-flow.md`](deployment-flow.md) | Fluxo completo de entrega |
| [`docs/project-state.md`](project-state.md) | Estado permanente |
| [`docs/current-phase.md`](current-phase.md) | Fase ativa |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Release v0.4.0 |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog |

Links externos:

- [Documentação Vercel — Monorepos](https://vercel.com/docs/monorepos)
- [Documentação Vercel — Git Integration](https://vercel.com/docs/deployments/git)
