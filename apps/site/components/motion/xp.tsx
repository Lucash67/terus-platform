"use client";

import * as React from "react";
import { cn } from "@terus/ui";

/* Primitivas de motion do site (sem dependências). Classes em app/experience.css. */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Adiciona `is-in` quando o elemento entra na tela (uma vez). */
export function useInView<T extends HTMLElement>(
  threshold = 0.2,
  immediate = false,
) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      immediate ||
      prefersReducedMotion() ||
      typeof IntersectionObserver === "undefined"
    ) {
      const t = window.setTimeout(() => node.classList.add("is-in"), 60);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, immediate]);
  return ref;
}

type InViewTag = "div" | "section" | "ul" | "ol" | "li" | "article" | "header";

interface InViewProps extends React.HTMLAttributes<HTMLElement> {
  as?: InViewTag;
  threshold?: number;
  immediate?: boolean;
}

/** Contêiner que liga as animações `.xp-in`, `.xp-clip` e `.xp-word` dos filhos. */
export function InView({
  as = "div",
  threshold,
  immediate,
  className,
  children,
  ...props
}: InViewProps) {
  const ref = useInView<HTMLElement>(threshold, immediate);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}

/** Divide o texto em palavras que sobem em sequência (o texto continua legível para leitores de tela). */
export function KineticText({
  text,
  delay = 0,
  className,
  wordClassName,
}: {
  text: string;
  delay?: number;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className="xp-word">
            <span
              className={wordClassName}
              style={{ "--i": i, "--d": `${delay}ms` } as React.CSSProperties}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/** Barra de progresso de leitura, aura que segue o cursor e granulado. */
export function Atmosphere() {
  const bar = React.useRef<HTMLDivElement>(null);
  const aura = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        bar.current?.style.setProperty(
          "--sp",
          String(Math.min(1, window.scrollY / max)),
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      aura.current?.style.setProperty("--ax", `${e.clientX}px`);
      aura.current?.style.setProperty("--ay", `${e.clientY}px`);
    };
    if (fine && !prefersReducedMotion()) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={bar} className="xp-progress" aria-hidden="true" />
      <div ref={aura} className="xp-aura hidden lg:block" aria-hidden="true" />
      <div className="xp-grain" aria-hidden="true" />
    </>
  );
}

/** Elemento que é atraído levemente pelo cursor. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "inline-flex transition-transform duration-300 ease-out",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Cartão com holofote que segue o cursor e inclinação 3D opcional. */
export function SpotCard({
  children,
  className,
  tilt = false,
  as = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tilt?: boolean;
  as?: "div" | "article" | "li";
}) {
  const Tag = as as React.ElementType;
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt && e.pointerType === "mouse" && !prefersReducedMotion()) {
      el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    }
  };
  const onLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("xp-spot", tilt && "xp-tilt", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Faixa contínua (duplica o conteúdo). Pausa no hover. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "xp-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className="xp-marquee"
        data-reverse={reverse}
        style={{ "--dur": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Progresso (0→1) de uma seção alta com conteúdo fixado (sticky).
 * Escreve `--p` no elemento e chama `onProgress` (para trocar etapas).
 */
export function useSceneProgress<T extends HTMLElement>(
  onProgress?: (p: number) => void,
) {
  const ref = React.useRef<T | null>(null);
  const cb = React.useRef(onProgress);
  cb.current = onProgress;

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const update = () => {
      const r = node.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      node.style.setProperty("--p", p.toFixed(4));
      cb.current?.(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

/** Rótulo pequeno em mono usado como "kicker" das cenas. */
export function Kicker({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-code-sm uppercase tracking-[0.2em] text-brand-primary",
        className,
      )}
    >
      {index ? <span className="text-text-tertiary">{index}</span> : null}
      <span className="h-px w-8 bg-brand-primary/60" aria-hidden="true" />
      {children}
    </p>
  );
}
