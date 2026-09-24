import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { CAMADA_INTEGRACAO, INTEGRACOES } from "@/lib/constants/site-data";

const STATUS_LABELS = {
  homologado: { label: "Homologado", variant: "success" as const },
  ativo: { label: "Ativo", variant: "default" as const },
  roadmap: { label: "Roadmap", variant: "secondary" as const },
};

export function IntegrationsEcosystemSection() {
  return (
    <section className="section-rhythm-alt">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Integrações e camada que alimenta a operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            ERPs homologados e a infraestrutura real que coleta, processa e
            integra dados — Agent, IAproc e Bond — antes de chegar aos módulos.
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

        <Reveal delay={80} className="mx-auto mt-16 max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Camada de integração
          </p>
          <h3 className="mt-3 font-display text-heading-lg font-bold text-text-primary">
            Do ERP à ação — a base do ecossistema
          </h3>
          <p className="mt-3 text-body-md text-text-secondary">
            Três componentes que já operam no produto: coleta segura, processamento
            inteligente e integração com fornecedores e ERP.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {CAMADA_INTEGRACAO.map((item, index) => (
            <Reveal
              key={item.name}
              variant="scale"
              delay={Math.min(100 + index * 70, 420)}
              className="relative overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1 p-8"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="inline-block rounded-md bg-brand-primary-dim px-2.5 py-1 font-mono text-caption font-medium uppercase tracking-wider text-brand-primary">
                  {item.role}
                </span>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                  {item.name}
                </h3>
                <p className="mt-3 text-body-md leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <CtaButtons className="mt-12" />
        </Reveal>
      </Container>
    </section>
  );
}
