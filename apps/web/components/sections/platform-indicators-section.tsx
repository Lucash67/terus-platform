import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { INDICADORES_PLATAFORMA } from "@/lib/constants/site-data";

export function PlatformIndicatorsSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Indicadores da plataforma
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            Performance operacional da jornada
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            KPIs validados em ambiente produtivo — eficiência, atendimento e
            rastreabilidade ponta a ponta.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {INDICADORES_PLATAFORMA.map((indicator, index) => (
            <Reveal
              key={indicator.title}
              variant="scale"
              delay={Math.min(index * 70, 490)}
              className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-6 text-center sm:p-8"
            >
              <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
                {indicator.title}
              </p>
              <p className="mt-3 font-display text-display-lg font-bold tracking-tight text-brand-primary transition-colors duration-300 group-hover:text-brand-primary-hover">
                {indicator.value}
              </p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {indicator.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
