# ADR-009 — Plausible para analytics do site

**Status:** Aprovado · **Data:** 05/10/2026

**Decisão:** O site público (`apps/web`) usa Plausible Analytics, carregado só quando
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` estiver definido na Vercel. Os eventos de conversão passam
por `lib/analytics.ts` (`track`) e têm nomes fixos em `ANALYTICS_EVENTS`.

Eventos medidos:

- `CTA Click`: clique em qualquer link para o pré-cadastro, com página e seção de origem.
- `WhatsApp Click`: clique em link `wa.me`, com página e seção de origem.
- `Pre-cadastro Enviado`: envio válido do formulário, com ERP e faixa de lojas (sem nome nem telefone).
- `Tour Capitulo`: capítulo do tour "Por dentro da Terus" visto pela primeira vez na visita.
- `Video Som Ativado`: visitante ativou o som de um vídeo do fundador.

**Justificativa:** O PROJECT_RULES já define Plausible/PostHog e proíbe Google Analytics.
Plausible não usa cookies nem coleta dado pessoal, então dispensa banner de consentimento
(LGPD) e não pesa na página (script de ~1 KB). Para um site de marketing, contagem de
visitas, origem e funil de conversão bastam.

**Alternativas descartadas:** PostHog — mais completo (replays, feature flags), mas usa
cookies, exige consentimento e é mais pesado; faz sentido depois, na área autenticada.
Google Analytics — proibido pelo PROJECT_RULES.

**Consequências:** Exige conta no Plausible (plano pago ou instância própria) com o domínio
cadastrado. Sem a variável de ambiente, o site funciona igual e nada é enviado.
