import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ENTERPRISE_TRUST } from "@/lib/constants/copy";
import { PILARES_CONFIABILIDADE } from "@/lib/constants/site-data";

const ICON_PATHS: Record<
  (typeof PILARES_CONFIABILIDADE)[number]["icon"],
  string[]
> = {
  leitura: [
    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z",
    "M12 15a3 3 0 100-6 3 3 0 000 6z",
  ],
  rede: [
    "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z",
    "M9 12l2 2 4-4",
  ],
  usuario: ["M12 12a4 4 0 100-8 4 4 0 000 8z", "M4 21a8 8 0 0116 0"],
};

export function ReliabilitySection() {
  return (
    <section className="section-rhythm">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {ENTERPRISE_TRUST.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            {ENTERPRISE_TRUST.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {ENTERPRISE_TRUST.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {PILARES_CONFIABILIDADE.map((pillar, index) => (
            <Reveal
              key={pillar.name}
              variant="scale"
              delay={Math.min(index * 70, 490)}
              className="card-interactive group rounded-xl border border-surface-border bg-surface-base p-6 text-center sm:p-8"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICON_PATHS[pillar.icon].map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary transition-colors duration-300 group-hover:text-brand-primary">
                {pillar.name}
              </h3>
              <p className="mt-3 text-body-md leading-relaxed text-text-secondary">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
