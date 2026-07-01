import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { ENTERPRISE_TRUST } from "@/lib/constants/copy";
import { PILARES_CONFIABILIDADE } from "@/lib/constants/site-data";

const STATUS_LABELS = {
  ativo: { label: "Implementado", variant: "success" as const },
  conformidade: { label: "Em conformidade", variant: "default" as const },
};

export function ReliabilitySection() {
  return (
    <section className="section-rhythm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {ENTERPRISE_TRUST.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            {ENTERPRISE_TRUST.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {ENTERPRISE_TRUST.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES_CONFIABILIDADE.map((pillar) => {
            const status = STATUS_LABELS[pillar.status];

            return (
              <div
                key={pillar.name}
                className="card-interactive rounded-xl border border-surface-border bg-surface-base p-6 text-center sm:p-8"
              >
                <div className="flex justify-center">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                  {pillar.name}
                </h3>
                <p className="mt-3 text-body-md leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
