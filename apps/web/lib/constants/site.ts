export const BRAND = {
  name: "Terus.TEC",
  logos: {
    /** Wordmark oficial Terus.varejo (fundo transparente) — navbar, footer */
    primary: "/logos/terus/terus-varejo-wordmark.png",
    /** Wordmark com "TERUS" branco — tema escuro */
    primaryDark: "/logos/terus/terus-varejo-wordmark-dark.png",
    /** Monograma colorido — favicon / espaços compactos */
    mark: "/logos/terus/terus-mark.png",
    /** Monograma claro (path branco) — fundos escuros */
    markLight: "/logos/terus/terus-mark-light.png",
    /** Wordmark em fundo branco 1200×630 — impressão / OG */
    print: "/logos/terus/terus-varejo-og.jpg",
  },
};

export const SITE_NAME = "Terus Varejo";

export const SITE_TAGLINE = "Inteligência da Cadeia de Suprimentos";

export const SITE_DESCRIPTION =
  "Mostramos o que está tirando venda da sua loja, guiamos a equipe a corrigir primeiro o que mais devolve dinheiro e medimos quanto voltou — conectando varejo, indústria e distribuição.";

export const HERO = {
  headline: "Sua gôndola perde venda todo dia.",
  headlineAccent: "Nós trazemos de volta.",
  description:
    "Nós encontramos a ruptura, a loja corrige guiada pelo app e você vê o R$ recuperado. Alertas de ruptura, excesso e margem viram uma fila ordenada pelo valor de cada produto — e o pedido de reposição chega direto no ERP do fornecedor.",
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
