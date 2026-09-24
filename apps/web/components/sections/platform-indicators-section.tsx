import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { INDICADORES_PLATAFORMA } from "@/lib/constants/site-data";

export function PlatformIndicatorsSection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Indicadores da Terus Varejo
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
                {index === 0 ? (
                  <>
                    <span className="text-text-tertiary">35% → </span>
                    <CountUp value={0.5} decimals={1} suffix="%" />
                  </>
                ) : index === 1 ? (
                  <>
                    <span className="text-text-tertiary">40% → </span>
                    <CountUp value={96} suffix="%" />
                  </>
                ) : index === 2 ? (
                  <CountUp value={31881} locale />
                ) : (
                  <>
                    <CountUp value={86} suffix="%" />
                    <span className="text-text-tertiary"> a </span>
                    <CountUp value={96} suffix="%" />
                  </>
                )}
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
