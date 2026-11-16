# Matriz de funcionalidades

> Fase 2: o site e a jornada vivem em `apps/site`; `apps/web` (LP) está idêntico ao `main`.

Legenda: **implementado** (código integrado) · **testado** (evidência executada) ·
**pendente externo** (falta credencial/acesso/aprovação) · **não implementado**.

## Site institucional
| Funcionalidade | Status |
|---|---|
| Navegação completa (desktop com menus, mobile em acordeão, pular para conteúdo) | implementado · testado (screenshots, E2E cenário 1) |
| Home com fluxo animado ERP → evidências | implementado · testado |
| `/plataforma` (como funciona, demo fictícia, tour, camadas, módulos, componentes) | implementado · testado |
| `/modulos` + 8 páginas de módulo | já existia · testado |
| `/varejo`, `/industria-distribuidores`, `/integracoes`, `/contato` | implementado · testado |
| `/privacidade`, `/termos` (versão preliminar marcada) | implementado · testado · **revisão jurídica pendente** |
| `/comecar` com 3 caminhos (demo, conta, WhatsApp) | implementado · testado |
| `/ecossistema`, `/cases`, `/conteudos`, `/sobre` | já existiam · testados |
| SEO: títulos únicos, sitemap com novas rotas, robots bloqueando áreas autenticadas | implementado · testado (títulos) |
| `prefers-reduced-motion` nas novas animações | implementado · testado (capturas com reduced motion) |
| Lighthouse e axe (WCAG A/AA) | testado na fase 2 (ver QA_REPORT) |
| Páginas Agent, IAproc, Bond, Portal do Cliente, Task Web, Teams (`/tecnologia/*`) | implementado · testado (fase 2, fontes oficiais) |
| Suporte Anjo com página própria | não implementado — fonte oficial só tem uma frase |

## Self Onboarding 2.0 — trilha A (novo cliente)
| Funcionalidade | Status |
|---|---|
| Criar conta, entrar, sair (cookies HttpOnly, JWT RS256, refresh rotativo, revogação) | implementado · testado (pytest + E2E) |
| Recuperação de acesso | implementado · testado com mailer de teste · **envio real pendente externo** (provedor de e-mail) |
| Verificação de e-mail | **pendente externo** (provedor de e-mail); portal informa a pendência |
| Consentimentos LGPD gravados (termos, privacidade, marketing) | implementado · testado |
| Cadastro de empresa com CNPJ validado e deduplicado | implementado · testado |
| Perfil da operação (ERP, lojas, prioridades, TI, prazo) | implementado · testado |
| Qualificação explicável (score interno com motivos) | implementado · testado |
| Recomendação de módulos com justificativa | implementado · testado |
| Solicitação de proposta / contato com especialista, histórico | implementado · testado |
| Retomada em outro dispositivo após logout | implementado · testado (E2E cenário 6, mobile) |
| Origem UTM do lead | implementado · testado (E2E cenário 7) |
| Portal: status, pendências, dados enviados, histórico, implantação, documentos | implementado · testado |
| Várias empresas por usuário (seletor no portal) | implementado · não testado em E2E |
| Convite de outros membros da empresa | não implementado |
| Notificação ao time comercial (CRM/e-mail/WhatsApp API) | **pendente externo**; o histórico registra "não configurado" |

## Painel da equipe Terus
| Funcionalidade | Status |
|---|---|
| Inbox de leads com busca, filtro por status, paginação, funil por etapa | implementado · testado |
| Detalhe: contato, empresa, qualificação com motivos, origem, auditoria | implementado · testado |
| Mudança de status com transições válidas; "contratado" exige referência do contrato | implementado · testado |
| Responsável, notas internas/visíveis ao cliente, reabertura com histórico | implementado · testado (pytest) |
| Criação de usuário da equipe | implementado via CLI (`python -m app.cli create-staff`) |
| MFA, gestão de papéis pela interface, configuração de critérios de score | não implementado |

## Trilha B (implantação de cliente contratado)
| Funcionalidade | Status |
|---|---|
| Checklist de implantação com estados honestos no portal | implementado · testado |
| Instruções técnicas por ERP atualizadas | **pendente externo** (wiki/time técnico) |
| Conexão via Agent, diagnósticos reais | **pendente externo** — não simulado |
| Assinatura eletrônica (D4Sign) | **pendente externo** — não simulado |
| Provisionamento e ativação de módulos | não implementado — não simulado |

## Backend / plataforma
| Funcionalidade | Status |
|---|---|
| Migrations Alembic com upgrade/downgrade | implementado · testado (up → down → up) |
| Auditoria imutável por trigger | implementado · testado |
| CSRF por header, rate limit em auth, headers de segurança | implementado · testado |
| Logs JSON sem segredos | implementado |
| Health check real | implementado · testado |
| CI: job de testes com PostgreSQL | implementado · testado (Draft PR #1, 6/6 verdes) |
