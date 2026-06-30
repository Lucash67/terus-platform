import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { PageHero } from "@/components/sections/page-hero";
import { INTEGRACOES } from "@/lib/constants/site-data";

export const metadata: Metadata = {
  title: "Ecossistema Operacional | Terus Platform",
  description:
    "Todo o ciclo operacional do cliente em um único ecossistema — onboarding, ativação, operação, monitoramento e governança.",
};

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
        title="Todo o ciclo operacional do cliente em um único ecossistema"
        description="Do onboarding ao monitoramento contínuo, a Terus integra cada etapa da jornada operacional em um ambiente unificado."
      />

      <EcosystemSection showCta={false} />

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
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
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRACOES.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.name}
                </h3>
                <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {item.type}
                </p>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <h2 className="text-center font-display text-heading-xl font-bold text-text-primary">
            Ecossistema integrado de jornada operacional
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {OPERATIONAL_STAGES.map((stage) => (
              <div
                key={stage.title}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
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
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
