import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Operação Integrada | Terus Platform",
  description:
    "Seis módulos que sustentam toda a jornada operacional — onboarding, ativação, operação, monitoramento e governança.",
};

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
