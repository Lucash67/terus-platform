# Auditoria de preservação da LP comercial

Data: 12/11/2026 · Branch `claude/tender-gauss-ld4sso` · Base `main@f5f525d`

## Onde a LP vive
| Item | Valor | Como foi verificado |
|---|---|---|
| Repositório | `Lucash67/terus-platform` | clone |
| Diretório | `apps/web` (Next.js 14) | código + `docs/vercel.md` |
| Projeto Vercel | `terus-platform-web` (team `lucash67s-projects`), root `apps/web`, produção a partir do `main` | `docs/vercel.md` (acesso ao painel não autorizado ao conector) |
| Domínio Vercel | https://terus-platform-web.vercel.app — servidor Vercel; conteúdo igual ao build do `main` (WhatsApp `5585997384940`) | requisição HTTP + comparação de texto |
| Domínio terus.tec.br | Atrás do Cloudflare. Serve a mesma LP **com WhatsApp antigo `558596290044`** (trocado no main em 04/10, commit `8fa361b`) e redirecionamentos 301 (a Vercel usa 308) | requisição HTTP |
| Site antigo | https://terustec.com.br — WordPress 2023 (Elementor, Agência Nove Dois), outro sistema | requisição HTTP |
| Componentes compartilhados | `packages/ui` (Tailwind da LP varre `packages/ui/src`), `packages/schemas` (pré-cadastro), `packages/config`, `packages/types`, `pnpm-lock.yaml` | leitura de `tailwind.config.js` e imports |

## O que aconteceu
Na fase 1 a branch alterava arquivos usados pela LP (home, layout, navbar, footer, CTA,
`/comecar`, painel do hero). A produção nunca foi afetada (nada foi para o `main`), mas um
merge mudaria a LP. Na fase 2 todo o trabalho novo foi movido para `apps/site` e `apps/web`
voltou ao estado exato do `main` (commit `6f32eeb`).

## Provas
1. **Código:** `git diff origin/main -- apps/web packages/ui/src packages/schemas/src` → 0 linhas.
   `pnpm-lock.yaml`: só acrescenta o importer `apps/site` (0 linhas removidas).
2. **CSS gerado:** idêntico ao do build do `main` (a primeira tentativa acusou 1 classe extra,
   `min-h-24`, vinda do novo `Textarea`; corrigido movendo os primitivos novos para
   `packages/ui/forms`, fora da varredura da LP).
3. **HTML das 28 rotas pré-renderizadas:** idêntico ao do `main` depois de normalizar
   BUILD_ID e nomes de chunk. Controle: o `main` compilado em dois diretórios também só difere
   nesses nomes (os hashes de chunk dependem do caminho do build), por isso a comparação
   byte a byte de JS não serve como prova.
4. **robots.txt e sitemap.xml:** idênticos (ignorando `<lastmod>`).
5. **Visual:** 17 rotas × computador (1440 px) e celular (iPhone 13) = **34 comparações
   pixel a pixel, todas idênticas** entre LP do `main` e LP da branch, servidas lado a lado.
   Uma primeira rodada mostrou diferença na home: era o pôster do vídeo que não tinha
   carregado sob carga; com as imagens carregadas, idêntico.

## Recomendações (fora desta branch)
- Conferir no Cloudflare/Vercel por que `terus.tec.br` serve WhatsApp antigo: há dois
  números comerciais públicos em produção.
- A LP usa Next.js 14.2.35, que tem avisos de segurança corrigidos só na linha 15.5
  (ver `QA_REPORT.md`). Avaliar a atualização com ADR, na própria LP.
