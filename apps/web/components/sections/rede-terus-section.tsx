import Image from "next/image";
import { Container } from "@/components/layout/container";
import { REDE_TERUS } from "@/lib/constants/site-data";

export function RedeTerusSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <div className="mt-16 space-y-16">
          <div className="text-center">
            <p className="font-display text-display-lg font-bold text-brand-primary">
              +20 empresas conectadas
            </p>
            <p className="mt-2 text-body-md text-text-secondary">
              Varejos e distribuidores integrados à jornada operacional Terus
            </p>
          </div>

          <div>
            <h3 className="font-display text-heading-lg font-semibold text-text-primary">
              Varejos
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {REDE_TERUS.varejos.map((varejo) => (
                <div
                  key={varejo.name}
                  className="rounded-2xl border border-surface-border bg-surface-base h-44 p-6 flex flex-col items-center justify-center hover:shadow-card hover:border-brand-primary/20 transition-all duration-300"
                >
                  {varejo.logos.primary ? (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                      <div className="relative w-full h-20 flex items-center justify-center overflow-hidden">
                        <Image
                          src={varejo.logos.primary}
                          alt={varejo.name}
                          width={180}
                          height={80}
                          className="object-contain max-h-16 w-auto filter-none"
                        />
                      </div>
                      <span className="text-body-sm font-medium text-text-secondary text-center truncate w-full">
                        {varejo.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-center">
                      <span className="font-display text-body-md font-semibold text-text-primary">
                        {varejo.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-heading-lg font-semibold text-text-primary">
              Distribuidores
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {REDE_TERUS.distribuidores.map((distribuidor) => (
                <div
                  key={distribuidor.name}
                  className="rounded-2xl border border-surface-border bg-surface-base h-44 p-6 flex flex-col items-center justify-center hover:shadow-card hover:border-brand-primary/20 transition-all duration-300"
                >
                  {distribuidor.logos.primary ? (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                      <div className="relative w-full h-20 flex items-center justify-center overflow-hidden">
                        <Image
                          src={distribuidor.logos.primary}
                          alt={distribuidor.name}
                          width={180}
                          height={80}
                          className="object-contain max-h-16 w-auto filter-none"
                        />
                      </div>
                      <span className="text-body-sm font-medium text-text-secondary text-center truncate w-full">
                        {distribuidor.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-center">
                      <span className="font-display text-body-md font-semibold text-text-primary">
                        {distribuidor.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
