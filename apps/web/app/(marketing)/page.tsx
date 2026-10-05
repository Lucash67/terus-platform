import type { Metadata } from "next";

import { ClientLogosStrip } from "@/components/sections/client-logos-strip";
import { CtaSection } from "@/components/sections/cta-section";
import { ErpTickerSection } from "@/components/sections/erp-ticker-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FounderVideoSection } from "@/components/sections/founder-video-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IntegrationsEcosystemSection } from "@/components/sections/integrations-ecosystem-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PainSection } from "@/components/sections/pain-section";
import { PersonasSection } from "@/components/sections/personas-section";
import { PositioningSection } from "@/components/sections/positioning-section";
import { RealResultsSection } from "@/components/sections/real-results-section";
import { RedeTerusSection } from "@/components/sections/rede-terus-section";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { SupplierBridgeSection } from "@/components/sections/supplier-bridge-section";
import { OnboardingSlotSection } from "@/components/sections/onboarding-slot-section";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_DESCRIPTION } from "@/lib/constants/site";

// Fora da LP por ora (repetiam conteúdo): EcosystemSection,
// PlatformIndicatorsSection, CompaniesSection.
// ProductDemoSection ocultada até haver vídeo real do produto.

export const metadata: Metadata = createPageMetadata({
  title: "Terus Varejo — Inteligência da Cadeia de Suprimentos",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogosStrip />
      <RealResultsSection />
      <PainSection />
      <FounderVideoSection />
      <PositioningSection />
      <PersonasSection />
      <ModulesSection />
      <SupplierBridgeSection />
      <ErpTickerSection />
      <IntegrationsEcosystemSection />
      <SocialProofSection />
      <RedeTerusSection />
      <ReliabilitySection />
      {ONBOARDING_ENABLED ? <OnboardingSlotSection /> : null}
      <FaqSection />
      <CtaSection />
    </>
  );
}
