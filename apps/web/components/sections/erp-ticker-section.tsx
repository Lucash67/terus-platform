import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import {
  ERP_ECOSYSTEM,
  type ErpEcosystemItem,
} from "@/lib/constants/site-data";

function ErpChip({ erp }: { erp: ErpEcosystemItem }) {
  const varejo = erp.side === "varejo";

  return (
    <div className="group flex w-72 shrink-0 items-center gap-4 rounded-xl border border-brand-primary/35 bg-brand-primary/5 px-5 py-4 transition-all duration-300 hover:shadow-glow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-surface-border bg-surface-elevated-2 font-display text-heading-md font-bold text-brand-primary">
        {erp.logo ? (
          <Image
            src={erp.logo}
            alt={erp.name}
            width={44}
            height={44}
            className="h-full w-full bg-white object-contain p-1"
          />
        ) : (
          erp.name.slice(0, 1)
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-body-md font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
          {erp.name}
        </p>
        <p className="truncate font-mono text-caption uppercase tracking-wider text-text-tertiary">
          {erp.vendor}
        </p>
      </div>
      <span
        className={[
          "shrink-0 rounded-full px-2 py-0.5 font-mono text-caption uppercase tracking-wider",
          varejo
            ? "bg-status-success-dim text-status-success"
            : "bg-brand-primary-dim text-brand-primary",
        ].join(" ")}
      >
        {varejo ? "Varejo" : "Fornec."}
      </span>
    </div>
  );
}

function TickerRow({
  items,
  reverse = false,
}: {
  items: ErpEcosystemItem[];
  reverse?: boolean;
}) {
  return (
    <div
      className={[
        "tr-ticker flex w-max gap-5 pr-5",
        reverse ? "tr-ticker-reverse" : "tr-ticker-fast",
      ].join(" ")}
    >
      {[...items, ...items].map((erp, index) => (
        <ErpChip key={`${erp.name}-${index}`} erp={erp} />
      ))}
    </div>
  );
}

/**
 * Ticker duplo de ERPs — fileira do varejo e fileira do fornecedor,
 * deslizando em direções opostas. Pausa no hover.
 */
export function ErpTickerSection() {
  const rowA = ERP_ECOSYSTEM.filter((erp) => erp.side === "varejo");
  const fornecedor = ERP_ECOSYSTEM.filter((erp) => erp.side === "fornecedor");
  const rowB = [...fornecedor, ...fornecedor];

  return (
    <section className="section-rhythm-alt relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Ecossistema ERP
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Funciona com o ERP que você já usa
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Sem trocar de sistema. A Terus lê o ERP da rede e grava o pedido no
            ERP do fornecedor — integrações em produção hoje.
          </p>
        </Reveal>
      </Container>

      <Reveal variant="scale" delay={120}>
        <div className="tr-ticker-wrap relative mt-12 space-y-5 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-base to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-base to-transparent"
            aria-hidden="true"
          />
          <div className="overflow-hidden">
            <TickerRow items={rowA} />
          </div>
          <div className="overflow-hidden">
            <TickerRow items={rowB} reverse />
          </div>
        </div>
      </Reveal>

      <Container className="relative">
        <Reveal delay={200} className="mt-10 text-center">
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            <span className="text-status-success">Varejo</span> captura do ERP
            da rede · <span className="text-brand-primary">Fornec.</span> pedido
            gravado no ERP do fornecedor
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
