export type ModuleSlug =
  | "alert"
  | "strategy"
  | "order"
  | "task"
  | "log"
  | "pulse";

export interface ModuleDefinition {
  slug: ModuleSlug;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  metric: string;
  metricLabel: string;
}

/**
 * Catálogo dos 6 módulos oficiais (nomenclatura da plataforma).
 * Copy alinhada às soluções reais do site legado terustec.com.br:
 * Alert ← ALERT · Strategy ← STRATEGY · Order ← TASK WEB ·
 * Task ← TASK · Log ← TEAMS · Pulse ← Portal do Cliente.
 */
export const MODULES: ModuleDefinition[] = [
  {
    slug: "alert",
    name: "Terus Alert",
    tagline: "Alertas que impactam a performance da loja",
    description:
      "Painel com os principais problemas que atingem as lojas do varejo — ruptura, exposição, precificação e oferta. Cada alerta lista os produtos envolvidos e alimenta as ferramentas de execução (Task e Order).",
    features: [
      "Cerca de 12 alertas ligados à performance da loja",
      "Detalhamento por produto do que prejudica o resultado",
      "Encaminhamento para execução no Task e no Order",
      "Visão de manutenção e prevenção operacional",
    ],
    metric: "~12",
    metricLabel: "Alertas operacionais por loja",
  },
  {
    slug: "strategy",
    name: "Terus Strategy",
    tagline: "Painéis estratégicos para a sala de reunião",
    description:
      "Painéis de informações estratégicas e gerenciais formatados de forma simples — pensados para responder às perguntas que o varejo faz em mesa redonda, com velocidade para apoiar a tomada de decisão.",
    features: [
      "Uma pergunta de negócio, um painel dedicado",
      "Visão para varejo, fornecedores e encarregados",
      "Acesso e leitura facilitados das informações",
      "Respostas rápidas para decisão gerencial",
    ],
    metric: "1:1",
    metricLabel: "Pergunta → painel dedicado",
  },
  {
    slug: "order",
    name: "Terus Order",
    tagline: "Pedidos, reposição e correção de estoque",
    description:
      "Área web para atuar sobre necessidades de correção e ajuste: pedido de compra, solicitação de reabastecimento ao CD, bloqueio de compra em excesso e inativação de produtos descontinuados — com evidência e prazo.",
    features: [
      "Filtro por departamento, seção, fornecedor ou alerta",
      "Pedido de compra e reposição ao Centro de Distribuição",
      "Bloqueio de compra em produtos com excesso de estoque",
      "Evidências e alerta quando a atividade não conclui no prazo",
    ],
    metric: "CD+",
    metricLabel: "Compra, CD e bloqueio",
  },
  {
    slug: "task",
    name: "Terus Task",
    tagline: "Atividades guiadas para o encarregado na loja",
    description:
      "Aplicativo mobile que guia, de forma ordenada e prioritária, as atividades do encarregado: abastecimento, correção de exposição, etiqueta de preço e destaque de oferta — com evidência de cada execução.",
    features: [
      "Priorização das atividades mais importantes do dia",
      "Verificação de exposição, abastecimento e preço",
      "Destaque correto de produtos em oferta",
      "Evidências geradas em toda atividade executada",
    ],
    metric: "App",
    metricLabel: "Execução guiada na loja",
  },
  {
    slug: "log",
    name: "Terus Log",
    tagline: "Acompanhamento de equipes e evidências",
    description:
      "Visão do fluxo de execução das equipes: atividades concluídas ou abandonadas, evidências do que foi feito, filtros por encarregado ou produto — para acompanhar e medir a operação em loja.",
    features: [
      "Execuções e abandonos de atividades em um só lugar",
      "Evidências de todo o fluxo do que foi executado",
      "Filtros e busca por encarregado ou produto",
      "Medição do desempenho das equipes de loja",
    ],
    metric: "100%",
    metricLabel: "Evidência da execução",
  },
  {
    slug: "pulse",
    name: "Terus Pulse",
    tagline: "Portal de gestão, execução e acompanhamento",
    description:
      "Centro de administração e operação do varejo: usuários, atribuições e metas; Strategy e Alert; acompanhamento de atividades e evidências; aprovação de sugestões de reposição do CD ou do fornecedor.",
    features: [
      "Gestão de usuários, atribuições e metas",
      "Acesso a Strategy e Alert no mesmo ambiente",
      "Acompanhamento de atividades e evidências",
      "Aprovação de sugestões de reposição (CD ou fornecedor)",
    ],
    metric: "1",
    metricLabel: "Portal de gestão da operação",
  },
];

export function getModuleBySlug(slug: string): ModuleDefinition | undefined {
  return MODULES.find((module) => module.slug === slug);
}

export const MODULE_SLUGS: ModuleSlug[] = MODULES.map((module) => module.slug);
