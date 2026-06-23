import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { OperationalResultsSection } from "@/components/sections/operational-results-section";
import { PlatformIndicatorsSection } from "@/components/sections/platform-indicators-section";
import { CompaniesSection } from "@/components/sections/companies-section";
import { SecurityGovernanceSection } from "@/components/sections/security-governance-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { IntegrationsEcosystemSection } from "@/components/sections/integrations-ecosystem-section";
import { PositioningSection } from "@/components/sections/positioning-section";
import { StatsSection } from "@/components/sections/stats-section";
import { RedeTerusSection } from "@/components/sections/rede-terus-section";
import { InstitutionalVideosSection } from "@/components/sections/institutional-videos-section";
import { EducationalVideosSection } from "@/components/sections/educational-videos-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PositioningSection />
      <ModulesSection />
      <EcosystemSection />
      <IntegrationsEcosystemSection />
      <OperationalResultsSection />
      <PlatformIndicatorsSection />
      <CompaniesSection />
      <SecurityGovernanceSection />
      <RedeTerusSection />
      <InstitutionalVideosSection />
      <EducationalVideosSection />
      <SocialProofSection />
      <ReliabilitySection />
      <CtaSection />
    </>
  );
}
