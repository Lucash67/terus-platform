import type { ReactNode } from "react";

import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FounderVideo } from "@/components/sections/founder-video";
import { FOUNDER_SECTION, FOUNDER_VIDEOS } from "@/lib/constants/lp";

export function FounderVideoSection({ children }: { children?: ReactNode }) {
  return (
    <section className="section-rhythm-alt relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <Reveal variant="left" className="text-center lg:text-left">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              {FOUNDER_SECTION.badge}
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              {FOUNDER_SECTION.title}
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              {FOUNDER_SECTION.description}
            </p>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left lg:mx-0">
              {FOUNDER_SECTION.questions.map((question) => (
                <li
                  key={question}
                  className="rounded-xl border-l-2 border-brand-primary bg-surface-base/60 px-4 py-3 text-body-md font-medium text-text-primary"
                >
                  {question}
                </li>
              ))}
            </ul>
            {children ?? <CtaButtons className="mt-10 lg:justify-start" />}
          </Reveal>

          <Reveal variant="scale" delay={120} className="flex justify-center">
            <FounderVideo {...FOUNDER_VIDEOS.dinheiroNaMesa} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
