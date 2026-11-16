import { Container } from "@/components/layout/container";
import { InView, KineticText } from "@/components/motion/xp";

interface PageHeroProps {
  badge?: string;
  title: string;
  /** Trecho final da headline em destaque (apresentação; o copy completo é title + titleAccent) */
  titleAccent?: string;
  description: string;
}

/**
 * Topo das páginas internas (Experience 2.0): título cinético alinhado à esquerda,
 * a palavra do contexto em contorno gigante ao fundo e uma linha de varredura na base.
 */
export function PageHero({
  badge,
  title,
  titleAccent,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="xp-lines pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      {badge ? (
        <p
          className="xp-outline-text pointer-events-none absolute -right-8 top-8 select-none whitespace-nowrap font-display font-bold leading-none tracking-tighter"
          style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
          aria-hidden="true"
        >
          {badge}
        </p>
      ) : null}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative pb-20 pt-16 lg:pb-28 lg:pt-24">
        <InView immediate className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {badge ? (
              <p className="xp-in flex items-center gap-3 font-mono text-code-sm uppercase tracking-[0.2em] text-brand-primary">
                <span className="xp-ring inline-block h-2 w-2 rounded-full bg-brand-primary text-brand-primary" />
                {badge}
              </p>
            ) : null}
            <h1
              className="mt-6 font-display font-bold leading-[1.04] tracking-tight text-text-primary"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <KineticText text={title} />
              {titleAccent ? (
                <>
                  {" "}
                  <KineticText
                    text={titleAccent}
                    delay={200}
                    wordClassName="xp-gradient-text"
                  />
                </>
              ) : null}
            </h1>
          </div>
          <p
            className="xp-in text-body-lg text-text-secondary lg:col-span-4"
            style={{ "--d": "450ms" } as React.CSSProperties}
          >
            {description}
          </p>
        </InView>
      </Container>

      <div
        className="relative h-px overflow-hidden bg-surface-border"
        aria-hidden="true"
      >
        <span className="xp-scan absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
      </div>
    </section>
  );
}
