# Release Checklist — v0.4.0 Institutional Layer Complete

> Checklist oficial de validação da release **v0.4.0**.  
> Commit de referência: `5b50ec1` · Data: 1 de julho de 2026

---

## Build e qualidade

- [x] **Build** — `pnpm build` · 19 rotas geradas · sem erros
- [x] **Typecheck** — `pnpm typecheck` · sem erros TypeScript
- [x] **Lint** — `pnpm lint` · sem erros bloqueantes (warning ESLint Next.js plugin aceitável)

---

## Performance e acessibilidade

- [x] **Lighthouse** — Performance **95** · Accessibility **96** (mobile, produção pós-deploy)

---

## Deploy e produção

- [x] **Deploy** — push `main` → Vercel automático · projeto `terus-platform-web`
- [x] **Produção validada** — https://terus-platform-web.vercel.app
  - Hero, métricas, módulos, Rede Terus, CTA premium, Footer enterprise
  - `/solicitar-demo` com fluxo WhatsApp
  - `/modulos/order` com ModulePreview

---

## Auditoria e documentação

- [x] **Auditoria concluída** — End-to-end executiva (Fase 3B) · veredito SIM
- [x] **Documentação atualizada**
  - `docs/releases/v0.4.0-institutional-layer-complete.md`
  - `docs/current-phase.md`
  - `docs/project-state.md`
  - `docs/project-roadmap.md`
  - `docs/backend-foundation.md`
  - `CHANGELOG.md`
  - Referências cruzadas em `docs/architecture.md`, `docs/vercel.md`, `docs/deployment-flow.md`

---

## Commits registrados

- [x] **Commits registrados** — histórico Fases 3A–3C documentado em release notes e CHANGELOG
- [x] **Baseline permanente** — `5b50ec1` (`feat(web): executive polish and launch readiness — Fase 3C`)

---

## Assinatura de release

- [x] **Tag Git** — `v0.4.0` publicada em `origin`
- [x] **GitHub Release** — [Terus Platform v0.4.0](https://github.com/Lucash67/terus-platform/releases/tag/v0.4.0) · publicada em 1 jul 2026

| Campo | Valor |
|-------|-------|
| Versão | v0.4.0 — Institutional Layer Complete |
| Status | **RELEASED** |
| Próximo marco | Sprint 1 — Backend Foundation |
| Release notes | [`v0.4.0-institutional-layer-complete.md`](v0.4.0-institutional-layer-complete.md) |
