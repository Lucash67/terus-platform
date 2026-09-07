"use client";

import * as React from "react";

import { Reveal } from "@/components/motion/reveal";

const HUB = {
  id: "terus",
  label: "Terus",
  sublabel: "Inteligência",
  detail: "Alert · Order · Pulse",
  x: 400,
  y: 150,
} as const;

const SPOKES: {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  x: number;
  y: number;
  path: string;
}[] = [
  {
    id: "varejo",
    label: "Varejo",
    sublabel: "Lojas · ERP",
    detail: "Alertas · ruptura · demanda",
    x: 400,
    y: 48,
    path: "M400 118 L400 84",
  },
  {
    id: "distribuidor",
    label: "Distribuidor",
    sublabel: "Rede logística",
    detail: "Pedidos · SLA · reposição",
    x: 120,
    y: 210,
    path: "M340 168 L180 198",
  },
  {
    id: "industria",
    label: "Indústria",
    sublabel: "Fornecedores",
    detail: "Produção · abastecimento",
    x: 680,
    y: 210,
    path: "M460 168 L620 198",
  },
];

/**
 * Diagrama hub-and-spoke: Terus no centro envia inteligência
 * para Varejo, Distribuidor e Indústria.
 */
export function SupplyChainFlow() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal variant="scale" delay={80} className="mt-14">
      <div
        ref={ref}
        className={[
          "tr-flow relative overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-1/70 p-6 sm:p-10",
          active ? "is-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div className="relative mb-8 text-center sm:mb-10">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Fluxo da cadeia
          </p>
          <h3 className="mt-2 font-display text-heading-lg font-bold text-text-primary sm:text-heading-xl">
            A Terus no centro — inteligência para toda a cadeia
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-body-md text-text-secondary">
            Do hub da plataforma saem alertas, pedidos e sinais operacionais
            para varejo, distribuição e indústria — em tempo real.
          </p>
        </div>

        {/* Desktop / tablet SVG hub */}
        <div
          className="relative mx-auto hidden max-w-4xl md:block"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 800 300"
            className="h-auto w-full"
            role="img"
            aria-label="Terus no centro enviando para varejo, distribuidor e indústria"
          >
            {SPOKES.map((spoke) => (
              <path
                key={`path-${spoke.id}`}
                d={spoke.path}
                fill="none"
                stroke="var(--surface-border)"
                strokeWidth="2"
              />
            ))}

            {active
              ? SPOKES.map((spoke, index) => (
                  <React.Fragment key={`pkt-${spoke.id}`}>
                    <circle r="4" fill="var(--brand-primary)">
                      <animateMotion
                        dur="2.2s"
                        begin={`${index * 0.35}s`}
                        repeatCount="indefinite"
                        path={spoke.path}
                      />
                    </circle>
                    <circle r="3" fill="var(--brand-primary)" opacity="0.55">
                      <animateMotion
                        dur="2.2s"
                        begin={`${index * 0.35 + 0.9}s`}
                        repeatCount="indefinite"
                        path={spoke.path}
                      />
                    </circle>
                  </React.Fragment>
                ))
              : null}

            {/* Hub Terus */}
            <g className="tr-flow-node" style={{ transitionDelay: "60ms" }}>
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r="52"
                className="tr-flow-ring"
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="1.5"
              />
              <rect
                x={HUB.x - 56}
                y={HUB.y - 40}
                width="112"
                height="80"
                rx="16"
                fill="color-mix(in srgb, var(--brand-primary) 12%, var(--surface-elevated-2))"
                stroke="var(--brand-primary)"
                strokeWidth="1.5"
              />
              <text
                x={HUB.x}
                y={HUB.y - 6}
                textAnchor="middle"
                fill="var(--text-primary)"
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                {HUB.label}
              </text>
              <text
                x={HUB.x}
                y={HUB.y + 14}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                style={{ fontSize: 10, letterSpacing: "0.08em" }}
              >
                {HUB.sublabel.toUpperCase()}
              </text>
            </g>

            {SPOKES.map((spoke, index) => (
              <g
                key={spoke.id}
                className="tr-flow-node"
                style={{ transitionDelay: `${140 + index * 90}ms` }}
              >
                <rect
                  x={spoke.x - 58}
                  y={spoke.y - 28}
                  width="116"
                  height="56"
                  rx="14"
                  fill="var(--surface-elevated-2)"
                  stroke="var(--surface-border)"
                  strokeWidth="1"
                />
                <text
                  x={spoke.x}
                  y={spoke.y - 2}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  style={{ fontSize: 14, fontWeight: 600 }}
                >
                  {spoke.label}
                </text>
                <text
                  x={spoke.x}
                  y={spoke.y + 16}
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  style={{ fontSize: 10, letterSpacing: "0.06em" }}
                >
                  {spoke.sublabel.toUpperCase()}
                </text>
                <text
                  x={spoke.x}
                  y={spoke.y + 48}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  style={{ fontSize: 11 }}
                >
                  {spoke.detail}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Mobile — hub no topo, três receptores abaixo */}
        <div className="relative space-y-3 md:hidden" aria-hidden="true">
          <div className="rounded-xl border border-brand-primary bg-brand-primary/10 px-4 py-4 text-center tr-glow-ring">
            <p className="font-display text-heading-md font-semibold text-text-primary">
              {HUB.label}
            </p>
            <p className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-tertiary">
              {HUB.sublabel}
            </p>
            <p className="mt-1 text-body-sm text-text-secondary">
              {HUB.detail}
            </p>
          </div>

          <p className="text-center font-mono text-caption uppercase tracking-widest text-brand-primary">
            envia para
          </p>

          {SPOKES.map((spoke) => (
            <div key={spoke.id}>
              <div className="flex justify-center">
                <div className="tr-flow-mobile-line relative h-8 w-px bg-surface-border">
                  <span className="tr-flow-mobile-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-primary" />
                </div>
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-elevated-2 px-4 py-4 text-center">
                <p className="font-display text-heading-md font-semibold text-text-primary">
                  {spoke.label}
                </p>
                <p className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {spoke.sublabel}
                </p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  {spoke.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="relative mt-8 text-center font-mono text-caption uppercase tracking-widest text-text-tertiary">
          Terus → Varejo · Distribuidor · Indústria
        </p>
      </div>
    </Reveal>
  );
}
