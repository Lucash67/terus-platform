/**
 * Componentes da plataforma conforme o catálogo público de terustec.com.br
 * (registrado no pacote Digital Experience 2.0, doc 03/08, acesso em 12/11/2026).
 * Descrições mantidas no nível de detalhe da fonte — sem especificações inventadas.
 * Agent, IAproc e Bond estão em site-data.ts (CAMADA_INTEGRACAO); Alert, Task e
 * Strategy em modules.ts.
 */
export const PLATFORM_COMPONENTS = [
  {
    name: "Portal do Cliente",
    description:
      "Acesso aos dados e às ações gerenciais e operacionais da rede em um só lugar.",
  },
  {
    name: "Task Web",
    description:
      "Atividades de reposição, pedidos e bloqueios/desbloqueios direto no portal.",
  },
  {
    name: "Teams",
    description:
      "Verificação das evidências da execução feita pelo Terus Task.",
  },
  {
    name: "Suporte Anjo",
    description: "Apoio personalizado, com contato recorrente da equipe Terus.",
  },
] as const;

export const SECURITY_POINTS = [
  {
    title: "Só leitura no ERP da rede",
    description:
      "Nada é gravado, alterado ou apagado no banco do varejo. O usuário de integração tem permissões mínimas.",
  },
  {
    title: "Sem VPN",
    description:
      "A captura parte de um IP fixo da Terus; o TI libera esse IP no firewall.",
  },
  {
    title: "Saúde da integração visível",
    description: "Atraso e completude das cargas acompanhados no portal.",
  },
  {
    title: "Credenciais fora do formulário",
    description:
      "O cadastro no site não pede senha nem acesso ao banco. A integração é combinada com o seu TI e a equipe técnica da Terus.",
  },
] as const;
