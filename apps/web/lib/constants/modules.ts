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
    tagline: "Alertas críticos operacionais em tempo real",
    description:
      "Detecta rupturas de gôndola, quedas de estoque e anomalias operacionais antes que impactem a receita. Priorização inteligente para ação imediata.",
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
    tagline: "Painéis estratégicos e gerenciais",
    description:
      "Visão executiva da cadeia de suprimentos com métricas de ruptura, capital imobilizado e performance operacional em um único painel.",
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
    tagline: "Reposição e pedidos automatizados",
    description:
      "Automatiza pedidos de reposição com base em demanda real, lead time e políticas comerciais — eliminando decisões manuais inconsistentes.",
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
    tagline: "App mobile de execução para encarregados",
    description:
      "Transforma alertas em tarefas acionáveis para equipes de loja. Execução rastreada, com evidências e feedback em tempo real.",
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
    tagline: "Evidências e monitoramento de execução",
    description:
      "Registra cada ação operacional com trilha de auditoria completa. Comprova execução, conformidade e performance de equipes.",
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
    tagline: "Hub central do cliente",
    description:
      "Ponto único de acesso à operação Terus. Status de integrações, módulos ativos, saúde do ambiente e ações pendentes.",
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
