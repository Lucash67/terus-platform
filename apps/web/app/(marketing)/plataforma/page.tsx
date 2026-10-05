import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ErpTickerSection } from "@/components/sections/erp-ticker-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";
import { PlatformSurfacesSection } from "@/components/sections/platform-surfaces-section";
import { PositioningSection } from "@/components/sections/positioning-section";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { PLATAFORMA } from "@/lib/constants/lp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Plataforma: portais e app da Terus Varejo",
  description:
    "Portal Terus Varejo, Portal do Fornecedor e app Terus Task trabalhando sobre o mesmo dado da rede — da detecção do problema à correção na loja.",
  path: "/plataforma",
});

export default function PlataformaPage() {
  return (
    <>
      <PageHero
        badge={PLATAFORMA.badge}
        title={PLATAFORMA.title}
        titleAccent={PLATAFORMA.titleAccent}
        description={PLATAFORMA.description}
      />
      <PlatformSurfacesSection />
      <PositioningSection />
      <ModulesSection />
      <ErpTickerSection />
      <ReliabilitySection />
      <CtaSection />
    </>
  );
}
