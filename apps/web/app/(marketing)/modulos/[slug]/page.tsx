import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
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
      description: "O módulo solicitado não existe na Terus Platform.",
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
      <section className="hero-section-bg border-b border-surface-border">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Link
            href="/modulos"
            className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            ← Todos os módulos
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <Badge variant="secondary" className="mb-4">
                {module.metric} · {module.metricLabel}
              </Badge>
              <h1 className="font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
                {module.name}
              </h1>
              <p className="mt-2 text-heading-md text-brand-primary">
                {module.tagline}
              </p>
              <p className="mt-6 text-body-lg leading-relaxed text-text-secondary">
                {module.description}
              </p>
              <CtaButtons size="md" align="start" className="mt-8" />
            </div>

            <ModulePreview
              slug={module.slug as ModuleSlug}
              className="hero-dashboard-float lg:ml-auto lg:max-w-md"
            />
          </div>
        </Container>
      </section>

      <section className="section-rhythm">
        <Container>
          <h2 className="font-display text-heading-xl font-bold text-text-primary">
            Capacidades
          </h2>
          <p className="mt-2 max-w-2xl text-body-lg text-text-secondary">
            Funcionalidades projetadas para operações de varejo e distribuição
            em escala enterprise.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {module.features.map((feature, index) => (
              <div
                key={feature}
                className="card-interactive flex items-start gap-3 rounded-xl border border-surface-border bg-surface-elevated-1 p-6"
                style={{ animationDelay: `${index * 60}ms` }}
              >
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
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rhythm-alt">
        <Container>
          <h2 className="font-display text-heading-lg font-semibold text-text-primary">
            Outros módulos
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherModules.map((m) => (
              <Button
                key={m.slug}
                variant="outline"
                size="sm"
                asChild
                className="transition-all duration-200 hover:border-brand-primary/40 hover:bg-brand-primary-dim/30"
              >
                <Link href={`/modulos/${m.slug}`}>{m.name}</Link>
              </Button>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
