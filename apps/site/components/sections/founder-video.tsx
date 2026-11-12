"use client";

import Image from "next/image";
import { useEffect, useRef, type MutableRefObject } from "react";
import { cn } from "@terus/ui";

import { FOUNDER, type FounderVideoData } from "@/lib/constants/lp";
import { useAutoplayWithSound } from "@/lib/use-autoplay-with-sound";

interface FounderVideoProps extends FounderVideoData {
  className?: string;
  /** Largura renderizada da capa, usada pelo next/image */
  sizes?: string;
  /** Recebe o segundo atual a cada `timeupdate` */
  onTime?: (seconds: number) => void;
  /** Preenchido com uma função que leva o vídeo a um segundo, com som */
  seekRef?: MutableRefObject<((seconds: number) => void) | null>;
}

/**
 * Vídeo vertical do fundador. Nada do MP4 é baixado antes de entrar na tela;
 * reprodução e som seguem `useAutoplayWithSound`.
 */
export function FounderVideo({
  src,
  poster,
  title,
  duration,
  className,
  sizes = "(min-width: 1024px) 320px, 80vw",
  onTime,
  seekRef,
}: FounderVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { started, withSound, playWithSound } = useAutoplayWithSound({
    containerRef,
    videoRef,
    label: title,
  });

  useEffect(() => {
    if (!seekRef) return;
    seekRef.current = (seconds) => {
      const video = videoRef.current;
      if (!video) return;
      if (!withSound) {
        playWithSound(seconds);
        return;
      }
      video.currentTime = seconds;
      void video.play().catch(() => undefined);
    };
  }, [seekRef, withSound, playWithSound]);

  return (
    <figure className={cn("w-full max-w-xs", className)}>
      <div
        ref={containerRef}
        className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-2 shadow-elevated"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          controls={withSound}
          onTimeUpdate={
            onTime
              ? (event) => onTime(event.currentTarget.currentTime)
              : undefined
          }
          className="h-full w-full bg-surface-base object-cover"
        />

        {!withSound ? (
          <button
            type="button"
            onClick={() => playWithSound()}
            aria-label={`Assistir com som: ${title} (${duration})`}
            className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes={sizes}
              className={cn(
                "object-cover transition-opacity duration-500",
                started ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/10 to-transparent"
              aria-hidden="true"
            />
            {started ? (
              <span
                className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-brand-primary px-3 py-1.5 font-mono text-caption font-semibold text-surface-base shadow-glow transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M15.5 8.5a5 5 0 010 7" />
                  <path d="M19 5a10 10 0 010 14" />
                </svg>
                Ativar som
              </span>
            ) : (
              <span
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-primary text-surface-base shadow-glow transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7"
                  fill="currentColor"
                >
                  <path d="M8 5.5v13l10.5-6.5L8 5.5z" />
                </svg>
              </span>
            )}
            <span className="absolute inset-x-4 bottom-4 text-left">
              <span className="inline-flex rounded-full bg-brand-primary-dim px-2 py-0.5 font-mono text-caption font-semibold uppercase tracking-wider text-brand-primary">
                {duration}
              </span>
              <span className="mt-2 block font-display text-body-md font-semibold leading-snug text-text-primary">
                {title}
              </span>
            </span>
          </button>
        ) : null}
      </div>
      <figcaption className="mt-3 text-center text-body-sm text-text-secondary">
        <span className="font-semibold text-text-primary">{FOUNDER.name}</span>{" "}
        · {FOUNDER.role}
      </figcaption>
    </figure>
  );
}
