import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Ecossistema | Terus Platform",
  description:
    "Ecossistema Terus — integração com ERPs, indústria, distribuição e operação de loja.",
};

const INTEGRATION_LAYERS = [
  {
    title: "Camada de Integração",
    items: ["Winthor", "RMS", "APIs REST", "Conectores homologados"],
  },
  {
    title: "Camada de Inteligência",
    items: [
      "Alertas em tempo real",
      "Sugestão de pedidos",
      "Priorização operacional",
    ],
  },
  {
    title: "Camada de Execução",
    items: ["App mobile", "Tarefas em loja", "Evidências e auditoria"],
  },
];

export default function EcossistemaPage() {
  return (
    <>
      <PageHero
        badge="Ecossistema"
        title="Conectando toda a cadeia de valor"
        description="A Terus integra horizontalmente varejo, indústria e distribuição — criando visibilidade e automação em cada elo."
      />

      <EcosystemSection showCta={false} />

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <h2 className="text-center font-display text-heading-xl font-bold text-text-primary">
            Arquitetura de integração
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {INTEGRATION_LAYERS.map((layer) => (
              <div
                key={layer.title}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {layer.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {layer.items.map((item) => (
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
