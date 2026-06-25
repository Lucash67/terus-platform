"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { MAIN_NAV_LINKS } from "@/lib/constants/navigation";
import { TerusLogo } from "@/components/layout/terus-logo";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface-base/80 backdrop-blur-xl">
      <Container>
        <nav
          className="flex h-16 items-center justify-between lg:h-18"
          aria-label="Navegação principal"
        >
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <TerusLogo />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-4 py-2 text-body-md font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "bg-surface-elevated-2 text-brand-primary"
                    : "text-text-secondary hover:bg-surface-elevated-1 hover:text-text-primary",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" disabled>
              Acessar plataforma
            </Button>
            <Button size="sm" asChild>
              <Link href="/solicitar-demo">Agendar demonstração</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-surface-border text-text-primary lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-surface-border py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {MAIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-4 py-3 text-body-md font-medium transition-colors",
                    pathname === link.href
                      ? "bg-surface-elevated-2 text-brand-primary"
                      : "text-text-secondary hover:bg-surface-elevated-1 hover:text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Button variant="outline" className="w-full" disabled>
                Acessar plataforma
              </Button>
              <Button className="w-full" asChild>
                <Link href="/solicitar-demo">Agendar demonstração</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
