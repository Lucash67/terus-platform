import { Container } from "@/components/layout/container";

export function CompaniesSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Empresas que operam com a Terus
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Confiança validada pelo mercado
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Empresas que operam com a Terus Platform. Logos e informações de
            clientes disponíveis mediante autorização.
          </p>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 rounded-lg border border-surface-border bg-surface-base p-12">
            <p className="text-body-md text-text-secondary">
              Seção preparada para exibir logos de clientes
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
