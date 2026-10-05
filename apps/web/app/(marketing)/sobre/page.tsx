import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { FounderVideo } from "@/components/sections/founder-video";
import { FounderVideoSection } from "@/components/sections/founder-video-section";
import { PageHero } from "@/components/sections/page-hero";
import { RedeTerusSection } from "@/components/sections/rede-terus-section";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { ABOUT } from "@/lib/constants/copy";
import { FOUNDER_VIDEOS } from "@/lib/constants/lp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a Terus",
  description:
    "Conectamos a rede, a loja e o fornecedor para que o produto comprado chegue à gôndola, esteja bem exposto e venda.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        badge={ABOUT.hero.badge}
        title={ABOUT.hero.title}
        description={ABOUT.hero.description}
      />

      <section className="section-rhythm">
        <Container>
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <Reveal variant="left" className="text-center lg:text-left">
              <h2 className="font-display text-heading-xl font-bold tracking-tight text-text-primary">
                {ABOUT.whatIs.title}
              </h2>
              {ABOUT.whatIs.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-body-lg leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal variant="right" delay={120} className="flex justify-center">
              <FounderVideo {...FOUNDER_VIDEOS.institucional} />
            </Reveal>
          </div>
        </Container>
      </section>

      <FounderVideoSection />
      <RedeTerusSection />
      <ReliabilitySection />
      <CtaSection />
    </>
  );
}
