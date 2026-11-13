"use client";

import * as React from "react";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { InView, Kicker, KineticText } from "@/components/motion/xp";
import { PONTE_FORNECEDOR } from "@/lib/constants/lp";

/**
 * Blocos do menu do portal, lado a lado. Fonte: wiki.terus.tec.br/varejo/tec
 * ("Produtos do menu"), lido em 12/11/2026.
 */
const PORTAL_BLOCKS: { name: string; varejo: string; fornecedor: string }[] = [
  {
    name: "Alertas",
    varejo: "Painel de alertas, Mesa do comprador, Atividades, Resumo do dia",
    fornecedor: "Painel de alertas",
  },
  {
    name: "Pedidos",
    varejo:
      "Pedido de reposição, aprovação de devoluções, fornecedores conectados",
    fornecedor:
      "Pedidos do varejo, negociação, sell-out/sell-in, devoluções, catálogo, de-para",
  },
  {
    name: "Unitização e expedição",
    varejo: "Rastreamento de cargas e etiquetas (se ativo)",
    fornecedor:
      "Rastreamento de cargas, separação, etiquetas, parâmetros do CD",
  },
  {
    name: "Execução em loja",
    varejo: "Relatórios de execução na loja",
    fornecedor: "Mesmos relatórios operacionais",
  },
  {
    name: "Inteligência comercial",
    varejo: "Metas, vendas, compras, estoques, comportamento",
    fornecedor: "Vendas, compras, estoques e comportamento do varejo parceiro",
  },
  {
    name: "Produção própria",
    varejo: "Fabricação e abastecimento das lojas",
    fornecedor: "—",
  },
  {
    name: "Cadeia de abastecimento",
    varejo: "Integração e score de fornecedores",
    fornecedor: "Desempenho no varejo (em Pedidos)",
  },
  {
    name: "Gestão de espaço",
    varejo: "Mapa e medidas de exposição",
    fornecedor: "Mapa e medidas de exposição",
  },
];

type Side = "varejo" | "fornecedor";

export function TwoPortalsSection() {
  const [side, setSide] = React.useState<Side>("varejo");

  return (
    <section className="relative py-24 lg:py-36">
      <Container>
        <InView className="max-w-3xl">
          <Kicker index="05" className="xp-in">
            {PONTE_FORNECEDOR.badge}
          </Kicker>
          <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
            <KineticText text="O mesmo dado." />{" "}
            <KineticText
              text="Dois lados da gôndola."
              delay={200}
              wordClassName="text-brand-primary"
            />
          </h2>
          <p
            className="xp-in mt-6 text-body-lg text-text-secondary"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            A rede entra pelo Portal Varejo; a indústria e o distribuidor, pelo
            Portal Fornecedor. Os blocos do menu são os mesmos — o recorte é que
            muda.
          </p>
        </InView>

        <div
          className="mt-12 inline-flex rounded-full border border-surface-border bg-surface-elevated-1/60 p-1"
          role="tablist"
          aria-label="Escolha o portal"
        >
          {(["varejo", "fornecedor"] as const).map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={side === s}
              onClick={() => setSide(s)}
              className={cn(
                "rounded-full px-6 py-3 text-body-md font-semibold transition-all duration-500",
                side === s
                  ? "bg-brand-primary text-surface-base shadow-glow-sm"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {s === "varejo" ? "Portal Varejo" : "Portal Fornecedor"}
            </button>
          ))}
        </div>

        <ul
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="tabpanel"
        >
          {PORTAL_BLOCKS.map((b, i) => {
            const text = b[side];
            const empty = text === "—";
            return (
              <li
                key={`${b.name}-${side}`}
                className={cn(
                  "xp-pop flex min-h-44 flex-col rounded-3xl border p-6 transition-colors",
                  empty
                    ? "border-dashed border-surface-border opacity-50"
                    : "border-surface-border bg-surface-elevated-1/50 hover:border-brand-primary/40",
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="font-mono text-caption text-text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-heading-md font-semibold text-text-primary">
                  {b.name}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {empty ? "Não se aplica a este lado" : text}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 font-mono text-caption text-text-tertiary">
          Fonte: menu do portal documentado na wiki Terus Varejo.
        </p>

        {/* O pedido atravessando as etapas */}
        <InView className="mt-24 rounded-[32px] border border-surface-border bg-surface-elevated-1/40 p-8 lg:p-12">
          <h3 className="xp-in font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {PONTE_FORNECEDOR.title}
          </h3>
          <p
            className="xp-in mt-4 max-w-3xl text-body-lg text-text-secondary"
            style={{ "--d": "150ms" } as React.CSSProperties}
          >
            {PONTE_FORNECEDOR.description}
          </p>

          <div className="relative mt-12">
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-surface-border lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute inset-0 h-px w-full overflow-visible"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  className="xp-dash stroke-brand-primary"
                  strokeWidth="2"
                />
              </svg>
              <span className="relay-packet absolute -top-2 h-4 w-4 rounded-full bg-brand-primary shadow-glow" />
            </div>
            <ol className="grid gap-6 lg:grid-cols-5">
              {PONTE_FORNECEDOR.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="xp-in relative"
                  style={{ "--d": `${200 + i * 120}ms` } as React.CSSProperties}
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/50 bg-surface-base font-mono text-code-md text-brand-primary">
                    {i + 1}
                  </span>
                  <p className="mt-5 font-mono text-caption uppercase tracking-[0.16em] text-status-success">
                    {s.status}
                  </p>
                  <h4 className="mt-2 font-display text-heading-md font-semibold text-text-primary">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {s.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </InView>
      </Container>
    </section>
  );
}
