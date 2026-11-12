# Dependências abertas e bloqueios

## Acessos desta sessão
| Bloqueio | Efeito | Como destravar |
|---|---|---|
| `wiki.terus.tec.br`, `terustec.com.br`, `terus.tec.br` fora da rede permitida | Conteúdo novo não reconferido nas fontes; usado só o que já estava validado no repo e no pacote | Liberar os hosts nas configurações de rede do ambiente Claude e pedir a reconferência |
| Vercel MCP sem autorização no time `lucash67s-projects` | Não foi possível listar/abrir o deploy de preview da branch | Autorizar o acesso do conector Vercel ao time |
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
