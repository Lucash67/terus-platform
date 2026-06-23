import { CtaSection } from "@/components/sections/cta-section";
import { CONTEUDOS_CASES } from "@/lib/constants/site-data";

export const metadata = {
  title: "Cases | Terus Platform",
  description:
    "Cases de sucesso e resultados operacionais validados em ambiente produtivo da Rede Terus.",
};

export default function CasesPage() {
  const realCase = CONTEUDOS_CASES.find((c) => c.challenge);

  return (
    <>
      <section className="border-t border-surface-border bg-surface-elevated-1">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Cases
          </p>
          <h1 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Cases de Sucesso
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary">
            Resultados operacionais validados em ambiente produtivo da Rede
            Terus.
          </p>
        </div>
      </section>

      {realCase && (
        <>
          <section className="border-t border-surface-border">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
              <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
                {realCase.title}
              </h2>
            </div>
          </section>

          <section className="border-t border-surface-border bg-surface-elevated-1">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
              <h3 className="font-display text-heading-lg font-semibold text-brand-primary">
                Desafio
              </h3>
              <p className="mt-4 text-body-lg text-text-secondary">
                {realCase.challenge}
              </p>
            </div>
          </section>

          <section className="border-t border-surface-border">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
              <h3 className="font-display text-heading-lg font-semibold text-brand-primary">
                Implementação
              </h3>
              <p className="mt-4 text-body-lg text-text-secondary">
                {realCase.implementation}
              </p>
            </div>
          </section>

          <section className="border-t border-surface-border bg-surface-elevated-1">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
              <h3 className="font-display text-heading-lg font-semibold text-brand-primary">
                Resultados
              </h3>
              <p className="mt-4 text-body-lg text-text-secondary">
                {realCase.results}
              </p>
            </div>
          </section>

          <section className="border-t border-surface-border">
            <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
              <h3 className="font-display text-heading-lg font-semibold text-brand-primary">
                Indicadores
              </h3>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Digitalização do Canal
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    0% → até 96%
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Ticket Médio
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    R$ 1.740 → R$ 2.338
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Receita Processada
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    R$ 11,6 mi → R$ 16,0 mi
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Pedidos Rastreáveis
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    31.881
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Rejeição ERP
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    35% → 0,5%
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <p className="font-display text-body-sm font-semibold text-text-secondary">
                    Fill Rate
                  </p>
                  <p className="mt-2 font-display text-display-md font-bold text-brand-primary">
                    40% → 96%
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <CtaSection />
    </>
  );
}
