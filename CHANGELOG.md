# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [0.4.0] — 2026-07-01

### Institutional Layer Complete

Release oficial de encerramento da camada institucional da Terus Platform.
Baseline permanente antes do Backend Foundation (Sprint 1).

**Commit de referência:** `5b50ec1`  
**Produção:** https://terus-platform-web.vercel.app

### Added

- Site institucional completo em Next.js 14 App Router (route group `(marketing)`)
- 14 rotas marketing + sitemap.xml + robots.txt + JSON-LD
- Rede Terus: 12 varejos + 8 distribuidores com logos em `public/logos/`
- 6 módulos Terus com páginas SSG (`/modulos/[slug]`)
- Métricas operacionais reais centralizadas em `site-data.ts`
- Hero split com dashboard fictício animado (Fase 3B)
- Página `/solicitar-demo` com fluxo comercial via WhatsApp
- CTAs padronizados (`Agendar demonstração` / `Explorar plataforma`)
- Sticky CTA mobile (`StickyDemoCta`)
- SEO institucional: Open Graph, Twitter Cards, canonical, sitemap (Fase 3B)
- Copy centralizado em `lib/constants/copy.ts` (Fase 3C)
- Mockups premium por módulo (`ModulePreview`) (Fase 3C)
- CTA final premium e Footer enterprise branco (Fase 3C)
- Utilitários CSS: `section-rhythm`, `card-interactive`, `premium-cta-glow` (Fase 3C)
- Documentação oficial: `docs/project-state.md`, `docs/architecture.md`, `docs/vercel.md`, `docs/deployment-flow.md`
- Release notes v0.4.0 e baseline Sprint 1 (`docs/backend-foundation.md`)

### Changed

- Identidade visual enterprise (tema claro, tokens DM Sans / IBM Plex)
- Home condensada de 17 para 11 seções sem perda de conteúdo crítico (Fase 3C)
- Navbar com CTA principal destacado
- `/sobre` consolidada — seções redundantes e placeholder de liderança removidos (Fase 3C)
- Copy institucional refinada — linguagem provisória eliminada (Fase 3C)
- Onboarding autônomo em `/plataforma` marcado como Roadmap 2026 (Fase 3C)

### Removed

- Placeholders "Em atualização" em depoimentos, vídeos e certificações (Fase 3B)
- Seções redundantes na Home: StatsSection, OperationalResultsSection, SecurityGovernanceSection (Fase 3C)
- Footer dark theme — substituído por footer premium claro (Fase 3C)
- CTA gradient legado — substituído por card premium (Fase 3C)

### Fixed

- Logo Terus display e tokens `brand-dark` no Tailwind (Fase 3A)
- Paths de logos Rede Terus (webp/png) (Fase 3A)

### Security

- Site estático sem autenticação — botão "Acessar plataforma" permanece desabilitado
- Credenciais de cliente: nenhuma em frontend (Vault planejado Sprint 3+)

### Metrics (Lighthouse — produção mobile)

- Performance: **95**
- Accessibility: **96**

---

## [0.3.0] — 2026-06 (Fases 3B parcial)

### Added

- Refinamento hero, SEO, conversão (commits `a5acd62`–`7143ba4`)
- Auditoria executiva end-to-end com veredito de conclusão Fase 3B

---

## [0.2.0] — 2026-06 (Fase 3A)

### Added

- Fundação visual enterprise, logos, Rede Terus, cases reais
- Páginas institucionais base e componentes de seção

---

## [0.1.0] — 2026 (Sprint 0)

### Added

- Monorepo Turborepo + pnpm
- FastAPI fundação (`GET /health`)
- CI GitHub Actions
- Deploy Vercel frontend

---

[0.4.0]: https://github.com/Lucash67/terus-platform/releases/tag/v0.4.0
[0.3.0]: https://github.com/Lucash67/terus-platform/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Lucash67/terus-platform/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Lucash67/terus-platform/releases/tag/v0.1.0
