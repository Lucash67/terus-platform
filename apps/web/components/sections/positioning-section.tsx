import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { POSITIONING_POINTS } from "@/lib/constants/site";

const PILLAR_VARIANTS = ["left", "up", "right"] as const;

export function PositioningSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Como funciona
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Detecta, executa e mede — em reais
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Relatório não repõe gôndola. A Terus transforma cada alerta em uma
            atividade na loja e mostra se a venda voltou.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSITIONING_POINTS.map((point, index) => (
            <Reveal
              key={point.title}
              variant={PILLAR_VARIANTS[index % PILLAR_VARIANTS.length]}
              delay={Math.min(index * 70, 490)}
              className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary-dim font-mono text-body-sm font-medium text-brand-primary transition-all duration-300 group-hover:shadow-glow-sm">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-heading-md font-semibold text-text-primary transition-colors duration-300 group-hover:text-brand-primary">
                {point.title}
              </h3>
              <p className="mt-3 text-body-md text-text-secondary">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
