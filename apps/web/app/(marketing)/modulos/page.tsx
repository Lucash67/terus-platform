import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Módulos | Terus Platform",
  description:
    "Conheça os seis módulos da Terus Platform: Alert, Strategy, Order, Task, Log e Pulse.",
};

export default function ModulosPage() {
  return (
    <>
      <PageHero
        badge="Módulos"
        title="Cada módulo, um resultado operacional"
        description="A Terus Platform é composta por seis módulos especializados que cobrem toda a jornada — da detecção de ruptura à execução em loja."
      />
      <ModulesSection showViewAll={false} />
      <CtaSection />
    </>
  );
}
