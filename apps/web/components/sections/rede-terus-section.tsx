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
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {REDE_TERUS.varejos.map((varejo) => (
                <div
                  key={varejo.name}
                  className="rounded-lg border border-surface-border bg-surface-base p-6"
                >
                  {varejo.logo ? (
                    <img
                      src={varejo.logo}
                      alt={varejo.name}
                      className="h-12 w-auto"
                    />
                  ) : null}
                  <p className="font-display text-body-md font-semibold text-text-primary">
                    {varejo.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-heading-lg font-semibold text-text-primary">
              Distribuidores
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {REDE_TERUS.distribuidores.map((distribuidor) => (
                <div
                  key={distribuidor.name}
                  className="rounded-lg border border-surface-border bg-surface-base p-6"
                >
                  {distribuidor.logo ? (
                    <img
                      src={distribuidor.logo}
                      alt={distribuidor.name}
                      className="h-12 w-auto"
                    />
                  ) : null}
                  <p className="font-display text-body-md font-semibold text-text-primary">
                    {distribuidor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
