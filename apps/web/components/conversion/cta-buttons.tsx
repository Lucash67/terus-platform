import Link from "next/link";
import { Button, cn } from "@terus/ui";

import { CTA } from "@/lib/constants/conversion";

interface CtaButtonsProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  align?: "center" | "start";
  inverted?: boolean;
  showSecondary?: boolean;
}

export function CtaButtons({
  size = "lg",
  className,
  align = "center",
  inverted = false,
  showSecondary = true,
}: CtaButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row",
        align === "center" && "items-center justify-center",
        align === "start" && "items-stretch sm:items-center sm:justify-start",
        className,
      )}
    >
      <Button
        size={size}
        asChild
        className={cn(
          "w-full sm:w-auto",
          !inverted && "shadow-elevated font-semibold",
        )}
      >
        <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
      </Button>
      {showSecondary ? (
        <Button
          variant="outline"
          size={size}
          asChild
          className={cn(
            "w-full sm:w-auto",
            inverted &&
              "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
          )}
        >
          <Link href={CTA.secondary.href}>{CTA.secondary.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}
