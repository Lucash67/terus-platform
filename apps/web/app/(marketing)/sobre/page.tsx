import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { COMPANY_VALUES } from "@/lib/constants/site";
import { ABOUT } from "@/lib/constants/copy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a Terus",
  description:
    "Conheça a Terus Tecnologia — plataforma de Supply Chain Intelligence para varejo, indústria e distribuição no Brasil.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        badge={ABOUT.hero.badge}
        title={ABOUT.hero.title}
        description={ABOUT.hero.description}
      />

      <section className="section-rhythm">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-heading-xl font-bold tracking-tight text-text-primary">
                O que é a Terus Platform
              </h2>
              <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
                A Terus Platform integra horizontalmente varejo, indústria e
                distribuição em tempo real — inteligência operacional com
                automação, não BI genérico nem integração de dados.
              </p>
              <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                Nossa missão é permitir que operações detectem rupturas,
                automatizem reposições e executem ações em loja com
                rastreabilidade completa.
              </p>
            </div>
            <div>
              <h2 className="font-display text-heading-xl font-bold tracking-tight text-text-primary">
                Nossa história
              </h2>
              <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
                {ABOUT.story}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rhythm-alt">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {COMPANY_VALUES.map((value) => (
              <div
                key={value.title}
                className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {value.title}
                </h3>
                <p className="mt-4 text-body-md leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rhythm">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-heading-xl font-bold tracking-tight text-text-primary">
              Por que Supply Chain Intelligence?
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
              {ABOUT.whySci}
            </p>
          </div>
        </Container>
      </section>

      <ReliabilitySection />

      <CtaSection />
    </>
  );
}
