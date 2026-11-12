/**
 * Self Onboarding 2.0 — rótulos e etapas da trilha "novo cliente".
 * Estados vêm sempre do backend (apps/api); aqui só a apresentação.
 * ERPs e módulos: wiki.terus.tec.br/varejo (ver modules.ts e site-data.ts).
 */

export interface JourneyStepDef {
  id: "conta" | "empresa" | "perfil" | "solicitacao" | "acompanhamento";
  order: number;
  href: string;
  label: string;
  description: string;
}

export const JOURNEY_STEPS: JourneyStepDef[] = [
  {
    id: "conta",
    order: 1,
    href: "/criar-conta",
    label: "Sua conta",
    description: "E-mail e senha para retomar de qualquer dispositivo.",
  },
  {
    id: "empresa",
    order: 2,
    href: "/onboarding/empresa",
    label: "Empresa",
    description: "Razão social, CNPJ, segmento e porte.",
  },
  {
    id: "perfil",
    order: 3,
    href: "/onboarding/perfil",
    label: "Operação",
    description: "ERP, prioridades e prazo — sem senha nem acesso ao banco.",
  },
  {
    id: "solicitacao",
    order: 4,
    href: "/onboarding/solicitacao",
    label: "Recomendação e proposta",
    description: "Módulos indicados para o que você quer resolver.",
  },
  {
    id: "acompanhamento",
    order: 5,
    href: "/portal",
    label: "Acompanhamento",
    description: "Status, histórico e próximos passos no portal.",
  },
];

export const SEGMENT_LABELS: Record<string, string> = {
  supermercado: "Supermercado",
  atacarejo: "Atacarejo",
  farmacia: "Farmácia",
  material_construcao: "Material de construção",
  industria: "Indústria",
  distribuidor: "Distribuidor",
  outro: "Outro",
};

export const SIZE_BAND_LABELS: Record<string, string> = {
  "1": "1 loja",
  "2-10": "2 a 10 lojas",
  "11-50": "11 a 50 lojas",
  "51+": "Mais de 50 lojas",
};

/** ERPs documentados na wiki: varejo (captura) e fornecedor (recebe pedido via Bond). */
export const ERP_GROUPS: {
  label: string;
  options: { id: string; label: string }[];
}[] = [
  {
    label: "ERP do varejo (documentados na wiki)",
    options: [
      { id: "rms", label: "RMS" },
      { id: "consinco", label: "Consinco" },
      { id: "vr_software", label: "VR Software" },
      { id: "ciss_poder", label: "CISS Poder" },
      { id: "rpinfo", label: "RPInfo" },
      { id: "api_rest", label: "API REST própria" },
    ],
  },
  {
    label: "ERP de indústria/distribuidor",
    options: [
      { id: "winthor", label: "Winthor" },
      { id: "sankhya", label: "Sankhya" },
      { id: "vitsis", label: "VitSis" },
    ],
  },
  { label: "Outro", options: [{ id: "outro", label: "Outro ERP" }] },
];

export const ERP_LABELS: Record<string, string> = Object.fromEntries(
  ERP_GROUPS.flatMap((g) => g.options.map((o) => [o.id, o.label])),
);

export const PRIORITY_OPTIONS: { id: string; label: string; hint: string }[] = [
  {
    id: "ruptura",
    label: "Ruptura de gôndola",
    hint: "Produto faltando na loja",
  },
  {
    id: "excesso",
    label: "Excesso de estoque",
    hint: "Capital parado, sem giro",
  },
  {
    id: "reposicao",
    label: "Reposição e pedidos",
    hint: "Pedido ao fornecedor",
  },
  {
    id: "execucao_loja",
    label: "Execução na loja",
    hint: "Tarefas com evidência",
  },
  { id: "metas", label: "Metas e indicadores", hint: "Comprador, seção, loja" },
  {
    id: "fornecedores",
    label: "Relação com fornecedores",
    hint: "Pedido no ERP deles",
  },
  { id: "producao", label: "Produção própria", hint: "Padaria, açougue" },
  { id: "cd_logistica", label: "CD e logística", hint: "Volumes até a loja" },
  { id: "exposicao", label: "Exposição e espaço", hint: "Layout de gôndola" },
];

export const TIMELINE_OPTIONS = [
  { id: "imediato", label: "Quero começar agora" },
  { id: "ate_3_meses", label: "Nos próximos 3 meses" },
  { id: "explorando", label: "Estou conhecendo" },
] as const;

export const CONTACT_OPTIONS = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "telefone", label: "Telefone" },
  { id: "email", label: "E-mail" },
] as const;

export const JOURNEY_STATUS: Record<
  string,
  {
    label: string;
    tone: "neutral" | "info" | "success" | "warning";
    description: string;
  }
> = {
  draft: {
    label: "Rascunho",
    tone: "neutral",
    description: "Cadastro iniciado.",
  },
  registration_complete: {
    label: "Empresa cadastrada",
    tone: "info",
    description: "Falta contar como é a operação.",
  },
  qualification_complete: {
    label: "Perfil concluído",
    tone: "info",
    description: "Revise as recomendações e solicite a proposta.",
  },
  proposal_requested: {
    label: "Proposta solicitada",
    tone: "warning",
    description:
      "A equipe comercial da Terus vai analisar e entrar em contato.",
  },
  under_review: {
    label: "Em análise",
    tone: "warning",
    description: "A equipe Terus está preparando a proposta.",
  },
  proposal_sent: {
    label: "Proposta enviada",
    tone: "info",
    description: "Confira a proposta enviada pelo canal combinado.",
  },
  acceptance_pending: {
    label: "Aceite pendente",
    tone: "warning",
    description: "Aguardando o aceite e a assinatura do contrato.",
  },
  contracted: {
    label: "Contratado",
    tone: "success",
    description:
      "Contrato registrado pela equipe Terus. Próximo passo: implantação.",
  },
  archived: {
    label: "Arquivado",
    tone: "neutral",
    description: "Jornada encerrada. Fale com a Terus para reabrir.",
  },
};

export const REQUEST_STATUS: Record<string, string> = {
  received: "Recebida",
  in_review: "Em análise",
  proposal_sent: "Proposta enviada",
  acceptance_pending: "Aceite pendente",
  contracted: "Contratado",
  lost: "Não avançou",
  archived: "Arquivada",
};

export const IMPLEMENTATION_STATUS: Record<
  string,
  { label: string; tone: "neutral" | "info" | "success" | "warning" }
> = {
  concluido: { label: "Concluído", tone: "success" },
  informado: { label: "Informado", tone: "info" },
  pendente: { label: "Pendente", tone: "warning" },
  nao_configurado: { label: "Não configurado", tone: "neutral" },
  nao_iniciado: { label: "Não iniciado", tone: "neutral" },
};

/** Etapas do pipeline comercial (admin) e transições permitidas — espelham o backend. */
export const REQUEST_TRANSITIONS: Record<string, string[]> = {
  received: ["in_review", "lost", "archived"],
  in_review: ["proposal_sent", "lost", "archived"],
  proposal_sent: ["acceptance_pending", "in_review", "lost", "archived"],
  acceptance_pending: ["contracted", "proposal_sent", "lost", "archived"],
  contracted: [],
  lost: ["in_review"],
  archived: ["in_review"],
};
