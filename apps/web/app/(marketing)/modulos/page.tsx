import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Módulos Terus — Operação Integrada",
  description:
    "Seis módulos que sustentam toda a jornada operacional — Alert, Strategy, Order, Task, Log e Pulse para supply chain intelligence.",
  path: "/modulos",
});

export default function ModulosPage() {
  return (
    <>
      <PageHero
        badge="Operação"
        title="Seis módulos integrados para operação contínua"
        description="Cada módulo sustenta uma etapa da jornada operacional — do onboarding ao monitoramento contínuo, em um ambiente unificado."
      />
      <ModulesSection showViewAll={false} />
      <CtaSection />
    </>
  );
}
