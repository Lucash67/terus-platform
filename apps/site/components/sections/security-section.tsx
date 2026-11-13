import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SECURITY_POINTS } from "@/lib/constants/platform";

/** Segurança e requisitos — sem certificações ou SLAs não confirmados. */
export function SecuritySection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Segurança e requisitos
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary">
            Uma integração que o seu TI aprova
          </h2>
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {SECURITY_POINTS.map((p, i) => (
            <Reveal
              key={p.title}
              as="li"
              delay={i * 70}
              className="flex gap-4 rounded-2xl border border-surface-border bg-surface-elevated-1 p-5"
            >
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-status-success"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-text-primary">{p.title}</p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
