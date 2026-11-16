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
  sm: { width: 160, height: 15 },
  md: { width: 192, height: 18 },
  lg: { width: 256, height: 24 },
} as const;

const MARK_SIZE = {
  sm: { width: 28, height: 28 },
  md: { width: 36, height: 36 },
  lg: { width: 48, height: 48 },
} as const;

/**
 * Logo oficial Terus.varejo (wordmark) ou monograma Terus.
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
    <>
      <Image
        src={BRAND.logos.primary}
        alt="Terus Varejo"
        width={dims.width}
        height={dims.height}
        priority={priority}
        className={cn(
          "hidden h-auto w-auto object-contain [.light_&]:block",
          className,
        )}
      />
      <Image
        src={BRAND.logos.primaryDark}
        alt="Terus Varejo"
        width={dims.width}
        height={dims.height}
        priority={priority}
        className={cn(
          "block h-auto w-auto object-contain [.light_&]:hidden",
          className,
        )}
      />
    </>
  );
}
