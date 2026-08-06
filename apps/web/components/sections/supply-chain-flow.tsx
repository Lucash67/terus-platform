"use client";

import * as React from "react";

import { Reveal } from "@/components/motion/reveal";

const NODES: {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  x: number;
  highlight?: boolean;
}[] = [
  {
    id: "varejo",
    label: "Varejo",
    sublabel: "Lojas · ERP",
    detail: "Estoque · ruptura · demanda",
    x: 90,
  },
  {
    id: "terus",
    label: "Terus",
    sublabel: "Inteligência",
    detail: "Alert · Order · Pulse",
    x: 400,
    highlight: true,
  },
  {
    id: "industria",
    label: "Indústria",
    sublabel: "Distribuição",
    detail: "Reposição · pedidos · SLA",
    x: 710,
  },
];

/**
 * Diagrama animado do fluxo varejo → Terus → indústria/distribuição.
 * Dados viajam pelos caminhos SVG; ativação sob scroll.
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
            Sinais do varejo viram ação na indústria
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-body-md text-text-secondary">
            A Terus fica no centro: lê o ERP, decide em tempo real e dispara
            reposição no elo certo — sem planilha e sem telefone.
          </p>
        </div>

        {/* Desktop / tablet SVG */}
        <div
          className="relative mx-auto hidden max-w-4xl md:block"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 800 220"
            className="h-auto w-full"
            role="img"
            aria-label="Fluxo varejo, Terus e indústria"
          >
            {/* Paths */}
            <path
              className="tr-flow-path"
              d="M150 90 C 220 90, 270 90, 340 90"
              fill="none"
              stroke="var(--surface-border)"
              strokeWidth="2"
            />
            <path
              className="tr-flow-path tr-flow-path-delay"
              d="M460 90 C 530 90, 580 90, 650 90"
              fill="none"
              stroke="var(--surface-border)"
              strokeWidth="2"
            />

            {active ? (
              <>
                <circle
                  r="4"
                  className="tr-flow-packet"
                  fill="var(--brand-primary)"
                >
                  <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    path="M150 90 C 220 90, 270 90, 340 90"
                  />
                </circle>
                <circle
                  r="3"
                  className="tr-flow-packet"
                  fill="var(--brand-primary)"
                  opacity="0.65"
                >
                  <animateMotion
                    dur="2.4s"
                    begin="0.8s"
                    repeatCount="indefinite"
                    path="M150 90 C 220 90, 270 90, 340 90"
                  />
                </circle>
                <circle
                  r="4"
                  className="tr-flow-packet"
                  fill="var(--status-success)"
                >
                  <animateMotion
                    dur="2.4s"
                    begin="0.4s"
                    repeatCount="indefinite"
                    path="M460 90 C 530 90, 580 90, 650 90"
                  />
                </circle>
                <circle
                  r="3"
                  className="tr-flow-packet"
                  fill="var(--status-success)"
                  opacity="0.65"
                >
                  <animateMotion
                    dur="2.4s"
                    begin="1.2s"
                    repeatCount="indefinite"
                    path="M460 90 C 530 90, 580 90, 650 90"
                  />
                </circle>
              </>
            ) : null}

            <text
              x="245"
              y="72"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              style={{ fontSize: 11, letterSpacing: "0.08em" }}
            >
              SINAIS · ESTOQUE
            </text>
            <text
              x="555"
              y="72"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              style={{ fontSize: 11, letterSpacing: "0.08em" }}
            >
              PEDIDOS · ALERTAS
            </text>

            {NODES.map((node, index) => (
              <g
                key={node.id}
                className="tr-flow-node"
                style={{ transitionDelay: `${80 + index * 100}ms` }}
              >
                {node.highlight ? (
                  <circle
                    cx={node.x}
                    cy="90"
                    r="42"
                    className="tr-flow-ring"
                    fill="none"
                    stroke="var(--brand-primary)"
                    strokeWidth="1.5"
                  />
                ) : null}
                <rect
                  x={node.x - 48}
                  y="54"
                  width="96"
                  height="72"
                  rx="14"
                  fill={
                    node.highlight
                      ? "color-mix(in srgb, var(--brand-primary) 12%, var(--surface-elevated-2))"
                      : "var(--surface-elevated-2)"
                  }
                  stroke={
                    node.highlight
                      ? "var(--brand-primary)"
                      : "var(--surface-border)"
                  }
                  strokeWidth={node.highlight ? 1.5 : 1}
                />
                <text
                  x={node.x}
                  y="84"
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  style={{ fontSize: 15, fontWeight: 600 }}
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y="104"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  style={{ fontSize: 10, letterSpacing: "0.08em" }}
                >
                  {node.sublabel.toUpperCase()}
                </text>
                <text
                  x={node.x}
                  y="160"
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  style={{ fontSize: 12 }}
                >
                  {node.detail}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Mobile stack */}
        <div className="relative space-y-3 md:hidden" aria-hidden="true">
          {NODES.map((node, index) => (
            <React.Fragment key={node.id}>
              <div
                className={[
                  "rounded-xl border px-4 py-4 text-center transition-colors",
                  node.highlight
                    ? "border-brand-primary bg-brand-primary/10 tr-glow-ring"
                    : "border-surface-border bg-surface-elevated-2",
                ].join(" ")}
              >
                <p className="font-display text-heading-md font-semibold text-text-primary">
                  {node.label}
                </p>
                <p className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {node.sublabel}
                </p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  {node.detail}
                </p>
              </div>
              {index < NODES.length - 1 ? (
                <div className="flex justify-center">
                  <div className="tr-flow-mobile-line relative h-8 w-px bg-surface-border">
                    <span className="tr-flow-mobile-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-primary" />
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        <p className="relative mt-8 text-center font-mono text-caption uppercase tracking-widest text-text-tertiary">
          Varejo → Terus → Indústria &amp; Distribuição · loop contínuo
        </p>
      </div>
    </Reveal>
  );
}
