"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FounderVideo } from "@/components/sections/founder-video";
import { PERSONAS, type Persona } from "@/lib/constants/lp";
import {
  clamp01,
  scrollToTrackStep,
  smoothstep,
  stickyTrackProgress,
} from "@/lib/scroll-math";

const ITEMS = PERSONAS.items;
/** ~6 giros de roda do mouse por perfil */
const SCROLL_PER_PERSONA_VH = 55;
const MAX_TILT_DEG = 16;
/** Trecho final do perfil em que o card da frente vira e sai */
const EXIT_FROM = 0.72;
/** Cards visíveis atrás do card da frente */
const DECK_DEPTH = 3;

function CheckIcon() {
  return (
    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary">
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function PersonaCopy({
  persona,
  index,
  bulletRef,
  large = false,
}: {
  persona: Persona;
  index: number;
  bulletRef?: (bullet: number) => (el: HTMLLIElement | null) => void;
  large?: boolean;
}) {
  return (
    <>
      <div className="relative">
        <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
          {String(index + 1).padStart(2, "0")} · {persona.label}
        </p>
        <h3
          className={cn(
            "mt-3 font-display font-bold text-text-primary",
            large ? "text-heading-xl" : "text-heading-lg",
          )}
        >
          {persona.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-text-secondary",
            large ? "text-body-lg" : "text-body-md",
          )}
        >
          {persona.description}
        </p>
      </div>
      <ul className={cn("relative", large ? "space-y-4" : "space-y-3")}>
        {persona.bullets.map((bullet, b) => (
          <li
            key={bullet}
            ref={bulletRef?.(b)}
            className={cn(
              "flex items-start gap-3 text-text-primary",
              large ? "text-body-lg" : "text-body-md",
            )}
          >
            <CheckIcon />
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Perfis em um deck 3D guiado pelo scroll: o card da frente vira e sai, o
 * próximo avança da pilha e os itens entram em sequência. No mobile, cards
 * empilhados com entrada simples.
 */
export function PersonasSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const bulletEls = React.useRef<(HTMLLIElement | null)[][]>(
    ITEMS.map(() => []),
  );
  const barEls = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const last = ITEMS.length - 1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const position = stickyTrackProgress(track) * ITEMS.length;
      const index = Math.min(last, Math.floor(position));
      setActive((current) => (current === index ? current : index));

      const viewport = window.innerHeight;
      const enter = reduceMotion
        ? 1
        : clamp01(1 - track.getBoundingClientRect().top / viewport);
      stage.style.setProperty(
        "--deck-tilt",
        `${(1 - enter) * MAX_TILT_DEG}deg`,
      );

      ITEMS.forEach((_, i) => {
        const local = position - i;
        const card = cardEls.current[i];
        if (card) {
          let opacity: number;
          let transform: string;
          if (local < 0) {
            const depth = Math.min(-local, DECK_DEPTH + 1);
            opacity = clamp01(DECK_DEPTH + 0.6 - depth) * (1 - depth * 0.18);
            transform = reduceMotion
              ? "none"
              : `translate3d(0, ${depth * 48}px, ${-depth * 110}px) scale(${1 - depth * 0.05})`;
            if (reduceMotion) opacity = 0;
          } else {
            const exit = i === last ? 0 : smoothstep(EXIT_FROM, 1, local);
            opacity = reduceMotion
              ? 1 - exit
              : 1 - smoothstep(0.92, 1, local) * (i === last ? 0 : 1);
            transform = reduceMotion
              ? "none"
              : `translate3d(0, ${-exit * 125}%, ${exit * 120}px) rotateX(${-exit * 22}deg)`;
          }
          card.style.opacity = String(opacity);
          card.style.transform = transform;
          card.style.zIndex = String(
            local >= 0 ? 20 - i : 10 - Math.ceil(-local),
          );
          card.style.visibility = opacity < 0.01 ? "hidden" : "visible";
          card.style.pointerEvents = local >= 0 && local < 1 ? "auto" : "none";
        }

        bulletEls.current[i].forEach((bullet, b) => {
          if (!bullet) return;
          const start = -0.3 + b * 0.08;
          const shown = reduceMotion
            ? 1
            : smoothstep(start, start + 0.2, local);
          bullet.style.opacity = String(shown);
          bullet.style.transform = `translate3d(${(1 - shown) * -24}px, 0, ${(1 - shown) * 40}px)`;
        });

        const bar = barEls.current[i];
        if (bar) bar.style.transform = `scaleX(${clamp01(local)})`;
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    if (trackRef.current) {
      scrollToTrackStep(trackRef.current, index, ITEMS.length);
    }
  };

  const header = (
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
  );

  return (
    <section className="section-rhythm-alt relative">
      <Container className="lg:hidden">
        {header}
        <div className="mt-10 space-y-6">
          {ITEMS.map((persona, index) => (
            <Reveal
              key={persona.id}
              variant="scale"
              className="grid gap-6 rounded-xl border border-surface-border bg-surface-base p-6 shadow-elevated"
            >
              <PersonaCopy persona={persona} index={index} />
              {persona.video ? (
                <FounderVideo
                  {...persona.video}
                  className="mx-auto max-w-[15rem]"
                  sizes="240px"
                />
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="hidden lg:block">
        <Container>{header}</Container>
        <div
          ref={trackRef}
          className="relative"
          style={{
            height: `${ITEMS.length * SCROLL_PER_PERSONA_VH + 100}vh`,
          }}
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center pt-16">
            <Container className="w-full">
              <nav
                aria-label="Perfis de uso"
                className="mx-auto flex max-w-3xl justify-center gap-3"
              >
                {ITEMS.map((persona, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group relative min-w-[8.5rem] overflow-hidden rounded-full border px-5 py-2 text-body-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                        isActive
                          ? "border-brand-primary text-text-primary shadow-glow-sm"
                          : "border-surface-border bg-surface-base text-text-secondary hover:border-brand-primary/40 hover:text-text-primary",
                      )}
                    >
                      <span
                        ref={(el) => {
                          barEls.current[index] = el;
                        }}
                        className="absolute inset-0 origin-left bg-brand-primary-dim transition-transform duration-150 ease-out"
                        style={{ transform: "scaleX(0)" }}
                        aria-hidden="true"
                      />
                      <span className="relative">{persona.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-10 [perspective:1600px]">
                <div
                  ref={stageRef}
                  className="relative mx-auto h-[28rem] max-w-5xl origin-bottom [transform-style:preserve-3d] [transform:rotateX(var(--deck-tilt,16deg))]"
                >
                  {ITEMS.map((persona, index) => (
                    <div
                      key={persona.id}
                      ref={(el) => {
                        cardEls.current[index] = el;
                      }}
                      aria-hidden={index !== active}
                      className="absolute inset-0 origin-bottom transition-[opacity,transform] duration-150 ease-out will-change-transform [transform-style:preserve-3d]"
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      <div
                        className={cn(
                          "relative grid h-full items-center gap-10 overflow-hidden rounded-2xl border border-surface-border bg-surface-base p-10 shadow-premium",
                          persona.video
                            ? "grid-cols-[1fr_1fr_12rem]"
                            : "grid-cols-2",
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none absolute -bottom-10 right-8 select-none font-display text-[12rem] font-bold leading-none text-brand-primary/[0.06] transition-opacity duration-300",
                            index === active ? "opacity-100" : "opacity-0",
                          )}
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"
                          aria-hidden="true"
                        />
                        <PersonaCopy
                          persona={persona}
                          index={index}
                          large
                          bulletRef={(b) => (el) => {
                            bulletEls.current[index][b] = el;
                          }}
                        />
                        {persona.video ? (
                          index === active ? (
                            <FounderVideo
                              {...persona.video}
                              className="relative max-w-[12rem]"
                              sizes="192px"
                            />
                          ) : (
                            <div className="relative aspect-[9/16] w-full max-w-[12rem] overflow-hidden rounded-2xl border border-surface-border">
                              <Image
                                src={persona.video.poster}
                                alt=""
                                fill
                                sizes="192px"
                                className="object-cover"
                              />
                            </div>
                          )
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
