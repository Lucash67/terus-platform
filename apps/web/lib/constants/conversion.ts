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

export const WHATSAPP_DEMO_URL = `https://wa.me/558596290044?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma demonstração da Terus Varejo. Operamos com ERP Winthor/RMS e quero conhecer a solução de Inteligência da Cadeia de Suprimentos.",
)}`;

export const DEMO_PAGE = {
  badge: "Demonstração comercial",
  title: "Veja a Terus Varejo operando na sua realidade",
  description:
    "Demonstração executiva personalizada para operações de varejo e distribuição — sem compromisso, focada em ruptura, reposição e inteligência operacional.",
  urgency:
    "Vagas limitadas por semana para garantir atendimento consultivo de qualidade.",
  responseTime: "Resposta da equipe comercial em até 1 dia útil",
  whatsappLabel: "Agendar demonstração via WhatsApp",
  valueProps: [
    {
      title: "Diagnóstico da sua operação",
      description:
        "Entendemos seu cenário de ERP, lojas e distribuição antes de apresentar a Terus Varejo.",
    },
    {
      title: "Demo ao vivo da Terus Varejo",
      description:
        "Visualize alertas, automação de reposição e monitoramento em tempo real — com dados simulados do seu contexto.",
    },
    {
      title: "Próximos passos claros",
      description:
        "Saia da conversa sabendo escopo, cronograma de integração e ROI operacional esperado.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Contato inicial",
      description:
        "Você envia sua solicitação via WhatsApp. Nossa equipe confirma perfil e ERP em até 1 dia útil.",
    },
    {
      step: "02",
      title: "Demonstração executiva",
      description:
        "Sessão de 30–45 minutos com foco em Inteligência da Cadeia de Suprimentos, módulos Terus e jornada operacional.",
    },
    {
      step: "03",
      title: "Proposta e onboarding",
      description:
        "Apresentamos plano de integração, cronograma e condições comerciais para ativação autônoma.",
    },
  ],
  demoIncludes: [
    "Visão geral da arquitetura e pilares da Terus Varejo",
    "Demonstração dos módulos Alert, Order e Pulse",
    "Integração com ERPs Winthor e RMS homologados",
    "Cases reais da Rede Terus com métricas validadas",
    "Sessão de perguntas com especialista comercial",
  ],
} as const;
