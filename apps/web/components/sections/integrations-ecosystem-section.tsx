import { Container } from "@/components/layout/container";

const INTEGRATIONS_ECOSYSTEM_ITEMS = [
  {
    title: "Integrações ERP",
    description:
      "Estrutura preparada para exibir ERPs homologados e integrações operacionais.",
  },
  {
    title: "APIs e Conectores",
    description:
      "Estrutura preparada para exibir conectores e integrações disponíveis.",
  },
  {
    title: "Operação Integrada",
    description:
      "Ambiente preparado para unificar dados, processos e execução operacional.",
  },
  {
    title: "Evolução Contínua",
    description:
      "Novas integrações poderão ser disponibilizadas conforme evolução da plataforma.",
  },
];

export function IntegrationsEcosystemSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Integrações e ecossistema tecnológico
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A Terus foi projetada para conectar diferentes sistemas, operações e
            fontes de dados em uma única jornada operacional.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS_ECOSYSTEM_ITEMS.map((item) => (
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
