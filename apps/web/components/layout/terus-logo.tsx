import Image from "next/image";

import { cn } from "@terus/ui";

import { BRAND } from "@/lib/constants/site";

interface TerusLogoProps {
  className?: string;
  /** Tamanho do wordmark oficial */
  size?: "sm" | "md" | "lg";
  /** Exibe só o monograma (favicon / espaços compactos) */
  variant?: "wordmark" | "mark";
  priority?: boolean;
}

const WORDMARK_SIZE = {
  sm: { width: 140, height: 29 },
  md: { width: 168, height: 35 },
  lg: { width: 220, height: 46 },
} as const;

const MARK_SIZE = {
  sm: { width: 28, height: 28 },
  md: { width: 36, height: 36 },
  lg: { width: 48, height: 48 },
} as const;

/**
 * Logo oficial Terus.TEC (wordmark ou monograma).
 * Assets em /public/logos/terus com fundo transparente.
 */
export function TerusLogo({
  className,
  size = "md",
  variant = "wordmark",
  priority = false,
}: TerusLogoProps) {
  if (variant === "mark") {
    const dims = MARK_SIZE[size];
    return (
      <Image
        src={BRAND.logos.mark}
        alt={BRAND.name}
        width={dims.width}
        height={dims.height}
        priority={priority}
        className={cn("h-auto w-auto object-contain", className)}
      />
    );
  }

  const dims = WORDMARK_SIZE[size];
  return (
    <Image
      src={BRAND.logos.primary}
      alt={`${BRAND.name} — Tecnologia para Varejo`}
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
