import Link from "next/link";

import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TechFlow } from "@/components/technology/tech-flow";
import { getModuleBySlug } from "@/lib/constants/modules";
import {
  TECH_COMPONENTS,
  type TechComponent,
} from "@/lib/constants/technology";

export function TechDetail({ tech }: { tech: TechComponent }) {
  const others = TECH_COMPONENTS.filter((t) => t.slug !== tech.slug);
  return (
    <>
      <section className="hero-section-bg relative overflow-hidden">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <nav
            aria-label="Trilha"
            className="hero-fade-in font-mono text-caption uppercase tracking-widest text-text-tertiary"
          >
            <Link href="/plataforma" className="hover:text-brand-primary">
              Plataforma
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/tecnologia" className="hover:text-brand-primary">
              Tecnologia
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-text-secondary">{tech.name}</span>
          </nav>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="hero-fade-in font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                {tech.kicker}
              </p>
              <h1 className="hero-fade-in mt-4 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
                {tech.name}
              </h1>
              <p className="hero-fade-in-delay mt-4 font-display text-heading-lg text-text-primary">
                {tech.headline}
              </p>
              <p className="hero-fade-in-delay mt-4 max-w-xl text-body-lg leading-relaxed text-text-secondary">
                {tech.summary}
              </p>
            </div>
            <div className="hero-fade-in-delay rounded-2xl border border-surface-border bg-surface-base/80 p-6 shadow-premium backdrop-blur">
              <p className="mb-4 font-mono text-caption uppercase tracking-widest text-text-tertiary">
                Onde fica no fluxo
              </p>
              <TechFlow
                from={tech.flow.from}
                name={tech.name}
                to={tech.flow.to}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rhythm">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <h2 className="font-display text-heading-xl font-bold text-text-primary">
                O que faz
              </h2>
              <ol className="mt-6 flex flex-col gap-3">
                {tech.does.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-xl border border-surface-border bg-surface-elevated-1 p-4"
                  >
                    <span className="font-mono text-body-sm font-bold text-brand-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-md text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              {tech.specs ? (
                <>
                  <h2 className="font-display text-heading-xl font-bold text-text-primary">
                    Na prática
                  </h2>
                  <ul className="mt-6 flex flex-col gap-3">
                    {tech.specs.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 text-body-md text-text-secondary"
                      >
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-status-success"
                          aria-hidden="true"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <h2
                className={`${tech.specs ? "mt-10" : ""} font-display text-heading-xl font-bold text-text-primary`}
              >
                Módulos relacionados
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {tech.related.map((slug) => {
                  const m = getModuleBySlug(slug);
                  return m ? (
                    <li key={slug}>
                      <Link
                        href={`/modulos/${slug}`}
                        className="card-interactive block h-full rounded-xl border border-surface-border bg-surface-elevated-1 p-4 hover:border-brand-primary/40"
                      >
                        <span className="block font-semibold text-text-primary">
                          {m.name}
                        </span>
                        <span className="mt-1 block text-body-sm text-text-tertiary">
                          {m.tagline}
                        </span>
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1/40">
        <Container className="py-12">
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Outros componentes
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tecnologia/${t.slug}`}
                  className="inline-flex rounded-full border border-surface-border px-4 py-2 text-body-sm text-text-secondary transition-colors hover:border-brand-primary/40 hover:text-text-primary"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CtaButtons align="start" />
          </div>
        </Container>
      </section>
    </>
  );
}
