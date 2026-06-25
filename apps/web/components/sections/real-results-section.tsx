import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Button } from "@terus/ui";

export function RealResultsSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Resultados Reais
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Resultados reais em operação
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Indicadores validados em ambiente produtivo da Rede Terus.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <p className="font-display text-body-sm font-semibold text-text-secondary">
              Digitalização do Canal
            </p>
            <p className="mt-4 font-display text-body-md text-text-secondary">
              0%
            </p>
            <p className="mt-2 font-display text-display-lg font-bold text-brand-primary">
              até 96%
            </p>
            <p className="mt-2 text-body-sm text-text-secondary">
              Pedidos realizados digitalmente através da operação Terus.
            </p>
          </div>

          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <p className="font-display text-body-sm font-semibold text-text-secondary">
              Ticket Médio
            </p>
            <p className="mt-4 font-display text-body-md text-text-secondary">
              R$ 1.740
            </p>
            <p className="mt-2 font-display text-display-lg font-bold text-brand-primary">
              R$ 2.338
            </p>
            <p className="mt-2 text-body-sm text-text-secondary">
              +34% de crescimento no valor médio por pedido.
            </p>
          </div>

          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <p className="font-display text-body-sm font-semibold text-text-secondary">
              Receita Processada
            </p>
            <p className="mt-4 font-display text-body-md text-text-secondary">
              R$ 11,6 mi
            </p>
            <p className="mt-2 font-display text-display-lg font-bold text-brand-primary">
              R$ 16,0 mi
            </p>
            <p className="mt-2 text-body-sm text-text-secondary">
              +38% de crescimento financeiro no mesmo horizonte operacional.
            </p>
          </div>

          <div className="rounded-lg border border-surface-border bg-surface-base p-8 text-center">
            <p className="font-display text-body-sm font-semibold text-text-secondary">
              Rastreabilidade
            </p>
            <p className="mt-4 font-display text-display-lg font-bold text-brand-primary">
              31.881 pedidos
            </p>
            <p className="mt-2 text-body-sm text-text-secondary">
              Auditoria ponta a ponta entre varejo, Terus e ERP.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-body-md text-text-secondary">
            Resultados validados em ambiente produtivo da Rede Terus.
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/cases">Ver case completo</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
