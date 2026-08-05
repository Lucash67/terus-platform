import { cn } from "@terus/ui";

import { BRAND } from "@/lib/constants/site";

interface TerusLogoProps {
  className?: string;
  /** Tamanho do wordmark */
  size?: "sm" | "md" | "lg";
}

/**
 * Wordmark da marca em texto — nativo do tema dark enterprise.
 * O arquivo /logos/terus/terus.jpg (fundo branco) fica reservado
 * para contextos impressos/claros.
 */
export function TerusLogo({ className, size = "md" }: TerusLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-bold tracking-[0.18em] text-text-primary",
        size === "sm" && "text-body-md",
        size === "md" && "text-heading-md",
        size === "lg" && "text-heading-xl",
        className,
      )}
      aria-label={BRAND.name}
    >
      TERUS
      <span className="text-brand-primary">.</span>
      <span className="font-medium tracking-[0.22em] text-brand-primary">
        TEC
      </span>
    </span>
  );
}
