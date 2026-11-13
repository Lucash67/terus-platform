/**
 * Demonstração da ativação técnica (/ativacao-demo).
 *
 * Fonte: manuais de integração da wiki — wiki.terus.tec.br/varejo/tec/varejo/integracao-*
 * (rede, usuário, script GRANT e checklist de devolução por ERP).
 * Nada aqui conecta a um ERP real: o diagnóstico, a assinatura e a ativação são simulados
 * e a interface diz isso em todas as etapas.
 */

export const DEMO_BASE = "/ativacao-demo";

/** IP de saída (NAT) da Terus que o TI do varejo libera no firewall — wiki, seção "Rede". */
export const TERUS_NAT_IP = "177.104.156.26";

export interface DemoStepDef {
  id: string;
  order: number;
  href: string;
  label: string;
  shortLabel: string;
}

export const DEMO_STEPS: DemoStepDef[] = [
  { id: "cadastro", label: "Conhecer a operação", shortLabel: "Cadastro" },
  { id: "erp", label: "Escolha do ERP", shortLabel: "ERP" },
  { id: "preparacao", label: "Preparação do TI", shortLabel: "Preparação" },
  { id: "conexao", label: "Dados da conexão", shortLabel: "Conexão" },
  { id: "diagnostico", label: "Diagnóstico", shortLabel: "Diagnóstico" },
  { id: "contrato", label: "Contrato", shortLabel: "Contrato" },
  { id: "conclusao", label: "Ativação", shortLabel: "Ativação" },
].map((s, i) => ({ ...s, order: i + 1, href: `${DEMO_BASE}/${s.id}` }));

export const DEMO_TOTAL_STEPS = DEMO_STEPS.length;

export type DemoErpId =
  | "rms"
  | "consinco"
  | "vr"
  | "cisspoder"
  | "rpinfo"
  | "apirest2"
  | "outro";

export type ConnectionKind = "oracle" | "postgres" | "api";

export interface DemoErp {
  id: DemoErpId;
  name: string;
  vendor: string;
  kind: ConnectionKind | null;
  /** Como a Terus lê (texto da wiki) */
  method: string;
  defaultPort: number | null;
  /** Página do manual na wiki */
  manual: string | null;
}

const WIKI = "https://wiki.terus.tec.br/varejo/tec/varejo";

export const DEMO_ERPS: DemoErp[] = [
  {
    id: "rms",
    name: "RMS",
    vendor: "TOTVS",
    kind: "oracle",
    method: "Captura direta no Oracle",
    defaultPort: 1521,
    manual: `${WIKI}/integracao-rms`,
  },
  {
    id: "consinco",
    name: "Consinco",
    vendor: "TOTVS",
    kind: "oracle",
    method: "Captura direta no Oracle",
    defaultPort: 1521,
    manual: `${WIKI}/integracao-consinco`,
  },
  {
    id: "vr",
    name: "VR Software",
    vendor: "PostgreSQL",
    kind: "postgres",
    method: "Captura direta no PostgreSQL",
    defaultPort: 5432,
    manual: `${WIKI}/integracao-vr`,
  },
  {
    id: "cisspoder",
    name: "CISS Poder",
    vendor: "API Integrim",
    kind: "api",
    method: "Leitura dos serviços Integrim (OAuth + REST)",
    defaultPort: 27009,
    manual: `${WIKI}/integracao-cisspoder`,
  },
  {
    id: "rpinfo",
    name: "RPInfo",
    vendor: "API REST",
    kind: "api",
    method: "Leitura da API RPInfo (HTTPS)",
    defaultPort: 443,
    manual: `${WIKI}/integracao-rpinfo`,
  },
  {
    id: "apirest2",
    name: "API REST",
    vendor: "JWT ou chave",
    kind: "api",
    method: "Leitura da API do ERP com JWT ou chave no cabeçalho",
    defaultPort: 443,
    manual: `${WIKI}/integracao-rpinfo2`,
  },
  {
    id: "outro",
    name: "Outro ERP",
    vendor: "Sem manual na wiki",
    kind: null,
    method: "A equipe Terus avalia caso a caso",
    defaultPort: null,
    manual: null,
  },
];

/** ERPs do lado do fornecedor: recebem o pedido (Bond), não são fonte da captura. */
export const SUPPLIER_ERPS = ["Winthor", "Sankhya", "VitSis"] as const;

export function findErp(id: DemoErpId | null): DemoErp | undefined {
  return DEMO_ERPS.find((e) => e.id === id);
}

export interface PrepStep {
  title: string;
  description: string;
  code?: { lang: string; text: string };
}

const networkStep = (target: string, port: string): PrepStep => ({
  title: "Liberar o IP da Terus no firewall",
  description: `A Terus conecta direto ao ${target}, sem VPN. O IP de origem fica na allowlist. Se o servidor não for público, publique-o (NAT/port-forward) até um endereço alcançável a partir desse IP.`,
  code: {
    lang: "Rede",
    text: `# origem (NAT Terus) → destino\n${TERUS_NAT_IP}  →  ${target}  TCP ${port}`,
  },
});

const ORACLE_USER: PrepStep = {
  title: "Criar o usuário de aplicação terus",
  description:
    "Usuário dedicado, só com CREATE SESSION. Nunca SYS, SYSTEM nem o owner do ERP. Synonyms não são necessários.",
};

/** Trechos dos scripts GRANT da wiki. O script completo está no manual de cada ERP. */
export const PREP_STEPS: Record<Exclude<DemoErpId, "outro">, PrepStep[]> = {
  rms: [
    networkStep("listener Oracle do RMS", "1521"),
    ORACLE_USER,
    {
      title: "Aplicar o script de permissões (só leitura)",
      description:
        "SELECT nas tabelas de cadastro e movimento e EXECUTE nas funções de data e preço. Troque DONODOBANCO pelo schema das tabelas AA*/AG* (em geral RMS).",
      code: {
        lang: "Oracle · trecho",
        text: "GRANT CREATE SESSION TO terus;\nGRANT SELECT ON DONODOBANCO.AA3CITEM TO terus;\nGRANT SELECT ON DONODOBANCO.AA2CESTQ TO terus;\nGRANT SELECT ON DONODOBANCO.AGG_VDA_PROD TO terus;\nGRANT SELECT ON DONODOBANCO.AG1LPEDI TO terus;\nGRANT EXECUTE ON DONODOBANCO.F_CALCSTPR TO terus;\n-- … script completo no manual",
      },
    },
  ],
  consinco: [
    networkStep("listener Oracle do Consinco", "1521"),
    ORACLE_USER,
    {
      title: "Aplicar o script de permissões (só leitura)",
      description:
        "SELECT em cadastros (MAP_*, MRL_*, MAX_*) e movimento, EXECUTE nas funções de embalagem. Troque DONODOBANCO pelo schema (em geral CONSINCO).",
      code: {
        lang: "Oracle · trecho",
        text: "GRANT CREATE SESSION TO terus;\nGRANT SELECT ON DONODOBANCO.MAP_PRODUTO TO terus;\nGRANT SELECT ON DONODOBANCO.MRL_PRODUTOEMPRESA TO terus;\nGRANT SELECT ON DONODOBANCO.MAXV_ABCDISTRIBBASE TO terus;\nGRANT EXECUTE ON DONODOBANCO.FPADRAOEMBCOMPRA TO terus;\n-- … script completo no manual",
      },
    },
  ],
  vr: [
    networkStep("PostgreSQL do VR", "5432 ou a porta NAT"),
    {
      title: "Criar o usuário terus no PostgreSQL",
      description:
        "CONNECT no database e USAGE nos schemas public e pdv (vendas de cupom). Informe o nome do database.",
    },
    {
      title: "Aplicar o script de permissões (só leitura)",
      description:
        "Só SELECT. A Terus lê pdv.venda + pdv.vendaitem — não usa a tabela agregada public.venda.",
      code: {
        lang: "PostgreSQL · trecho",
        text: "GRANT CONNECT ON DATABASE vr TO terus;\nGRANT USAGE ON SCHEMA public TO terus;\nGRANT USAGE ON SCHEMA pdv TO terus;\nGRANT SELECT ON public.produto TO terus;\nGRANT SELECT ON pdv.venda TO terus;\n-- … script completo no manual",
      },
    },
  ],
  cisspoder: [
    networkStep("CIM do CISS Poder", "27009 ou a porta real do CIM"),
    {
      title: "Criar o usuário de integração no CISSPoder",
      description:
        "Um usuário de integração (não o login de loja). A senha segue para a Terus por canal seguro.",
    },
    {
      title: "Liberar os serviços no integrim-admin",
      description:
        "Em Serviços por Fornecedor, libere para o usuário da Terus os serviços de lojas, produtos, estrutura mercadológica, estoque e documentos fiscais.",
      code: {
        lang: "Integrim · serviços",
        text: "CAD_LOJAS\nCAD_PRODUTOS\nESTRUTURA_MERCADOLOGICA\nPRODUTOS_SALDO_ESTOQUE_EMPRESA\nITENS_DOCUMENTOS_FISCAIS_SAIDA\n# … lista completa no manual",
      },
    },
  ],
  rpinfo: [
    networkStep("host da API RPInfo", "443 (HTTPS)"),
    {
      title: "Criar o usuário da API RPInfo",
      description:
        "Usuário de integração com acesso aos endpoints de movimento, produtos, pedidos de compra, departamentos e fornecedores.",
    },
    {
      title: "Habilitar os endpoints para esse usuário",
      description:
        "A Terus autentica em /v1.1/auth e só lê. Informe também o CNPJ da unidade usado em /produtounidade/.",
      code: {
        lang: "API · endpoints",
        text: "POST /v1.1/auth\nGET  /v1.9/movimentoprodutos/listarmovimentos/lastid/{lastId}\nGET  /v3.2/produtounidade/listaprodutos/…\nGET  /v2.3/pedidocompra/listarpedidos/lastid/{lastId}\n# … lista completa no manual",
      },
    },
  ],
  apirest2: [
    networkStep("host da API", "443 (HTTPS)"),
    {
      title: "Definir o modelo de acesso",
      description:
        "JWT (login por e-mail e senha, uma credencial por varejo × fornecedor) ou chave em um cabeçalho configurável.",
    },
    {
      title: "Publicar os caminhos de leitura",
      description:
        "A Terus só autentica e lê. Os caminhos abaixo precisam responder para a credencial informada.",
      code: {
        lang: "API · caminhos",
        text: "POST /login\nGET  /loja\nGET  /produto\nGET  /estoque\nGET  /venda?data_inicio=&data_fim=\nGET  /pedido",
      },
    },
  ],
};

export interface DemoRunner {
  id: string;
  name: string;
  label: string;
  description: string;
  durationMs: number;
}

/** Mesmos runners do roteiro de diagnóstico do CLAUDE.md. */
export const DEMO_RUNNERS: DemoRunner[] = [
  {
    id: "nat",
    name: "NatRunner",
    label: "Rede",
    description: "Alcança o servidor a partir do IP da Terus",
    durationMs: 2200,
  },
  {
    id: "auth",
    name: "AuthRunner",
    label: "Autenticação",
    description: "Entra com o usuário de integração",
    durationMs: 2400,
  },
  {
    id: "permission",
    name: "PermissionRunner",
    label: "Permissões",
    description: "Confere a leitura nas tabelas ou serviços",
    durationMs: 3200,
  },
  {
    id: "query",
    name: "QueryRunner",
    label: "Consultas do ERP",
    description: "Roda as consultas de captura do ERP escolhido",
    durationMs: 3400,
  },
  {
    id: "performance",
    name: "PerformanceRunner",
    label: "Desempenho",
    description: "Mede o tempo de resposta da leitura",
    durationMs: 2600,
  },
];

/** Logs da simulação por tipo de conexão. Mensagens de erro e correção vêm dos manuais da wiki. */
export const RUNNER_LOGS: Record<
  ConnectionKind,
  Record<string, { logs: string[]; ok: string }>
> = {
  oracle: {
    nat: {
      logs: ["abrindo TCP no listener…", "handshake concluído"],
      ok: "servidor alcançável",
    },
    auth: {
      logs: ["CREATE SESSION como terus…"],
      ok: "sessão de leitura aberta",
    },
    permission: {
      logs: [
        "SELECT em cadastros…",
        "SELECT em movimento…",
        "EXECUTE nas funções…",
      ],
      ok: "permissões conferidas",
    },
    query: {
      logs: ["produtos…", "estoque e custo…", "vendas…", "pedidos de compra…"],
      ok: "consultas responderam",
    },
    performance: { logs: ["amostrando leitura…"], ok: "leitura estável" },
  },
  postgres: {
    nat: {
      logs: ["abrindo TCP no Postgres…", "conexão aceita"],
      ok: "servidor alcançável",
    },
    auth: { logs: ["CONNECT no database…"], ok: "usuário autenticado" },
    permission: {
      logs: [
        "USAGE em public e pdv…",
        "SELECT em produto…",
        "SELECT em pdv.venda…",
      ],
      ok: "permissões conferidas",
    },
    query: {
      logs: ["lojas…", "produtos…", "cupons (pdv.venda)…", "notas de entrada…"],
      ok: "consultas responderam",
    },
    performance: { logs: ["amostrando leitura…"], ok: "leitura estável" },
  },
  api: {
    nat: { logs: ["resolvendo host…", "TLS concluído"], ok: "API alcançável" },
    auth: { logs: ["solicitando token…"], ok: "token recebido" },
    permission: {
      logs: [
        "serviço de lojas…",
        "serviço de produtos…",
        "serviço de estoque…",
      ],
      ok: "serviços liberados",
    },
    query: {
      logs: ["paginando produtos…", "movimento do período…"],
      ok: "respostas no formato esperado",
    },
    performance: { logs: ["amostrando paginação…"], ok: "leitura estável" },
  },
};

/** Falha didática da simulação (opcional) — texto da seção de erros dos manuais. */
export const SIMULATED_FAILURE: Record<
  ConnectionKind,
  { error: string; fix: string }
> = {
  oracle: {
    error: "ORA-00942: tabela ou view não existe",
    fix: "Costuma ser SELECT faltando no script GRANT. Confira as permissões no manual e rode de novo.",
  },
  postgres: {
    error: "permission denied for schema pdv",
    fix: "Falta USAGE no schema pdv ou SELECT em pdv.venda. Aplique o trecho do script e rode de novo.",
  },
  api: {
    error: "HTTP 403 no serviço de estoque",
    fix: "Serviço não liberado para o usuário de integração. Libere-o e rode de novo.",
  },
};

/** Pontos da minuta exibidos na demo. Sem SLA, prazos ou certificações não confirmados. */
export const DEMO_CLAUSES = [
  {
    title: "Objeto",
    summary:
      "Licenciamento da Terus Varejo — Inteligência da Cadeia de Suprimentos — em modelo SaaS, com os módulos contratados.",
  },
  {
    title: "Acesso aos dados",
    summary:
      "Somente leitura no ERP da rede. A Terus não grava, não altera e não apaga nada no banco ou na API do varejo.",
  },
  {
    title: "Credenciais",
    summary:
      "Usuário de integração dedicado, com permissões mínimas. A senha é entregue por canal seguro, nunca por e-mail aberto.",
  },
  {
    title: "Confidencialidade",
    summary:
      "Dados operacionais tratados como confidenciais, conforme a Política de Privacidade da Terus.",
  },
];

export const DEMO_MODULES = [
  { id: "alert", name: "Terus Alert", tagline: "Alertas e mesa do comprador" },
  {
    id: "order",
    name: "Terus Order",
    tagline: "Reposição e fornecedores conectados",
  },
  {
    id: "task",
    name: "Terus Task",
    tagline: "App da loja com fila por retorno em R$",
  },
  {
    id: "strategy",
    name: "Terus Strategy",
    tagline: "Metas, vendas, compras e estoque",
  },
];
