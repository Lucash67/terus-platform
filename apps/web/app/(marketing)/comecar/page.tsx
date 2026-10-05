import type { Metadata } from "next";
import { Badge, Button } from "@terus/ui";

import { PreCadastroForm } from "@/components/conversion/pre-cadastro-form";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FounderVideoSection } from "@/components/sections/founder-video-section";
import { CTA, DEMO_PAGE } from "@/lib/constants/conversion";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Comece com a sua rede",
  description:
    "Pré-cadastro da Terus Varejo: conte qual ERP a rede usa e quantas lojas tem, e nossa equipe retoma com você pelo WhatsApp.",
  path: "/comecar",
});

export default function SolicitarDemoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-surface-border bg-gradient-to-b from-brand-primary/5 via-surface-base to-surface-base">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="premium-cta-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_32rem]">
            <div className="hero-fade-in text-center lg:text-left">
              <Badge
                variant="secondary"
                className="border border-brand-primary/20 bg-brand-primary/5 text-brand-primary"
              >
                {DEMO_PAGE.badge}
              </Badge>
              <h1 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
                {DEMO_PAGE.title}{" "}
                <span className="text-gradient">{DEMO_PAGE.titleAccent}</span>
              </h1>
              <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
                {DEMO_PAGE.description}
              </p>
              <p className="mt-6 font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
                {DEMO_PAGE.trustLine}
              </p>
            </div>

            <div id="pre-cadastro" className="hero-fade-in-delay scroll-mt-24">
              <PreCadastroForm />
            </div>
          </div>
        </Container>
      </section>

      <FounderVideoSection>
        <div className="mt-10 flex justify-center lg:justify-start">
          <Button
            size="lg"
            asChild
            className="font-semibold shadow-glow-sm transition-shadow duration-300 hover:shadow-glow"
          >
            <a href="#pre-cadastro">{DEMO_PAGE.form.title}</a>
          </Button>
        </div>
      </FounderVideoSection>

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

      <section className="relative overflow-hidden border-b border-surface-border bg-surface-elevated-1">
        <Container className="relative py-16 sm:py-20">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="font-display text-heading-xl font-bold text-text-primary">
              O que você verá na demonstração
            </h2>
            <p className="mt-4 text-body-md text-text-secondary">
              O produto funcionando, não slides institucionais.
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
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16">
          <Reveal>
            <p className="text-center text-body-md text-text-secondary">
              Prefere conversar antes de preencher?{" "}
              <a
                href={CTA.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-primary hover:underline"
              >
                {CTA.secondary.label}
              </a>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
