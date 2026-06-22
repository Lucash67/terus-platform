import { Container } from "@/components/layout/container";

const OPERATIONAL_RESULTS = [
  {
    title: "Indicador de Ruptura",
    value: "Em validação operacional",
    description: "Resultado baseado em dados reais da operação",
  },
  {
    title: "Ticket Médio",
    value: "Em validação operacional",
    description: "Resultado baseado em dados reais da operação",
  },
  {
    title: "Tempo de Entrega",
    value: "Em validação operacional",
    description: "Resultado baseado em dados reais da operação",
  },
  {
    title: "Ganhos Operacionais",
    value: "Em validação operacional",
    description: "Resultado baseado em dados reais da operação",
  },
];

export function OperationalResultsSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Resultados Operacionais
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Métricas validadas pela operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores baseados em dados reais da operação Terus. Resultados
            disponíveis mediante validação operacional.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {OPERATIONAL_RESULTS.map((result) => (
            <div
              key={result.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
            >
              <p className="font-display text-body-sm font-semibold text-text-secondary">
                {result.title}
              </p>
              <p className="mt-4 font-display text-display-lg font-bold text-brand-primary">
                {result.value}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
