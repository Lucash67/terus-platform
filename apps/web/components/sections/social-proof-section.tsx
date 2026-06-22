import { Container } from "@/components/layout/container";

export function SocialProofSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Prova Social
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Resultados validados pela operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Cases, depoimentos e resultados operacionais. Informações
            disponíveis conforme disponibilidade dos dados operacionais.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <h3 className="font-display text-heading-md font-semibold text-brand-primary">
              Cases de Sucesso
            </h3>
            <p className="mt-4 text-body-md text-text-secondary">
              Seção preparada para exibir cases de clientes
            </p>
          </div>
          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <h3 className="font-display text-heading-md font-semibold text-brand-primary">
              Depoimentos
            </h3>
            <p className="mt-4 text-body-md text-text-secondary">
              Seção preparada para exibir depoimentos de clientes
            </p>
          </div>
          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <h3 className="font-display text-heading-md font-semibold text-brand-primary">
              Resultados Operacionais
            </h3>
            <p className="mt-4 text-body-md text-text-secondary">
              Seção preparada para exibir resultados operacionais
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
