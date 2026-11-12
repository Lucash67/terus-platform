export const WHATSAPP_NUMBER = "5585997384940";

export const CTA = {
  primary: {
    label: "Começar com a minha rede",
    href: "/comecar",
  },
  /** Contato rápido: abre o WhatsApp comercial em nova aba */
  secondary: {
    label: "Falar agora pelo WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá! Vim pelo site da Terus Varejo e quero falar com a equipe.",
    )}`,
  },
} as const;

export const WHATSAPP_DEMO_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Quero agendar uma demonstração da Terus Varejo.\nERP da rede: \nNúmero de lojas: ",
)}`;

export const PRE_CADASTRO_ERPS = [
  { id: "rms", label: "RMS" },
  { id: "consinco", label: "Consinco" },
  { id: "vr", label: "VR Software" },
  { id: "ciss", label: "CISS Poder" },
  { id: "rpinfo", label: "RPInfo" },
  { id: "outro", label: "Outro ERP" },
] as const;

export const DEMO_PAGE = {
  badge: "Pré-cadastro",
  title: "Comece com a sua rede",
  titleAccent: "em menos de um minuto",
  description:
    "Conte qual ERP a rede usa e quantas lojas tem. Os dados seguem pelo WhatsApp para a nossa equipe, que retoma com você o próximo passo.",
  trustLine: "RMS · Consinco · VR · CISS · RPInfo · Winthor · Sankhya · VitSis",
  form: {
    title: "Pré-cadastro da rede",
    submit: "Enviar pelo WhatsApp",
    privacy:
      "Não pedimos senha nem acesso ao banco nesta etapa. A integração é combinada depois, com o seu TI.",
    sent: "Abrimos o WhatsApp com os seus dados. É só tocar em enviar.",
  },
  processSteps: [
    {
      step: "01",
      title: "Pré-cadastro",
      description:
        "Você envia nome, rede, ERP e número de lojas pelo WhatsApp. Nossa equipe comercial responde por lá.",
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
