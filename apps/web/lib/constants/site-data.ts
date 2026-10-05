import { RedeCompany, CaseStudy } from "@terus/types";

export const RESULTADOS_OPERACIONAIS = [
  {
    title: "Digitalização do Canal",
    before: "0%",
    after: "até 96%",
    improvement: "Pedidos realizados digitalmente através da operação Terus.",
  },
  {
    title: "Ticket Médio",
    before: "R$ 1.740",
    after: "R$ 2.338",
    improvement: "+34% de crescimento no valor médio por pedido.",
  },
  {
    title: "Receita Processada",
    before: "R$ 11,6 mi",
    after: "R$ 16,0 mi",
    improvement:
      "+38% de crescimento financeiro no mesmo horizonte operacional.",
  },
  {
    title: "Rastreabilidade",
    value: "31.881 pedidos",
    description: "Auditoria ponta a ponta entre varejo, Terus e ERP.",
  },
];

export const INDICADORES_PLATAFORMA = [
  {
    title: "Rejeição ERP",
    value: "35% → 0,5%",
    description: "Redução significativa na rejeição de pedidos.",
  },
  {
    title: "Fill Rate",
    value: "40% → 96%",
    description: "Melhoria no atendimento de pedidos.",
  },
  {
    title: "Pedidos Rastreáveis",
    value: "31.881",
    description: "Pedidos identificados pela marca Terus no ERP.",
  },
  {
    title: "Digitalização Operacional",
    value: "86% a 96%",
    description: "Pedidos realizados via Terus.",
  },
];

export const EMPRESAS_CLIENTES: RedeCompany[] = [
  {
    name: "Cometa Supermercados",
    slug: "cometa-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/cometa.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Supermercado Guará",
    slug: "supermercado-guara",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/guara.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Baratão Supermercados",
    slug: "baratao-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: "https://barataosupermercados.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/baratao.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Center Box",
    slug: "center-box",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: "https://centerbox.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/centerbox.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Fazendinha",
    slug: "fazendinha",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: "https://www.supermercado-fazendinha.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/fazendinha.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "São Luiz",
    slug: "saoluiz",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: "https://www.mercadinhossaoluiz.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/saoluiz.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Super do Povo",
    slug: "super-do-povo",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/superdopovo.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Pinheiro Supermercados",
    slug: "pinheiro-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/pinheiro.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Freitas Varejo",
    slug: "freitas-varejo",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/freitas.webp",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Frangolândia Supermercados",
    slug: "frangolandia-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/frangolandia.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Super Lagoa",
    slug: "super-lagoa",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/superlagoa.png",
      monochrome: null,
      dark: null,
    },
  },
];

export const DEPOIMENTOS: {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string | null;
}[] = [];

export const CASES_DE_SUCESSO = [
  {
    title: "Cometa Supermercados",
    company: "Cometa Supermercados",
    description:
      "Adoção da jornada operacional Terus, com foco em digitalização de pedidos, redução de rejeição ERP e elevação do Fill Rate.",
    results:
      "Digitalização até 96%, Rejeição ERP 0,5%, Fill Rate 96%, ticket médio +34%, receita +38%, 31.881 pedidos rastreáveis.",
    image: null,
  },
];

/**
 * Pilares de prova social — alinhados ao discurso do produto real
 * (site legado terustec.com.br), sem depoimentos inventados.
 */
export const PROVA_SOCIAL_PILARES = [
  {
    title: "Atividades, não só relatórios",
    description:
      "O ecossistema gera atividades guiadas e monitoradas — reposição, exposição, preço e oferta — em vez de dashboards estáticos.",
  },
  {
    title: "Evidência em cada execução",
    description:
      "Toda atividade concluída gera evidência do que foi feito. Equipes e abandonos ficam visíveis para acompanhar e medir a operação.",
  },
  {
    title: "Varejo + fornecedor na mesma jornada",
    description:
      "O pedido de reposição chega no ERP do fornecedor, o promotor vê os produtos que precisam de atenção e a loja corrige a gôndola pelo Terus Task.",
  },
] as const;

/**
 * Camada de integração do produto real (legado: Agent, IAproc, Bond).
 * Infraestrutura que alimenta os módulos da Terus Varejo.
 */
export const CAMADA_INTEGRACAO = [
  {
    name: "Agent",
    role: "Coleta",
    description:
      "Conexão segura e controlada aos sistemas do varejo. Extrai os dados necessários, compacta, criptografa e envia para a nuvem Terus.",
  },
  {
    name: "IAproc",
    role: "Inteligência",
    description:
      "Processa e trata os dados recebidos pelo Agent e transforma resultados em ações efetivas para os módulos da Terus Varejo.",
  },
  {
    name: "Bond",
    role: "Integração",
    description:
      "Integra ERPs e fornecedores parceiros: sugestão de abastecimento, pedido de compra e troca de dados com indústria e distribuição.",
  },
] as const;

/** Como a integração funciona na prática (wiki: manuais de integração). */
export const INTEGRACOES = [
  {
    name: "Captura direta",
    type: "Varejo",
    status: "homologado" as const,
    description:
      "Conexão ao banco do ERP da rede (Oracle, PostgreSQL) ou à API do sistema — RMS, Consinco, VR, CISS Poder, RPInfo.",
    logo: null,
  },
  {
    name: "Pedido no ERP",
    type: "Fornecedor",
    status: "homologado" as const,
    description:
      "O pedido aprovado no portal entra no ERP do distribuidor ou da indústria — Winthor, Sankhya e VitSis.",
    logo: null,
  },
  {
    name: "Script pronto",
    type: "TI do cliente",
    status: "ativo" as const,
    description:
      "Entregamos o checklist e o script de permissões para o DBA colar. Sem desenvolvimento do lado do cliente.",
    logo: null,
  },
  {
    name: "Implantação acompanhada",
    type: "Ativação",
    status: "ativo" as const,
    description:
      "Do checklist à primeira carga, com a nossa equipe validando conexão e permissões antes de ativar os módulos.",
    logo: null,
  },
];

/**
 * ERPs com integração documentada (wiki.terus.tec.br/varejo).
 * `logo` aponta para /logos/erps/* quando o arquivo oficial existir;
 * sem arquivo, o chip renderiza a inicial tipográfica.
 */
export interface ErpEcosystemItem {
  name: string;
  vendor: string;
  side: "varejo" | "fornecedor";
  logo: string | null;
}

export const ERP_ECOSYSTEM: ErpEcosystemItem[] = [
  { name: "RMS", vendor: "TOTVS", side: "varejo", logo: null },
  { name: "Consinco", vendor: "TOTVS", side: "varejo", logo: null },
  { name: "VR Software", vendor: "PostgreSQL", side: "varejo", logo: null },
  { name: "CISS Poder", vendor: "API Integrim", side: "varejo", logo: null },
  { name: "RPInfo", vendor: "API REST", side: "varejo", logo: null },
  { name: "API REST", vendor: "JWT ou chave", side: "varejo", logo: null },
  { name: "Winthor", vendor: "TOTVS", side: "fornecedor", logo: null },
  { name: "Sankhya", vendor: "Gateway REST", side: "fornecedor", logo: null },
  { name: "VitSis", vendor: "Firebird", side: "fornecedor", logo: null },
];

/** Segurança da integração — fatos dos manuais técnicos da wiki. */
export const PILARES_CONFIABILIDADE = [
  {
    name: "Só leitura no ERP da rede",
    status: "ativo" as const,
    description:
      "Não gravamos pedido, não alteramos cadastro e não apagamos nada no ERP do varejo. Só SELECT.",
    logo: null,
  },
  {
    name: "Sem VPN",
    status: "ativo" as const,
    description:
      "Conexão a partir de um IP fixo da Terus, liberado no firewall do cliente. Nada instalado na rede.",
    logo: null,
  },
  {
    name: "Usuário dedicado",
    status: "ativo" as const,
    description:
      "Usuário de aplicação com permissões mínimas — nunca administrador nem dono do banco.",
    logo: null,
  },
  {
    name: "Credencial protegida",
    status: "conformidade" as const,
    description:
      "Senha enviada por canal seguro e dados de cliente borrados em toda documentação. LGPD na prática.",
    logo: null,
  },
];

/** @deprecated Use PILARES_CONFIABILIDADE — mantido para compatibilidade de import */
export const CERTIFICACOES = PILARES_CONFIABILIDADE.map((p) => ({
  name: p.name,
  issuer: p.status === "ativo" ? "Implementado" : "Em conformidade",
  description: p.description,
  logo: p.logo,
}));

export const VAREJOS: RedeCompany[] = [
  {
    name: "Baratão Supermercados",
    slug: "baratao-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: "https://barataosupermercados.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/baratao.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Center Box",
    slug: "center-box",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: "https://centerbox.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/centerbox.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Cometa Supermercados",
    slug: "cometa-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/cometa.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Fazendinha",
    slug: "fazendinha",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: "https://www.supermercado-fazendinha.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/fazendinha.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Frangolândia Supermercados",
    slug: "frangolandia-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/frangolandia.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Freitas Varejo",
    slug: "freitas-varejo",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/freitas.webp",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Nova Opção Supermercados",
    slug: "nova-opcao-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/novaopcao.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Pinheiro Supermercados",
    slug: "pinheiro-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/pinheiro.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "São Luiz",
    slug: "saoluiz",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "RMS",
    website: "https://www.mercadinhossaoluiz.com.br",
    featured: true,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/saoluiz.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Super do Povo",
    slug: "super-do-povo",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/superdopovo.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Pinheiro Supermercados",
    slug: "pinheiro-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/pinheiro.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Freitas Varejo",
    slug: "freitas-varejo",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/freitas.webp",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Frangolândia Supermercados",
    slug: "frangolandia-supermercados",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/frangolandia.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Super Lagoa",
    slug: "super-lagoa",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/superlagoa.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Supermercado Guará",
    slug: "supermercado-guara",
    category: "varejo",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/clientes/guara.png",
      monochrome: null,
      dark: null,
    },
  },
];

export const DISTRIBUIDORES: RedeCompany[] = [
  {
    name: "Brava Distribuidora",
    slug: "brava-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/brava.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Distribuidora Asa Branca",
    slug: "distribuidora-asa-branca",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/asabranca.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Donizete Distribuidora",
    slug: "donizete-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/donizete.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "D'Origem Distribuidora",
    slug: "dorigem-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/dorigem.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "JA Distribuidora",
    slug: "ja-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/ja.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "Opção Distribuidora",
    slug: "opcao-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/opcao.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "RB Distribuidora",
    slug: "rb-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/rb.png",
      monochrome: null,
      dark: null,
    },
  },
  {
    name: "DSL Distribuidora",
    slug: "dsl-distribuidora",
    category: "distribuidor",
    status: "ativo",
    integrationStatus: "connected",
    erp: "Winthor",
    website: null,
    featured: false,
    permissionLevel: "logo",
    logos: {
      primary: "/logos/distribuidores/dsl.png",
      monochrome: null,
      dark: null,
    },
  },
];

const uniqueBySlug = (companies: RedeCompany[]): RedeCompany[] =>
  companies.filter(
    (company, index) =>
      companies.findIndex((other) => other.slug === company.slug) === index,
  );

export const REDE_TERUS = {
  varejos: uniqueBySlug(VAREJOS),
  distribuidores: uniqueBySlug(DISTRIBUIDORES),
};

export const CLIENT_LOGOS = [
  ...REDE_TERUS.varejos,
  ...REDE_TERUS.distribuidores,
].flatMap((company) =>
  company.logos.primary
    ? [{ name: company.name, logo: company.logos.primary }]
    : [],
);

/**
 * Vídeo demo do produto — versão curta (10s) no ar;
 * a versão completa (60s) entra quando a mídia estiver pronta.
 */
export const PRODUCT_DEMO = {
  eyebrow: "Demo do produto",
  title: "Veja a Terus em 10 segundos",
  description:
    "Do hub da Terus saem alertas para a loja e pedidos para o fornecedor.",
  durationLabel: "10s",
  /** Caminho público do MP4/WebM — null até o arquivo existir */
  src: "/videos/demo-produto-10s.mp4" as string | null,
  /** Poster 16:9 — null usa o frame visual do próprio componente */
  poster: null as string | null,
  chapters: [
    { at: 0, label: "Ruptura", hint: "Alerta na fila da loja" },
    { at: 2, label: "Hub Terus", hint: "Inteligência no centro" },
    { at: 4, label: "Ação", hint: "Pedido automático" },
  ],
} as const;

export const VIDEOS_INSTITUCIONAIS: {
  title: string;
  description: string;
  thumbnail: string | null;
  videoUrl: string | null;
}[] = [];

export const VIDEOS_EDUCACIONAIS: {
  title: string;
  description: string;
  thumbnail: string | null;
  videoUrl: string | null;
}[] = [];

export const CONTEUDOS_INSTITUCIONAIS: {
  title: string;
  description: string;
  thumbnail: string | null;
  contentUrl: string | null;
  type: string;
}[] = [];

export const CONTEUDOS_EDUCACIONAIS: {
  title: string;
  description: string;
  thumbnail: string | null;
  contentUrl: string | null;
  type: string;
}[] = [];

export const CONTEUDOS_MODULOS: {
  title: string;
  description: string;
  thumbnail: string | null;
  contentUrl: string | null;
  type: string;
}[] = [];

export const CONTEUDOS_CASES: CaseStudy[] = [
  {
    slug: "cometa-supermercados",
    title: "Cometa Supermercados: pedidos digitais e menos rejeição no ERP",
    company: "Cometa Supermercados",
    category: "varejo",
    erp: null,
    challenge:
      "Baixa digitalização, alto índice de rejeição ERP e baixo atendimento de pedidos.",
    implementation: "Adoção da jornada operacional Terus.",
    results:
      "Digitalização de até 96% dos pedidos, Rejeição ERP reduzida para 0,5%, Fill Rate elevado para 96%, Ticket médio +34%, Receita processada +38%, Mais de 31 mil pedidos rastreáveis.",
    thumbnail: null,
    description:
      "Como o Cometa Supermercados chegou a até 96% dos pedidos digitais com a Terus.",
    beforeAfterIndicators: {
      antes: [
        { label: "Digitalização do canal", value: "0%" },
        { label: "Rejeição ERP", value: "35%" },
        { label: "Fill Rate", value: "40%" },
        { label: "Ticket Médio", value: "R$ 1.740" },
      ],
      depois: [
        { label: "Digitalização do canal", value: "até 96%" },
        { label: "Rejeição ERP", value: "0,5%" },
        { label: "Fill Rate", value: "96%" },
        { label: "Ticket Médio", value: "R$ 2.338" },
      ],
      resultados: [
        { label: "Ticket Médio", value: "+34%" },
        { label: "Receita Processada", value: "+38%" },
        { label: "Pedidos Rastreáveis", value: "31.881" },
      ],
    },
    executiveIndicators: [
      {
        label: "Ticket Médio",
        value: "R$ 1.740 → R$ 2.338",
        description: "Crescimento de valor médio por pedido",
      },
      {
        label: "Receita Processada",
        value: "R$ 11,6 mi → R$ 16,0 mi",
        description: "Evolução do faturamento financeiro",
      },
      {
        label: "Fill Rate",
        value: "40% → 96%",
        description: "Aumento no nível de atendimento de produtos",
      },
      {
        label: "Rejeição ERP",
        value: "35% → 0,5%",
        description: "Redução drástica de falhas operacionais e de validação",
      },
      {
        label: "Pedidos Rastreáveis",
        value: "31.881",
        description: "Total auditado ponta a ponta",
      },
      {
        label: "Digitalização Operacional",
        value: "86% a 96%",
        description: "Volume de pedidos gerados de forma digital",
      },
    ],
    logos: {
      primary: null,
      monochrome: null,
      dark: null,
    },
  },
];
