"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { InView, Kicker, KineticText } from "@/components/motion/xp";
import { MODULES, type ModuleDefinition } from "@/lib/constants/modules";

const CORE = MODULES.filter((m) => m.group === "core");
const EXP = MODULES.filter((m) => m.group === "expansao");

function Ring({
  items,
  radius,
  duration,
  selected,
  onSelect,
  offset = 0,
}: {
  items: ModuleDefinition[];
  radius: number;
  duration: number;
  selected: string;
  onSelect: (slug: string) => void;
  offset?: number;
}) {
  return (
    <div
      className="xp-orbit absolute left-1/2 top-1/2"
      style={
        { "--dur": `${duration}s`, width: 0, height: 0 } as React.CSSProperties
      }
    >
      <span
        className="absolute rounded-full border border-dashed border-surface-border"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: -radius,
          top: -radius,
        }}
        aria-hidden="true"
      />
      {items.map((m, i) => {
        const angle = (i / items.length) * Math.PI * 2 + offset;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const on = selected === m.slug;
        return (
          <div
            key={m.slug}
            className="absolute"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
          >
            <div
              className="xp-orbit-counter"
              style={{ "--dur": `${duration}s` } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => onSelect(m.slug)}
                aria-pressed={on}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-2 text-body-sm font-semibold transition-all duration-300",
                  on
                    ? "scale-110 border-brand-primary bg-brand-primary text-surface-base shadow-glow"
                    : "border-surface-border bg-surface-base/90 text-text-primary backdrop-blur hover:border-brand-primary/60",
                )}
              >
                {m.name.replace("Terus ", "")}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ModulesOrbit() {
  const [selected, setSelected] = React.useState<string>("alert");
  const m = MODULES.find((x) => x.slug === selected) ?? MODULES[0];

  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <Container>
        <InView className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index="04" className="xp-in">
              Módulos
            </Kicker>
            <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
              <KineticText text="Quatro no centro." />{" "}
              <KineticText
                text="Quatro para crescer."
                delay={200}
                wordClassName="text-brand-primary"
              />
            </h2>
          </div>
          <p
            className="xp-in text-body-lg text-text-secondary lg:col-span-5"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            O ciclo essencial é Alert, Order, Task e Strategy. Unitization,
            Production, Chain e Vitrine entram conforme a operação — ninguém
            precisa contratar tudo de uma vez.
          </p>
        </InView>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          <div className="xp-orbit-wrap relative mx-auto hidden aspect-square w-full max-w-[600px] lg:col-span-7 lg:block">
            <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand-primary/40 bg-surface-elevated-1 shadow-premium">
              <span
                className="xp-ring absolute inset-0 rounded-full text-brand-primary/40"
                aria-hidden="true"
              />
              <span className="font-display text-heading-lg font-bold text-text-primary">
                Terus
              </span>
              <span className="font-mono text-caption uppercase tracking-[0.16em] text-brand-primary">
                Varejo
              </span>
            </div>
            <Ring
              items={CORE}
              radius={150}
              duration={70}
              selected={selected}
              onSelect={setSelected}
              offset={-Math.PI / 4}
            />
            <Ring
              items={EXP}
              radius={260}
              duration={110}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="flex flex-wrap gap-2 lg:hidden">
            {MODULES.map((x) => (
              <button
                key={x.slug}
                type="button"
                onClick={() => setSelected(x.slug)}
                aria-pressed={selected === x.slug}
                className={cn(
                  "rounded-full border px-4 py-2 text-body-sm font-semibold",
                  selected === x.slug
                    ? "border-brand-primary bg-brand-primary text-surface-base"
                    : "border-surface-border text-text-primary",
                )}
              >
                {x.name}
              </button>
            ))}
          </div>

          <div className="lg:col-span-5">
            <article
              key={m.slug}
              aria-live="polite"
              className="xp-pop rounded-[32px] border border-surface-border bg-surface-elevated-1/60 p-8 backdrop-blur-sm lg:p-10"
            >
              <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
                {m.group === "core" ? "Essencial" : "Expansão"}
              </p>
              <h3 className="mt-3 font-display text-display-lg font-bold tracking-tight text-text-primary">
                {m.name}
              </h3>
              <p className="mt-2 text-heading-md text-brand-primary">
                {m.tagline}
              </p>
              <p className="mt-6 text-body-md text-text-secondary">
                {m.description}
              </p>
              <ul className="mt-6 space-y-2">
                {m.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-body-sm text-text-primary"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/modulos/${m.slug}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-3 text-body-sm font-semibold text-text-primary transition-colors hover:border-brand-primary/60"
              >
                Conhecer o {m.name}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
