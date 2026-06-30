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
    title: "Crescimento operacional na Rede Terus",
    company: "Distribuidor homologado · ERP Winthor",
    description:
      "Adoção da jornada operacional Terus integrada ao Winthor, com foco em digitalização de pedidos, redução de rejeição ERP e elevação do Fill Rate.",
    results:
      "Digitalização até 96%, Rejeição ERP 0,5%, Fill Rate 96%, ticket médio +34%, receita +38%, 31.881 pedidos rastreáveis.",
    image: null,
  },
];

export const INTEGRACOES = [
  {
    name: "Winthor",
    type: "ERP",
    status: "homologado" as const,
    description:
      "Integração nativa homologada para varejo e distribuição — conexão validada em ambiente produtivo.",
    logo: null,
  },
  {
    name: "RMS",
    type: "ERP",
    status: "homologado" as const,
    description:
      "Conexão validada para operações de varejo em escala, com diagnóstico automatizado de permissões.",
    logo: null,
  },
  {
    name: "Assistente de Integração",
    type: "Conector",
    status: "ativo" as const,
    description:
      "Configuração guiada para conexão segura com ERPs homologados, do cadastro ao go-live.",
    logo: null,
  },
  {
    name: "API Terus",
    type: "API",
    status: "roadmap" as const,
    description:
      "Endpoints REST para sincronização de estoque, pedidos e alertas — disponível na evolução da plataforma.",
    logo: null,
  },
];

export const PILARES_CONFIABILIDADE = [
  {
    name: "Auditoria imutável",
    status: "ativo" as const,
    description:
      "Registro de operações críticas em trilha imutável para conformidade e rastreabilidade ponta a ponta.",
    logo: null,
  },
  {
    name: "Vault de credenciais",
    status: "ativo" as const,
    description:
      "Armazenamento seguro de credenciais de cliente com TTL de 5 minutos e revogação automática após uso.",
    logo: null,
  },
  {
    name: "Multi-tenant isolado",
    status: "ativo" as const,
    description:
      "Isolamento por schema dedicado — cada cliente opera em ambiente segregado no PostgreSQL.",
    logo: null,
  },
  {
    name: "LGPD",
    status: "conformidade" as const,
    description:
      "Arquitetura desenhada para proteção de dados, governança de acesso e auditoria de operações sensíveis.",
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

export const REDE_TERUS = {
  varejos: VAREJOS,
  distribuidores: DISTRIBUIDORES,
};

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
    slug: "crescimento-operacional-distribuidor-terus",
    title: "Crescimento operacional em distribuidor da Rede Terus",
    company: null,
    category: "distribuidor",
    erp: "Winthor",
    challenge:
      "Baixa digitalização, alto índice de rejeição ERP e baixo atendimento de pedidos.",
    implementation: "Adoção da jornada operacional Terus integrada ao Winthor.",
    results:
      "Digitalização de até 96% dos pedidos, Rejeição ERP reduzida para 0,5%, Fill Rate elevado para 96%, Ticket médio +34%, Receita processada +38%, Mais de 31 mil pedidos rastreáveis.",
    thumbnail: null,
    description:
      "Crescimento operacional em distribuidor da Rede Terus obtendo digitalização de até 96%.",
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
