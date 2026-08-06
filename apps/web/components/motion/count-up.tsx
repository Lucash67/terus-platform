"use client";

import * as React from "react";

interface CountUpProps {
  /** Valor final da animação */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Casas decimais (usa vírgula no formato BR) */
  decimals?: number;
  /** Duração em ms */
  duration?: number;
  /** Separador de milhar no padrão pt-BR (1.234) */
  locale?: boolean;
  /** Inicia no mount — use no hero (above-the-fold) */
  immediate?: boolean;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(n: number, decimals: number, locale: boolean): string {
  if (locale) {
    return n.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  if (decimals > 0) {
    return n.toFixed(decimals).replace(".", ",");
  }
  return String(Math.round(n));
}

/**
 * Anima um número de 0 até o valor final ao entrar no viewport.
 * Respeita prefers-reduced-motion (mostra o valor final imediatamente).
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  locale = false,
  immediate = false,
  className,
}: CountUpProps) {
  const [display, setDisplay] = React.useState(
    () => `${prefix}${formatNumber(0, decimals, locale)}${suffix}`,
  );
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);

  const run = React.useCallback(() => {
    if (started.current) return;
    started.current = true;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(`${prefix}${formatNumber(value, decimals, locale)}${suffix}`);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = value * easeOutCubic(progress);
      setDisplay(
        `${prefix}${formatNumber(current, decimals, locale)}${suffix}`,
      );
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value, prefix, suffix, decimals, duration, locale]);

  React.useEffect(() => {
    if (immediate) {
      const timer = window.setTimeout(run, 200);
      return () => window.clearTimeout(timer);
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, run]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
