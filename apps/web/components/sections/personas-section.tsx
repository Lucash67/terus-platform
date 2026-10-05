"use client";

import { useState } from "react";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FounderVideo } from "@/components/sections/founder-video";
import { PERSONAS } from "@/lib/constants/lp";

export function PersonasSection() {
  const [activeId, setActiveId] = useState(PERSONAS.items[0].id);
  const active =
    PERSONAS.items.find((persona) => persona.id === activeId) ??
    PERSONAS.items[0];

  return (
    <section className="section-rhythm-alt">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {PERSONAS.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {PERSONAS.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {PERSONAS.description}
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div
            role="tablist"
            aria-label="Perfis de uso"
            className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2"
          >
            {PERSONAS.items.map((persona) => {
              const selected = persona.id === active.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  role="tab"
                  id={`persona-tab-${persona.id}`}
                  aria-selected={selected}
                  aria-controls={`persona-panel-${persona.id}`}
                  onClick={() => setActiveId(persona.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-body-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                    selected
                      ? "border-brand-primary bg-brand-primary text-surface-base shadow-glow-sm"
                      : "border-surface-border bg-surface-base text-text-secondary hover:border-brand-primary/40 hover:text-text-primary",
                  )}
                >
                  {persona.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`persona-panel-${active.id}`}
            aria-labelledby={`persona-tab-${active.id}`}
            className={cn(
              "mx-auto mt-8 grid gap-8 rounded-xl border border-surface-border bg-surface-base p-6 sm:p-10",
              active.video
                ? "max-w-5xl lg:grid-cols-[1fr_1fr_15rem]"
                : "max-w-4xl lg:grid-cols-2",
            )}
          >
            <div>
              <h3 className="font-display text-heading-lg font-bold text-text-primary">
                {active.title}
              </h3>
              <p className="mt-3 text-body-md leading-relaxed text-text-secondary">
                {active.description}
              </p>
            </div>
            <ul className="space-y-3">
              {active.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-body-md text-text-primary"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            {active.video ? (
              <FounderVideo
                key={active.video.src}
                {...active.video}
                className="mx-auto max-w-[15rem]"
                sizes="240px"
              />
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
