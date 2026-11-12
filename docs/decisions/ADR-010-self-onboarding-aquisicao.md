# ADR-010 — Self Onboarding 2.0: jornada de aquisição persistida no backend

**Status:** Proposto (implementado na branch `claude/tender-gauss-ld4sso`, aguarda aprovação humana) · **Data:** 12/11/2026

**Contexto.** O pacote *Terus Digital Experience 2.0* (fornecido pela organização) pede um
Self Onboarding real: conta, empresa, qualificação, solicitação comercial persistente, portal
do cliente e painel da equipe Terus. O onboarding legado (7 etapas) era só visual: diagnóstico
por `setTimeout`, D4Sign fictício, ativação temporizada, progresso em `localStorage`.
O catálogo de APIs e as tabelas do CLAUDE.md não cobrem aquisição de novos clientes.

**Decisão.**
1. A trilha "novo cliente" passa a ser: conta → empresa → operação (perfil) → recomendação e
   solicitação → acompanhamento no portal. O fluxo legado foi removido do código (fica no
   histórico do git).
2. Tabelas novas, além das já previstas (`public.tenants`, `public.platform_users`,
   `onboarding.onboarding_sessions`, `onboarding.onboarding_step_data`, `audit.audit_logs`):
   - `public.tenant_members` — vínculo usuário ↔ organização (papel owner/admin/member);
   - `public.auth_sessions` — sessão de refresh token (hash), revogável no logout;
   - `public.password_reset_tokens` — recuperação de acesso (hash, uso único, 1 h);
   - `public.consents` — registro LGPD de cada aceite (termos, privacidade, marketing);
   - `onboarding.commercial_requests` e `onboarding.commercial_request_events` — solicitação
     comercial e histórico append-only (com flag de visibilidade ao cliente).
3. A organização nasce como `tenant` com status `prospect`. O schema operacional
   `tenant_{uuid}` só é criado no provisionamento (fora deste escopo).
4. Endpoints novos (prefixo `/v1`): `auth/{register,login,refresh,logout,session,recover,reset-password}`,
   `organizations` (CRUD da jornada, perfil, solicitação) e `admin/{leads,funnel,staff,commercial-requests/*}`.
5. Auth: JWT **RS256** de 15 min + refresh opaco rotativo de 7 dias, ambos em cookies
   **HttpOnly SameSite=Lax**; o navegador fala com a API pelo proxy same-origin do Next
   (`/api/v1/*`). CSRF: header `x-terus-client: web` obrigatório em métodos que alteram estado.
6. Estados honestos: e-mail, CRM, assinatura eletrônica e Agent/ERP têm adaptadores
   `not_configured`; "contratado" exige referência de contrato registrada pela equipe Terus.
7. Rotas web novas: `/criar-conta`, `/entrar`, `/recuperar-acesso`, `/redefinir-senha`,
   `/onboarding/{empresa,perfil,solicitacao}`, `/portal`, `/admin`, `/admin/leads/[id]`;
   todas ocultas em produção pela flag `NEXT_PUBLIC_ONBOARDING_ENABLED`.

**Desvios conscientes do CLAUDE.md (pedem aprovação):**
- Tabelas e rotas não listadas na arquitetura original (itens 2 e 7).
- Celery/Redis/Vault não usados: a trilha A não manipula credenciais de cliente nem jobs.
- Rate limit em memória (uma instância); em produção deve ir para Redis.
- MFA de admin ainda não implementado.

**Consequências.** A jornada funciona sem integração de ERP e é auditável. Para ir ao ar é
preciso: banco PostgreSQL gerenciado, hospedagem da API, chaves RS256 e a aprovação deste ADR.
