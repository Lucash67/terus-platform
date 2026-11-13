import { CAMADA_INTEGRACAO } from "@/lib/constants/site-data";
import type { ModuleSlug } from "@/lib/constants/modules";

/**
 * Componentes da tecnologia Terus com página própria.
 *
 * FONTES (verificadas em 12/11/2026):
 *  - Texto institucional: terustec.com.br/{agent,iaproc,bond,portal-do-cliente,task-web,teams}
 *    (site oficial anterior, WordPress 2023). Reescrito sem acrescentar funcionalidade.
 *  - Especificações de Agent, IAproc e Bond: CAMADA_INTEGRACAO (validado na wiki em commits anteriores).
 *  - Estrutura do portal e da execução em loja: wiki.terus.tec.br/varejo/tec/varejo.
 * Nada aqui descreve métricas, prazos ou certificações não publicadas.
 */
export type TechSlug =
  | "agent"
  | "iaproc"
  | "bond"
  | "portal-do-cliente"
  | "task-web"
  | "teams";

export interface TechComponent {
  slug: TechSlug;
  name: string;
  kicker: string;
  headline: string;
  summary: string;
  /** O que faz — frases fiéis à fonte oficial */
  does: string[];
  /** Especificações já validadas (só Agent, IAproc, Bond) */
  specs?: readonly string[];
  /** Como se conecta ao restante da plataforma */
  flow: { from: string; to: string };
  related: ModuleSlug[];
}

const layer = (name: string) => CAMADA_INTEGRACAO.find((l) => l.name === name);

export const TECH_COMPONENTS: TechComponent[] = [
  {
    slug: "agent",
    name: "Agent",
    kicker: "Conexão, controle e dados",
    headline: "A ponte segura entre o ERP da rede e a Terus",
    summary:
      "O Agent conecta, de forma segura e controlada, os sistemas do varejo à Terus e extrai os dados que alimentam toda a plataforma.",
    does: [
      "Recebe consultas padronizadas para o sistema específico do cliente e as executa no banco de dados.",
      "Compacta e criptografa o resultado das consultas antes de enviá-lo à nuvem da Terus.",
      "Entrega os dados para processamento no IAproc, de onde saem alertas e atividades.",
    ],
    specs: layer("Agent")?.specs,
    flow: { from: "ERP da rede", to: "IAproc" },
    related: ["alert", "chain"],
  },
  {
    slug: "iaproc",
    name: "IAproc",
    kicker: "Inteligência e resultados",
    headline: "Onde o dado vira ação",
    summary:
      "O IAproc é a parte de inteligência da plataforma: processa os dados recebidos pelo Agent e transforma os resultados em ações práticas.",
    does: [
      "Trata praticamente todos os dados que chegam pelo Agent.",
      "Transforma os resultados em informação pronta para consumo e em ações efetivas.",
      "Abastece alertas, filas de atividade e sugestões usadas no portal e no app.",
    ],
    specs: layer("IAproc")?.specs,
    flow: { from: "Agent", to: "Portal e Terus Task" },
    related: ["alert", "task", "order"],
  },
  {
    slug: "bond",
    name: "Bond",
    kicker: "Integrações e acessibilidade",
    headline: "Integração com fornecedores e com o ERP do varejo",
    summary:
      "O Bond integra dados com fornecedores parceiros e com o sistema de gestão (ERP) do varejista.",
    does: [
      "Envia sugestões de abastecimento de forma eletrônica para o ERP do varejo.",
      "Envia pedidos de compra para o fornecedor.",
      "Integra dados com agentes externos, como indústrias.",
    ],
    specs: layer("Bond")?.specs,
    flow: { from: "Portal Terus", to: "ERP do varejo e do fornecedor" },
    related: ["order", "chain"],
  },
  {
    slug: "portal-do-cliente",
    name: "Portal do Cliente",
    kicker: "Gestão, execução e acompanhamento",
    headline: "O centro de gestão da rede",
    summary:
      "O Portal do Cliente é onde o varejo administra a operação: usuários, atribuições, metas, alertas, atividades e reposição.",
    does: [
      "Gestão de usuários, das suas atribuições e das metas de atividades.",
      "Acompanhamento da performance da loja (Strategy) e painel de alertas (Alert).",
      "Acompanhamento das atividades e das evidências de execução.",
      "Aprovação da sugestão de reposição — do CD ou direto do fornecedor.",
    ],
    flow: { from: "IAproc", to: "Rede, comprador e loja" },
    related: ["alert", "strategy", "order", "task"],
  },
  {
    slug: "task-web",
    name: "Task Web",
    kicker: "Categorias, necessidades e correções",
    headline: "Correções em lote, direto do portal",
    summary:
      "No Task Web você escolhe um departamento, seção, fornecedor ou alerta e atua sobre os produtos filtrados que precisam de correção ou ajuste.",
    does: [
      "Criar pedido de compra para produtos sem estoque ou com risco de ruptura futura.",
      "Solicitar reabastecimento ao centro de distribuição (CD).",
      "Bloquear a compra de produtos com excesso de estoque.",
      "Inativar produtos descontinuados pela indústria.",
      "Cada atividade gera evidência e alerta quando não é concluída no prazo combinado.",
    ],
    flow: { from: "Alertas e filtros", to: "Atividades com evidência" },
    related: ["order", "alert"],
  },
  {
    slug: "teams",
    name: "Teams",
    kicker: "Fluxo de execução das equipes",
    headline: "Quem executou, quem abandonou e o que ficou registrado",
    summary:
      "O Teams faz parte do Portal do Cliente e mostra as execuções e os abandonos de atividades, com as evidências de todo o fluxo.",
    does: [
      "Visualizar execuções e abandonos de atividades.",
      "Ver as evidências de tudo o que foi executado.",
      "Filtrar e pesquisar por encarregado ou produto.",
      "Acompanhar e medir as equipes de encarregados.",
    ],
    flow: { from: "Terus Task (loja)", to: "Gestão das equipes" },
    related: ["task"],
  },
];

export function getTech(slug: string): TechComponent | undefined {
  return TECH_COMPONENTS.find((t) => t.slug === slug);
}
