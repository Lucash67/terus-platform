# Terus Platform — Fluxo de Deploy

> Fluxo oficial de entrega do frontend Terus Platform.  
> **Versão:** v0.4.0 — Institutional Layer Complete  
> **Produção:** https://terus-platform-web.vercel.app

---

## Fluxo oficial

```
Cursor (desenvolvimento + agente IA)
        ↓
Git local (working tree)
        ↓
Commit (Conventional Commits, português)
        ↓
Push (origin main)
        ↓
GitHub (Lucash67/terus-platform)
        ↓
Vercel (projeto terus-platform-web)
        ↓
Produção (terus-platform-web.vercel.app)
```

### Paralelo: CI no GitHub Actions

Push/PR em `main` ou `develop` também dispara:

```
GitHub Actions (ci.yml)
  ├── Lint
  ├── Type Check
  ├── Build
  ├── Python Lint
  └── Python Type Check
```

CI e Vercel rodam **independentemente**. Ambos devem passar.

---

## Papéis de cada etapa

| Etapa | Responsabilidade |
|-------|------------------|
| **Cursor** | Edição de código, auditoria, validação local |
| **Git local** | Staging, commit, histórico |
| **Commit** | Snapshot versionado com mensagem descritiva |
| **Push** | Enviar para remoto |
| **GitHub** | Source of truth, CI, webhook Vercel |
| **Vercel** | Build Next.js + deploy CDN |
| **Produção** | Site acessível ao público |

---

## Checklist pré-deploy

Executar **todos** os itens antes de `git push origin main`.

### Build e qualidade

- [ ] `pnpm typecheck` — sem erros
- [ ] `pnpm lint` — sem erros (warning ESLint plugin é aceitável)
- [ ] `pnpm build` — sucesso, 19 páginas geradas
- [ ] `git status` — working tree limpo ou apenas arquivos intencionais

### Revisão de código

- [ ] Revisar diff: `git diff` ou painel do Cursor
- [ ] Confirmar que **nenhum** arquivo proibido foi alterado (`PROJECT_RULES.md`, ADRs)
- [ ] Confirmar escopo da tarefa (Sprint 1+ / docs only — **não alterar v0.4.0 institucional sem ADR**)

### Auditoria visual (local)

- [ ] `pnpm --filter @terus/web dev` → http://localhost:3000
- [ ] Home carrega todas as seções
- [ ] Navbar e Footer funcionam
- [ ] Mobile menu abre/fecha

### Assets e logos

- [ ] Logos referenciados em `site-data.ts` existem em `public/logos/`
- [ ] Logo Terus: `/logos/terus/terus.jpg`
- [ ] 12 logos varejo em `public/logos/clientes/`
- [ ] 8 logos distribuidor em `public/logos/distribuidores/`
- [ ] Nenhum path quebrado (404 de imagem)

### Dados reais

- [ ] Métricas operacionais em `site-data.ts` não foram alteradas acidentalmente
- [ ] `RESULTADOS_OPERACIONAIS` — valores validados preservados
- [ ] `INDICADORES_PLATAFORMA` — valores validados preservados
- [ ] `REDE_TERUS` — empresas e logos corretos
- [ ] Cases em `CONTEUDOS_CASES` — dados reais intactos

### Commit

- [ ] Mensagem segue Conventional Commits: `tipo(escopo): descrição`
- [ ] Commit em português
- [ ] Um propósito claro por commit

---

## Comandos pré-deploy (sequência)

```bash
# 1. Validar qualidade
pnpm typecheck
pnpm lint
pnpm build

# 2. Verificar estado git
git status
git diff

# 3. Commit (se necessário)
git add .
git commit -m "tipo(escopo): descrição"

# 4. Push
git push origin main
```

---

## Checklist pós-deploy

Executar após push em `main` (~1 minuto para deploy Vercel).

### Validar URL

- [ ] https://terus-platform-web.vercel.app carrega
- [ ] Título: "Terus Platform - Supply Chain Intelligence"
- [ ] Hero visível com CTAs
- [ ] Rede Terus exibe logos de varejos e distribuidores

### Validar rotas críticas

- [ ] `/plataforma`
- [ ] `/modulos` + `/modulos/alert`
- [ ] `/cases`
- [ ] `/conteudos`
- [ ] `/solicitar-demo` (link WhatsApp)
- [ ] `/sobre`

### Validar logs

- [ ] Dashboard Vercel → Deployments → último deploy = **Ready**
- [ ] Build log sem erros
- [ ] (Opcional) `npx vercel logs terus-platform-web.vercel.app`

### Validar erros runtime

- [ ] Navegar Home e 3 páginas internas
- [ ] Console do browser sem erros JavaScript
- [ ] Imagens de logos carregam (sem broken image)

### Validar versão do commit

- [ ] Dashboard Vercel → Deployments → commit SHA = push enviado
- [ ] Confirmar: `git log -1 --oneline` local = commit em produção
- [ ] Documentar SHA se for release/apresentação

### Validação via Cursor MCP (alternativa)

```
browser_navigate → https://terus-platform-web.vercel.app
browser_snapshot → confirmar Navbar + Hero + Módulos
browser_navigate → /cases
browser_snapshot → confirmar cases
```

---

## Fluxo de rollback

Se pós-deploy apresentar regressão:

```bash
# Opção 1: revert via Git (recomendado)
git revert HEAD
git push origin main

# Opção 2: promote deploy anterior no dashboard Vercel
# Deployments → deploy anterior → Promote to Production
```

Após rollback, repetir checklist pós-deploy.

---

## Ambientes

| Ambiente | URL | Branch | Trigger |
|----------|-----|--------|---------|
| **Produção** | terus-platform-web.vercel.app | `main` | push |
| **Preview** | `*.vercel.app` (auto) | branches/PRs | push/PR |
| **Local** | localhost:3000 | — | `pnpm dev` |
| **CI** | — | main/develop | push/PR |

---

## O que NÃO fazer no fluxo de deploy

- ❌ Push com build falhando localmente
- ❌ Alterar root directory Vercel sem validar
- ❌ Recriar projeto Vercel
- ❌ Commitar `.env` ou secrets
- ❌ Alterar `site-data.ts` sem revisar métricas reais
- ❌ Substituir logos sem autorização
- ❌ Push em `main` sem validar diff
- ❌ Apresentar ao stakeholder antes de validar produção

---

## Tempos de referência

| Etapa | Tempo típico |
|-------|--------------|
| typecheck + lint + build local | ~30–60s |
| Push → GitHub | ~5s |
| Vercel build + deploy | ~45–90s |
| Validação pós-deploy | ~5 min |

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| [`docs/vercel.md`](vercel.md) | Config Vercel, commands, rollback |
| [`docs/project-state.md`](project-state.md) | Estado do projeto, Protected Architecture |
| [`docs/current-phase.md`](current-phase.md) | Fase ativa |
| [`docs/project-roadmap.md`](project-roadmap.md) | Histórico de fases |
| [`docs/architecture.md`](architecture.md) | Arquitetura técnica |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) | Release v0.4.0 |
| [`docs/releases/release-checklist-v0.4.0.md`](releases/release-checklist-v0.4.0.md) | Checklist de release |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog |
| [`PROJECT_RULES.md`](../PROJECT_RULES.md) | Regras invioláveis |
