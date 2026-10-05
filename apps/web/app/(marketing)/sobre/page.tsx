import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { FounderVideoSection } from "@/components/sections/founder-video-section";
import { PageHero } from "@/components/sections/page-hero";
import { RedeTerusSection } from "@/components/sections/rede-terus-section";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { ABOUT } from "@/lib/constants/copy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a Terus",
  description:
    "A Terus conecta a rede, a loja e o fornecedor para que o produto comprado chegue à gôndola, esteja bem exposto e venda.",
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
          <Reveal className="mx-auto max-w-3xl text-center">
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
        </Container>
      </section>

      <FounderVideoSection />
      <RedeTerusSection />
      <ReliabilitySection />
      <CtaSection />
    </>
  );
}
