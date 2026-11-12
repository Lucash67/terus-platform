import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PLATFORM_COMPONENTS } from "@/lib/constants/platform";

export function PlatformComponentsSection() {
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
          {PLATFORM_COMPONENTS.map((c, i) => (
            <Reveal
              key={c.name}
              as="li"
              delay={i * 80}
              className="rounded-2xl border border-surface-border bg-surface-elevated-1 p-5 transition-colors hover:border-brand-primary/40"
            >
              <p className="font-display text-heading-md font-semibold text-text-primary">
                {c.name}
              </p>
              <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
                {c.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
