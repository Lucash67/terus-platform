"use client";

import * as React from "react";
import { cn } from "@terus/ui";

import { CountUp } from "@/components/motion/count-up";
import { INTEGRATION_HEALTH } from "@/lib/constants/lp";

/** Recria a tela "Saúde da Integração" do portal com a nota e os pilares animados. */
export function IntegrationHealthCard({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-1 shadow-elevated",
        className,
      )}
    >
      <div className="h-1 bg-status-error" aria-hidden="true" />
      <div className="p-6 sm:p-8">
        <p className="text-center font-display text-heading-md font-semibold text-text-primary">
          {INTEGRATION_HEALTH.badge}
        </p>
        <p className="mt-1 text-center text-caption text-text-tertiary">
          Índice de 0 a 100 por fornecedor
        </p>
        <p className="mt-6 text-center font-display text-display-lg font-bold leading-none text-text-primary">
          <CountUp value={INTEGRATION_HEALTH.score} duration={1600} />
        </p>
        <p className="mt-2 text-center text-body-sm font-semibold text-status-error">
          {INTEGRATION_HEALTH.status}
        </p>

        <ul className="mt-8 space-y-4">
          {INTEGRATION_HEALTH.pillars.map((pillar, index) => (
            <li key={pillar.label}>
              <div className="flex items-baseline justify-between gap-4 text-body-sm">
                <span className="text-text-primary">{pillar.label}</span>
                <span className="shrink-0 font-mono text-caption text-text-tertiary">
                  peso {pillar.weight}% · {pillar.score}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-elevated-3">
                <div
                  className="h-full rounded-full bg-brand-secondary transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                  style={{
                    width: visible ? `${pillar.score}%` : "0%",
                    transitionDelay: `${300 + index * 120}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-caption text-text-tertiary">
          {INTEGRATION_HEALTH.note}
        </p>
      </div>
    </div>
  );
}
