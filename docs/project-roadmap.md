# Terus Platform — Roadmap Histórico

> Histórico oficial de fases e marcos do projeto.  
> **Versão atual:** v0.4.0 — Institutional Layer Complete  
> **Commit baseline:** `5b50ec1` · **Data:** 1 de julho de 2026

Para o estado atual, consulte [`docs/current-phase.md`](current-phase.md).  
Para o próximo marco, consulte [`docs/backend-foundation.md`](backend-foundation.md).

---

## Linha do tempo

```
Sprint 0 ──► Fase 3A ──► Fase 3B ──► Fase 3C ──► v0.4.0 ──► Sprint 1 (próximo)
  ✅           ✅          ✅          ✅         ✅            ⏳
```

---

## Marco 0 — Sprint 0: Fundação

| Item | Detalhe |
|------|---------|
| **Status** | ✅ Concluído |
| **Escopo** | Monorepo, CI, FastAPI health, docker-compose local |
| **Entregáveis** | Turborepo, GitHub Actions, `GET /health`, deploy Vercel inicial |

---

## Marco 1 — Fase 3A: Institutional Foundation

| Item | Detalhe |
|------|---------|
| **Status** | ✅ Concluído |
| **Escopo** | Site institucional navegável, identidade enterprise, Rede Terus |
| **Commits chave** | `91babad`, `ec1c76c`, `f676f2f`, `e865be9` |
| **Entregáveis** | 14 rotas marketing, logos, cases reais, tokens visuais, `@terus/ui` base |

---

## Marco 2 — Fase 3B: Institutional Maturity

| Item | Detalhe |
|------|---------|
| **Status** | ✅ Concluído |
| **Escopo** | Hero, SEO, conversão, remoção de placeholders |
| **Commits chave** | `a5acd62`, `286f879`, `883a96a`, `7143ba4` |
| **Entregáveis** | Hero dashboard, sitemap/JSON-LD, CTAs harmonizados, `/solicitar-demo` |
| **Auditoria** | End-to-end executiva · veredito **SIM** |

---

## Marco 3 — Fase 3C: Executive Polish & Launch Readiness

| Item | Detalhe |
|------|---------|
| **Status** | ✅ Concluído |
| **Escopo** | Copy, UX, product experience, brand polish, motion, Lighthouse |
| **Commit chave** | `5b50ec1` |
| **Entregáveis** | CTA/footer premium, ModulePreview, Home fluida, copy centralizado |

---

## Release v0.4.0 — Institutional Layer Complete

| Item | Detalhe |
|------|---------|
| **Status** | ✅ **RELEASED** |
| **Data** | 1 de julho de 2026 |
| **Significado** | Baseline permanente da camada institucional |
| **Lighthouse** | Performance 95 · Accessibility 96 |
| **Release notes** | [`docs/releases/v0.4.0-institutional-layer-complete.md`](releases/v0.4.0-institutional-layer-complete.md) |

---

## Próximo marco — Sprint 1: Backend Foundation

| Item | Detalhe |
|------|---------|
| **Status** | ⏳ Planejado (não iniciado) |
| **Documento** | [`docs/backend-foundation.md`](backend-foundation.md) |
| **Escopo resumido** | Auth JWT, FastAPI base, layouts `(onboarding)` / `(admin)` |

---

## Roadmap futuro (pós-Sprint 1)

Referência completa em `PROJECT_RULES.md` §17.3:

| Sprint / Fase | Escopo |
|---------------|--------|
| **Sprint 2** | Onboarding etapas 1–2, banco base |
| **Sprint 3** | Assistente integração, Vault |
| **Sprint 4** | Diagnóstico automatizado |
| **Sprint 5** | Site admin, contratos D4Sign |
| **Sprint 6** | Provisionamento, MVP Go Live |
| **Fase 4** | Portal de Self-Onboarding completo |

---

## Referências cruzadas

| Documento | Conteúdo |
|-----------|----------|
| [`docs/project-state.md`](project-state.md) | Estado permanente |
| [`docs/current-phase.md`](current-phase.md) | Fase ativa |
| [`docs/architecture.md`](architecture.md) | Arquitetura técnica |
| [`docs/backend-foundation.md`](backend-foundation.md) | Baseline Sprint 1 |
| [`docs/deployment-flow.md`](deployment-flow.md) | Fluxo de deploy |
| [`docs/vercel.md`](vercel.md) | Infra Vercel |
| [`CHANGELOG.md`](../CHANGELOG.md) | Changelog oficial |
