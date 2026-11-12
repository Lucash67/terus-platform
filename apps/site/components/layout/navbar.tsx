"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CTA } from "@/lib/constants/conversion";
import { MAIN_NAV, type NavGroup } from "@/lib/constants/navigation";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";

function isActive(pathname: string, group: NavGroup): boolean {
  const hrefs = [
    group.href,
    ...(group.items ?? []).map((i) => i.href.split("#")[0]),
  ];
  return hrefs.some((h) => pathname === h || pathname.startsWith(`${h}/`));
}

function DesktopMenu({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = isActive(pathname, group);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const triggerClass = cn(
    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-body-md font-medium transition-colors",
    active
      ? "text-brand-primary"
      : "text-text-secondary hover:bg-surface-elevated-1 hover:text-text-primary",
  );

  if (!group.items) {
    return (
      <Link
        href={group.href}
        className={triggerClass}
        aria-current={active ? "page" : undefined}
      >
        {group.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <svg
          viewBox="0 0 16 16"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>
      {open ? (
        <div
          className={cn(
            "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2",
            group.items.length > 4 ? "w-[40rem]" : "w-[28rem]",
          )}
        >
          <ul
            className={cn(
              "nav-pop grid gap-1 rounded-2xl border border-surface-border bg-surface-base p-2 shadow-floating",
              group.items.length > 4 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex flex-col rounded-xl px-4 py-3 transition-colors hover:bg-surface-elevated-1 focus-visible:bg-surface-elevated-1 focus-visible:outline-none"
                >
                  <span className="text-body-md font-semibold text-text-primary group-hover:text-brand-primary">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="text-body-sm text-text-tertiary">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="tr-glass sticky top-0 z-50 border-b border-surface-border/60">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-surface-base focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-4 lg:h-18"
          aria-label="Navegação principal"
        >
          <Link
            href="/"
            className="shrink-0"
            aria-label="Terus — página inicial"
          >
            <TerusLogo priority className="w-28 sm:w-32" />
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {MAIN_NAV.map((group) => (
              <DesktopMenu
                key={group.label}
                group={group}
                pathname={pathname}
              />
            ))}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <ThemeToggle />
            {ONBOARDING_ENABLED ? (
              <Link
                href="/entrar"
                className="rounded-md px-3 py-2 text-body-md font-medium text-text-secondary hover:text-text-primary"
              >
                Entrar
              </Link>
            ) : null}
            <Button variant="outline" size="md" asChild>
              <Link href={CTA.specialist.href}>{CTA.specialist.label}</Link>
            </Button>
            <Button size="md" asChild className="font-semibold shadow-elevated">
              <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <Button
              size="sm"
              asChild
              className="hidden font-semibold sm:inline-flex"
            >
              <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
            </Button>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-surface-border text-text-primary"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
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
          </div>
        </nav>

        {mobileOpen ? (
          <div
            id="menu-mobile"
            className="nav-pop max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-surface-border py-4 xl:hidden"
          >
            <ul className="flex flex-col gap-1">
              {MAIN_NAV.map((group) => (
                <li key={group.label}>
                  {group.items ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-body-md font-medium text-text-primary"
                        aria-expanded={expanded === group.label}
                        onClick={() =>
                          setExpanded((v) =>
                            v === group.label ? null : group.label,
                          )
                        }
                      >
                        {group.label}
                        <span aria-hidden="true">
                          {expanded === group.label ? "−" : "+"}
                        </span>
                      </button>
                      {expanded === group.label ? (
                        <ul className="mb-2 ml-4 border-l border-surface-border pl-2">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-body-sm text-text-secondary hover:text-text-primary"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-4 py-3 text-body-md font-medium text-text-primary"
                    >
                      {group.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Button className="w-full font-semibold" asChild>
                <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={CTA.specialist.href}>{CTA.specialist.label}</Link>
              </Button>
              {ONBOARDING_ENABLED ? (
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/entrar">Entrar</Link>
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
