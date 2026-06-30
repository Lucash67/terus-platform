import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import {
  getModuleBySlug,
  MODULE_SLUGS,
  MODULES,
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
      <section className="hero-glow border-b border-surface-border">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Link
            href="/modulos"
            className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-brand-primary"
          >
            ← Todos os módulos
          </Link>

          <div className="mt-8 max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              {module.metric} · {module.metricLabel}
            </Badge>
            <h1 className="font-display text-display-lg font-bold text-text-primary sm:text-display-xl">
              {module.name}
            </h1>
            <p className="mt-2 text-heading-md text-brand-primary">
              {module.tagline}
            </p>
            <p className="mt-6 text-body-lg text-text-secondary">
              {module.description}
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <h2 className="font-display text-heading-xl font-bold text-text-primary">
            Capacidades
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {module.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-lg border border-surface-border bg-surface-elevated-1 p-6"
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

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-16">
          <h2 className="font-display text-heading-lg font-semibold text-text-primary">
            Outros módulos
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherModules.map((m) => (
              <Button key={m.slug} variant="outline" size="sm" asChild>
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
