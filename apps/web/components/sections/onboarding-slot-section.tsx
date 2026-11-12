import Link from "next/link";
import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ONBOARDING_STEPS } from "@/lib/constants/onboarding";

/**
 * Espaço do funil de onboarding na LP. Só é renderizado quando
 * ONBOARDING_ENABLED está ativo (ver lib/feature-flags.ts).
 */
export function OnboardingSlotSection() {
  return (
    <section
      id="onboarding"
      className="section-rhythm relative overflow-hidden"
    >
      <Container className="relative">
        {process.env.NODE_ENV !== "production" ? (
          <p className="mx-auto mb-6 w-fit rounded-full border border-status-warning/30 bg-status-warning-dim px-3 py-1 font-mono text-caption font-semibold uppercase tracking-widest text-status-warning">
            Prévia · oculto em produção
          </p>
        ) : null}

        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Onboarding
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Conecte a sua rede à Terus
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Do cadastro à ativação, guiado passo a passo.
          </p>
        </Reveal>

        <ol className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {ONBOARDING_STEPS.map((step, index) => (
            <Reveal
              key={step.id}
              as="li"
              delay={Math.min(index * 60, 360)}
              className="rounded-xl border border-surface-border bg-surface-elevated-1 p-4 text-center"
            >
              <span className="font-mono text-caption font-bold text-brand-primary">
                {String(step.order).padStart(2, "0")}
              </span>
              <p className="mt-2 text-body-sm font-semibold text-text-primary">
                {step.label}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button size="lg" asChild>
            <Link href="/onboarding">Começar onboarding</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
