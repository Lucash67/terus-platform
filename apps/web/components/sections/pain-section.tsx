import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { DORES } from "@/lib/constants/lp";

export function PainSection() {
  return (
    <section className="section-rhythm relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-status-error">
            {DORES.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {DORES.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {DORES.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DORES.items.map((item, index) => (
            <Reveal
              key={item.sigla}
              variant="scale"
              delay={Math.min(index * 70, 420)}
              className="card-interactive group h-full rounded-xl border border-surface-border bg-surface-elevated-1 p-6"
            >
              <span className="inline-block rounded-md bg-status-error-dim px-2 py-0.5 font-mono text-caption font-medium uppercase tracking-wider text-status-error">
                {item.sigla}
              </span>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary transition-colors duration-300 group-hover:text-brand-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-body-md leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Cada situação é um dos 13 tipos de alerta do Terus Alert
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
