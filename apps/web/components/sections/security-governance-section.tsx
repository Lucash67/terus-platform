import { Container } from "@/components/layout/container";

const SECURITY_GOVERNANCE_ITEMS = [
  {
    title: "Certificações de Segurança",
    description:
      "Informações sobre certificações disponíveis mediante validação",
  },
  {
    title: "Compliance e Governança",
    description: "Informações sobre compliance disponíveis mediante validação",
  },
  {
    title: "SLA e Disponibilidade",
    description: "Informações sobre SLA disponíveis mediante validação",
  },
  {
    title: "Proteção de Dados",
    description:
      "Informações sobre proteção de dados disponíveis mediante validação",
  },
];

export function SecurityGovernanceSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Segurança e Governança
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Credibilidade enterprise
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Estrutura de segurança e governança preparada para receber
            certificações e informações de compliance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_GOVERNANCE_ITEMS.map((item) => (
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
