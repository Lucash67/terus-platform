import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { PLATAFORMA } from "@/lib/constants/lp";

export function PlatformSurfacesSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLATAFORMA.surfaces.map((surface, index) => (
            <Reveal
              key={surface.name}
              as="article"
              variant="scale"
              delay={index * 80}
              className="card-interactive flex h-full flex-col rounded-xl border border-surface-border bg-surface-elevated-1 p-8"
            >
              <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                {surface.audience}
              </p>
              <h2 className="mt-3 font-display text-heading-lg font-bold text-text-primary">
                {surface.name}
              </h2>
              <ul className="mt-6 flex-1 space-y-3">
                {surface.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-body-md text-text-secondary"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
              {"note" in surface ? (
                <p className="mt-6 border-t border-surface-border pt-4 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  {surface.note}
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
