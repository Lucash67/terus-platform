import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { ECOSYSTEM_PARTNERS } from "@/lib/constants/site";

interface EcosystemSectionProps {
  showCta?: boolean;
}

export function EcosystemSection({ showCta = true }: EcosystemSectionProps) {
  return (
    <section className="section-rhythm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Integração horizontal em toda a cadeia
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A Terus conecta cada elo — do ERP à operação de loja — com
            integrações homologadas e execução coordenada.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {ECOSYSTEM_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="card-interactive rounded-xl border border-surface-border bg-surface-base p-8"
            >
              <span className="inline-block rounded-md bg-brand-primary-dim px-2.5 py-1 text-caption font-medium text-brand-primary">
                {partner.category}
              </span>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                {partner.name}
              </h3>
              <p className="mt-2 text-body-md text-text-secondary">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {showCta && <CtaButtons className="mt-12" />}
      </Container>
    </section>
  );
}
