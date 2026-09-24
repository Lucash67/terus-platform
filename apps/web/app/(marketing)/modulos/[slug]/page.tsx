import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { ModulePreview } from "@/components/modules/module-preview";
import {
  getModuleBySlug,
  MODULE_SLUGS,
  MODULES,
  type ModuleSlug,
} from "@/lib/constants/modules";
import { createPageMetadata } from "@/lib/seo/metadata";

interface ModulePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return MODULE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ModulePageProps): Metadata {
  const module = getModuleBySlug(params.slug);
  if (!module) {
    return createPageMetadata({
      title: "Módulo não encontrado",
      description: "O módulo solicitado não existe na Terus Varejo.",
      path: "/modulos",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${module.name} — ${module.tagline}`,
    description: module.description,
    path: `/modulos/${module.slug}`,
  });
}

export default function ModuleDetailPage({ params }: ModulePageProps) {
  const module = getModuleBySlug(params.slug);
  if (!module) notFound();

  const otherModules = MODULES.filter((m) => m.slug !== module.slug).slice(
    0,
    3,
  );

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
        <div
          className="tr-horizon pointer-events-none absolute inset-x-0 bottom-0 h-px"
          aria-hidden="true"
        />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <Link
            href="/modulos"
            className="hero-fade-in inline-flex items-center gap-2 font-mono text-caption uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            ← Todos os módulos
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <h1 className="hero-fade-in font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
                {module.name}
              </h1>
              <p className="hero-fade-in mt-2 text-heading-md text-brand-primary">
                {module.tagline}
              </p>
              <p className="hero-fade-in mt-6 text-body-lg leading-relaxed text-text-secondary">
                {module.description}
              </p>

              <div className="hero-fade-in mt-8 flex items-end gap-4 border-l-2 border-brand-primary pl-5">
                <p className="font-display text-display-lg font-bold leading-none text-brand-primary">
                  {module.metric}
                </p>
                <p className="max-w-[14rem] pb-0.5 font-mono text-caption uppercase tracking-widest text-text-tertiary">
                  {module.metricLabel}
                </p>
              </div>

              <CtaButtons size="md" align="start" className="mt-10" />
            </div>

            <div className="hero-fade-in-delay">
              <ModulePreview
                slug={module.slug as ModuleSlug}
                className="hero-dashboard-float tr-glow-ring lg:ml-auto lg:max-w-md"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-rhythm">
        <Container>
          <Reveal>
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              {module.name}
            </p>
            <h2 className="mt-3 font-display text-heading-xl font-bold text-text-primary">
              Capacidades
            </h2>
            <p className="mt-2 max-w-2xl text-body-lg text-text-secondary">
              Funcionalidades projetadas para operações de varejo e distribuição
              em escala enterprise.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {module.features.map((feature, index) => (
              <Reveal key={feature} delay={Math.min(index * 70, 490)}>
                <div className="card-interactive flex h-full items-start gap-3 rounded-xl border border-surface-border bg-surface-elevated-1 p-6">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <p className="text-body-md text-text-primary">{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rhythm-alt">
        <Container>
          <Reveal>
            <h2 className="font-display text-heading-lg font-semibold text-text-primary">
              Outros módulos
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {otherModules.map((m, index) => (
              <Reveal key={m.slug} delay={Math.min(index * 70, 490)}>
                <Link
                  href={`/modulos/${m.slug}`}
                  className="card-interactive group flex h-full flex-col rounded-xl border border-surface-border bg-surface-elevated-1 p-6"
                >
                  <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                    {m.metric} · {m.metricLabel}
                  </span>
                  <span className="mt-3 font-display text-heading-md font-semibold text-text-primary transition-colors duration-200 group-hover:text-brand-primary">
                    {m.name}
                  </span>
                  <span className="mt-1 text-body-sm text-text-secondary">
                    {m.tagline}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
