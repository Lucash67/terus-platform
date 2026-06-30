import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MODULES } from "@/lib/constants/modules";

export function ModulesContentSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Conteúdos por módulo
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Seis módulos integrados que compõem o ecossistema operacional Terus
            — explore cada um em detalhe.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => (
            <Link
              key={module.slug}
              href={`/modulos/${module.slug}`}
              className="group rounded-lg border border-surface-border bg-surface-base p-8 transition-colors hover:border-brand-primary/30 hover:bg-surface-elevated-1"
            >
              <p className="font-display text-display-lg font-bold text-brand-primary">
                {module.metric}
              </p>
              <p className="text-caption text-text-tertiary">
                {module.metricLabel}
              </p>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary group-hover:text-brand-primary">
                {module.name}
              </h3>
              <p className="mt-2 text-body-sm font-medium text-text-secondary">
                {module.tagline}
              </p>
              <p className="mt-3 text-body-md text-text-secondary">
                {module.description}
              </p>
              <p className="mt-4 text-body-sm font-medium text-brand-primary">
                Saiba mais →
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
