import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { PLATFORM_PILLARS } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Plataforma | Terus Platform",
  description:
    "Conheça a arquitetura da Terus Platform — Supply Chain Intelligence com integração, diagnóstico, automação e execução.",
};

export default function PlataformaPage() {
  return (
    <>
      <PageHero
        badge="Plataforma"
        title="Uma plataforma, quatro capacidades"
        description="A Terus Platform orquestra toda a jornada — da conexão com o ERP à execução em loja — em um ambiente unificado e seguro."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {PLATFORM_PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className="relative rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <span className="font-mono text-display-lg font-bold text-brand-primary/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-heading-lg font-semibold text-text-primary">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-body-md text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
                Onboarding autônomo
              </h2>
              <p className="mt-4 text-body-lg text-text-secondary">
                Clientes com ERP Winthor ou RMS completam todo o fluxo de
                ativação — do cadastro ao ambiente operacional — sem intervenção
                manual da equipe técnica Terus.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Assistente guiado de integração",
                  "Diagnóstico automatizado de conectividade",
                  "Contratos digitais integrados",
                  "Provisionamento de ambiente em minutos",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-body-md text-text-secondary"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-status-success-dim text-status-success">
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link href="/modulos">Conhecer os módulos</Link>
              </Button>
            </div>

            <div className="rounded-lg border border-surface-border bg-surface-base p-8">
              <PlatformFlowDiagram />
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

function PlatformFlowDiagram() {
  const steps = [
    "Cadastro",
    "Integração ERP",
    "Diagnóstico",
    "Contratos",
    "Ativação",
  ];

  return (
    <div className="space-y-4">
      <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
        Fluxo de ativação
      </p>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-caption font-semibold text-brand-primary">
            {index + 1}
          </div>
          <div className="flex-1 rounded-md border border-surface-border bg-surface-elevated-2 px-4 py-3">
            <p className="text-body-md font-medium text-text-primary">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
