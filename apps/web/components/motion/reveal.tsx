"use client";

import * as React from "react";

type RevealVariant = "up" | "scale" | "left" | "right";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "tr-reveal",
  scale: "tr-reveal-scale",
  left: "tr-reveal-left",
  right: "tr-reveal-right",
};

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  variant?: RevealVariant;
  /** Atraso em ms para escalonar elementos irmãos */
  delay?: number;
  /** Elemento a renderizar (padrão: div) */
  as?: "div" | "section" | "article" | "li" | "span";
}

/**
 * Revela o conteúdo com movimento quando entra no viewport.
 * Nunca usar em conteúdo above-the-fold (hero usa animações CSS imediatas).
 */
export function Reveal({
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-revealed");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp: React.ElementType = Tag;
  const setRef = React.useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  return (
    <Comp
      ref={setRef}
      className={[VARIANT_CLASS[variant], className].filter(Boolean).join(" ")}
      style={
        delay
          ? ({
              ...style,
              "--reveal-delay": `${delay}ms`,
            } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
