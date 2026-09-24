import Link from "next/link";

import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { SOCIAL_PROOF } from "@/lib/constants/copy";
import {
  CONTEUDOS_CASES,
  PROVA_SOCIAL_PILARES,
  REDE_TERUS,
} from "@/lib/constants/site-data";

const featuredCase = CONTEUDOS_CASES[0];

export function SocialProofSection() {
  const varejos = REDE_TERUS.varejos.length;
  const distribuidores = REDE_TERUS.distribuidores.length;
  const indicators = featuredCase?.executiveIndicators ?? [];
  const beforeAfter = featuredCase?.beforeAfterIndicators;

  return (
    <section className="section-rhythm-alt relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {SOCIAL_PROOF.badge}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            {SOCIAL_PROOF.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {SOCIAL_PROOF.description}
          </p>
        </Reveal>

        {/* Faixa de rede — prova de escala real */}
        <Reveal delay={60}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-surface-border bg-surface-elevated-1/60 px-6 py-4 text-center backdrop-blur-sm">
            <p className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
              <span className="font-display text-heading-md font-bold text-brand-primary">
                <CountUp value={varejos} />
              </span>{" "}
              varejos
            </p>
            <span
              className="hidden h-4 w-px bg-surface-border sm:block"
              aria-hidden="true"
            />
            <p className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
              <span className="font-display text-heading-md font-bold text-brand-primary">
                <CountUp value={distribuidores} />
              </span>{" "}
              distribuidores
            </p>
            <span
              className="hidden h-4 w-px bg-surface-border sm:block"
              aria-hidden="true"
            />
            <p className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
              ERP{" "}
              <span className="font-semibold text-text-primary">Winthor</span>
            </p>
            <span
              className="hidden h-4 w-px bg-surface-border sm:block"
              aria-hidden="true"
            />
            <p className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
              <span className="font-semibold text-text-primary">31.881</span>{" "}
              pedidos auditados
            </p>
          </div>
        </Reveal>

        {/* Case em destaque — centralizado */}
        {featuredCase ? (
          <Reveal delay={100} className="mx-auto mt-12 max-w-4xl">
            <article className="overflow-hidden rounded-2xl border border-surface-border bg-surface-base shadow-elevated">
              <div className="border-b border-surface-border bg-surface-elevated-1/80 px-6 py-5 sm:px-10 sm:py-6">
                <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                  Case em produção
                </p>
                <h3 className="mt-2 font-display text-heading-lg font-bold text-text-primary sm:text-heading-xl">
                  {featuredCase.title}
                </h3>
                <p className="mt-2 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                  Distribuidor homologado · ERP {featuredCase.erp}
                </p>
                <p className="mt-4 max-w-2xl text-body-md leading-relaxed text-text-secondary">
                  {featuredCase.challenge} {featuredCase.implementation}
                </p>
              </div>

              {beforeAfter ? (
                <div className="grid border-b border-surface-border sm:grid-cols-2">
                  <div className="border-b border-surface-border px-6 py-6 sm:border-b-0 sm:border-r sm:px-10">
                    <p className="font-mono text-caption font-semibold uppercase tracking-widest text-status-error">
                      Antes
                    </p>
                    <ul className="mt-4 space-y-3">
                      {beforeAfter.antes.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span className="text-body-sm text-text-secondary">
                            {item.label}
                          </span>
                          <span className="font-display text-heading-sm font-semibold text-text-tertiary line-through decoration-text-tertiary/50">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-6 sm:px-10">
                    <p className="font-mono text-caption font-semibold uppercase tracking-widest text-status-success">
                      Depois
                    </p>
                    <ul className="mt-4 space-y-3">
                      {beforeAfter.depois.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span className="text-body-sm text-text-secondary">
                            {item.label}
                          </span>
                          <span className="font-display text-heading-sm font-bold text-brand-primary">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              <div className="px-6 py-8 sm:px-10">
                <p className="font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
                  Resultado validado
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {indicators.map((indicator) => (
                    <div
                      key={indicator.label}
                      className="rounded-xl border border-brand-primary/20 bg-brand-primary-dim px-4 py-4"
                    >
                      <p className="font-display text-heading-md font-bold text-brand-primary">
                        {indicator.value}
                      </p>
                      <p className="mt-1 text-body-sm font-medium text-text-primary">
                        {indicator.label}
                      </p>
                      <p className="mt-1 text-body-sm text-text-secondary">
                        {indicator.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-8">
                  <Link
                    href="/cases"
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover hover:underline"
                  >
                    Ver case completo com todos os indicadores →
                  </Link>
                </p>
              </div>
            </article>
          </Reveal>
        ) : null}

        {/* Pilares de prova — do produto real, sem depoimento inventado */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {PROVA_SOCIAL_PILARES.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              variant="scale"
              delay={Math.min(140 + index * 70, 420)}
              className="rounded-xl border border-surface-border bg-surface-elevated-1/50 p-6 text-center sm:text-left"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-primary-dim font-mono text-caption font-bold text-brand-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-heading-sm font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <CtaButtons className="mt-12" />
        </Reveal>
      </Container>
    </section>
  );
}
