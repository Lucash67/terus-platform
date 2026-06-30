"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@terus/ui";

import { CTA } from "@/lib/constants/conversion";

export function StickyDemoCta() {
  const pathname = usePathname();

  if (pathname === CTA.primary.href) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-border bg-surface-base/95 p-4 shadow-floating backdrop-blur-lg lg:hidden"
      aria-label="Agendar demonstração"
    >
      <Button
        size="lg"
        asChild
        className="w-full font-semibold shadow-elevated"
      >
        <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
      </Button>
    </div>
  );
}
