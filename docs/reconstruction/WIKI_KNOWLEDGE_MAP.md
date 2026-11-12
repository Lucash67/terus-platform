# Mapa de conhecimento da wiki

**Fase 2:** a wiki passou a ser acessível (ambiente `terus-platform`). Páginas lidas:
`/varejo`, `/varejo/tec`, `/varejo/tec/varejo`, `/varejo/tec/fornecedor`, `/varejo/tec/como-ler`,
`/varejo/tec/production`, `/varejo/task`. Confirmam os menus do Portal Varejo e do Portal do
Fornecedor e informam que cadastros, onboarding e integrações ficam no Terus Admin Portal
(com login, não público). Os manuais técnicos de integração não são públicos.

**Fase 1:** a wiki estava bloqueada na rede da sessão; nada foi inventado.

O conhecimento da wiki já incorporado ao repositório por commits anteriores, e reutilizado:

| Tema | Onde está no código |
|---|---|
| Catálogo de módulos e funcionalidades | `apps/web/lib/constants/modules.ts` |
| Camadas Agent / IAproc / Bond, ERPs, manuais de integração | `apps/web/lib/constants/site-data.ts` (`CAMADA_INTEGRACAO`, `INTEGRACOES`) |
| Personas, Portal do Fornecedor, FAQ, tour do portal, app Task | `apps/web/lib/constants/lp.ts` |
| Regras de qualificação (ERPs documentados) | `apps/api/app/core/acquisition/qualification.py` |

**Para completar:** liberar `wiki.terus.tec.br` e `terustec.com.br` na rede do ambiente e
reconferir as descrições de Portal do Cliente, Task Web, Teams e Suporte Anjo, e as instruções
técnicas de integração para a trilha B (implantação).
