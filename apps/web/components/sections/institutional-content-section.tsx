import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { PLATFORM_PILLARS } from "@/lib/constants/site";

export function InstitutionalContentSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Jornada operacional da plataforma
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Da conexão com o ERP à operação contínua — cinco pilares que
            estruturam a proposta de valor da Terus Platform.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_PILLARS.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={Math.min(index, 7) * 70}
              className="card-interactive rounded-xl border border-surface-border bg-surface-elevated-1 p-8"
            >
              <span className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-heading-md font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-3 text-body-md text-text-secondary">
                {pillar.description}
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
