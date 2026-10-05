export const CTA = {
  primary: {
    label: "Agendar demonstração",
    href: "/solicitar-demo",
  },
  secondary: {
    label: "Conhecer Terus Varejo",
    href: "/plataforma",
  },
} as const;

export const WHATSAPP_DEMO_URL = `https://wa.me/5585997384940?text=${encodeURIComponent(
  "Olá! Quero agendar uma demonstração da Terus Varejo.\nERP da rede: \nNúmero de lojas: ",
)}`;

export const DEMO_PAGE = {
  badge: "Demonstração comercial",
  title: "Veja quanto a sua gôndola está deixando na mesa",
  description:
    "Uma conversa para mostrar como a Terus encontra ruptura, excesso e problemas de margem, coloca a correção na mão da loja e mede o R$ recuperado.",
  trustLine: "RMS · Consinco · VR · CISS · RPInfo · Winthor · Sankhya · VitSis",
  whatsappLabel: "Agendar demonstração via WhatsApp",
  valueProps: [
    {
      title: "Entendemos a sua operação",
      description:
        "Antes de apresentar, olhamos o seu ERP, o número de lojas e como a reposição funciona hoje.",
    },
    {
      title: "Portal e app em uso real",
      description:
        "Você vê os alertas da rede, a fila da loja priorizada por R$ e o pedido chegando no ERP do fornecedor.",
    },
    {
      title: "Próximos passos claros",
      description:
        "Saia sabendo o que a integração exige do seu TI, quais módulos começar e como medir o retorno.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Contato pelo WhatsApp",
      description:
        "Você conta qual ERP a rede usa e quantas lojas tem. A equipe comercial confirma o horário.",
    },
    {
      step: "02",
      title: "Demonstração",
      description:
        "Apresentação dos alertas, da fila da loja, dos pedidos e das métricas de efetividade.",
    },
    {
      step: "03",
      title: "Proposta e integração",
      description:
        "Plano com script de acesso só leitura, liberação de IP sem VPN e onboarding guiado.",
    },
  ],
  demoIncludes: [
    "Terus Alert: 13 tipos de alerta de ruptura, excesso, venda e margem",
    "Terus Task: a fila da loja ordenada pelo R$ que cada correção recupera",
    "Terus Order: pedido de reposição gravado direto no ERP do fornecedor",
    "Métricas de efetividade: R$ antes e depois, acerto e reincidência",
    "Como funciona a integração: só leitura, sem VPN, usuário dedicado",
  ],
} as const;
