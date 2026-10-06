"use client";

import * as React from "react";
import { cn } from "@terus/ui";

import { FounderVideo } from "@/components/sections/founder-video";
import { CTA } from "@/lib/constants/conversion";
import { FOUNDER_VIDEOS, SUPPLIER_QUOTE } from "@/lib/constants/lp";

const VIDEO = FOUNDER_VIDEOS.fornecedor;
const { chapters, questions, questionsChapter } = SUPPLIER_QUOTE;
/** Duração real do arquivo, para a barra do último capítulo */
const VIDEO_SECONDS = 75;

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

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
 * Vídeo do fornecedor com roteiro clicável: os capítulos acompanham a fala,
 * as perguntas da gôndola acendem no momento em que o Rodrigo as faz e cada
 * capítulo leva o vídeo ao ponto certo, com som.
 */
export function SupplierVideoSpotlight() {
  const seekRef = React.useRef<((seconds: number) => void) | null>(null);
  const [time, setTime] = React.useState(0);

  let active = 0;
  chapters.forEach((chapter, index) => {
    if (time >= chapter.at) active = index;
  });

  return (
    <div className="relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-3xl border border-surface-border bg-surface-elevated-1/60 p-6 shadow-premium sm:p-10">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative grid items-start gap-10 md:grid-cols-[17rem_1fr] lg:gap-14">
        <div className="relative mx-auto w-full max-w-[17rem]">
          <div
            className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-b from-brand-primary/30 via-brand-primary/5 to-transparent blur-xl"
            aria-hidden="true"
          />
          <FounderVideo
            {...VIDEO}
            className="relative"
            sizes="272px"
            onTime={setTime}
            seekRef={seekRef}
          />
        </div>

        <div>
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Do fundador · {VIDEO.duration}
          </p>
          <blockquote className="mt-4">
            <p className="font-display text-heading-lg font-bold leading-snug text-text-primary sm:text-heading-xl">
              <span className="text-brand-primary">“</span>
              {SUPPLIER_QUOTE.quote}
              <span className="text-brand-primary">”</span>
            </p>
          </blockquote>
          <p className="mt-5 font-display text-heading-md font-semibold text-text-primary">
            {SUPPLIER_QUOTE.hook}
          </p>
          <p className="mt-2 text-body-md leading-relaxed text-text-secondary">
            {SUPPLIER_QUOTE.description}
          </p>

          <p className="mt-8 font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
            Neste vídeo
          </p>
          <ol className="mt-3 space-y-1.5">
            {chapters.map((chapter, index) => {
              const isActive = index === active;
              const done = index < active;
              const end = chapters[index + 1]?.at ?? VIDEO_SECONDS;
              const fill = isActive
                ? Math.min(
                    1,
                    Math.max(0, (time - chapter.at) / (end - chapter.at)),
                  )
                : done
                  ? 1
                  : 0;
              return (
                <li key={chapter.label}>
                  <button
                    type="button"
                    onClick={() => seekRef.current?.(chapter.at)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                      isActive
                        ? "border-brand-primary/40 bg-brand-primary-dim"
                        : "border-transparent hover:border-surface-border hover:bg-surface-elevated-2",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-caption font-semibold transition-colors duration-300",
                          done
                            ? "bg-brand-primary text-surface-base"
                            : isActive
                              ? "border border-brand-primary text-brand-primary"
                              : "border border-surface-border text-text-tertiary",
                        )}
                      >
                        {done ? <CheckIcon className="h-3 w-3" /> : index + 1}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-body-md font-semibold transition-colors duration-300",
                          isActive || done
                            ? "text-text-primary"
                            : "text-text-secondary group-hover:text-text-primary",
                        )}
                      >
                        {chapter.label}
                      </span>
                      <span className="font-mono text-caption text-text-tertiary">
                        {formatTimestamp(chapter.at)}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500",
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden pl-9">
                        <span className="block pt-1 text-body-sm text-text-secondary">
                          {chapter.hint}
                        </span>
                        {index === questionsChapter ? (
                          <span className="mt-3 flex flex-wrap gap-2">
                            {questions.map((question) => {
                              const asked = time >= question.at;
                              return (
                                <span
                                  key={question.text}
                                  className={cn(
                                    "rounded-full border px-3 py-1 text-caption transition-all duration-500",
                                    asked
                                      ? "border-brand-primary/50 bg-surface-base text-text-primary shadow-glow-sm"
                                      : "border-surface-border text-text-tertiary",
                                  )}
                                >
                                  {question.text}
                                </span>
                              );
                            })}
                          </span>
                        ) : null}
                      </span>
                    </span>

                    <span
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-primary transition-transform duration-300 ease-linear"
                      style={{ transform: `scaleX(${isActive ? fill : 0})` }}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <a
            href={CTA.secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-display text-body-md font-semibold text-text-link transition-colors hover:text-brand-primary"
          >
            Quero o meu negócio mais conectado
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
