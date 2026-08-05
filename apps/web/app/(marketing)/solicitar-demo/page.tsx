import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Button } from "@terus/ui";

import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
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
      <section className="relative overflow-hidden border-b border-surface-border bg-gradient-to-b from-brand-primary-dim/40 via-surface-base to-surface-base">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="premium-cta-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="hero-fade-in mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="border border-brand-primary/20 bg-brand-primary-dim/60 text-brand-primary"
            >
              {DEMO_PAGE.badge}
            </Badge>
            <h1 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
              {DEMO_PAGE.title}
            </h1>
            <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
              {DEMO_PAGE.description}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-status-warning/30 bg-status-warning-dim px-4 py-1.5 font-mono text-caption font-semibold uppercase tracking-widest text-status-warning">
              <span
                className="hero-live-pulse h-1.5 w-1.5 rounded-full bg-status-warning"
                aria-hidden="true"
              />
              {DEMO_PAGE.urgency}
            </p>
          </div>

          <div className="hero-fade-in-delay mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {DEMO_PAGE.valueProps.map((prop) => (
              <div
                key={prop.title}
                className="card-interactive rounded-xl border border-surface-border bg-surface-elevated-1/80 p-6 text-center"
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

          <div className="hero-fade-in-delay mx-auto mt-10 max-w-xl text-center">
            <Button
              size="lg"
              asChild
              className="w-full font-semibold shadow-glow-sm transition-shadow duration-300 hover:shadow-glow sm:w-auto"
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
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              O que acontece depois
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary">
              Processo claro, sem surpresas
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {DEMO_PAGE.processSteps.map((step, index) => (
              <Reveal
                key={step.step}
                delay={index * 70}
                className="card-interactive relative rounded-xl border border-surface-border bg-surface-elevated-1 p-6"
              >
                <span className="font-mono text-caption font-bold uppercase tracking-widest text-brand-primary">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-heading-md font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* O que inclui a demo */}
      <section className="relative overflow-hidden border-b border-surface-border bg-surface-elevated-1">
        <Container className="relative py-16 sm:py-20">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal variant="left">
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
            </Reveal>

            <Reveal
              variant="scale"
              delay={100}
              className="cta-gradient tr-glow-ring rounded-xl border border-brand-primary/20 p-8 text-center text-surface-base shadow-glow"
            >
              <h3 className="font-display text-heading-lg font-bold">
                Pronto para começar?
              </h3>
              <p className="mt-3 text-body-md text-surface-base/80">
                Fale diretamente com nossa equipe comercial pelo WhatsApp — o
                canal mais rápido para agendar sua demonstração.
              </p>
              <Button
                size="lg"
                asChild
                className="mt-6 w-full bg-surface-base font-semibold text-brand-primary hover:bg-surface-elevated-1"
              >
                <a
                  href={WHATSAPP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {DEMO_PAGE.whatsappLabel}
                </a>
              </Button>
              <p className="mt-4 text-caption text-surface-base/70">
                {DEMO_PAGE.responseTime}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Fallback exploratório */}
      <section>
        <Container className="py-12 sm:py-16">
          <Reveal>
            <p className="text-center text-body-md text-text-secondary">
              Prefere conhecer a plataforma antes?{" "}
              <Link
                href={CTA.secondary.href}
                className="font-medium text-brand-primary hover:underline"
              >
                {CTA.secondary.label}
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
