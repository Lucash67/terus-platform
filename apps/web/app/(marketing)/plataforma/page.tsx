import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { FictionalDemoSection } from "@/components/sections/fictional-demo-section";
import { FlowPipelineSection } from "@/components/sections/flow-pipeline-section";
import { IntegrationsEcosystemSection } from "@/components/sections/integrations-ecosystem-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";
import { PlatformComponentsSection } from "@/components/sections/platform-components-section";
import { PlatformTourSection } from "@/components/sections/platform-tour-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Plataforma — do ERP à gôndola",
  description:
    "Como a Terus lê o ERP da rede, transforma estoque e venda em alertas priorizados por R$, guia a loja pelo app e mede o resultado.",
  path: "/plataforma",
});

export default function PlataformaPage() {
  return (
    <>
      <PageHero
        badge="Plataforma"
        title="Coleta, inteligência e execução"
        titleAccent="na mesma plataforma"
        description="A Terus lê o ERP que a rede já usa, aponta o que está tirando venda, conduz a loja na correção e mostra quanto voltou."
      />
      <FlowPipelineSection />
      <FictionalDemoSection />
      <PlatformTourSection />
      <IntegrationsEcosystemSection />
      <ModulesSection />
      <PlatformComponentsSection />
      <CtaSection />
    </>
  );
}
