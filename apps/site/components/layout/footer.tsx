import Link from "next/link";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { InView, KineticText, Magnetic, Marquee } from "@/components/motion/xp";
import { FOOTER_COPY } from "@/lib/constants/copy";
import { CTA } from "@/lib/constants/conversion";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants/navigation";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/site";

const SIGNALS = [
  "Ruptura",
  "Excesso",
  "Sem venda",
  "Queda",
  "Oferta sem cartaz",
  "Margem negativa",
  "Pedido no ERP",
  "Foto de evidência",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-surface-border">
      <Marquee duration={50} className="border-b border-surface-border py-4">
        {SIGNALS.map((s) => (
          <span
            key={s}
            className="mx-6 flex items-center gap-6 font-mono text-code-sm uppercase tracking-[0.2em] text-text-tertiary"
          >
            {s}
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-primary"
              aria-hidden="true"
            />
          </span>
        ))}
      </Marquee>

      <Container className="relative py-20 lg:py-28">
        <InView className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-code-sm uppercase tracking-[0.2em] text-brand-primary">
              Próximo passo
            </p>
            <h2 className="mt-4 font-display text-display-xl font-bold tracking-tight text-text-primary lg:text-display-2xl">
              <KineticText text="Coloque a sua gôndola" />{" "}
              <KineticText
                text="para trabalhar a favor."
                delay={200}
                wordClassName="xp-gradient-text"
              />
            </h2>
            <div
              className="xp-in mt-10 flex flex-wrap gap-3"
              style={{ "--d": "400ms" } as React.CSSProperties}
            >
              <Magnetic>
                <Link
                  href={CTA.primary.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-primary px-7 py-4 text-body-lg font-semibold text-surface-base"
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
              <a
                href={CTA.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-surface-border px-7 py-4 text-body-lg font-medium text-text-primary transition-colors hover:border-brand-primary/50"
              >
                WhatsApp comercial
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-code-sm uppercase tracking-[0.2em] text-text-tertiary">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block text-body-sm text-text-secondary transition-all duration-300 hover:translate-x-1 hover:text-brand-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </InView>

        <div className="mt-20 flex flex-col gap-6 border-t border-surface-border pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Terus — página inicial"
              className="inline-flex"
            >
              <TerusLogo size="lg" />
            </Link>
            <p className="mt-3 max-w-sm text-body-sm text-text-secondary">
              {SITE_TAGLINE}. {FOOTER_COPY.slogan}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
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
            <p className="text-caption text-text-tertiary">
              © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </Container>

      <p
        className="xp-outline-text pointer-events-none select-none whitespace-nowrap text-center font-display font-bold leading-none tracking-tighter"
        style={{
          fontSize: "clamp(6rem, 24vw, 22rem)",
          marginBottom: "-0.18em",
        }}
        aria-hidden="true"
      >
        TERUS
      </p>
    </footer>
  );
}
