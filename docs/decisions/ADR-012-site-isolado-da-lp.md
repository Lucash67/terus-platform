# ADR-012 — Nova experiência institucional em `apps/site`, isolada da LP

**Status:** Proposto · **Data:** 12/11/2026

**Contexto.** A LP comercial (`apps/web`) está em produção e precisa ficar intacta enquanto
o novo site e o Self Onboarding 2.0 passam por homologação. Alterar `apps/web` faria qualquer
merge mudar a produção.

**Decisão.**
- A nova experiência vive em `apps/site` (Next.js 14, mesma stack e design system).
- `apps/web` não é alterado. Acréscimos em pacotes compartilhados ficam fora dos pontos que a
  LP importa ou varre: `@terus/ui/forms` (Textarea, Checkbox) e
  `@terus/schemas/self-onboarding`.
- `apps/site` copia `apps/web/public` no build (`pnpm sync-assets`) para não duplicar 29 MB de
  vídeos no git.
- `apps/site` muda tokens do tema claro para contraste AA só no próprio `globals.css`.

**Consequências.** Há duplicação temporária de seções entre `apps/web` e `apps/site`. Quando a
nova experiência for aprovada, a troca é uma decisão de publicação: apontar o projeto Vercel
para `apps/site` ou mesclar de volta em `apps/web`, com ADR próprio.
