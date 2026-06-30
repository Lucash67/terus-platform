import Link from "next/link";
import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { CONTEUDOS_CASES } from "@/lib/constants/site-data";

export function CasesResultsSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Cases e resultados operacionais
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Resultados validados em ambiente produtivo da Rede Terus — métricas
            reais de digitalização, eficiência e crescimento financeiro.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-1">
          {CONTEUDOS_CASES.map((content) => (
            <div
              key={content.slug}
              className="rounded-lg border border-surface-border bg-surface-base p-8 lg:p-10"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-caption capitalize">
                  {content.category}
                </Badge>
                <Badge variant="secondary" className="text-caption">
                  ERP: {content.erp}
                </Badge>
              </div>

              <h3 className="mt-4 font-display text-heading-lg font-bold text-brand-primary">
                {content.title}
              </h3>
              <p className="mt-3 text-body-md text-text-secondary">
                {content.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-md border border-surface-border bg-surface-elevated-1 p-4">
                  <p className="text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                    Desafio
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {content.challenge}
                  </p>
                </div>
                <div className="rounded-md border border-surface-border bg-surface-elevated-1 p-4">
                  <p className="text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                    Implementação
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {content.implementation}
                  </p>
                </div>
                <div className="rounded-md border border-brand-primary/20 bg-brand-primary-dim/30 p-4">
                  <p className="text-caption font-semibold uppercase tracking-wider text-brand-dark">
                    Resultados
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {content.results}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <CtaButtons size="md" showSecondary={false} />
                <Link
                  href="/cases"
                  className="text-body-sm font-medium text-brand-primary hover:underline"
                >
                  Ver case completo com indicadores →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
