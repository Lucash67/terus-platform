import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SUPORTE_ANJO } from "@/lib/constants/platform";
import { TECH_COMPONENTS } from "@/lib/constants/technology";

const PORTAL_SLUGS = ["portal-do-cliente", "task-web", "teams"] as const;

export function PlatformComponentsSection() {
  const items = TECH_COMPONENTS.filter((t) =>
    (PORTAL_SLUGS as readonly string[]).includes(t.slug),
  );
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Além dos módulos
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary">
            Portal, execução e suporte próximo
          </h2>
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={i * 80}>
              <Link
                href={`/tecnologia/${c.slug}`}
                className="card-interactive group flex h-full flex-col rounded-2xl border border-surface-border bg-surface-elevated-1 p-5 hover:border-brand-primary/40"
              >
                <span className="font-display text-heading-md font-semibold text-text-primary group-hover:text-brand-primary">
                  {c.name}
                </span>
                <span className="mt-2 flex-1 text-body-sm leading-relaxed text-text-secondary">
                  {c.summary}
                </span>
                <span className="mt-4 text-body-sm font-semibold text-text-link">
                  Saiba mais →
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal
            as="li"
            delay={items.length * 80}
            className="rounded-2xl border border-dashed border-surface-border bg-surface-elevated-1/60 p-5"
          >
            <p className="font-display text-heading-md font-semibold text-text-primary">
              {SUPORTE_ANJO.name}
            </p>
            <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
              {SUPORTE_ANJO.description}
            </p>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
