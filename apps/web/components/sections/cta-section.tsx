import Link from "next/link";
import { Badge, Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CTA } from "@/lib/constants/conversion";
import { CTA_SECTION } from "@/lib/constants/copy";

interface CtaSectionProps {
  className?: string;
}

export function CtaSection({ className }: CtaSectionProps) {
  return (
    <section
      className={cn("section-rhythm", className)}
      aria-labelledby="cta-final-title"
    >
      <Container>
        <div className="premium-cta-card relative overflow-hidden rounded-2xl border border-surface-border bg-surface-base px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 premium-cta-glow"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-brand-primary/20 bg-brand-primary-dim/60 text-brand-dark"
            >
              {CTA_SECTION.badge}
            </Badge>

            <h2
              id="cta-final-title"
              className="font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg"
            >
              {CTA_SECTION.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg leading-relaxed text-text-secondary">
              {CTA_SECTION.description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                asChild
                className="w-full min-w-[220px] shadow-floating transition-all duration-300 hover:shadow-elevated hover:brightness-105 sm:w-auto"
              >
                <Link href={CTA.primary.href}>{CTA.primary.label}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full border-surface-border bg-surface-base/80 backdrop-blur-sm transition-all duration-300 hover:border-brand-primary/30 hover:bg-brand-primary-dim/30 sm:w-auto"
              >
                <Link href={CTA.secondary.href}>{CTA.secondary.label}</Link>
              </Button>
            </div>

            <ul
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-surface-border/80 pt-8"
              aria-label="Indicadores de confiança"
            >
              {CTA_SECTION.trustIndicators.map((item) => (
                <li key={item.label} className="text-center">
                  <p className="font-display text-heading-md font-bold text-brand-primary">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-caption text-text-tertiary">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
