export type ModuleSlug =
  | "alert"
  | "order"
  | "task"
  | "strategy"
  | "unitization"
  | "production"
  | "chain"
  | "vitrine";

export type ModuleGroup = "core" | "expansao";

export interface ModuleDefinition {
  slug: ModuleSlug;
  name: string;
  group: ModuleGroup;
  tagline: string;
  description: string;
  features: string[];
  metric: string;
  metricLabel: string;
}

/**
 * Catálogo de módulos da Terus Varejo — espelha os blocos do portal
 * documentados em wiki.terus.tec.br/varejo.
 */
export const MODULES: ModuleDefinition[] = [
  {
    slug: "alert",
    name: "Terus Alert",
    group: "core",
    tagline: "O que está tirando venda da loja, hoje",
    description:
      "Painel de alertas da rede e da filial — ruptura, risco de ruptura, excesso, sem venda, queda, oferta, preço e margem. O comprador tem a própria mesa, só com a carteira dele.",
    features: [
      "13 tipos de alerta: ruptura, excesso, sem venda, queda, margem negativa e mais",
      "Mesa do comprador: carteira, mix, divergência de custo e produtos sem giro 30+ dias",
      "Detalhe por produto, filial, seção e dias sem venda",
      "Resumo do dia para a diretoria",
    ],
    metric: "13",
    metricLabel: "Tipos de alerta operacional",
  },
  {
    slug: "order",
    name: "Terus Order",
    group: "core",
    tagline: "Reposição que chega ao fornecedor — e ao ERP dele",
    description:
      "Sugestão de compra com base em estoque, venda e parâmetros da rede. O comprador revisa, envia, e o fornecedor aprova o pedido que cai direto no ERP dele — com NF e rastreio.",
    features: [
      "Pedido de reposição sugerido por estoque e venda",
      "Fornecedor aprova e o pedido entra no ERP dele (Winthor, Sankhya, VitSis)",
      "Devolução de excesso com contagem cega na loja",
      "Negociação de margem, sell-in e sell-out",
    ],
    metric: "0,5%",
    metricLabel: "Rejeição de pedido no ERP (case)",
  },
  {
    slug: "task",
    name: "Terus Task",
    group: "core",
    tagline: "A loja corrige primeiro o que mais devolve dinheiro",
    description:
      "App da loja que conduz o operador, um produto de cada vez: abastecer a gôndola, corrigir a exposição, destacar e retirar oferta. A fila é ordenada pelo valor em R$ que cada item pode recuperar.",
    features: [
      "Fila priorizada por retorno em R$ (Alto, Médio, Baixo)",
      "Roteiro guiado com leitura do código de barras e foto de evidência",
      "Coletar e abastecer, presença e exposição, ofertas e inventário",
      "Portal mede R$ antes e depois, acerto e reincidência",
    ],
    metric: "R$",
    metricLabel: "Fila ordenada por valor recuperável",
  },
  {
    slug: "strategy",
    name: "Terus Strategy",
    group: "core",
    tagline: "Metas, vendas, compras e estoque em um painel",
    description:
      "Inteligência comercial da rede: metas por comprador, seção e loja; vendas vs. ano anterior; entradas; posição e ranking de estoque; ruptura e nível de serviço.",
    features: [
      "Definição e acompanhamento de metas",
      "Vendas por loja, categoria e vs. ano anterior",
      "Ranking de estoque com o excesso caro no topo",
      "Ruptura, nível de serviço e divergência de inventário",
    ],
    metric: "YoY",
    metricLabel: "Tendência para decidir",
  },
  {
    slug: "unitization",
    name: "Terus Unitization",
    group: "expansao",
    tagline: "Da gaiola no CD até a entrada na loja",
    description:
      "Quebra o pedido em volumes, imprime a etiqueta de gaiola ou palete e rastreia cada volume do depósito até a loja — com contagem cega no recebimento.",
    features: [
      "Etiquetas de gaiola e palete",
      "Rastreamento de cargas: separado, em trânsito, recebido",
      "Separação prevista × realizada",
      "Recebimento no app com contagem cega",
    ],
    metric: "CD→Loja",
    metricLabel: "Volume rastreado",
  },
  {
    slug: "production",
    name: "Terus Production",
    group: "expansao",
    tagline: "Padaria, açougue e rotisseria sob controle",
    description:
      "Produção própria da rede: a loja pede, o centro planeja e produz, transfere e o estoque da produção acompanha — da padaria ao açougue.",
    features: [
      "Pedidos da loja calculados e aprovados",
      "Planejamento e ordens de produção",
      "Rotas de abastecimento e transferências",
      "Estoque da produção",
    ],
    metric: "PA",
    metricLabel: "Produção e abastecimento",
  },
  {
    slug: "chain",
    name: "Terus Chain",
    group: "expansao",
    tagline: "Score dos fornecedores e saúde dos dados",
    description:
      "Avaliação de fornecedores (atendimento, ruptura, prazo) para a reunião comercial e monitoramento da qualidade da integração com o ERP.",
    features: [
      "Ranking de fornecedores na rede",
      "Resultado da integração por ciclo",
      "Saúde da integração: completude e atraso",
      "Conferência ERP × Terus",
    ],
    metric: "Score",
    metricLabel: "Desempenho do fornecedor",
  },
  {
    slug: "vitrine",
    name: "Terus Vitrine",
    group: "expansao",
    tagline: "Gestão de espaço e exposição da loja",
    description:
      "Mapa de exposição por filial, medidas e foto de cada SKU e replicação do layout de uma loja modelo para outra.",
    features: [
      "Mapa de exposição por gôndola",
      "Medidas e foto do SKU",
      "Replicar layout entre lojas",
      "Auditoria da vitrine pelo app",
    ],
    metric: "Layout",
    metricLabel: "Exposição planejada",
  },
];

export function getModuleBySlug(slug: string): ModuleDefinition | undefined {
  return MODULES.find((module) => module.slug === slug);
}

export const MODULE_SLUGS: ModuleSlug[] = MODULES.map((module) => module.slug);
