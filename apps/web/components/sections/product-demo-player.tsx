"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@terus/ui";

import { PRODUCT_DEMO } from "@/lib/constants/site-data";

/**
 * Player do vídeo demo. Com `src` nulo, mostra o stage visual pronto.
 * Com vídeo: autoplay mudo em loop ao entrar no viewport (política dos browsers).
 */
export function ProductDemoPlayer() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);
  const hasVideo = Boolean(PRODUCT_DEMO.src);

  function handlePlay() {
    const video = videoRef.current;
    if (!video || !PRODUCT_DEMO.src) return;
    void video.play().then(
      () => {
        setPlaying(true);
        setAutoplayBlocked(false);
      },
      () => setAutoplayBlocked(true),
    );
  }

  function seekTo(seconds: number, index: number) {
    setActiveChapter(index);
    const video = videoRef.current;
    if (!video || !PRODUCT_DEMO.src) return;
    video.currentTime = seconds;
    void video.play().then(
      () => setPlaying(true),
      () => setAutoplayBlocked(true),
    );
  }

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      const t = video.currentTime;
      let idx = 0;
      for (let i = 0; i < PRODUCT_DEMO.chapters.length; i += 1) {
        if (t >= PRODUCT_DEMO.chapters[i].at) idx = i;
      }
      setActiveChapter(idx);
    };

    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  // Autoplay ao entrar na vista; pausa ao sair. Respeita reduced-motion.
  React.useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage || !PRODUCT_DEMO.src) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setAutoplayBlocked(true);
      return;
    }

    const tryPlay = () => {
      video.muted = true;
      void video.play().then(
        () => {
          setPlaying(true);
          setAutoplayBlocked(false);
        },
        () => setAutoplayBlocked(true),
      );
    };

    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
            setPlaying(false);
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const showPlayOverlay = !hasVideo || autoplayBlocked;

  return (
    <div className="space-y-5">
      <div
        ref={stageRef}
        className="tr-glow-ring relative overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-1 shadow-floating"
      >
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-status-error/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-status-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-status-success/80" />
          </div>
          <span className="font-mono text-caption font-medium uppercase tracking-widest text-text-tertiary">
            Terus · Demo {PRODUCT_DEMO.durationLabel}
          </span>
          <span className="rounded-full bg-brand-primary-dim px-2.5 py-0.5 font-mono text-caption text-brand-primary">
            {hasVideo ? (playing ? "Ao vivo" : "Pronto") : "Em produção"}
          </span>
        </div>

        <div className="relative aspect-video bg-surface-base">
          {PRODUCT_DEMO.src ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={PRODUCT_DEMO.poster ?? undefined}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              controls={playing || autoplayBlocked}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={PRODUCT_DEMO.src} type="video/mp4" />
            </video>
          ) : PRODUCT_DEMO.poster ? (
            <Image
              src={PRODUCT_DEMO.poster}
              alt="Prévia da demo Terus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          ) : (
            <DemoPosterFrame />
          )}

          {showPlayOverlay ? (
            <button
              type="button"
              onClick={hasVideo ? handlePlay : undefined}
              disabled={!hasVideo}
              aria-label={
                hasVideo
                  ? "Reproduzir demo do produto"
                  : "Vídeo em produção — use os CTAs abaixo"
              }
              className="group absolute inset-0 flex items-center justify-center bg-surface-overlay/40 transition-colors hover:bg-surface-overlay/55 disabled:cursor-default"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-primary/50 bg-brand-primary text-surface-base shadow-glow transition-transform duration-300 group-hover:scale-105 group-disabled:opacity-90 sm:h-20 sm:w-20">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
              {!hasVideo ? (
                <span className="absolute bottom-4 left-1/2 w-[min(90%,28rem)] -translate-x-1/2 rounded-lg border border-surface-border bg-surface-elevated-1/95 px-4 py-2 text-center text-body-sm text-text-secondary backdrop-blur-sm">
                  Layout pronto — grave o screencast com o roteiro e solte o
                  arquivo em{" "}
                  <span className="font-mono text-brand-primary">
                    public/videos/
                  </span>
                </span>
              ) : null}
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_DEMO.chapters.map((chapter, index) => {
          const active = activeChapter === index;
          return (
            <button
              key={chapter.label}
              type="button"
              onClick={() => seekTo(chapter.at, index)}
              disabled={!hasVideo}
              className={[
                "rounded-xl border px-4 py-3 text-left transition-all duration-200",
                active
                  ? "border-brand-primary/50 bg-brand-primary/10"
                  : "border-surface-border bg-surface-elevated-1 hover:border-brand-primary/30",
                !hasVideo ? "cursor-default opacity-90" : "",
              ].join(" ")}
            >
              <p className="flex items-center justify-between gap-2">
                <span className="font-display text-body-sm font-semibold text-text-primary">
                  {chapter.label}
                </span>
                <span className="font-mono text-caption text-text-tertiary">
                  {formatTimestamp(chapter.at)}
                </span>
              </p>
              <p className="mt-1 text-caption text-text-secondary">
                {chapter.hint}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/solicitar-demo">Agendar demonstração</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/onboarding">Começar onboarding</Link>
        </Button>
      </div>
    </div>
  );
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function DemoPosterFrame() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-surface-elevated-1 p-5 sm:p-8">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-brand-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand-secondary/20 blur-3xl" />

      <div className="relative">
        <p className="font-mono text-caption uppercase tracking-widest text-brand-primary">
          Inteligência da Cadeia de Suprimentos
        </p>
        <p className="mt-2 max-w-md font-display text-heading-lg font-bold text-text-primary sm:text-heading-xl">
          Ruptura detectada → pedido automático em minutos
        </p>
      </div>

      <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "Alertas", value: "12" },
          { label: "Pedidos", value: "847" },
          { label: "Lojas", value: "156" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-surface-border bg-surface-base/80 px-3 py-3 backdrop-blur-sm"
          >
            <p className="font-mono text-caption text-text-tertiary">
              {item.label}
            </p>
            <p className="mt-1 font-display text-heading-md font-bold text-brand-primary">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="relative flex items-center gap-2 rounded-lg border border-surface-border bg-surface-base/80 px-3 py-2.5">
        <span className="hero-live-pulse h-2 w-2 rounded-full bg-status-success" />
        <p className="font-mono text-caption text-text-secondary">
          Terus Pulse · hub → varejo · distribuidor · indústria
        </p>
      </div>
    </div>
  );
}
