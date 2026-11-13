"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import {
  InView,
  KineticText,
  Magnetic,
  prefersReducedMotion,
} from "@/components/motion/xp";
import { CTA } from "@/lib/constants/conversion";
import { ERP_ECOSYSTEM } from "@/lib/constants/site-data";

const COLS = 8;
const ROWS = 4;
const CELLS = COLS * ROWS;

type Cell = "ok" | "gap" | "fixed";

/** Itens fictícios da fila (ilustração). Valores não são de cliente real. */
const QUEUE = [
  { name: "Café 500 g", tag: "PSV", band: "Alto" },
  { name: "Leite integral 1 L", tag: "CAP", band: "Alto" },
  { name: "Biscoito recheado", tag: "PO", band: "Médio" },
  { name: "Detergente 500 ml", tag: "SO", band: "Médio" },
  { name: "Arroz 5 kg", tag: "PSV", band: "Alto" },
  { name: "Molho de tomate", tag: "CAP", band: "Baixo" },
];

const INITIAL_GAPS = [3, 9, 14, 20, 27];

function initialShelf(): Cell[] {
  return Array.from({ length: CELLS }, (_, i) =>
    INITIAL_GAPS.includes(i) ? "gap" : "ok",
  );
}

/** Prateleira animada: lacunas (ruptura) aparecem e são corrigidas uma a uma. */
function LivingShelf() {
  const [cells, setCells] = React.useState<Cell[]>(initialShelf);
  const [fixedCount, setFixedCount] = React.useState(0);
  const [queueStart, setQueueStart] = React.useState(0);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setCells((prev) => {
        const next = [...prev];
        const gaps = next.flatMap((c, i) => (c === "gap" ? [i] : []));
        if (gaps.length) next[gaps[0]] = "fixed";
        for (let i = 0; i < next.length; i++) {
          if (next[i] === "fixed" && Math.random() < 0.25) next[i] = "ok";
        }
        const oks = next.flatMap((c, i) => (c === "ok" ? [i] : []));
        if (oks.length && gaps.length < 6) {
          next[oks[Math.floor(Math.random() * oks.length)]] = "gap";
        }
        return next;
      });
      setFixedCount((n) => n + 1);
      setQueueStart((n) => (n + 1) % QUEUE.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  const queue = [0, 1, 2].map((k) => QUEUE[(queueStart + k) % QUEUE.length]);

  return (
    <div className="relative">
      <div className="xp-float relative rounded-[32px] border border-surface-border bg-surface-elevated-1/70 p-5 shadow-premium backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-code-sm uppercase tracking-[0.18em] text-text-tertiary">
            Mercearia · Seção 04
          </p>
          <span className="flex items-center gap-2 font-mono text-code-sm text-status-error">
            <span className="xp-pulse h-2 w-2 rounded-full bg-status-error" />
            {cells.filter((c) => c === "gap").length} lacunas
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-base/60 p-3">
          <div
            className="xp-scan pointer-events-none absolute inset-y-0 left-0 z-10 w-[10%] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"
            aria-hidden="true"
          />
          {Array.from({ length: ROWS }).map((_, r) => (
            <div
              key={r}
              className="grid gap-2 border-b-2 border-surface-border pb-2 pt-2 first:pt-0 last:border-b-0 last:pb-0"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {cells.slice(r * COLS, r * COLS + COLS).map((c, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-10 rounded-md transition-all duration-700 sm:h-12",
                    c === "ok" && "bg-surface-elevated-3",
                    c === "gap" &&
                      "xp-pulse border border-dashed border-status-error/70 bg-status-error-dim",
                    c === "fixed" && "bg-brand-primary shadow-glow-sm",
                  )}
                  style={{ height: `${36 + ((r * COLS + i) % 3) * 6}px` }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 pr-1">
          <span className="font-mono text-code-sm text-text-tertiary">
            corrigidas
          </span>
          <span className="font-mono text-heading-lg text-brand-primary">
            {fixedCount}
          </span>
        </div>
      </div>

      <div className="relative z-10 -mt-12 ml-auto mr-4 w-72 rounded-2xl border border-surface-border bg-surface-base/90 p-4 shadow-floating backdrop-blur-xl sm:-ml-8 sm:mr-auto">
        <p className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
          Fila da loja · próximo
        </p>
        <ul className="mt-3 space-y-2">
          {queue.map((q, i) => (
            <li
              key={`${q.name}-${queueStart}-${i}`}
              className="xp-pop flex items-center justify-between gap-2 rounded-lg bg-surface-elevated-1 px-3 py-2"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="flex items-center gap-2 text-body-sm text-text-primary">
                <span className="font-mono text-caption text-brand-primary">
                  {q.tag}
                </span>
                {q.name}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-mono text-caption",
                  q.band === "Alto" &&
                    "bg-status-success-dim text-status-success",
                  q.band === "Médio" &&
                    "bg-status-warning-dim text-status-warning",
                  q.band === "Baixo" &&
                    "bg-status-neutral-dim text-text-secondary",
                )}
              >
                {q.band} R$
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-right font-mono text-caption text-text-tertiary">
        Ilustração com dados fictícios
      </p>
    </div>
  );
}

const STATS = [
  { value: "13", label: "tipos de alerta operacional" },
  { value: "6", label: "filas guiadas no app da loja" },
  {
    value: String(ERP_ECOSYSTEM.length),
    label: "integrações de ERP documentadas",
  },
  { value: "+20", label: "empresas na Rede Terus" },
];

export function HeroLivingShelf() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="xp-lines pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative pb-24 pt-12 lg:pb-32 lg:pt-20">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <InView immediate className="lg:col-span-7">
            <p className="xp-in flex items-center gap-3 font-mono text-code-sm uppercase tracking-[0.2em] text-brand-primary">
              <span className="xp-ring inline-block h-2 w-2 rounded-full bg-brand-primary text-brand-primary" />
              Inteligência da Cadeia de Suprimentos
            </p>
            <h1
              className="mt-6 font-display font-bold leading-[1.02] tracking-tight text-text-primary"
              style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.75rem)" }}
            >
              <KineticText text="Toda gôndola dá sinais." />{" "}
              <KineticText
                text="A Terus transforma cada um em ação."
                delay={300}
                wordClassName="xp-gradient-text"
              />
            </h1>
            <p
              className="xp-in mt-8 max-w-xl text-body-lg text-text-secondary sm:text-heading-md sm:font-normal"
              style={{ "--d": "600ms" } as React.CSSProperties}
            >
              Lemos o ERP que a rede já usa, apontamos o que está tirando venda,
              guiamos a loja a corrigir primeiro o que mais devolve dinheiro e
              levamos o pedido direto ao ERP do fornecedor.
            </p>
            <div
              className="xp-in mt-10 flex flex-wrap items-center gap-4"
              style={{ "--d": "750ms" } as React.CSSProperties}
            >
              <Magnetic>
                <Link
                  href={CTA.primary.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-primary px-7 py-4 text-body-lg font-semibold text-surface-base shadow-glow"
                >
                  {CTA.primary.label}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
              <a
                href="#jornada"
                className="group inline-flex items-center gap-3 rounded-full border border-surface-border px-7 py-4 text-body-lg font-medium text-text-primary transition-colors hover:border-brand-primary/50"
              >
                Ver o caminho do dado
                <span
                  className="transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </a>
            </div>
          </InView>

          <InView
            immediate
            className="xp-in lg:col-span-5"
            style={{ "--d": "400ms" } as React.CSSProperties}
          >
            <LivingShelf />
          </InView>
        </div>

        <InView className="mt-28 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-surface-border bg-surface-border lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="xp-in bg-surface-base p-6 lg:p-8"
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <p className="font-display text-display-lg font-bold text-text-primary lg:text-display-xl">
                {s.value}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </InView>
      </Container>
    </section>
  );
}
