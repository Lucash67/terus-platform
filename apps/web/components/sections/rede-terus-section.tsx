import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { REDE_TERUS } from "@/lib/constants/site-data";

interface NetworkCompany {
  name: string;
  logos: { primary: string | null };
}

function NetworkGrid({
  title,
  badge,
  companies,
}: {
  title: string;
  badge: string;
  companies: NetworkCompany[];
}) {
  return (
    <div>
      <Reveal className="flex items-baseline gap-3">
        <h3 className="font-display text-heading-lg font-semibold text-text-primary">
          {title}
        </h3>
        <span className="rounded-full bg-brand-primary-dim px-2.5 py-0.5 text-caption font-semibold text-brand-primary">
          {badge}
        </span>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {companies.map((company, index) => (
          <Reveal
            key={company.name}
            variant="scale"
            delay={Math.min(index, 8) * 60}
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-surface-border bg-surface-elevated-1 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-elevated"
          >
            <div className="tr-logo-chip h-16 w-full px-3 py-2">
              {company.logos.primary ? (
                <Image
                  src={company.logos.primary}
                  alt={company.name}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-body-sm font-bold text-brand-dark">
                  {company.name}
                </span>
              )}
            </div>
            <span className="w-full truncate text-center text-caption text-text-tertiary transition-colors group-hover:text-text-secondary">
              {company.name}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function RedeTerusSection() {
  return (
    <section className="section-rhythm-alt relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Rede Terus
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Empresas que fazem parte da Rede Terus
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A Terus conecta varejos e distribuidores em uma jornada operacional
            integrada, formando uma rede preparada para monitorar, executar e
            evoluir operações em escala.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={120} className="mt-12 text-center">
          <p className="font-display text-display-lg font-bold text-brand-primary">
            +20 empresas conectadas
          </p>
          <p className="mt-2 text-body-md text-text-secondary">
            Varejos e distribuidores integrados à jornada operacional Terus
          </p>
        </Reveal>

        <div className="mt-14 space-y-14">
          <NetworkGrid
            title="Varejos"
            badge={`${REDE_TERUS.varejos.length} operações`}
            companies={REDE_TERUS.varejos}
          />
          <NetworkGrid
            title="Distribuidores"
            badge={`${REDE_TERUS.distribuidores.length} operações`}
            companies={REDE_TERUS.distribuidores}
          />
        </div>

        <Reveal delay={100}>
          <CtaButtons className="mt-16" />
        </Reveal>
      </Container>
    </section>
  );
}
