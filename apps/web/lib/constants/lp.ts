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

export const SUPPLIER_QUOTE = {
  quote: "Vender e entregar é só uma parte dessa relação.",
  description:
    "O pedido do varejo chega certo no sistema do fornecedor, sem redigitação, e o promotor recebe no app os produtos que não estão vendendo como deveriam.",
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

export const PLATAFORMA = {
  badge: "Plataforma",
  title: "Dois portais e um app",
  titleAccent: "sobre o mesmo dado da rede",
  description:
    "O Portal Terus Varejo para quem decide e compra, o Portal do Fornecedor para indústria e distribuidor, e o Terus Task na mão de quem executa na loja.",
  surfaces: [
    {
      name: "Portal Terus Varejo",
      audience: "Diretoria, compradores e gestão de loja",
      bullets: [
        "Painel de alertas da rede e por filial",
        "Mesa do comprador organizada por fornecedor",
        "Metas, efetividade e valor capturado por loja",
      ],
    },
    {
      name: "Portal do Fornecedor",
      audience: "Indústria e distribuidor",
      bullets: [
        "Alertas e sell-out dos seus SKUs em cada rede",
        "Pedidos aprovados e gravados no seu ERP",
        "Negociação de margem e devolução de excesso",
      ],
    },
    {
      name: "App Terus Task",
      audience: "Operação de loja",
      bullets: [
        "Fila priorizada por retorno em R$",
        "Roteiro guiado com foto de evidência",
        "Recebimento e inventário com contagem cega",
      ],
      note: "Android 8+ e iOS 15+",
    },
  ],
} as const;

export const PONTE_FORNECEDOR = {
  badge: "Varejo + fornecedor",
  title: "O pedido sai da rede e entra no ERP do fornecedor",
  description:
    "Sem e-mail, sem planilha, sem redigitação. É isso que levou a rejeição de pedidos no ERP de 35% para 0,5%.",
  steps: [
    {
      title: "Comprador revisa",
      description: "Sugestão por estoque, venda e parâmetros da rede.",
    },
    {
      title: "Fornecedor aprova",
      description: "Valida preço e DE-PARA no Portal do Fornecedor.",
    },
    {
      title: "Entra no ERP",
      description: "Gravado no Winthor, Sankhya ou VitSis do fornecedor.",
    },
    {
      title: "NF e rastreio",
      description:
        "Status do pedido, nota fiscal e carga visíveis para a rede.",
    },
    {
      title: "Loja recebe",
      description: "Recebimento no app com contagem cega do volume.",
    },
  ],
  extras: [
    "Devolução de excesso com contagem cega",
    "Negociação de margem",
    "Sell-in e sell-out por loja",
    "Avaliação de fornecedores",
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
        "Liberar o IP fixo da Terus no firewall, criar o usuário de integração e aplicar o script de permissões que entregamos pronto. Não precisa de VPN nem de instalar nada na rede.",
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
