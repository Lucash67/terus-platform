import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { INTEGRACOES } from "@/lib/constants/site-data";

const STATUS_LABELS = {
  homologado: { label: "Homologado", variant: "success" as const },
  ativo: { label: "Ativo", variant: "default" as const },
  roadmap: { label: "Roadmap", variant: "secondary" as const },
};

export function IntegrationsEcosystemSection() {
  return (
    <section className="section-rhythm-alt">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Integrações e ecossistema tecnológico
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            ERPs homologados, conectores guiados e APIs projetadas para integrar
            varejo, indústria e distribuição em uma jornada única.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRACOES.map((integration) => {
            const status = STATUS_LABELS[integration.status];

            return (
              <div
                key={integration.name}
                className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8 text-center"
              >
                <div className="flex justify-center">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-brand-primary">
                  {integration.name}
                </h3>
                <p className="mt-2 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {integration.type}
                </p>
                <p className="mt-4 text-body-md text-text-secondary">
                  {integration.description}
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
