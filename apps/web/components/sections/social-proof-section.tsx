import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { SOCIAL_PROOF } from "@/lib/constants/copy";
import { CASES_DE_SUCESSO, DEPOIMENTOS } from "@/lib/constants/site-data";

export function SocialProofSection() {
  const hasTestimonials = DEPOIMENTOS.length > 0;

  return (
    <section className="section-rhythm-alt">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {SOCIAL_PROOF.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            {SOCIAL_PROOF.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {SOCIAL_PROOF.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CASES_DE_SUCESSO.map((caseStudy) => (
            <div
              key={caseStudy.title}
              className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8"
            >
              <h3 className="font-display text-heading-md font-semibold text-text-primary">
                {caseStudy.title}
              </h3>
              <p className="mt-2 text-body-sm font-medium text-text-secondary">
                {caseStudy.company}
              </p>
              <p className="mt-4 text-body-md leading-relaxed text-text-secondary">
                {caseStudy.description}
              </p>
              <p className="mt-4 rounded-lg bg-brand-primary-dim/50 px-4 py-3 text-body-sm font-medium text-brand-dark">
                {caseStudy.results}
              </p>
              <p className="mt-4">
                <Link
                  href="/cases"
                  className="text-body-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover hover:underline"
                >
                  Ver case completo →
                </Link>
              </p>
            </div>
          ))}
        </div>

        {hasTestimonials ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPOIMENTOS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8"
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

        <CtaButtons className="mt-12" />
      </Container>
    </section>
  );
}
