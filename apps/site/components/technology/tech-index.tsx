import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TECH_COMPONENTS } from "@/lib/constants/technology";

export function TechIndex() {
  return (
    <section className="section-rhythm">
      <Container>
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_COMPONENTS.map((t, i) => (
            <Reveal key={t.slug} as="li" delay={i * 70}>
              <Link
                href={`/tecnologia/${t.slug}`}
                className="card-interactive group flex h-full flex-col rounded-2xl border border-surface-border bg-surface-elevated-1 p-6 hover:border-brand-primary/40"
              >
                <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                  {t.kicker}
                </span>
                <span className="mt-3 font-display text-heading-lg font-semibold text-text-primary group-hover:text-brand-primary">
                  {t.name}
                </span>
                <span className="mt-2 flex-1 text-body-sm leading-relaxed text-text-secondary">
                  {t.summary}
                </span>
                <span className="mt-5 text-body-sm font-semibold text-text-link">
                  Ver detalhes →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
