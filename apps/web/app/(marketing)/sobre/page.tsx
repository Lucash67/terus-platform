import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { COMPANY_VALUES } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Sobre a Plataforma | Terus Platform",
  description:
    "Conheça a Terus Platform — plataforma de onboarding, ativação e operação de clientes para o varejo brasileiro.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        badge="Sobre"
        title="Plataforma que protege receita e otimiza capital"
        description="A Terus Platform nasceu para resolver os três problemas de missão crítica no varejo: ruptura de gôndola, excesso de estoque e execução manual inconsistente."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              O que é a Terus Platform
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              A Terus Platform é uma plataforma de onboarding, ativação e
              operação de clientes que integra horizontalmente varejo, indústria
              e distribuição em tempo real. Não é uma ferramenta de BI genérica
              nem uma empresa de integração de dados — é inteligência
              operacional com automação em tempo real.
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
              História da Terus
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              A Terus Platform nasceu para resolver os três problemas de missão
              crítica no varejo: ruptura de gôndola, excesso de estoque e
              execução manual inconsistente. Nossa jornada é marcada pela
              evolução contínua da plataforma e pela expansão da jornada
              operacional de nossos clientes.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Evolução da Plataforma
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              A Terus Platform evoluiu de uma solução de integração para uma
              plataforma completa de onboarding, ativação e operação de
              clientes. Cada versão trouxe novas capacidades operacionais e
              expansão da jornada.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Missão e Visão
            </h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-lg border border-surface-border bg-surface-base p-8">
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  Missão
                </h3>
                <p className="mt-4 text-body-lg text-text-secondary">
                  Permitir que operações de varejo detectem rupturas,
                  automatizem reposições e executem ações em loja — tudo com
                  rastreabilidade completa e sem dependência de equipes técnicas
                  externas.
                </p>
              </div>
              <div className="rounded-lg border border-surface-border bg-surface-base p-8">
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  Visão
                </h3>
                <p className="mt-4 text-body-lg text-text-secondary">
                  Ser a plataforma referência em onboarding, ativação e operação
                  de clientes para o varejo brasileiro, transformando a cadeia
                  de suprimentos com inteligência operacional em tempo real.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              Liderança
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              Seção preparada para exibir informações sobre a liderança da
              Terus. Informações disponíveis mediante autorização.
            </p>
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
