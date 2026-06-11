import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { COMPANY_VALUES } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Sobre | Terus Platform",
  description:
    "Conheça a Terus Tecnologia — plataforma de Supply Chain Intelligence para o varejo brasileiro.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        badge="Sobre"
        title="Tecnologia que protege receita e otimiza capital"
        description="A Terus Tecnologia nasceu para resolver os três problemas de missão crítica no varejo: ruptura de gôndola, excesso de estoque e execução manual inconsistente."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Quem somos
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              Somos uma plataforma SaaS de Supply Chain Intelligence que integra
              horizontalmente varejo, indústria e distribuição em tempo real.
              Não somos uma ferramenta de BI genérica nem uma empresa de
              integração de dados — somos inteligência operacional com automação
              em tempo real.
            </p>
            <p className="mt-4 text-body-lg text-text-secondary">
              Nossa missão é permitir que operações de varejo detectem rupturas,
              automatizem reposições e executem ações em loja — tudo com
              rastreabilidade completa e sem dependência de equipes técnicas
              externas.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {COMPANY_VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-surface-border bg-surface-base p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {value.title}
                </h3>
                <p className="mt-4 text-body-md text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Por que Supply Chain Intelligence?
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              Porque dados desconectados não resolvem ruptura. Porque relatórios
              defasados não protegem receita. Porque a operação precisa de
              inteligência que age — não apenas informa.
            </p>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
