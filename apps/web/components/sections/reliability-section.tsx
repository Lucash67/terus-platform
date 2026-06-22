import { Container } from "@/components/layout/container";
import { CERTIFICACOES } from "@/lib/constants/site-data";

export function ReliabilitySection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Confiabilidade
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Confiabilidade para operações críticas
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            A estrutura abaixo foi preparada para exibir informações de
            disponibilidade, segurança, conformidade e suporte da Terus
            Platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICACOES.map((cert) => (
            <div
              key={cert.name}
              className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
            >
              {cert.logo ? (
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="mx-auto h-12 w-auto"
                />
              ) : (
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {cert.name}
                </h3>
              )}
              <p className="mt-4 text-body-sm text-text-secondary">
                {cert.issuer}
              </p>
              <p className="mt-2 text-body-md text-text-secondary">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
