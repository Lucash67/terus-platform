import type { LegalSection } from "@/components/sections/legal-document";

/** Versão referenciada nos consentimentos gravados no backend (LEGAL_DOCUMENT_VERSION). */
export const LEGAL_VERSION = "2026-11";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: "Quem trata os dados",
    paragraphs: [
      "A Terus Tecnologia é a controladora dos dados pessoais coletados neste site e no cadastro online. Os dados cadastrais completos da empresa e o canal do encarregado (DPO) serão publicados aqui após a revisão jurídica. Até lá, solicitações podem ser feitas pelo WhatsApp comercial (85) 99738-4940.",
    ],
  },
  {
    title: "Quais dados coletamos e para quê",
    paragraphs: [
      "Conta: nome, e-mail, telefone e cargo (opcionais quando indicado) e senha, guardada apenas como hash. Finalidade: identificar você, proteger o acesso e permitir retomar o cadastro de qualquer dispositivo.",
      "Empresa e operação: razão social, CNPJ, segmento, porte, cidade/UF, ERP utilizado, prioridades e prazo. Finalidade: avaliar a aderência, recomendar módulos e preparar a proposta comercial.",
      "Solicitação comercial: tipo de solicitação, canal de contato preferido e mensagem. Finalidade: contato da equipe comercial e acompanhamento no portal.",
      "Origem do acesso: parâmetros de campanha (UTM) e página de entrada, sem dados pessoais. Finalidade: entender quais canais trazem interessados.",
      "Não pedimos senha, usuário ou acesso ao banco de dados do ERP no cadastro online.",
    ],
  },
  {
    title: "Bases legais",
    paragraphs: [
      "Procedimentos preliminares a contrato, a pedido do titular (art. 7º, V, LGPD) para conta, empresa e proposta; legítimo interesse para segurança, prevenção a fraude e auditoria de acessos; consentimento para comunicações de conteúdo, que pode ser retirado a qualquer momento.",
    ],
  },
  {
    title: "Compartilhamento",
    paragraphs: [
      "Os dados ficam acessíveis à equipe Terus responsável pelo atendimento comercial e implantação. Não vendemos dados. Fornecedores de infraestrutura (hospedagem e banco de dados) tratam dados em nome da Terus. Não há, nesta versão, integração com CRM, e-mail marketing ou assinatura eletrônica.",
    ],
  },
  {
    title: "Retenção e segurança",
    paragraphs: [
      "Mantemos os dados enquanto houver relacionamento comercial ou necessidade legal. Registros de auditoria são imutáveis. O acesso é protegido por sessão com cookies HttpOnly, senhas com hash bcrypt e isolamento por empresa: uma organização não acessa dados de outra.",
    ],
  },
  {
    title: "Seus direitos",
    paragraphs: [
      "Você pode pedir confirmação, acesso, correção, anonimização, portabilidade, eliminação e informações sobre compartilhamento, além de revogar consentimentos, pelo canal indicado acima.",
    ],
  },
  {
    title: "Cookies e medição",
    paragraphs: [
      "Usamos cookies estritamente necessários para manter a sessão da conta. A medição de audiência, quando ativa, usa Plausible, que não usa cookies nem coleta dados pessoais.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: "Objeto",
    paragraphs: [
      "Estes termos regulam o uso do site da Terus e do cadastro online, que permite criar uma conta, cadastrar a empresa, informar o perfil da operação e solicitar proposta ou contato comercial.",
    ],
  },
  {
    title: "O que o cadastro online não faz",
    paragraphs: [
      "O cadastro não contrata serviços, não gera cobrança, não conecta o ERP e não ativa módulos. Contratação, integração e ativação dependem de proposta aceita, contrato assinado e implantação com a equipe Terus. O portal mostra cada etapa com o status confirmado pela Terus.",
    ],
  },
  {
    title: "Conta e responsabilidade",
    paragraphs: [
      "Você declara ter autorização para representar a empresa cadastrada e é responsável pela veracidade das informações e pelo sigilo da senha. CNPJs já cadastrados não podem ser registrados novamente; nesse caso, fale com a Terus para vincular sua conta.",
    ],
  },
  {
    title: "Demonstrações",
    paragraphs: [
      "Demonstrações do site usam dados fictícios identificados como tal e não representam resultados de clientes. Resultados de cases são atribuídos aos clientes nomeados.",
    ],
  },
  {
    title: "Alterações e contato",
    paragraphs: [
      "Estes termos podem ser atualizados; a versão vigente fica nesta página. Dúvidas: WhatsApp comercial (85) 99738-4940.",
    ],
  },
];
