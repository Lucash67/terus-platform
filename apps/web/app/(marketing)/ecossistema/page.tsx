import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { PageHero } from "@/components/sections/page-hero";
import { INTEGRACOES } from "@/lib/constants/site-data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Ecossistema Operacional",
  description:
    "Todo o ciclo operacional do cliente em um único ecossistema — onboarding, ativação, operação, monitoramento e governança com ERPs Winthor e RMS homologados.",
  path: "/ecossistema",
});

const OPERATIONAL_STAGES = [
  {
    title: "Onboarding e Integração",
    items: ["Winthor", "RMS", "APIs REST", "Conectores homologados"],
  },
  {
    title: "Ativação e Operação",
    items: [
      "Alertas em tempo real",
      "Sugestão de pedidos",
      "Priorização operacional",
    ],
  },
  {
    title: "Monitoramento e Governança",
    items: ["App mobile", "Tarefas em loja", "Evidências e auditoria"],
  },
];

export default function EcossistemaPage() {
  return (
    <>
      <PageHero
        badge="Ecossistema"
        title="Todo o ciclo operacional do cliente"
        titleAccent="em um único ecossistema"
        description="Do onboarding ao monitoramento contínuo, a Terus integra cada etapa da jornada operacional em um ambiente unificado."
      />

      <EcosystemSection showCta={false} />

      <section className="section-rhythm">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Tecnologias
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Tecnologias e integrações
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              A infraestrutura da Terus foi construída para suportar integração
              operacional, conectividade de dados e expansão contínua do
              ecossistema.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRACOES.map((item, index) => (
              <Reveal key={item.name} delay={Math.min(index * 70, 490)}>
                <div className="card-interactive h-full rounded-lg border border-surface-border bg-surface-elevated-1 p-8">
                  <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-mono text-caption uppercase tracking-widest text-text-tertiary">
                    {item.type}
                  </p>
                  <p className="mt-3 text-body-md text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rhythm-alt relative overflow-hidden">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Ecossistema integrado de jornada operacional
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {OPERATIONAL_STAGES.map((stage, index) => (
              <Reveal key={stage.title} delay={Math.min(index * 70, 490)}>
                <div className="card-interactive h-full rounded-lg border border-surface-border bg-surface-elevated-1 p-8">
                  <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-heading-md font-semibold text-brand-primary">
                    {stage.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {stage.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-body-md text-text-secondary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
