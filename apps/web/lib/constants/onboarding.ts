export type OnboardingErpId = "winthor" | "rms" | "other";

export interface OnboardingStepDef {
  id: string;
  order: number;
  href: string;
  label: string;
  shortLabel: string;
}

export const ONBOARDING_STEPS: OnboardingStepDef[] = [
  {
    id: "cadastro",
    order: 1,
    href: "/onboarding/cadastro",
    label: "Cadastro da empresa",
    shortLabel: "Cadastro",
  },
  {
    id: "integracao",
    order: 2,
    href: "/onboarding/integracao",
    label: "Escolha do ERP",
    shortLabel: "ERP",
  },
  {
    id: "instrucoes",
    order: 3,
    href: "/onboarding/instrucoes",
    label: "Instruções de integração",
    shortLabel: "Instruções",
  },
  {
    id: "banco",
    order: 4,
    href: "/onboarding/banco",
    label: "Configuração do banco",
    shortLabel: "Banco",
  },
  {
    id: "diagnostico",
    order: 5,
    href: "/onboarding/diagnostico",
    label: "Diagnóstico automatizado",
    shortLabel: "Diagnóstico",
  },
  {
    id: "contratos",
    order: 6,
    href: "/onboarding/contratos",
    label: "Contrato digital",
    shortLabel: "Contrato",
  },
  {
    id: "conclusao",
    order: 7,
    href: "/onboarding/conclusao",
    label: "Ativação",
    shortLabel: "Ativação",
  },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export interface ErpOption {
  id: OnboardingErpId;
  name: string;
  vendor: string;
  description: string;
  homologated: boolean;
  marketShare: string;
  databases: string[];
}

export const ERP_OPTIONS: ErpOption[] = [
  {
    id: "winthor",
    name: "Winthor",
    vendor: "TOTVS",
    description:
      "ERP líder no atacado distribuidor. Integração homologada com leitura direta das tabelas de estoque, pedidos e faturamento.",
    homologated: true,
    marketShare: "Atacado & Distribuição",
    databases: ["Oracle"],
  },
  {
    id: "rms",
    name: "RMS",
    vendor: "TOTVS",
    description:
      "ERP consolidado no varejo supermercadista. Integração homologada com cobertura de lojas, CDs e retaguarda.",
    homologated: true,
    marketShare: "Varejo Supermercadista",
    databases: ["Oracle", "SQL Server"],
  },
  {
    id: "other",
    name: "Outro ERP",
    vendor: "Não homologado",
    description:
      "Seu ERP ainda não está no catálogo homologado. Nossa equipe de integrações analisa a viabilidade e retorna em até 48h úteis.",
    homologated: false,
    marketShare: "Análise sob demanda",
    databases: ["A definir"],
  },
];

export interface ErpInstructionStep {
  title: string;
  description: string;
  code?: string;
}

export const ERP_INSTRUCTIONS: Record<
  Exclude<OnboardingErpId, "other">,
  ErpInstructionStep[]
> = {
  winthor: [
    {
      title: "Crie um usuário de leitura no Oracle",
      description:
        "A Terus opera com acesso somente-leitura. Crie um usuário dedicado com privilégio de SELECT nas tabelas do Winthor.",
      code: 'CREATE USER terus_reader IDENTIFIED BY "********";\nGRANT CREATE SESSION TO terus_reader;\nGRANT SELECT ON PCPRODUT TO terus_reader;\nGRANT SELECT ON PCEST TO terus_reader;\nGRANT SELECT ON PCPEDC TO terus_reader;',
    },
    {
      title: "Libere o IP da Terus no firewall",
      description:
        "Autorize conexões TCP de saída para o coletor Terus na porta do listener Oracle (padrão 1521). O tráfego é criptografado ponta a ponta.",
      code: "# Origem autorizada\n52.67.118.0/24  →  porta 1521 (TCP)",
    },
    {
      title: "Confirme o service name da instância",
      description:
        "Tenha em mãos o host, a porta e o service name (ex: WINT) da instância de produção ou da réplica de leitura.",
    },
  ],
  rms: [
    {
      title: "Crie um usuário de leitura no banco",
      description:
        "A Terus opera com acesso somente-leitura. Crie um usuário dedicado com privilégio de SELECT nas tabelas do RMS.",
      code: "CREATE LOGIN terus_reader WITH PASSWORD = '********';\nCREATE USER terus_reader FOR LOGIN terus_reader;\nGRANT SELECT ON SCHEMA::dbo TO terus_reader;",
    },
    {
      title: "Libere o IP da Terus no firewall",
      description:
        "Autorize conexões TCP de saída para o coletor Terus na porta do banco (padrão 1433 SQL Server / 1521 Oracle).",
      code: "# Origem autorizada\n52.67.118.0/24  →  porta 1433 (TCP)",
    },
    {
      title: "Identifique o banco de retaguarda",
      description:
        "Tenha em mãos o host, a porta e o nome do banco de retaguarda consolidado (lojas + CD) do RMS.",
    },
  ],
};

export interface DiagnosticRunnerDef {
  id: string;
  name: string;
  label: string;
  description: string;
  durationMs: number;
  logs: string[];
  result: string;
}

export const DIAGNOSTIC_RUNNERS: DiagnosticRunnerDef[] = [
  {
    id: "nat",
    name: "NatRunner",
    label: "Conectividade TCP",
    description: "Alcança o host do banco na porta informada",
    durationMs: 2600,
    logs: ["resolvendo host…", "abrindo socket TCP…", "handshake concluído"],
    result: "34ms de latência de rede",
  },
  {
    id: "auth",
    name: "AuthRunner",
    label: "Autenticação",
    description: "Valida usuário e senha no banco do ERP",
    durationMs: 3200,
    logs: [
      "iniciando sessão…",
      "credenciais aceitas",
      "sessão somente-leitura confirmada",
    ],
    result: "usuário terus_reader autenticado",
  },
  {
    id: "permission",
    name: "PermissionRunner",
    label: "Permissões de leitura",
    description: "Confere SELECT nas tabelas essenciais",
    durationMs: 3800,
    logs: [
      "verificando produtos…",
      "verificando estoque…",
      "verificando pedidos…",
      "verificando faturamento…",
    ],
    result: "12 de 12 tabelas acessíveis",
  },
  {
    id: "query",
    name: "QueryRunner",
    label: "Queries do ERP",
    description: "Executa as consultas homologadas do catálogo",
    durationMs: 4600,
    logs: [
      "posição de estoque…",
      "curva de vendas 30d…",
      "pedidos em aberto…",
      "cadastro de lojas…",
    ],
    result: "4 queries válidas · schemas compatíveis",
  },
  {
    id: "performance",
    name: "PerformanceRunner",
    label: "Performance",
    description: "Mede latência e volume de leitura sustentado",
    durationMs: 4200,
    logs: [
      "amostrando latência…",
      "p50 38ms · p95 92ms",
      "throughput de leitura ok",
    ],
    result: "apto para sincronização em tempo real",
  },
];

export interface ContractClause {
  title: string;
  summary: string;
}

export const CONTRACT_CLAUSES: ContractClause[] = [
  {
    title: "Objeto",
    summary:
      "Licenciamento da plataforma Terus — Supply Chain Intelligence — em modelo SaaS, com sincronização contínua do ERP.",
  },
  {
    title: "Acesso aos dados",
    summary:
      "Acesso exclusivamente de leitura. Credenciais custodiadas em cofre criptografado, com rotação e revogação automáticas.",
  },
  {
    title: "Confidencialidade & LGPD",
    summary:
      "Dados operacionais tratados sob acordo de confidencialidade e em conformidade com a Lei Geral de Proteção de Dados.",
  },
  {
    title: "Nível de serviço",
    summary:
      "Disponibilidade de 99,5% da plataforma, com suporte em horário comercial e canal prioritário para incidentes críticos.",
  },
];

export interface TerusModuleDef {
  id: string;
  name: string;
  tagline: string;
}

export const TERUS_MODULES: TerusModuleDef[] = [
  {
    id: "alert",
    name: "Terus Alert",
    tagline: "Alertas de ruptura em tempo real",
  },
  {
    id: "strategy",
    name: "Terus Strategy",
    tagline: "Inteligência de sortimento e demanda",
  },
  {
    id: "order",
    name: "Terus Order",
    tagline: "Sugestão automática de reposição",
  },
  {
    id: "task",
    name: "Terus Task",
    tagline: "Tarefas operacionais para o time de loja",
  },
  {
    id: "log",
    name: "Terus Log",
    tagline: "Trilha auditável de cada decisão",
  },
  {
    id: "pulse",
    name: "Terus Pulse",
    tagline: "Visão executiva da operação",
  },
];
