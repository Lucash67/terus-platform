# Auditoria do estado atual (antes da reconstrução)

## Achados confirmados por leitura do código (SHA f5f525d)
| Item | Problema | Ação tomada |
|---|---|---|
| `step-diagnostico.tsx` | Runners e logs por `setTimeout` apresentados como diagnóstico | Removido |
| `step-contratos.tsx` | Assinatura D4Sign simulada com estado local | Removido |
| `step-conclusao.tsx` | "Ativação" de módulos por temporizador | Removido |
| `step-banco.tsx` | Pedia credenciais do banco do ERP no navegador; afirmava cofre | Removido; nova jornada não pede credencial |
| `onboarding-store.ts` | Progresso só em `localStorage` | Removido; progresso no PostgreSQL |
| Layout do onboarding | Rodapé: "credenciais em cofre dedicado" (falso) | Substituído por texto verdadeiro |
| `pre-cadastro-form.tsx` | Abre WhatsApp (não grava lead) | Mantido e rotulado como WhatsApp; não é tratado como lead persistido |
| `apps/api/app/api/health.py` | `database: up`, `redis: up` fixos | Agora checa o banco e reporta `not_configured` para o que não existe |
| `hero-dashboard-preview.tsx` | Selo "Online" em painel ilustrativo | Trocado por "Ilustração" |
| Navegação | Menu oculto (LP mode); `/plataforma` redirecionava para `/` | Menu completo; `/plataforma` é página real |

## Aproveitado
Design tokens, tipografia, componentes de seção validados na wiki, logos, vídeos, cases do
Cometa, conteúdo de módulos e integração, `Reveal`/motion CSS, SEO base.

## Documentação defasada
`docs/project-state.md` (v0.4.0) cita 6 módulos e ERPs Winthor/RMS como alvo do MVP; o
CLAUDE.md atual (validado na wiki) usa 8 módulos e ERPs RMS, Consinco, VR Software, CISS Poder,
RPInfo e API REST no varejo. Segue-se o CLAUDE.md.
