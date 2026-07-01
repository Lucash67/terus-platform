import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { RESULTADOS_OPERACIONAIS } from "@/lib/constants/site-data";

export function RealResultsSection() {
  return (
    <section className="section-rhythm-alt">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Resultados reais
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            Impacto comprovado em operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores validados em ambiente produtivo da Rede Terus.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {RESULTADOS_OPERACIONAIS.map((result) => (
            <div
              key={result.title}
              className="card-interactive rounded-xl border border-surface-border bg-surface-base p-6 text-center sm:p-8"
            >
              <p className="font-display text-body-sm font-semibold text-text-secondary">
                {result.title}
              </p>
              {result.before && result.after ? (
                <>
                  <p className="mt-3 font-display text-body-md text-text-tertiary line-through decoration-text-tertiary/40">
                    {result.before}
                  </p>
                  <p className="mt-1 font-display text-display-lg font-bold text-brand-primary">
                    {result.after}
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {result.improvement}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-3 font-display text-display-lg font-bold text-brand-primary">
                    {result.value}
                  </p>
                  {"description" in result && result.description ? (
                    <p className="mt-2 text-body-sm text-text-secondary">
                      {result.description}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CtaButtons size="md" className="mt-2" />
          <p className="mt-4">
            <Link
              href="/cases"
              className="text-body-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover hover:underline"
            >
              Ver case completo com indicadores →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
