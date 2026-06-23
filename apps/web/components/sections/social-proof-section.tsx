import { Container } from "@/components/layout/container";
import { DEPOIMENTOS, CASES_DE_SUCESSO } from "@/lib/constants/site-data";

export function SocialProofSection() {
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
            A estrutura abaixo foi preparada para exibir casos reais,
            depoimentos e indicadores operacionais da Terus Platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-surface-border bg-surface-base p-8">
            <h3 className="font-display text-heading-md font-semibold text-brand-primary">
              Resultados Reais
            </h3>
            <p className="mt-4 text-body-md text-text-secondary">
              Indicadores operacionais validados em ambiente produtivo
              demonstram crescimento de receita, aumento do ticket médio e
              melhoria significativa na execução operacional.
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
              <p className="mt-2 text-body-sm text-text-secondary">
                {caseStudy.company}
              </p>
              <p className="mt-4 text-body-md text-text-secondary">
                {caseStudy.description}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {caseStudy.results}
              </p>
            </div>
          ))}
        </div>

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
      </Container>
    </section>
  );
}
