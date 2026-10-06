import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { IntegrationHealthCard } from "@/components/sections/integration-health-card";
import { OrderJourney3D } from "@/components/sections/order-journey-3d";
import { SupplierVideoSpotlight } from "@/components/sections/supplier-video-spotlight";
import { INTEGRATION_HEALTH, PONTE_FORNECEDOR } from "@/lib/constants/lp";

export function SupplierBridgeSection() {
  return (
    <section className="section-rhythm relative overflow-x-clip">
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-brand-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {PONTE_FORNECEDOR.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {PONTE_FORNECEDOR.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {PONTE_FORNECEDOR.description}
          </p>
        </Reveal>
      </Container>

      <div className="hidden lg:block">
        <OrderJourney3D />
      </div>

      <Container className="relative">
        <div className="relative mt-14 lg:hidden">
          <div
            className="tr-horizon pointer-events-none absolute inset-x-8 top-5 hidden h-px md:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-6 md:grid-cols-5">
            {PONTE_FORNECEDOR.steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={Math.min(index * 90, 450)}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary bg-surface-base font-mono text-body-sm font-semibold text-brand-primary shadow-glow-sm">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="mt-14">
          <ul className="flex flex-wrap justify-center gap-3">
            {PONTE_FORNECEDOR.extras.map((extra) => (
              <li
                key={extra}
                className="rounded-full border border-surface-border bg-surface-elevated-1 px-4 py-2 text-body-sm text-text-secondary"
              >
                {extra}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_26rem] lg:gap-16">
          <Reveal variant="left">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              {INTEGRATION_HEALTH.badge}
            </p>
            <h3 className="mt-4 font-display text-heading-xl font-bold text-text-primary">
              {INTEGRATION_HEALTH.title}
            </h3>
            <p className="mt-4 text-body-lg text-text-secondary">
              {INTEGRATION_HEALTH.description}
            </p>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <IntegrationHealthCard />
          </Reveal>
        </div>

        <Reveal variant="scale" delay={120}>
          <SupplierVideoSpotlight />
        </Reveal>
      </Container>
    </section>
  );
}
