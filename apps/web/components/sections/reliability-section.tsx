import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { PILARES_CONFIABILIDADE } from "@/lib/constants/site-data";

const STATUS_LABELS = {
  ativo: { label: "Implementado", variant: "success" as const },
  conformidade: { label: "Em conformidade", variant: "default" as const },
};

export function ReliabilitySection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Confiabilidade
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Infraestrutura para operações críticas
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Pilares de segurança, isolamento e governança já implementados na
            arquitetura da plataforma — preparados para escala enterprise.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES_CONFIABILIDADE.map((pillar) => {
            const status = STATUS_LABELS[pillar.status];

            return (
              <div
                key={pillar.name}
                className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
              >
                <div className="flex justify-center">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-brand-primary">
                  {pillar.name}
                </h3>
                <p className="mt-4 text-body-md text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        <CtaButtons className="mt-12" />
      </Container>
    </section>
  );
}
