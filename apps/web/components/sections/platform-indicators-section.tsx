import { Container } from "@/components/layout/container";

const PLATFORM_INDICATORS = [
  {
    title: "Tempo Médio de Onboarding",
    value: "Em validação operacional",
    description: "Métrica disponível mediante validação",
  },
  {
    title: "Taxa de Sucesso de Integração",
    value: "Em validação operacional",
    description: "Métrica disponível mediante validação",
  },
  {
    title: "Disponibilidade da Plataforma",
    value: "Em validação operacional",
    description: "Métrica disponível mediante validação",
  },
  {
    title: "SLA de Suporte",
    value: "Em validação operacional",
    description: "Métrica disponível mediante validação",
  },
];

export function PlatformIndicatorsSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Indicadores da Plataforma
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Métricas operacionais da jornada
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores de performance da plataforma Terus. Resultados
            disponíveis mediante validação operacional.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_INDICATORS.map((indicator) => (
            <div
              key={indicator.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
            >
              <p className="font-display text-body-sm font-semibold text-text-secondary">
                {indicator.title}
              </p>
              <p className="mt-4 font-display text-display-lg font-bold text-brand-primary">
                {indicator.value}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
