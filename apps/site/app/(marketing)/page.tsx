import type { Metadata } from "next";

import { HeroLivingShelf } from "@/components/home/hero-living-shelf";
import { LeaksSection } from "@/components/home/leaks-section";
import { ModulesOrbit } from "@/components/home/modules-orbit";
import { ProofSection } from "@/components/home/proof-section";
import { SignalJourney } from "@/components/home/signal-journey";
import { StoreQueuesSection } from "@/components/home/store-queues-section";
import { TrustSection } from "@/components/home/trust-section";
import { TwoPortalsSection } from "@/components/home/two-portals-section";
import { FaqSection } from "@/components/sections/faq-section";
import { OnboardingSlotSection } from "@/components/sections/onboarding-slot-section";
import { SITE_DESCRIPTION } from "@/lib/constants/site";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terus Varejo — Inteligência da Cadeia de Suprimentos",
  description: SITE_DESCRIPTION,
  path: "/",
});

/**
 * Home institucional (Experience 2.0): narrativa em cenas — sinais da gôndola,
 * caminho do dado, app da loja, módulos, os dois portais, prova real e integração.
 * A LP comercial (apps/web) continua com a sua própria home.
 */
export default function HomePage() {
  return (
    <>
      <HeroLivingShelf />
      <LeaksSection />
      <SignalJourney />
      <StoreQueuesSection />
      <ModulesOrbit />
      <TwoPortalsSection />
      <ProofSection />
      <TrustSection />
      {ONBOARDING_ENABLED ? <OnboardingSlotSection /> : null}
      <FaqSection />
    </>
  );
}
