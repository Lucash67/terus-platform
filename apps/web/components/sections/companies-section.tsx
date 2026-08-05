import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { EMPRESAS_CLIENTES } from "@/lib/constants/site-data";

function LogoChip({ name, logo }: { name: string; logo: string | null }) {
  return (
    <div className="flex w-40 shrink-0 flex-col items-center gap-2.5">
      <div className="tr-logo-chip h-20 w-full px-4 py-3">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={140}
            height={56}
            className="max-h-14 w-auto object-contain"
          />
        ) : (
          <span className="font-display text-body-sm font-bold text-brand-dark">
            {name}
          </span>
        )}
      </div>
      <span className="w-full truncate text-center text-caption text-text-tertiary">
        {name}
      </span>
    </div>
  );
}

export function CompaniesSection() {
  const companies = EMPRESAS_CLIENTES.filter(
    (company) => company.logos.primary,
  );

  return (
    <section className="section-rhythm relative overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Empresas que operam com a Terus
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Confiança validada pelo mercado
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Varejos e distribuidores integrados à jornada operacional Terus —
            credibilidade construída em operação real.
          </p>
        </Reveal>
      </Container>

      {/* Ticker contínuo de logos — pausa no hover */}
      <Reveal variant="scale" delay={150}>
        <div className="tr-ticker-wrap relative mt-14 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-base to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-base to-transparent"
            aria-hidden="true"
          />
          <div className="tr-ticker flex w-max gap-8 pr-8">
            {[...companies, ...companies].map((company, index) => (
              <LogoChip
                key={`${company.name}-${index}`}
                name={company.name}
                logo={company.logos.primary}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
