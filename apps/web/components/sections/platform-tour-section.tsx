"use client";

import * as React from "react";
import Link from "next/link";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PlatformScreenshot } from "@/components/sections/platform-screenshot";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { CTA } from "@/lib/constants/conversion";
import { PLATFORM_TOUR, type TourChapter } from "@/lib/constants/lp";

const CHAPTERS = PLATFORM_TOUR.chapters;
/** ~5 giros de roda do mouse por tela */
const SCROLL_PER_CHAPTER_VH = 45;
const MAX_TILT_DEG = 18;
/** Fração de cada capítulo usada na troca de tela, de cada lado da fronteira */
const FADE = 0.12;
const FOCUS_ZOOM = 0.18;
const DRIFT_ZOOM = 0.06;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

function smoothstep(from: number, to: number, value: number) {
  const t = clamp01((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function BrowserFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1 shadow-elevated",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-surface-border bg-surface-elevated-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-status-error/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-status-warning/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-status-success/80" />
        <span className="ml-3 truncate font-mono text-caption text-text-tertiary">
          Portal Terus Varejo
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-base">
        {children}
      </div>
    </div>
  );
}

function LockedOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="max-w-sm rounded-2xl border border-surface-border bg-surface-elevated-1/95 p-6 text-center shadow-elevated backdrop-blur">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary">
          <LockIcon className="h-5 w-5" />
        </span>
        <p className="mt-4 font-display text-heading-md font-semibold text-text-primary">
          {PLATFORM_TOUR.lockedTitle}
        </p>
        <Button asChild size="md" className="mt-5 font-semibold">
          <Link href={CTA.primary.href}>{PLATFORM_TOUR.lockedCta}</Link>
        </Button>
      </div>
    </div>
  );
}

interface ScreenRefs {
  screen: (el: HTMLDivElement | null) => void;
  zoom: (el: HTMLDivElement | null) => void;
  ring: (el: HTMLSpanElement | null) => void;
}

/**
 * Tela do tour. Sem `refs` fica estática (mobile); com `refs`, opacidade,
 * deslocamento, zoom e destaque são escritos pelo scroll da seção.
 */
function TourScreen({
  chapter,
  sizes,
  initiallyVisible = true,
  refs,
}: {
  chapter: TourChapter;
  sizes: string;
  initiallyVisible?: boolean;
  refs?: ScreenRefs;
}) {
  const { focus, screen } = chapter;
  const wide = screen.height / screen.width < 0.5;
  const animated = Boolean(refs);

  return (
    <div
      ref={refs?.screen}
      className={cn(
        "absolute inset-0",
        animated &&
          "transition-[opacity,transform] duration-150 ease-out will-change-[opacity,transform]",
      )}
      style={animated ? { opacity: initiallyVisible ? 1 : 0 } : undefined}
    >
      <div
        ref={refs?.zoom}
        className={cn(
          "absolute inset-0",
          animated && "transition-transform duration-150 ease-out",
        )}
        style={{
          transformOrigin: focus
            ? `${focus.left + focus.width / 2}% ${focus.top + focus.height / 2}%`
            : "50% 50%",
        }}
      >
        <PlatformScreenshot
          screen={screen}
          sizes={sizes}
          className={cn(
            "h-full w-full",
            wide ? "object-contain p-6" : "object-cover object-top",
          )}
        />
        {focus && animated ? (
          <span
            ref={refs?.ring}
            className="pointer-events-none absolute rounded-lg border-2 border-brand-primary shadow-glow transition-opacity duration-150"
            style={{
              opacity: 0,
              left: `${focus.left}%`,
              top: `${focus.top}%`,
              width: `${focus.width}%`,
              height: `${focus.height}%`,
            }}
          />
        ) : null}
      </div>
      {chapter.locked ? <LockedOverlay /> : null}
    </div>
  );
}

export function PlatformTourSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const screenEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const zoomEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const ringEls = React.useRef<(HTMLSpanElement | null)[]>([]);
  const barEls = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const last = CHAPTERS.length - 1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      const travel = rect.height - viewport;
      const progress = travel > 0 ? clamp01(-rect.top / travel) : 0;
      const position = progress * CHAPTERS.length;
      const index = Math.min(last, Math.floor(position));
      setActive((current) => (current === index ? current : index));

      CHAPTERS.forEach((chapter, i) => {
        const local = position - i;
        const enter = i === 0 ? 1 : smoothstep(-FADE, FADE, local);
        const exit = i === last ? 1 : 1 - smoothstep(1 - FADE, 1 + FADE, local);
        const visible = Math.min(enter, exit);

        const screen = screenEls.current[i];
        if (screen) {
          const shift = reduceMotion ? 0 : (1 - enter) * 6 - (1 - exit) * 6;
          screen.style.opacity = String(visible);
          screen.style.transform = `translateY(${shift}%) scale(${reduceMotion ? 1 : 0.97 + 0.03 * visible})`;
          screen.style.visibility = visible < 0.01 ? "hidden" : "visible";
          screen.style.pointerEvents = visible > 0.5 ? "auto" : "none";
        }

        const zoom = zoomEls.current[i];
        if (zoom) {
          const amount = reduceMotion
            ? 0
            : chapter.focus
              ? FOCUS_ZOOM * smoothstep(0.05, 0.5, local)
              : DRIFT_ZOOM * clamp01(local);
          zoom.style.transform = `scale(${1 + amount})`;
        }

        const ring = ringEls.current[i];
        if (ring) {
          ring.style.opacity = String(smoothstep(0.3, 0.55, local) * exit);
        }

        const bar = barEls.current[i];
        if (bar) bar.style.transform = `scaleX(${clamp01(local)})`;
      });

      const enter = reduceMotion
        ? 1
        : Math.min(Math.max(1 - rect.top / viewport, 0), 1);
      stage.style.setProperty(
        "--tour-tilt",
        `${(1 - enter) * MAX_TILT_DEG}deg`,
      );
      stage.style.setProperty("--tour-scale", `${0.9 + enter * 0.1}`);
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

  const seenRef = React.useRef(new Set<number>());
  React.useEffect(() => {
    const scrollTrack = trackRef.current;
    if (!scrollTrack || scrollTrack.getBoundingClientRect().top > 0) return;
    if (seenRef.current.has(active)) return;
    seenRef.current.add(active);
    track(ANALYTICS_EVENTS.tourChapter, { capitulo: CHAPTERS[active].label });
  }, [active]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + travel * ((index + 0.5) / CHAPTERS.length),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="por-dentro"
      className="section-rhythm-alt relative scroll-mt-20"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {PLATFORM_TOUR.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {PLATFORM_TOUR.title}{" "}
            <span className="text-gradient">{PLATFORM_TOUR.titleAccent}</span>
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {PLATFORM_TOUR.description}
          </p>
        </Reveal>

        <div className="mt-12 space-y-14 lg:hidden">
          {CHAPTERS.map((chapter, index) => (
            <Reveal key={chapter.id}>
              <p className="flex items-center gap-2 font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                {String(index + 1).padStart(2, "0")} · {chapter.label}
                {chapter.locked ? <LockIcon className="h-3.5 w-3.5" /> : null}
              </p>
              <h3 className="mt-2 font-display text-heading-lg font-semibold text-text-primary">
                {chapter.title}
              </h3>
              <p className="mt-2 text-body-md text-text-secondary">
                {chapter.description}
              </p>
              <BrowserFrame className="mt-5">
                <TourScreen chapter={chapter} sizes="100vw" />
              </BrowserFrame>
            </Reveal>
          ))}
          <p className="text-center text-caption text-text-tertiary">
            {PLATFORM_TOUR.note}
          </p>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${CHAPTERS.length * SCROLL_PER_CHAPTER_VH + 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center pt-16">
          <Container className="grid w-full grid-cols-[20rem_1fr] items-center gap-12 xl:grid-cols-[22rem_1fr]">
            <ol className="space-y-2">
              {CHAPTERS.map((chapter, index) => {
                const isActive = index === active;
                return (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "w-full rounded-xl border px-5 py-4 text-left transition-all duration-300",
                        isActive
                          ? "border-brand-primary/40 bg-surface-elevated-1 shadow-elevated"
                          : "border-transparent hover:bg-surface-elevated-1/60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center gap-3 font-mono text-caption font-semibold uppercase tracking-widest transition-colors",
                          isActive
                            ? "text-brand-primary"
                            : "text-text-tertiary",
                        )}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {chapter.label}
                        {chapter.locked ? (
                          <LockIcon className="h-3.5 w-3.5" />
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300",
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-3 font-display text-heading-md font-semibold text-text-primary">
                            {chapter.title}
                          </span>
                          <span className="mt-2 block text-body-sm leading-relaxed text-text-secondary">
                            {chapter.description}
                          </span>
                          <span
                            className="mt-4 block h-0.5 overflow-hidden rounded-full bg-surface-border"
                            aria-hidden="true"
                          >
                            <span
                              ref={(el) => {
                                barEls.current[index] = el;
                              }}
                              className="block h-full origin-left bg-brand-primary transition-transform duration-150 ease-out"
                              style={{ transform: "scaleX(0)" }}
                            />
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="[perspective:1800px]">
              <div
                ref={stageRef}
                className="origin-bottom will-change-transform [transform:rotateX(var(--tour-tilt,18deg))_scale(var(--tour-scale,0.9))]"
              >
                <BrowserFrame className="shadow-premium">
                  {CHAPTERS.map((chapter, index) => (
                    <TourScreen
                      key={chapter.id}
                      chapter={chapter}
                      initiallyVisible={index === 0}
                      sizes="(min-width: 1280px) 60vw, 55vw"
                      refs={{
                        screen: (el) => {
                          screenEls.current[index] = el;
                        },
                        zoom: (el) => {
                          zoomEls.current[index] = el;
                        },
                        ring: (el) => {
                          ringEls.current[index] = el;
                        },
                      }}
                    />
                  ))}
                </BrowserFrame>
                <p className="mt-4 text-center text-caption text-text-tertiary">
                  {PLATFORM_TOUR.note}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
