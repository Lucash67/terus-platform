# Mapa de conhecimento da wiki

A wiki (`wiki.terus.tec.br`) **não pôde ser acessada nesta sessão**: o host está fora da
lista de rede permitida do container (erro de proxy 403 / DNS). Nada foi inventado para
suprir a falta.

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
