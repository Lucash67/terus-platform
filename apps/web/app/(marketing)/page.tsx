import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { OperationalResultsSection } from "@/components/sections/operational-results-section";
import { PlatformIndicatorsSection } from "@/components/sections/platform-indicators-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { SecurityGovernanceSection } from "@/components/sections/security-governance-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { PositioningSection } from "@/components/sections/positioning-section";
import { StatsSection } from "@/components/sections/stats-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PositioningSection />
      <ModulesSection />
      <EcosystemSection />
      <OperationalResultsSection />
      <PlatformIndicatorsSection />
      <CompaniesSection />
      <SecurityGovernanceSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
