import { Container } from "@/components/layout/container";
import { EMPRESAS_CLIENTES } from "@/lib/constants/site-data";

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {EMPRESAS_CLIENTES.map((company) => (
              <div
                key={company.name}
                className="rounded-lg border border-surface-border bg-surface-base h-32 p-6 flex flex-col items-center justify-center hover:shadow-sm hover:border-brand-primary/20 transition-all duration-300"
              >
                {company.logos.primary ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="h-12 w-full flex items-center justify-center">
                      <img
                        src={company.logos.primary}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain filter-none"
                      />
                    </div>
                    <span className="text-body-sm font-medium text-text-secondary mt-2 text-center truncate w-full">
                      {company.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-center">
                    <span className="font-display text-body-md font-semibold text-text-primary">
                      {company.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
