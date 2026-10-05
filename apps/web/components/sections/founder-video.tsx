"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@terus/ui";

import { FOUNDER, type FounderVideoData } from "@/lib/constants/lp";

interface FounderVideoProps extends FounderVideoData {
  className?: string;
  /** Largura renderizada da capa, usada pelo next/image */
  sizes?: string;
}

/**
 * Vídeo vertical do fundador. Mostra só a capa até o clique,
 * então nenhum byte do MP4 é baixado antes do play.
 */
export function FounderVideo({
  src,
  poster,
  title,
  duration,
  className,
  sizes = "(min-width: 1024px) 320px, 80vw",
}: FounderVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={cn("w-full max-w-xs", className)}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-2 shadow-elevated">
        {playing ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full bg-surface-base object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Assistir vídeo: ${title} (${duration})`}
            className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/10 to-transparent"
              aria-hidden="true"
            />
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
            <span className="absolute inset-x-4 bottom-4 text-left">
              <span className="inline-flex rounded-full bg-brand-primary-dim px-2 py-0.5 font-mono text-caption font-semibold uppercase tracking-wider text-brand-primary">
                {duration}
              </span>
              <span className="mt-2 block font-display text-body-md font-semibold leading-snug text-text-primary">
                {title}
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center text-body-sm text-text-secondary">
        <span className="font-semibold text-text-primary">{FOUNDER.name}</span>{" "}
        · {FOUNDER.role}
      </figcaption>
    </figure>
  );
}
