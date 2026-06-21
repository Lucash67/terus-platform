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

export const MODULES: ModuleDefinition[] = [
  {
    slug: "alert",
    name: "Terus Alert",
    tagline: "Monitoramento operacional em tempo real",
    description:
      "Garante visibilidade operacional contínua e resposta rápida a desvios de ruptura, estoque e anomalias — priorizando ações por impacto em receita.",
    features: [
      "Monitoramento contínuo de disponibilidade",
      "Priorização por impacto em receita",
      "Notificações em tempo real",
      "Integração nativa com ERP",
    ],
    metric: "< 5min",
    metricLabel: "Tempo médio de detecção",
  },
  {
    slug: "strategy",
    name: "Terus Strategy",
    tagline: "Visão executiva da operação",
    description:
      "Monitoramento estratégico de performance operacional com métricas em tempo real para tomada de decisão informada e governança da jornada.",
    features: [
      "KPIs de supply chain em tempo real",
      "Análise de capital em estoque",
      "Comparativo entre lojas e regiões",
      "Modo executivo e técnico",
    ],
    metric: "360°",
    metricLabel: "Visão da operação",
  },
  {
    slug: "order",
    name: "Terus Order",
    tagline: "Automação estratégica de reposição",
    description:
      "Orquestra a operação de reposição com base em demanda real, garantindo consistência operacional e otimização de capital em toda a jornada.",
    features: [
      "Sugestão automática de pedidos",
      "Regras por categoria e fornecedor",
      "Aprovação configurável",
      "Histórico e rastreabilidade",
    ],
    metric: "40%",
    metricLabel: "Redução de ruptura",
  },
  {
    slug: "task",
    name: "Terus Task",
    tagline: "Execução operacional coordenada",
    description:
      "Coordena a execução operacional com rastreabilidade completa, transformando alertas em tarefas priorizadas para equipes de loja.",
    features: [
      "Tarefas priorizadas por impacto",
      "Checklist de execução",
      "Evidências fotográficas",
      "Sincronização offline",
    ],
    metric: "3x",
    metricLabel: "Mais rápido na execução",
  },
  {
    slug: "log",
    name: "Terus Log",
    tagline: "Governança e rastreabilidade operacional",
    description:
      "Garante governança operacional com trilha de auditoria completa, comprovando execução, conformidade e performance de equipes.",
    features: [
      "Trilha de auditoria imutável",
      "Evidências de execução",
      "Relatórios de conformidade",
      "Integração com Terus Task",
    ],
    metric: "100%",
    metricLabel: "Rastreabilidade",
  },
  {
    slug: "pulse",
    name: "Terus Pulse",
    tagline: "Centro de comando operacional",
    description:
      "Centraliza o controle da operação Terus com visibilidade de integrações, módulos ativos, saúde do ambiente e ações pendentes — garantindo governança da jornada.",
    features: [
      "Dashboard unificado",
      "Status de integrações",
      "Gestão de módulos",
      "Central de notificações",
    ],
    metric: "1",
    metricLabel: "Ponto de controle",
  },
];

export function getModuleBySlug(slug: string): ModuleDefinition | undefined {
  return MODULES.find((module) => module.slug === slug);
}

export const MODULE_SLUGS: ModuleSlug[] = MODULES.map((module) => module.slug);
