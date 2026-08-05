import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { MODULES } from "@/lib/constants/modules";

export function ModulesContentSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Conteúdos por módulo
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Seis módulos integrados que compõem o ecossistema operacional Terus
            — explore cada um em detalhe.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, index) => (
            <Reveal key={module.slug} delay={Math.min(index, 7) * 70}>
              <Link
                href={`/modulos/${module.slug}`}
                className="card-interactive group block h-full rounded-xl border border-surface-border bg-surface-elevated-1 p-8"
              >
                <p className="font-display text-display-lg font-bold text-brand-primary">
                  {module.metric}
                </p>
                <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                  {module.metricLabel}
                </p>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
