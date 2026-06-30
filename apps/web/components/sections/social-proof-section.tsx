import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { CASES_DE_SUCESSO, DEPOIMENTOS } from "@/lib/constants/site-data";

export function SocialProofSection() {
  const hasTestimonials = DEPOIMENTOS.length > 0;

  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Prova Social
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Resultados validados em operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores operacionais comprovados em ambiente produtivo da Rede
            Terus — crescimento de receita, digitalização e execução rastreada.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-surface-border bg-surface-base p-8">
            <h3 className="font-display text-heading-md font-semibold text-brand-primary">
              Resultados Reais
            </h3>
            <p className="mt-4 text-body-md text-text-secondary">
              Indicadores operacionais validados em ambiente produtivo
              demonstram crescimento de receita, aumento do ticket médio e
              melhoria significativa na execução operacional.
            </p>
            <p className="mt-4">
              <Link
                href="/cases"
                className="text-body-sm font-medium text-brand-primary hover:underline"
              >
                Ver case completo →
              </Link>
            </p>
          </div>

          {CASES_DE_SUCESSO.map((caseStudy) => (
            <div
              key={caseStudy.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8"
            >
              <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                {caseStudy.title}
              </h3>
              <p className="mt-2 text-body-sm font-medium text-text-secondary">
                {caseStudy.company}
              </p>
              <p className="mt-4 text-body-md text-text-secondary">
                {caseStudy.description}
              </p>
              <p className="mt-4 rounded-md bg-brand-primary-dim/50 px-3 py-2 text-body-sm font-medium text-brand-dark">
                {caseStudy.results}
              </p>
            </div>
          ))}
        </div>

        {hasTestimonials ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPOIMENTOS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-lg border border-surface-border bg-surface-base p-8"
              >
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : null}
                  <div>
                    <h3 className="font-display text-heading-sm font-semibold text-text-primary">
                      {testimonial.name}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {testimonial.role}
                    </p>
                    <p className="text-body-sm text-text-secondary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-body-md text-text-secondary">
                  {testimonial.testimonial}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <CtaButtons className="mt-16" />
      </Container>
    </section>
  );
}
