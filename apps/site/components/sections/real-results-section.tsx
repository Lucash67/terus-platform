import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { RESULTADOS_OPERACIONAIS } from "@/lib/constants/site-data";

export function RealResultsSection() {
  return (
    <section className="section-rhythm-alt">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Resultados reais
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            Impacto comprovado em operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores validados em ambiente produtivo da Rede Terus.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {RESULTADOS_OPERACIONAIS.map((result, index) => (
            <Reveal
              key={result.title}
              variant="scale"
              delay={Math.min(index * 70, 490)}
              className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-6 text-center sm:p-8"
            >
              <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
                {result.title}
              </p>
              {result.before && result.after ? (
                <>
                  <p className="mt-4 flex items-baseline justify-center gap-2 font-display text-body-md text-text-tertiary">
                    <span className="line-through decoration-text-tertiary/40">
                      {result.before}
                    </span>
                    <span aria-hidden="true" className="text-brand-primary">
                      →
                    </span>
                  </p>
                  <p className="mt-1 font-display text-display-lg font-bold tracking-tight text-brand-primary transition-colors duration-300 group-hover:text-brand-primary-hover">
                    {index === 0 ? (
                      <CountUp value={96} prefix="até " suffix="%" />
                    ) : index === 1 ? (
                      <CountUp value={2338} prefix="R$ " locale />
                    ) : (
                      <CountUp
                        value={16}
                        decimals={1}
                        prefix="R$ "
                        suffix=" mi"
                      />
                    )}
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {result.improvement}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-4 font-display text-display-lg font-bold tracking-tight text-brand-primary transition-colors duration-300 group-hover:text-brand-primary-hover">
                    <CountUp value={31881} locale suffix=" pedidos" />
                  </p>
                  {"description" in result && result.description ? (
                    <p className="mt-2 text-body-sm text-text-secondary">
                      {result.description}
                    </p>
                  ) : null}
                </>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <CtaButtons size="md" className="mt-2" />
          <p className="mt-4">
            <Link
              href="/cases"
              className="text-body-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover hover:underline"
            >
              Ver case completo com indicadores →
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
