# Dependências abertas e bloqueios

## Acessos desta sessão
| Bloqueio | Efeito | Como destravar |
|---|---|---|
| ~~Fontes oficiais bloqueadas~~ | **Resolvido na fase 2**: ambiente `terus-platform` criado com acesso à wiki, terustec.com.br e terus.tec.br | — |
| Vercel MCP sem autorização no time `lucash67s-projects` | Não foi possível listar deploys nem criar prévia | Ver `PREVIEW.md` (link de consentimento + aprovação do projeto) |
| Repositórios `terusfarm` e `simuladorterus` fora do escopo GitHub | Não consultados | Adicionar à sessão, se relevantes |

## Infraestrutura para ir ao ar
- PostgreSQL gerenciado e hospedagem da API (FastAPI em container).
- Chaves RS256 em secret manager; `COOKIE_SECURE=true`.
- Rate limit em Redis (hoje em memória, uma instância).
- Sentry/observabilidade ligados à API.

## Serviços externos (adaptadores prontos, estado `not_configured`)
- Provedor de e-mail transacional (verificação de e-mail, recuperação de senha, avisos).
- CRM / aviso ao time comercial.
- D4Sign (assinatura) — exige conta e webhook.
- Agent/ERP e diagnósticos reais — exige acesso técnico e instruções atualizadas da wiki.

## Decisões da organização
- Aprovar ADR-010 (tabelas, rotas e desvios do CLAUDE.md) e ADR-011.
- Revisão jurídica de `/privacidade` e `/termos`; CNPJ/endereço da empresa e canal do DPO.
- Quem recebe e aprova propostas; política de preços (hoje nenhum preço é exibido).
- Conceito "Da informação à ação. Do ERP à gôndola." — não usado; aprovar se desejar.
- Descrições de Portal do Cliente, Task Web, Teams e Suporte Anjo (tiradas do pacote).
- Atualizar CLAUDE.md (route groups e trilha de onboarding) após aprovação — não alterado aqui.

## Novos na fase 2
- `terus.tec.br` serve WhatsApp antigo `(85) 9629-0044`; o `main` usa `(85) 99738-4940`. Conferir Cloudflare/Vercel.
- Next.js 14 com avisos de segurança corrigidos só no 15.5 (LP e novo site): decidir migração por ADR.
- Aprovar ADR-012 (novo site isolado em `apps/site`).
- Decisão de design: abertura própria da home institucional (ver `VISUAL_COMPARISON.md`).
- Endereço, e-mail e telefone do site antigo (2023) não foram reaproveitados: confirmar se continuam válidos.
- A wiki indica que "cadastros, onboarding e integrações" ficam no **Terus Admin Portal** (login). Definir como o Self Onboarding 2.0 conversa com ele antes da trilha B.
- **Build da LP depende do Google Fonts:** `apps/web` usa `next/font/google`, que falhou de forma intermitente aqui e no CI (`Cannot read properties of null`). Se acontecer num push para o `main`, o deploy de produção falha. O `apps/site` já usa fontes locais; replicar na LP exige sua aprovação.
