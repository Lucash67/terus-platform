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
const SCROLL_PER_CHAPTER_VH = 70;
const MAX_TILT_DEG = 18;

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

function LockedOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-500",
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
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

function TourScreen({
  chapter,
  active,
  zoom,
  sizes,
}: {
  chapter: TourChapter;
  active: boolean;
  zoom: boolean;
  sizes: string;
}) {
  const { focus, screen } = chapter;
  const wide = screen.height / screen.width < 0.5;
  const zoomed = zoom && active && Boolean(focus);

  return (
    <div
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-[1600ms] ease-out motion-reduce:!scale-100",
          zoomed ? "scale-[1.18] delay-500" : "scale-100",
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
        {focus ? (
          <span
            className={cn(
              "pointer-events-none absolute rounded-lg border-2 border-brand-primary shadow-glow transition-opacity duration-500",
              zoomed ? "opacity-100 delay-1000" : "opacity-0",
            )}
            style={{
              left: `${focus.left}%`,
              top: `${focus.top}%`,
              width: `${focus.width}%`,
              height: `${focus.height}%`,
            }}
          />
        ) : null}
      </div>
      {chapter.locked ? <LockedOverlay visible={active} /> : null}
    </div>
  );
}

export function PlatformTourSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      const travel = rect.height - viewport;
      const progress =
        travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      const index = Math.min(
        CHAPTERS.length - 1,
        Math.floor(progress * CHAPTERS.length),
      );
      setActive((current) => (current === index ? current : index));

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
                <TourScreen
                  chapter={chapter}
                  active
                  zoom={false}
                  sizes="100vw"
                />
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
                        "w-full rounded-xl border px-5 py-4 text-left transition-all duration-500",
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
                          "grid transition-[grid-template-rows] duration-500",
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
                      active={index === active}
                      zoom
                      sizes="(min-width: 1280px) 60vw, 55vw"
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
