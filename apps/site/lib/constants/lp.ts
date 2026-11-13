/**
 * Conteúdo das seções de conversão da LP Terus Varejo.
 * Fonte: manuais de uso em wiki.terus.tec.br/varejo.
 */

export const DORES = {
  badge: "Onde a venda escapa",
  title: "A loja perde venda em situações muito concretas",
  description:
    "Nenhuma delas aparece no relatório do mês. Todas aparecem na Terus — produto por produto, loja por loja.",
  items: [
    {
      sigla: "CAP",
      title: "Chegou e ficou no depósito",
      description:
        "O produto entrou na loja, está no estoque e a gôndola continua vazia.",
    },
    {
      sigla: "PSV",
      title: "Está na gôndola, mas não vende",
      description:
        "Virado, escondido atrás de outro, com buraco na frente. A venda para e ninguém percebe.",
    },
    {
      sigla: "PO",
      title: "A oferta começou sem cartaz",
      description:
        "Oferta sem sinalização não comunica preço. O investimento do encarte não volta.",
    },
    {
      sigla: "SO",
      title: "A oferta acabou e o cartaz ficou",
      description:
        "O cliente vê o preço antigo no caixa. Reclamação, desconto forçado e margem perdida.",
    },
    {
      sigla: "PEE",
      title: "Excesso parado na loja",
      description:
        "Capital empatado em produto sem giro há mais de 30 dias, enquanto outro item rompe.",
    },
    {
      sigla: "PMN",
      title: "Margem negativa sem ninguém ver",
      description:
        "Custo fora do esperado e preço divergente entre filiais corroem o resultado em silêncio.",
    },
  ],
} as const;

export interface Persona {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  video?: FounderVideoData;
}

export interface FounderVideoData {
  src: string;
  poster: string;
  title: string;
  duration: string;
}

export const FOUNDER = {
  name: "Rodrigo",
  role: "Fundador e CEO da Terus",
} as const;

export const FOUNDER_VIDEOS = {
  dinheiroNaMesa: {
    src: "/videos/rodrigo-dinheiro-na-mesa.mp4",
    poster: "/videos/rodrigo-dinheiro-na-mesa.jpg",
    title: "Quanto dinheiro você está deixando na mesa?",
    duration: "52s",
  },
  comprador: {
    src: "/videos/rodrigo-comprador.mp4",
    poster: "/videos/rodrigo-comprador.jpg",
    title: "O cuidado do comprador não termina no pedido",
    duration: "1min",
  },
  fornecedor: {
    src: "/videos/rodrigo-fornecedor.mp4",
    poster: "/videos/rodrigo-fornecedor.jpg",
    title: "Vender e entregar é só uma parte",
    duration: "1min15",
  },
  institucional: {
    src: "/videos/rodrigo-institucional.mp4",
    poster: "/videos/rodrigo-institucional.jpg",
    title: "Tecnologia que vira resultado",
    duration: "57s",
  },
} satisfies Record<string, FounderVideoData>;

export const FOUNDER_SECTION = {
  badge: "Do fundador",
  title: "Quanto dinheiro a sua rede deixa na mesa todo dia?",
  description:
    "Em 50 segundos, explicamos onde a venda se perde entre o depósito e a gôndola — e como transformamos cada problema em uma ação.",
  questions: [
    "O produto que chegou na loja está exposto como o cliente espera?",
    "Quando há problema, você sabe quanto está deixando de faturar?",
    "O encarregado e o promotor sabem exatamente onde agir?",
  ],
} as const;

/** Capítulos e perguntas seguem a fala do Rodrigo no vídeo do fornecedor. */
export const SUPPLIER_QUOTE = {
  quote: "Vender e entregar é só uma parte dessa relação.",
  hook: "O pedido chegou certo. Mas o seu produto chegou à gôndola?",
  description:
    "Em 1min15, o Rodrigo mostra a etapa que vem depois da entrega — e o que muda quando fornecedor e varejo passam a olhar para os mesmos problemas.",
  chapters: [
    {
      at: 0,
      label: "O pedido precisa ser ágil e correto",
      hint: "É aí que começa a relação entre quem fornece e o varejo.",
    },
    {
      at: 11,
      label: "A etapa depois da entrega",
      hint: "Fazer o produto chegar, de fato, até o consumidor.",
    },
    {
      at: 18,
      label: "5 perguntas sobre a gôndola",
      hint: "Alguma delas indica que você está perdendo venda?",
    },
    {
      at: 37,
      label: "Onde a Terus entra",
      hint: "Aprovado no portal, o pedido é gravado direto no ERP do fornecedor, sem redigitação.",
    },
    {
      at: 49,
      label: "O promotor sabe o que não vende",
      hint: "Produto que parou de vender ou caiu forte vai para a fila do promotor no Terus Task.",
    },
    {
      at: 58,
      label: "Fornecedor e varejo conectados",
      hint: "Olhando para os mesmos problemas e buscando os mesmos resultados.",
    },
  ],
  /** Capítulo em que as perguntas aparecem, com o segundo de cada uma */
  questionsChapter: 2,
  questions: [
    { at: 19.5, text: "O produto chegou realmente à gôndola?" },
    { at: 22, text: "Ele foi reposto?" },
    { at: 24.5, text: "Está exposto de maneira adequada?" },
    { at: 27.5, text: "A etiqueta de preço está bem posicionada?" },
    { at: 30.5, text: "As ofertas estão destacadas?" },
  ],
} as const;

export const PERSONAS: {
  badge: string;
  title: string;
  description: string;
  items: Persona[];
} = {
  badge: "Para quem",
  title: "Cada um vê o que precisa para agir",
  description:
    "O mesmo dado da rede, recortado para quem decide, quem compra, quem executa e quem fornece.",
  items: [
    {
      id: "diretoria",
      label: "Diretoria",
      title: "A rede inteira em um resumo do dia",
      description:
        "Saiba onde a operação está perdendo dinheiro e se as lojas estão reagindo.",
      bullets: [
        "Painel de alertas da rede e por filial",
        "Resumo do dia para a diretoria",
        "Metas por loja, seção e comprador",
        "Valor capturado vs. deixado na mesa por loja",
      ],
    },
    {
      id: "comprador",
      label: "Comprador",
      title: "A mesa do comprador, só com a sua carteira",
      description:
        "Tudo o que pede decisão de compra, organizado por fornecedor para a próxima reunião.",
      bullets: [
        "Ruptura em itens de giro e produtos sem giro há 30+ dias",
        "Divergência de custo e oportunidades de mix",
        "Pedido de reposição sugerido por estoque e venda",
        "Aprovação de devoluções de excesso",
      ],
      video: FOUNDER_VIDEOS.comprador,
    },
    {
      id: "loja",
      label: "Loja",
      title: "Um app que diz o que fazer, na ordem certa",
      description:
        "O operador não escolhe por memória. O Terus Task entrega o próximo produto, o roteiro e pede a foto.",
      bullets: [
        "Fila priorizada por retorno em R$ (Alto, Médio, Baixo)",
        "Coletar no depósito e abastecer a gôndola",
        "Verificar presença, corrigir exposição e ofertas",
        "Recebimento de carga e inventário com contagem cega",
      ],
    },
    {
      id: "fornecedor",
      label: "Fornecedor",
      title: "A indústria e o distribuidor dentro da gôndola",
      description:
        "O Portal do Fornecedor mostra os seus produtos em cada varejo parceiro — e recebe os pedidos.",
      bullets: [
        "Alertas e sell-out dos seus SKUs em cada rede",
        "Pedidos do varejo aprovados e gravados no seu ERP",
        "Negociação de margem e devolução de excesso",
        "Sugestão de pedido e loja virtual B2B",
      ],
    },
  ],
};

export const PONTE_FORNECEDOR = {
  badge: "Varejo + fornecedor",
  title: "O pedido sai da rede e entra no ERP do fornecedor",
  description:
    "O comprador envia pelo portal, o fornecedor aprova no dele e o pedido é gravado direto no ERP, sem redigitação. No Cometa Supermercados, a rejeição de pedidos no ERP caiu de 35% para 0,5%.",
  steps: [
    {
      title: "Comprador revisa",
      description: "Sugestão por estoque, venda e parâmetros da rede.",
      status: "Revisado",
    },
    {
      title: "Fornecedor aprova",
      description: "Valida preço e DE-PARA no Portal do Fornecedor.",
      status: "Aprovado",
    },
    {
      title: "Entra no ERP",
      description: "Gravado no Winthor, Sankhya ou VitSis do fornecedor.",
      status: "No ERP",
    },
    {
      title: "NF e rastreio",
      description:
        "Nota fiscal e tracking no portal. Com unitização, cada volume é rastreado até a loja.",
      status: "Em rota",
    },
    {
      title: "Loja recebe",
      description:
        "Com unitização, a loja lê a etiqueta no app e confirma com contagem cega.",
      status: "Recebido",
    },
  ],
  benefitsTitle: "O que já funciona no portal, dos dois lados",
  benefits: [
    {
      audience: "Para a indústria e o distribuidor",
      items: [
        {
          title: "Pedido da rede direto no ERP",
          description:
            "Aprovado no portal, entra no Winthor, Sankhya ou VitSis — com status, NF e tracking.",
        },
        {
          title: "Seus SKUs dentro de cada rede",
          description:
            "Alertas, sell-out, ruptura e nível de serviço dos seus produtos, loja por loja.",
        },
        {
          title: "Negociação de margem com conformidade",
          description:
            "Proposta de preço para a rede e acompanhamento do que foi acordado depois de aprovada.",
        },
        {
          title: "DE-PARA com vínculo por EAN",
          description:
            "O seu código ligado ao da rede, com conversão de unidade e importação por planilha.",
        },
      ],
    },
    {
      audience: "Para a rede",
      items: [
        {
          title: "Pedido de reposição sugerido",
          description:
            "Calculado por estoque, venda e parâmetros da rede. O comprador revisa e envia.",
        },
        {
          title: "Devolução de excesso com contagem cega",
          description:
            "A loja conta no Terus Task sem ver o saldo do sistema; o comprador aprova o que volta.",
        },
        {
          title: "Execução do promotor na carteira",
          description:
            "O comprador acompanha a fila do Terus Task de promotores e encarregados na carteira dele.",
        },
        {
          title: "Rastreamento de cargas",
          description:
            "Com unitização, gaiolas e paletes acompanhados do depósito até a entrada na loja.",
        },
      ],
    },
  ],
} as const;

export const FAQ = {
  badge: "Perguntas frequentes",
  title: "O que as redes perguntam antes de começar",
  items: [
    {
      question: "Preciso trocar de ERP?",
      answer:
        "Não. Nós nos conectamos ao ERP que a rede já usa — RMS, Consinco, VR Software, CISS Poder, RPInfo ou API REST. Do lado do fornecedor, Winthor, Sankhya e VitSis.",
    },
    {
      question: "A Terus altera alguma coisa no meu banco de dados?",
      answer:
        "Não. No ERP da rede nós só lemos: não gravamos pedido, não alteramos cadastro e não apagamos nenhuma tabela. O usuário de integração tem permissões mínimas e nunca é administrador.",
    },
    {
      question: "O que o meu TI precisa fazer?",
      answer:
        "Liberar o IP fixo da Terus no firewall, criar o usuário de integração e aplicar o script de permissões que entregamos pronto. Não precisa de VPN.",
    },
    {
      question: "A loja precisa de equipamento novo?",
      answer:
        "Não. O Terus Task roda no celular (Android 8+ ou iOS 15+) e usa a câmera para ler o código de barras e registrar a foto de evidência.",
    },
    {
      question: "Como sei se está dando resultado?",
      answer:
        "O portal mede cada alerta: venda em R$ antes e depois, taxa de acerto, reincidência e o valor capturado contra o deixado na mesa — por loja e por colaborador.",
    },
    {
      question: "Os meus fornecedores também usam?",
      answer:
        "Sim. Indústrias e distribuidores conectados acessam o Portal do Fornecedor para ver alertas e sell-out dos seus produtos e receber os pedidos da rede direto no ERP deles.",
    },
    {
      question: "Preciso contratar todos os módulos?",
      answer:
        "Não. O ciclo essencial é Alert, Order, Task e Strategy. Unitization, Production, Chain e Vitrine entram conforme a operação.",
    },
  ],
} as const;

/** Área em % da tela que recebe zoom e destaque no tour. */
export interface ScreenFocus {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PlatformScreen {
  /** Base do arquivo em /public/plataforma: `{image}-light.webp` e `{image}-dark.webp` */
  image: string;
  width: number;
  height: number;
  alt: string;
}

export interface TourChapter {
  id: string;
  label: string;
  title: string;
  description: string;
  screen: PlatformScreen;
  focus?: ScreenFocus;
  locked?: boolean;
}

export const PLATFORM_SCREENS = {
  alertboard: {
    image: "alertboard",
    width: 1920,
    height: 1200,
    alt: "AlertBoard do Portal Terus Varejo com os tipos de alerta e a quantidade de produtos em cada um",
  },
  estoque: {
    image: "estoque",
    width: 1920,
    height: 1200,
    alt: "Tela de estoque com produtos em ruptura, saldo, saída média, cobertura e última venda",
  },
  ranking: {
    image: "ranking",
    width: 1800,
    height: 598,
    alt: "Ranking de estoque por seção e por fornecedor",
  },
  gestao: {
    image: "gestao",
    width: 1920,
    height: 1200,
    alt: "Gestão de alertas com pendentes, executados e reincidências por tipo de alerta",
  },
  briefing: {
    image: "briefing",
    width: 1920,
    height: 1200,
    alt: "Briefing do Dono com os indicadores desfocados",
  },
  monitor: {
    image: "monitor",
    width: 1920,
    height: 1200,
    alt: "Monitor de Execução com valor capturado e valor deixado na mesa, desfocado",
  },
} satisfies Record<string, PlatformScreen>;

export const PLATFORM_TOUR: {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  note: string;
  lockedTitle: string;
  lockedCta: string;
  chapters: TourChapter[];
} = {
  badge: "Por dentro da Terus",
  title: "Veja a sua rede",
  titleAccent: "pelo lado de dentro",
  description:
    "Telas do Portal Terus Varejo. Cada uma responde a uma pergunta que o dono de rede faz todo dia.",
  note: "Telas reais do ambiente de demonstração, com dados fictícios.",
  lockedTitle: "Com os números da sua rede, na demonstração",
  lockedCta: "Quero ver com a minha rede",
  chapters: [
    {
      id: "alertas",
      label: "Painel de alertas",
      title: "A rede inteira em um painel",
      description:
        "Ruptura, excesso, oferta, margem e produto sem venda. Cada tipo de alerta com a quantidade de produtos para agir — por filial ou por fornecedor.",
      screen: PLATFORM_SCREENS.alertboard,
      focus: { left: 6.1, top: 61.3, width: 22, height: 17.5 },
    },
    {
      id: "estoque",
      label: "Estoque",
      title: "Onde o produto sumiu da gôndola",
      description:
        "Saldo negativo, dias de cobertura, última venda e última entrada, produto por produto. O comprador vê o que repor e em qual seção.",
      screen: PLATFORM_SCREENS.estoque,
      focus: { left: 42, top: 60, width: 21, height: 34 },
    },
    {
      id: "ranking",
      label: "Ranking de estoque",
      title: "Onde o estoque está parado",
      description:
        "Seções e fornecedores ordenados por saldo, para decidir compra e negociação com o dado na mão.",
      screen: PLATFORM_SCREENS.ranking,
    },
    {
      id: "gestao",
      label: "Gestão de alertas",
      title: "Loja por loja, alerta por alerta",
      description:
        "Pendentes, em execução, executados e reincidências — por tipo de alerta e por filial.",
      screen: PLATFORM_SCREENS.gestao,
      focus: { left: 6, top: 23.5, width: 92, height: 10 },
    },
    {
      id: "briefing",
      label: "Briefing do Dono",
      title: "O resumo que o dono confere antes de sair",
      description:
        "Venda do dia, margem, ticket médio, ruptura em giro e a fila da loja, em uma tela.",
      screen: PLATFORM_SCREENS.briefing,
      locked: true,
    },
  ],
};

export interface AppPoster {
  image: string;
  alt: string;
  label: string;
}

export const TASK_APP = {
  badge: "App Terus Task",
  title: "A correção chega na gôndola",
  titleAccent: "pelo celular da loja",
  description:
    "O portal aponta o problema; o Terus Task leva o operador até ele. Um produto de cada vez, com o roteiro na tela e a leitura do código de barras para confirmar.",
  bullets: [
    "Rotinas por departamento e seção",
    "Coletar no depósito e abastecer a gôndola",
    "Presença, exposição, destaque e retirada de oferta",
    "Recebimento por gaiola ou palete, com status em tempo real",
  ],
  posters: [
    {
      image: "/app-task/task-setor.jpg",
      alt: "Tela inicial do Terus Task com departamento, seção e as rotinas da loja",
      label: "Por setor",
    },
    {
      image: "/app-task/task-tarefa.jpg",
      alt: "Tarefa guiada no Terus Task com estoque, preço, atividades pendentes e leitura do produto",
      label: "Tarefa guiada",
    },
    {
      image: "/app-task/task-coleta.jpg",
      alt: "Fluxo de coleta e abastecimento no Terus Task com leitura de código de barras",
      label: "Coleta e abastecimento",
    },
  ] satisfies AppPoster[],
  posterWidth: 472,
  posterHeight: 1024,
} as const;

export const INTEGRATION_HEALTH = {
  badge: "Avaliação de fornecedores",
  title: "Uma nota de 0 a 100 para cada fornecedor",
  description:
    "O portal da rede consolida atendimento, ruptura, sell-out, regularidade e lead time em um número compartilhado para a reunião comercial. O fornecedor vê o mesmo espelho em Desempenho no varejo.",
  score: 71,
  status: "Atenção",
  pillars: [
    { label: "Atendimento", score: 78 },
    { label: "Ruptura", score: 57 },
    { label: "Sell-out", score: 38 },
    { label: "Regularidade", score: 100 },
    { label: "Lead time", score: 100 },
  ],
  note: "Exemplo do ambiente de demonstração.",
} as const;
