export const CTA = {
  primary: {
    label: "Agendar demonstração",
    href: "/solicitar-demo",
  },
  secondary: {
    label: "Explorar plataforma",
    href: "/plataforma",
  },
} as const;

export const WHATSAPP_DEMO_URL = `https://wa.me/558596290044?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma demonstração da Terus Platform. Operamos com ERP Winthor/RMS e quero conhecer a solução de Supply Chain Intelligence.",
)}`;

export const DEMO_PAGE = {
  badge: "Demonstração comercial",
  title: "Veja a Terus Platform operando na sua realidade",
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
        "Entendemos seu cenário de ERP, lojas e distribuição antes de apresentar a plataforma.",
    },
    {
      title: "Demo ao vivo da plataforma",
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
        "Sessão de 30–45 minutos com foco em Supply Chain Intelligence, módulos Terus e jornada operacional.",
    },
    {
      step: "03",
      title: "Proposta e onboarding",
      description:
        "Apresentamos plano de integração, cronograma e condições comerciais para ativação autônoma.",
    },
  ],
  demoIncludes: [
    "Visão geral da arquitetura e pilares da plataforma",
    "Demonstração dos módulos Alert, Order e Pulse",
    "Integração com ERPs Winthor e RMS homologados",
    "Cases reais da Rede Terus com métricas validadas",
    "Sessão de perguntas com especialista comercial",
  ],
} as const;
