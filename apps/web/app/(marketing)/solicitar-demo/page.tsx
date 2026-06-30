import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Button } from "@terus/ui";

import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Container } from "@/components/layout/container";
import { CTA, DEMO_PAGE, WHATSAPP_DEMO_URL } from "@/lib/constants/conversion";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Agendar Demonstração",
  description:
    "Agende uma demonstração executiva da Terus Platform e conheça como eliminar ruptura, automatizar reposição e operar com Supply Chain Intelligence.",
  path: "/solicitar-demo",
});

export default function SolicitarDemoPage() {
  return (
    <>
      {/* Hero de conversão */}
      <section className="border-b border-surface-border bg-gradient-to-b from-brand-primary-dim/40 via-surface-base to-surface-base">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="border border-brand-primary/20 bg-brand-primary-dim/60 text-brand-dark"
            >
              {DEMO_PAGE.badge}
            </Badge>
            <h1 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
              {DEMO_PAGE.title}
            </h1>
            <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
              {DEMO_PAGE.description}
            </p>
            <p className="mt-4 font-display text-body-sm font-semibold text-brand-primary">
              {DEMO_PAGE.urgency}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {DEMO_PAGE.valueProps.map((prop) => (
              <div
                key={prop.title}
                className="rounded-lg border border-surface-border bg-surface-base p-6 text-center"
              >
                <h2 className="font-display text-heading-md font-semibold text-text-primary">
                  {prop.title}
                </h2>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-xl text-center">
            <Button
              size="lg"
              asChild
              className="w-full font-semibold shadow-elevated sm:w-auto"
            >
              <a
                href={WHATSAPP_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {DEMO_PAGE.whatsappLabel}
              </a>
            </Button>
            <p className="mt-4 text-body-sm text-text-tertiary">
              {DEMO_PAGE.responseTime}
            </p>
            <div className="mt-6">
              <CtaButtons size="md" showSecondary />
            </div>
          </div>
        </Container>
      </section>

      {/* Processo após envio */}
      <section className="border-b border-surface-border">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              O que acontece depois
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary">
              Processo claro, sem surpresas
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {DEMO_PAGE.processSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-lg border border-surface-border bg-surface-elevated-1 p-6"
              >
                <span className="font-mono text-caption font-bold text-brand-primary">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-heading-md font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* O que inclui a demo */}
      <section className="border-b border-surface-border bg-surface-elevated-1">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-heading-xl font-bold text-text-primary">
                O que você verá na demonstração
              </h2>
              <p className="mt-4 text-body-md text-text-secondary">
                Sessão consultiva focada em resultado operacional — não apenas
                slides institucionais.
              </p>
              <ul className="mt-6 space-y-3">
                {DEMO_PAGE.demoIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body-md text-text-secondary"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim">
                      <svg
                        className="h-3 w-3 text-brand-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cta-gradient rounded-xl border border-brand-primary/20 p-8 text-center text-white">
              <h3 className="font-display text-heading-lg font-bold">
                Pronto para começar?
              </h3>
              <p className="mt-3 text-body-md text-white/80">
                Fale diretamente com nossa equipe comercial pelo WhatsApp — o
                canal mais rápido para agendar sua demonstração.
              </p>
              <Button
                size="lg"
                asChild
                className="mt-6 w-full bg-white font-semibold text-brand-primary hover:bg-white/90"
              >
                <a
                  href={WHATSAPP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {DEMO_PAGE.whatsappLabel}
                </a>
              </Button>
              <p className="mt-4 text-caption text-white/70">
                {DEMO_PAGE.responseTime}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Fallback exploratório */}
      <section>
        <Container className="py-12 sm:py-16">
          <p className="text-center text-body-md text-text-secondary">
            Prefere conhecer a plataforma antes?{" "}
            <Link
              href={CTA.secondary.href}
              className="font-medium text-brand-primary hover:underline"
            >
              {CTA.secondary.label}
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
