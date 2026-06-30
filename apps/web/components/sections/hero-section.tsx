import { Badge } from "@terus/ui";

import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Container } from "@/components/layout/container";
import { HeroDashboardPreview } from "@/components/sections/hero-dashboard-preview";
import { HERO, SITE_TAGLINE } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="hero-section-bg relative overflow-hidden border-b border-surface-border">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-primary-dim/30 via-surface-base to-surface-base"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy column */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <div className="hero-fade-in flex flex-col items-center gap-3 lg:items-start">
              <Badge
                variant="secondary"
                className="border border-brand-primary/20 bg-brand-primary-dim/60 px-3 py-1 text-brand-dark"
              >
                <span className="hero-live-pulse mr-2 inline-block h-1.5 w-1.5 rounded-full bg-status-success" />
                {SITE_TAGLINE}
              </Badge>
            </div>

            <h1 className="hero-fade-in mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl lg:text-display-2xl">
              {HERO.headline}{" "}
              <span className="text-gradient">{HERO.headlineAccent}</span>
            </h1>

            <p className="hero-fade-in mt-6 max-w-xl text-body-lg leading-relaxed text-text-secondary lg:mx-0">
              {HERO.description}
            </p>

            <ul className="hero-fade-in mt-8 space-y-3">
              {HERO.highlights.map((highlight) => (
                <li
                  key={highlight}
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
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="hero-fade-in mt-10 flex flex-col items-center lg:items-start">
              <CtaButtons
                size="lg"
                align="center"
                className="lg:justify-start"
              />
            </div>

            {/* Trust stats strip */}
            <div className="hero-fade-in mt-12 grid grid-cols-2 gap-6 border-t border-surface-border pt-8 sm:grid-cols-4">
              {HERO.trustStats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-display text-heading-lg font-bold text-brand-primary">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-caption text-text-tertiary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview column */}
          <div className="hero-fade-in-delay relative">
            <HeroDashboardPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
