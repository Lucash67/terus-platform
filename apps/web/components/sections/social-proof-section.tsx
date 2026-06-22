import { Container } from "@/components/layout/container";

const SOCIAL_PROOF_ITEMS = [
  {
    title: "Cases de Sucesso",
    description: "Cases serão publicados após autorização dos clientes.",
  },
  {
    title: "Resultados Operacionais",
    description:
      "Indicadores serão alimentados com dados reais extraídos da operação.",
  },
  {
    title: "Depoimentos",
    description: "Depoimentos serão adicionados após aprovação dos clientes.",
  },
  {
    title: "Empresas Atendidas",
    description:
      "Logos e informações institucionais serão adicionados após autorização.",
  },
  {
    title: "Validado em Campo",
    description: "Resultados operacionais em processo de consolidação.",
  },
  {
    title: "Evolução Contínua",
    description:
      "Novos indicadores serão disponibilizados conforme expansão da plataforma.",
  },
];

export function SocialProofSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Prova Social
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Resultados validados em operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A estrutura abaixo foi preparada para exibir casos reais,
            depoimentos e indicadores operacionais da Terus Platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_PROOF_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
            >
              <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                {item.title}
              </h3>
              <p className="mt-4 text-body-md text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
