# Relatório final — Terus Digital Experience 2.0

**Branch:** `claude/tender-gauss-ld4sso` · **Draft PR:** https://github.com/Lucash67/terus-platform/pull/1 ·
**Produção:** não alterada · **LP (`apps/web`):** idêntica ao `main`.

## Fase 2 — auditoria, refinamento e homologação
- **Isolamento da LP:** a fase 1 alterava arquivos da LP; tudo foi movido para `apps/site`.
  Provas em `LP_PRESERVATION_AUDIT.md` (diff zero, HTML normalizado idêntico, 34/34 telas
  idênticas pixel a pixel).
- **CI:** Draft PR #1 com 6/6 jobs verdes, incluindo testes da API com PostgreSQL.
- **Fontes oficiais:** acesso liberado (ambiente `terus-platform`); páginas de Agent, IAproc,
  Bond, Portal do Cliente, Task Web e Teams com texto de terustec.com.br e da wiki.
- **Acabamento:** menu corrigido entre 1024–1279 px, contraste AA, acessibilidade de vídeo e
  carrossel, selos "ao vivo" removidos, diagrama de fluxo refeito. Galeria em `VISUAL_COMPARISON.md`.
- **Qualidade:** axe 487 (LP) → 15 (novo); Lighthouse acessibilidade 100 nas páginas novas;
  API sem vulnerabilidades conhecidas (FastAPI 0.162); E2E 11/11 após as mudanças.
- **Prévia:** disponível dentro da sessão; prévia persistente depende das autorizações em `PREVIEW.md`.

## Fase 1 (resumo)
Self Onboarding 2.0 real (conta, empresa, perfil, qualificação, proposta, portal, painel
interno, auditoria), backend FastAPI + PostgreSQL com 26 testes, site institucional ampliado.

## Pendências para homologação
Ver `OPEN_DEPENDENCIES.md`.
