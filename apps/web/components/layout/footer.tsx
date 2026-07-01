import Link from "next/link";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { FOOTER_COPY } from "@/lib/constants/copy";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-base">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-lg transition-opacity duration-200 hover:opacity-80"
            >
              <TerusLogo className="h-8 w-auto object-contain" />
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="font-display text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                Plataforma
              </h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS.plataforma.map((link) => (
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

            <div>
              <h3 className="font-display text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                Módulos
              </h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS.modulos.map((link) => (
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

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-display text-caption font-semibold uppercase tracking-wider text-text-tertiary">
                Empresa
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/cases"
                    className="text-body-sm text-text-secondary transition-colors duration-200 hover:text-brand-primary"
                  >
                    Cases de Sucesso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solicitar-demo"
                    className="text-body-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
                  >
                    Agendar demonstração
                  </Link>
                </li>
                {FOOTER_LINKS.sobre.map((link) => (
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
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 sm:flex-row">
          <p className="text-caption text-text-tertiary">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
            reservados.
          </p>
          <p className="text-caption text-text-tertiary">
            Supply Chain Intelligence · Varejo · Indústria · Distribuição
          </p>
        </div>
      </Container>
    </footer>
  );
}
