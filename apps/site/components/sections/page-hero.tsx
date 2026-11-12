import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";

interface PageHeroProps {
  badge?: string;
  title: string;
  /** Trecho final da headline destacado com text-gradient (apresentação; o copy completo é title + titleAccent) */
  titleAccent?: string;
  description: string;
}

export function PageHero({
  badge,
  title,
  titleAccent,
  description,
}: PageHeroProps) {
  return (
    <section className="hero-section-bg relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-brand-secondary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="tr-horizon pointer-events-none absolute inset-x-0 bottom-0 h-px"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="hero-fade-in mb-6 flex justify-center">
              <Badge
                variant="secondary"
                className="border border-brand-primary/30 bg-brand-primary-dim px-3 py-1 font-mono text-caption uppercase tracking-widest text-brand-primary"
              >
                <span className="hero-live-pulse mr-2 inline-block h-1.5 w-1.5 rounded-full bg-status-success" />
                {badge}
              </Badge>
            </div>
          )}
          <h1 className="hero-fade-in font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="text-gradient">{titleAccent}</span>
              </>
            )}
          </h1>
          <p className="hero-fade-in-delay mt-6 text-body-lg text-text-secondary">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
