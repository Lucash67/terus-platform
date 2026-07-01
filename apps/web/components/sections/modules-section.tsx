import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { ModuleCard } from "@/components/sections/module-card";
import { CTA } from "@/lib/constants/conversion";
import { MODULES } from "@/lib/constants/modules";

interface ModulesSectionProps {
  showViewAll?: boolean;
  title?: string;
  description?: string;
}

export function ModulesSection({
  showViewAll = true,
  title = "Ecossistema integrado de operação",
  description = "Seis módulos que trabalham juntos para ativar, operar e monitorar clientes em jornada contínua.",
}: ModulesSectionProps) {
  return (
    <section className="section-rhythm">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Módulos Terus
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              {title}
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              {description}
            </p>
          </div>
          {showViewAll && (
            <Link
              href={CTA.secondary.href}
              className="shrink-0 text-body-md font-semibold text-brand-primary hover:underline"
            >
              {CTA.secondary.label} →
            </Link>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-body-lg text-text-secondary">
            Os seis módulos Terus não funcionam isoladamente — eles compõem um
            ecossistema integrado que sustenta toda a jornada operacional do
            cliente, do onboarding ao monitoramento contínuo.
          </p>
          <CtaButtons className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
