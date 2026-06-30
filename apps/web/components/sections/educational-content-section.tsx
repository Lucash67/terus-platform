import Link from "next/link";
import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { POSITIONING_POINTS } from "@/lib/constants/site";

export function EducationalContentSection() {
  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Supply Chain Intelligence na prática
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Três capacidades centrais que diferenciam a Terus de ferramentas
            genéricas de integração e BI.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSITIONING_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8"
            >
              <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                {point.title}
              </h3>
              <p className="mt-4 text-body-md text-text-secondary">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/modulos">Conhecer os módulos Terus</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
