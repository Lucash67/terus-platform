"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@terus/ui";

import { TerusLogo } from "@/components/layout/terus-logo";
import { Magnetic } from "@/components/motion/xp";
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
    "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-body-md font-medium transition-colors",
    active
      ? "text-text-primary"
      : "text-text-secondary hover:text-text-primary",
  );
  const activeDot = active ? (
    <span
      className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-primary"
      aria-hidden="true"
    />
  ) : null;

  if (!group.items) {
    return (
      <Link
        href={group.href}
        className={triggerClass}
        aria-current={active ? "page" : undefined}
      >
        {group.label}
        {activeDot}
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
            "h-3.5 w-3.5 transition-transform duration-300",
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
        {activeDot}
      </button>
      {open ? (
        <div
          className={cn(
            "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4",
            group.items.length > 4 ? "w-[44rem]" : "w-[30rem]",
          )}
        >
          <ul
            className={cn(
              "nav-pop grid gap-1 rounded-3xl border border-surface-border bg-surface-base/95 p-2 shadow-floating backdrop-blur-xl",
              group.items.length > 4 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {group.items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-surface-elevated-1 focus-visible:bg-surface-elevated-1 focus-visible:outline-none"
                >
                  <span className="mt-1 font-mono text-code-sm text-text-tertiary group-hover:text-brand-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-body-md font-semibold text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-body-sm text-text-tertiary">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-surface-base focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <nav
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-6",
          scrolled
            ? "max-w-6xl border-surface-border bg-surface-base/75 shadow-floating backdrop-blur-xl"
            : "max-w-7xl border-transparent bg-transparent",
        )}
        aria-label="Navegação principal"
      >
        <Link href="/" className="shrink-0" aria-label="Terus — página inicial">
          <TerusLogo priority className="w-28 sm:w-32" />
        </Link>

        <div className="hidden items-center xl:flex">
          {MAIN_NAV.map((group) => (
            <DesktopMenu key={group.label} group={group} pathname={pathname} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="rounded-full" />
          {ONBOARDING_ENABLED ? (
            <Link
              href="/entrar"
              className="hidden rounded-full px-4 py-2 text-body-md font-medium text-text-secondary hover:text-text-primary xl:inline-flex"
            >
              Entrar
            </Link>
          ) : null}
          <Magnetic className="hidden sm:inline-flex">
            <Link
              href={CTA.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-body-md font-semibold text-surface-base transition-shadow hover:shadow-glow"
            >
              {CTA.primary.label}
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </Magnetic>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-surface-border px-4 text-body-sm font-medium text-text-primary xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            Menu
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-surface-base xl:hidden"
        >
          <div
            className="xp-lines pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />
          <div className="relative flex h-20 items-center justify-between px-6">
            <TerusLogo className="w-28" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-surface-border px-4 text-body-sm font-medium text-text-primary"
            >
              Fechar
              <span aria-hidden="true">✕</span>
            </button>
          </div>
          <ul className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-8">
            {MAIN_NAV.map((group, i) => (
              <li
                key={group.label}
                className="xp-page"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Link
                  href={group.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="font-mono text-code-sm text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-display-lg font-bold tracking-tight text-text-primary transition-colors group-hover:text-brand-primary">
                    {group.label}
                  </span>
                </Link>
                {group.items ? (
                  <div className="mb-2 ml-10 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-full border border-surface-border px-3 py-1 text-body-sm text-text-secondary hover:border-brand-primary/50 hover:text-text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col gap-2 px-6 pb-8">
            <Link
              href={CTA.primary.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-brand-primary px-6 py-4 text-center text-body-lg font-semibold text-surface-base"
            >
              {CTA.primary.label} →
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={CTA.specialist.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-surface-border px-4 py-3 text-center text-body-md text-text-primary"
              >
                Falar com a equipe
              </Link>
              {ONBOARDING_ENABLED ? (
                <Link
                  href="/entrar"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-surface-border px-4 py-3 text-center text-body-md text-text-primary"
                >
                  Entrar
                </Link>
              ) : (
                <a
                  href={CTA.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-surface-border px-4 py-3 text-center text-body-md text-text-primary"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
