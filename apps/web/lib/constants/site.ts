export const BRAND = {
  name: "Terus.TEC",
  logos: {
    /** Wordmark oficial (fundo transparente) — navbar, footer */
    primary: "/logos/terus/terus-wordmark.png",
    /** Monograma colorido — favicon / espaços compactos */
    mark: "/logos/terus/terus-mark.png",
    /** Monograma claro (path branco) — fundos escuros */
    markLight: "/logos/terus/terus-mark-light.png",
    /** Wordmark em fundo branco — impressão / OG */
    print: "/logos/terus/terus.jpg",
  },
};

export const SITE_NAME = "Terus Varejo";

export const SITE_TAGLINE = "Inteligência da Cadeia de Suprimentos";

export const SITE_DESCRIPTION =
  "Terus Varejo mostra o que está tirando venda da sua loja, guia a equipe a corrigir primeiro o que mais devolve dinheiro e mede quanto voltou — conectando varejo, indústria e distribuição.";

export const HERO = {
  headline: "Sua gôndola perde venda todo dia.",
  headlineAccent: "A Terus encontra, a loja corrige e o R$ volta.",
  description:
    "Alertas de ruptura, excesso e margem viram uma fila guiada no app da loja — ordenada pelo valor em R$ que cada produto pode recuperar. E o pedido de reposição chega ao fornecedor direto no ERP dele.",
  highlights: [
    "13 tipos de alerta: ruptura, excesso, sem venda, oferta e margem",
    "Fila da loja priorizada por retorno em R$, com foto de evidência",
    "Pedido de reposição que entra direto no ERP do fornecedor",
  ],
  trustStats: [
    {
      value: 96,
      prefix: "",
      suffix: "%",
      decimals: 0,
      label: "Pedidos digitalizados",
    },
    {
      value: 0.5,
      prefix: "",
      suffix: "%",
      decimals: 1,
      label: "Rejeição no ERP",
    },
    {
      value: 31881,
      prefix: "",
      suffix: "",
      decimals: 0,
      label: "Pedidos rastreáveis",
    },
    {
      value: 20,
      prefix: "+",
      suffix: "",
      decimals: 0,
      label: "Empresas na Rede Terus",
    },
  ],
} as const;

export const POSITIONING_POINTS = [
  {
    title: "Detecta",
    description:
      "O Terus Alert lê o ERP da rede e abre alertas de ruptura, risco de ruptura, excesso, sem venda, queda, oferta, preço e margem — por loja, seção e comprador.",
  },
  {
    title: "Executa",
    description:
      "O alerta vira atividade no app da loja. O operador é guiado produto a produto, começando pelo que mais devolve dinheiro, e fecha cada visita com foto.",
  },
  {
    title: "Mede",
    description:
      "O portal mostra o que foi feito, o que ficou para trás e se a venda reagiu: R$ antes e depois, acerto, reincidência e o valor deixado na mesa.",
  },
];

export const ECOSYSTEM_PARTNERS = [
  {
    name: "Rede e diretoria",
    description:
      "Painel de alertas da rede, resumo do dia e metas por loja, seção e comprador.",
    category: "Portal Varejo",
  },
  {
    name: "Comprador",
    description:
      "Mesa do comprador com a carteira, oportunidades de mix, divergência de custo e pedido de reposição.",
    category: "Portal Varejo",
  },
  {
    name: "Loja",
    description:
      "App Terus Task: abastecer, corrigir exposição, destacar oferta e inventário — com foto.",
    category: "App",
  },
  {
    name: "Indústria e distribuidor",
    description:
      "Portal do Fornecedor: alertas, sell-out, pedidos do varejo direto no ERP e devolução de excesso.",
    category: "Portal Fornecedor",
  },
];

export const PLATFORM_PILLARS = [
  {
    title: "Conectar",
    description:
      "Integração segura com ERPs e sistemas legados via assistente guiado.",
  },
  {
    title: "Diagnosticar",
    description:
      "Validação automatizada de integração operacional, permissões e qualidade de dados.",
  },
  {
    title: "Ativar",
    description: "Ativação operacional com configurações automatizadas.",
  },
  {
    title: "Operar",
    description:
      "Automação de alertas, pedidos e tarefas operacionais sem intervenção manual.",
  },
  {
    title: "Monitorar",
    description:
      "Visibilidade em tempo real da operação com dashboards executivos e indicadores.",
  },
];

export const COMPANY_VALUES = [
  {
    title: "Missão",
    description:
      "Eliminar ruptura de gôndola e excesso de estoque com inteligência operacional em tempo real.",
  },
  {
    title: "Visão",
    description:
      "Ser a referência em Inteligência da Cadeia de Suprimentos para o varejo brasileiro.",
  },
  {
    title: "Diferencial",
    description:
      "Onboarding autônomo, diagnóstico automatizado e ativação sem intervenção manual da equipe técnica.",
  },
];
