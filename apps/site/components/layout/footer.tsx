import Link from "next/link";
import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { FOOTER_COPY } from "@/lib/constants/copy";
import { CTA } from "@/lib/constants/conversion";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants/navigation";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-surface-elevated-1/40">
      <div
        className="tr-horizon pointer-events-none absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
      />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-lg transition-opacity duration-200 hover:opacity-80"
              aria-label="Terus — página inicial"
            >
              <TerusLogo size="lg" />
            </Link>
            <p className="mt-5 font-display text-body-md font-medium text-text-primary">
              {SITE_TAGLINE}
            </p>
            <p className="mt-2 max-w-xs text-body-sm leading-relaxed text-text-secondary">
              {FOOTER_COPY.slogan}
            </p>
            <p className="mt-3 max-w-xs text-body-sm text-text-tertiary">
              {FOOTER_COPY.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="sm" asChild className="font-semibold">
                <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={CTA.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp comercial
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-text-secondary transition-colors duration-200 hover:text-brand-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 sm:flex-row">
          <p className="text-caption text-text-tertiary">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
            reservados.
          </p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-caption text-text-tertiary hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
