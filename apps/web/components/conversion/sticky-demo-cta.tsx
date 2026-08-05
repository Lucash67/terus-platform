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
      className="tr-glass fixed bottom-0 left-0 right-0 z-40 border-t border-surface-border p-4 shadow-floating lg:hidden"
      aria-label="Agendar demonstração"
    >
      <Button size="lg" asChild className="w-full font-semibold shadow-glow-sm">
        <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
      </Button>
    </div>
  );
}
