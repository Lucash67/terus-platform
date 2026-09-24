import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { POSITIONING_POINTS } from "@/lib/constants/site";

export function EducationalContentSection() {
  return (
    <section className="section-rhythm-alt relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Inteligência da Cadeia de Suprimentos na prática
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Três capacidades centrais que diferenciam a Terus de ferramentas
            genéricas de integração e BI.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSITIONING_POINTS.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 70}
              className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8"
            >
              <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                {point.title}
              </h3>
              <p className="mt-4 text-body-md text-text-secondary">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <CtaButtons className="mt-10" />
        </Reveal>
      </Container>
    </section>
  );
}
