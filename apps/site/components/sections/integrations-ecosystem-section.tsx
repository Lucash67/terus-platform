import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { TechLayersPanel } from "@/components/sections/tech-layers-panel";
import { INTEGRACOES } from "@/lib/constants/site-data";

const STATUS_LABELS = {
  homologado: { label: "Em produção", variant: "success" as const },
  ativo: { label: "Ativo", variant: "default" as const },
  roadmap: { label: "Roadmap", variant: "secondary" as const },
};

export function IntegrationsEcosystemSection() {
  return (
    <section className="section-rhythm-alt">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Integração
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Do ERP da rede ao ERP do fornecedor
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A Terus captura os dados da rede, gera alertas e atividades, e grava
            o pedido aprovado no sistema do fornecedor — sem redigitação.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRACOES.map((integration, index) => {
            const status = STATUS_LABELS[integration.status];

            return (
              <Reveal
                key={integration.name}
                variant="scale"
                delay={Math.min(index * 70, 490)}
                className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-8 text-center"
              >
                <div className="flex justify-center">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-brand-primary transition-colors duration-300 group-hover:text-brand-primary-hover">
                  {integration.name}
                </h3>
                <p className="mt-2 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {integration.type}
                </p>
                <p className="mt-4 text-body-md text-text-secondary">
                  {integration.description}
                </p>
              </Reveal>
            );
          })}
        </div>

        <TechLayersPanel />

        <Reveal delay={120}>
          <CtaButtons className="mt-12" />
        </Reveal>
      </Container>
    </section>
  );
}
