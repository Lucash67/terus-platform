import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { ECOSYSTEM_PARTNERS } from "@/lib/constants/site";

interface EcosystemSectionProps {
  showCta?: boolean;
}

export function EcosystemSection({ showCta = true }: EcosystemSectionProps) {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Integração horizontal em toda a cadeia
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A Terus conecta cada elo — do ERP à operação de loja — com
            integrações homologadas e execução coordenada.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {ECOSYSTEM_PARTNERS.map((partner, index) => (
            <Reveal
              key={partner.name}
              variant="scale"
              delay={Math.min(index * 70, 490)}
              className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-8"
            >
              <span className="inline-block rounded-md bg-brand-primary-dim px-2.5 py-1 font-mono text-caption font-medium uppercase tracking-wider text-brand-primary">
                {partner.category}
              </span>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary transition-colors duration-300 group-hover:text-brand-primary">
                {partner.name}
              </h3>
              <p className="mt-2 text-body-md text-text-secondary">
                {partner.description}
              </p>
            </Reveal>
          ))}
        </div>

        {showCta && (
          <Reveal delay={120}>
            <CtaButtons className="mt-12" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
