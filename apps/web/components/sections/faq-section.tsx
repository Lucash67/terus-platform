import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FAQ } from "@/lib/constants/lp";

export function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="section-rhythm-alt">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {FAQ.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {FAQ.title}
          </h2>
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-surface-border bg-surface-base px-6 py-5 transition-colors duration-200 open:border-brand-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-heading-md font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-brand-primary transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3">
                    <path
                      d="M6 2v8M2 6h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-body-md leading-relaxed text-text-secondary">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
