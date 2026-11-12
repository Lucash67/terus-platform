"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TASK_APP } from "@/lib/constants/lp";

/** Leque: o pôster do meio na frente, os laterais girados para trás. */
const FAN = [
  "-translate-x-[62%] rotate-[-8deg] scale-90 group-hover:-translate-x-[70%] group-hover:rotate-[-10deg]",
  "z-10 -translate-y-4 group-hover:-translate-y-6",
  "translate-x-[62%] rotate-[8deg] scale-90 group-hover:translate-x-[70%] group-hover:rotate-[10deg]",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 text-brand-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Poster({
  index,
  className,
  sizes,
}: {
  index: number;
  className?: string;
  sizes: string;
}) {
  const poster = TASK_APP.posters[index];
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-surface-border bg-surface-elevated-2 shadow-premium",
        className,
      )}
    >
      <Image
        src={poster.image}
        alt={poster.alt}
        width={TASK_APP.posterWidth}
        height={TASK_APP.posterHeight}
        sizes={sizes}
        quality={90}
        className="h-auto w-full"
      />
    </div>
  );
}

export function TaskAppSection() {
  const fanRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOpen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(fan);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="app-loja"
      className="section-rhythm relative overflow-hidden scroll-mt-20"
    >
      <div
        className="premium-cta-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <Reveal variant="left">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              {TASK_APP.badge}
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              {TASK_APP.title}{" "}
              <span className="text-gradient">{TASK_APP.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
              {TASK_APP.description}
            </p>
            <ul className="mt-6 space-y-3">
              {TASK_APP.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-body-md text-text-secondary"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim">
                    <CheckIcon />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <div
            ref={fanRef}
            className="group relative mx-auto hidden h-[36rem] w-full max-w-xl items-center justify-center sm:flex"
          >
            {TASK_APP.posters.map((poster, index) => (
              <Poster
                key={poster.image}
                index={index}
                sizes="260px"
                className={cn(
                  "absolute w-60 transition-all duration-1000 ease-out motion-reduce:transition-none lg:w-64",
                  open ? FAN[index] : "translate-y-12 scale-90 opacity-0",
                  index === 1 && !open && "translate-y-16",
                )}
              />
            ))}
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
            {TASK_APP.posters.map((poster, index) => (
              <figure
                key={poster.image}
                className="w-[70vw] shrink-0 snap-center"
              >
                <Poster index={index} sizes="70vw" />
                <figcaption className="mt-3 text-center font-mono text-caption uppercase tracking-widest text-text-tertiary">
                  {poster.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
