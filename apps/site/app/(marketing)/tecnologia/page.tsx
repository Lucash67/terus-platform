import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { FlowPipelineSection } from "@/components/sections/flow-pipeline-section";
import { PageHero } from "@/components/sections/page-hero";
import { TechIndex } from "@/components/technology/tech-index";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Tecnologia — Agent, IAproc, Bond e Portal",
  description:
    "Os componentes por trás da Terus: captura (Agent), inteligência (IAproc), integração (Bond), Portal do Cliente, Task Web e Teams.",
  path: "/tecnologia",
});

export default function TecnologiaPage() {
  return (
    <>
      <PageHero
        badge="Tecnologia"
        title="Os componentes"
        titleAccent="por trás da plataforma"
        description="Da conexão com o ERP à execução das equipes: o que cada parte da Terus faz."
      />
      <TechIndex />
      <FlowPipelineSection id="fluxo" />
      <CtaSection />
    </>
  );
}
