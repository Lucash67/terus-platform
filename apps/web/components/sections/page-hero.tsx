import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
}

export function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="hero-glow border-b border-surface-border">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <Badge variant="secondary" className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
            {title}
          </h1>
          <p className="mt-6 text-body-lg text-text-secondary">{description}</p>
        </div>
      </Container>
    </section>
  );
}
