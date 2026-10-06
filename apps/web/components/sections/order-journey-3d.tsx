"use client";

import * as React from "react";
import { cn } from "@terus/ui";

import { PONTE_FORNECEDOR } from "@/lib/constants/lp";
import { clamp01, smoothstep, stickyTrackProgress } from "@/lib/scroll-math";

const STEPS = PONTE_FORNECEDOR.steps;
const LAST = STEPS.length - 1;
/** ~5 giros de roda do mouse por etapa */
const SCROLL_PER_STEP_VH = 45;
/** Distância entre estações no chão, em px */
const SPACING = 400;
const FLOOR_TILT_DEG = 58;
const INTRO_EXTRA_TILT_DEG = 22;
/** Parte de cada etapa em que a câmera viaja até a próxima estação */
const TRAVEL_FROM = 0.6;
/** Recuo da câmera no meio da viagem entre estações */
const DOLLY_PX = 220;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path
        d="M2 6l3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Jornada do pedido em 3D: estações num chão em perspectiva, um card em pé
 * sobre cada uma e o pedido viajando entre elas. Câmera, pedido, trilho e
 * cards seguem o scroll — nada depende de tempo.
 */
export function OrderJourney3D() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const worldRef = React.useRef<HTMLDivElement>(null);
  const fillRef = React.useRef<HTMLDivElement>(null);
  const packetRef = React.useRef<HTMLDivElement>(null);
  const cardEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    const track = trackRef.current;
    const world = worldRef.current;
    if (!track || !world) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = stickyTrackProgress(track);
      setFinished(progress > 0.94);
      const steps = progress * STEPS.length;
      const index = Math.min(LAST, Math.floor(steps));
      const travel =
        index < LAST && !reduceMotion
          ? smoothstep(TRAVEL_FROM, 1, steps - index)
          : 0;
      const camera = index + travel;
      setCurrent((value) => {
        const next = Math.round(camera);
        return value === next ? value : next;
      });

      const enter = reduceMotion
        ? 1
        : clamp01(1 - track.getBoundingClientRect().top / window.innerHeight);
      const tilt = FLOOR_TILT_DEG + (1 - enter) * INTRO_EXTRA_TILT_DEG;
      const dolly = Math.sin(travel * Math.PI);
      const depth = (1 - enter) * -300 - dolly * DOLLY_PX;
      const swing = (enter - 1) * 14 + dolly * 6;
      world.style.transform = `translateZ(${depth}px) rotateX(${tilt}deg) rotateZ(${swing}deg) translateX(${-camera * SPACING}px)`;
      world.style.setProperty("--stand", `${-tilt}deg`);

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${camera / LAST})`;
      }
      if (packetRef.current) {
        const hop = Math.sin(travel * Math.PI) * 36;
        packetRef.current.style.transform = `translate3d(${camera * SPACING}px, 0, 0)`;
        packetRef.current.style.setProperty("--hop", `${-hop}px`);
      }

      cardEls.current.forEach((card, i) => {
        if (!card) return;
        const focus = 1 - clamp01(Math.abs(camera - i) * 1.4);
        card.style.opacity = String(0.3 + 0.7 * focus);
        card.style.setProperty("--lift", `${-(12 + focus * 44)}px`);
        card.style.setProperty("--scale", String(0.82 + 0.18 * focus));
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

  const standing =
    "[transform:translateX(-50%)_rotateX(var(--stand,-58deg))_translateY(var(--lift,0px))_scale(var(--scale,1))]";

  return (
    <div
      ref={trackRef}
      className="relative mt-6"
      style={{ height: `${STEPS.length * SCROLL_PER_STEP_VH + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-8">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
            Jornada do pedido
          </p>
          <p className="font-mono text-heading-md font-semibold text-text-primary">
            <span className="text-brand-primary">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-text-tertiary">
              {" "}
              / {String(STEPS.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="relative h-[30rem] [perspective:1400px] [perspective-origin:50%_25%]">
          <div
            ref={worldRef}
            className="absolute left-1/2 top-[70%] h-0 w-0 will-change-transform [transform-style:preserve-3d]"
          >
            <div
              className="tr-grid-bg absolute -top-[28rem] h-[56rem] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_70%)]"
              style={{
                left: -900,
                width: LAST * SPACING + 1800,
              }}
              aria-hidden="true"
            />

            <div
              className="absolute -top-px h-0.5 rounded-full bg-surface-border"
              style={{ left: 0, width: LAST * SPACING }}
              aria-hidden="true"
            >
              <div
                ref={fillRef}
                className="h-full origin-left rounded-full bg-brand-primary shadow-glow"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {STEPS.map((step, i) => {
              const done = i < current || (finished && i === LAST);
              const isCurrent = i === current;
              return (
                <div
                  key={step.title}
                  className="absolute top-0 [transform-style:preserve-3d]"
                  style={{ left: i * SPACING }}
                >
                  <span
                    className={cn(
                      "absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300",
                      done || isCurrent
                        ? "border-brand-primary bg-brand-primary/20 shadow-glow"
                        : "border-surface-border bg-surface-base",
                    )}
                    aria-hidden="true"
                  />
                  {isCurrent ? (
                    <span
                      className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-brand-primary/40"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div
                    ref={(el) => {
                      cardEls.current[i] = el;
                    }}
                    className={cn(
                      "absolute bottom-0 left-0 w-80 origin-bottom transition-[opacity] duration-150 [transform-style:preserve-3d]",
                      standing,
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl border bg-surface-base p-6 text-center transition-[border-color,box-shadow] duration-300",
                        isCurrent
                          ? "border-brand-primary/50 shadow-premium"
                          : "border-surface-border shadow-elevated",
                      )}
                    >
                      <span
                        className={cn(
                          "mx-auto flex h-10 w-10 items-center justify-center rounded-full font-mono text-body-sm font-semibold transition-colors duration-300",
                          done
                            ? "bg-brand-primary text-surface-base"
                            : "border border-brand-primary text-brand-primary",
                        )}
                      >
                        {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                      </span>
                      <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-body-sm text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                    <span
                      className="mx-auto block h-10 w-px bg-gradient-to-b from-brand-primary/60 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}

            <div
              ref={packetRef}
              className="absolute top-0 [transform-style:preserve-3d]"
              style={{ left: 0 }}
            >
              <span
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/40 blur-md"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 origin-bottom [transform-style:preserve-3d] [transform:translateX(-50%)_rotateX(var(--stand,-58deg))_translateY(calc(var(--hop,0px)_-_1.5rem))]">
                <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-primary px-4 py-2 font-mono text-caption font-semibold text-surface-base shadow-glow">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <path d="M14 3v6h6M8 13h8M8 17h5" />
                  </svg>
                  Pedido · {STEPS[current].status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
