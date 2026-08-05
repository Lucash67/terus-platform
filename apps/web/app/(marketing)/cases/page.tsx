import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { CONTEUDOS_CASES } from "@/lib/constants/site-data";
import { Container } from "@/components/layout/container";
import { Badge } from "@terus/ui";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cases de Sucesso",
  description:
    "Cases de sucesso e resultados operacionais validados em ambiente produtivo da Rede Terus — digitalização, Fill Rate, ticket médio e rastreabilidade.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-t border-surface-border bg-surface-elevated-1">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <Container className="relative py-20 sm:py-24">
          <div className="hero-fade-in mx-auto max-w-3xl text-center">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Cases de Sucesso
            </p>
            <h1 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Casos de Uso da <span className="text-gradient">Rede Terus</span>
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              Resultados de negócio e eficiência operacional validados em
              ambiente produtivo real.
            </p>
          </div>
        </Container>
      </section>

      {CONTEUDOS_CASES.map((c, index) => (
        <div key={c.slug || index} className="border-t border-surface-border">
          {/* Header do Case */}
          <section className="bg-surface-base py-16">
            <Container className="max-w-4xl">
              <Reveal>
                <div className="flex flex-wrap gap-2 items-center mb-6">
                  <Badge variant="outline" className="text-caption capitalize">
                    {c.category}
                  </Badge>
                  <Badge variant="secondary" className="text-caption">
                    ERP: {c.erp}
                  </Badge>
                </div>
                <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg leading-tight">
                  {c.title}
                </h2>
                {c.company && (
                  <p className="mt-2 text-body-md text-text-secondary font-medium">
                    Empresa: {c.company}
                  </p>
                )}
              </Reveal>
            </Container>
          </section>

          {/* Três pilares do Case */}
          <section className="bg-surface-elevated-1 py-12 border-t border-b border-surface-border">
            <Container className="max-w-4xl">
              <div className="grid gap-6 md:grid-cols-3">
                <Reveal className="card-interactive rounded-lg border border-surface-border bg-surface-base p-6">
                  <h3 className="font-display text-heading-md font-semibold text-text-primary">
                    Desafio
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.challenge}
                  </p>
                </Reveal>
                <Reveal
                  delay={70}
                  className="card-interactive rounded-lg border border-surface-border bg-surface-base p-6"
                >
                  <h3 className="font-display text-heading-md font-semibold text-text-primary">
                    Implementação
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.implementation}
                  </p>
                </Reveal>
                <Reveal
                  delay={140}
                  className="card-interactive rounded-lg border border-brand-primary/30 bg-surface-base p-6"
                >
                  <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                    Resultados
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.results}
                  </p>
                </Reveal>
              </div>
            </Container>
          </section>

          {/* Comparativo Antes/Depois/Resultados */}
          <section className="bg-surface-base py-20">
            <Container className="max-w-4xl">
              <Reveal className="text-center mb-12">
                <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                  Transformação
                </p>
                <h3 className="mt-2 font-display text-heading-xl font-bold text-text-primary">
                  Transformação operacional validada
                </h3>
                <p className="mt-2 text-body-md text-text-secondary">
                  Resultados obtidos após a adoção da jornada operacional Terus
                  integrada ao ERP.
                </p>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-3">
                {/* ANTES DA TERUS (Mudo, Neutro, Alertas em Vermelho) */}
                <Reveal className="rounded-lg border border-surface-border bg-surface-elevated-1 p-6 transition-all duration-300 hover:shadow-card">
                  <h4 className="font-mono text-body-sm font-bold uppercase tracking-wider text-text-tertiary mb-6 border-b border-surface-border pb-2">
                    Antes da Terus
                  </h4>
                  <div className="space-y-4">
                    {c.beforeAfterIndicators.antes.map((ind, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-surface-border/50 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-body-sm text-text-secondary font-medium">
                          {ind.label}
                        </span>
                        <span className="font-display text-body-md font-bold text-status-error">
                          {ind.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* DEPOIS DA TERUS (Premium, Destaque Ciano, Alta Tecnologia) */}
                <Reveal
                  variant="scale"
                  delay={70}
                  className="tr-glow-ring rounded-lg border border-brand-primary/40 bg-surface-elevated-2 p-6 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <h4 className="font-mono text-body-sm font-bold uppercase tracking-wider text-brand-primary mb-6 border-b border-brand-primary/20 pb-2">
                    Depois da Terus
                  </h4>
                  <div className="space-y-4">
                    {c.beforeAfterIndicators.depois.map((ind, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-brand-primary/10 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-body-sm text-text-secondary font-medium">
                          {ind.label}
                        </span>
                        <span className="font-display text-body-md font-bold text-brand-primary">
                          {ind.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* RESULTADO (Sucesso, Eficiência, Tons Verdes) */}
                <Reveal
                  delay={140}
                  className="rounded-lg border border-status-success/30 bg-status-success-dim p-6 transition-all duration-300 hover:shadow-card"
                >
                  <h4 className="font-mono text-body-sm font-bold uppercase tracking-wider text-status-success mb-6 border-b border-status-success/15 pb-2">
                    Resultado Obtido
                  </h4>
                  <div className="space-y-4">
                    {c.beforeAfterIndicators.resultados.map((ind, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-status-success/10 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-body-sm text-status-success/80 font-medium">
                          {ind.label}
                        </span>
                        <span className="font-display text-body-md font-bold text-status-success">
                          {ind.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>

          {/* Indicadores Executivos */}
          <section className="bg-surface-elevated-1 py-20 border-t border-surface-border">
            <Container className="max-w-4xl">
              <Reveal className="text-center mb-12">
                <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                  Indicadores
                </p>
                <h3 className="mt-2 font-display text-heading-xl font-bold text-text-primary">
                  Impacto financeiro e operacional
                </h3>
                <p className="mt-2 text-body-md text-text-secondary">
                  Painel executivo consolidando a evolução dos principais
                  indicadores da operação.
                </p>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-2">
                {c.executiveIndicators.map((ind, i) => (
                  <Reveal
                    key={i}
                    delay={Math.min(i, 7) * 70}
                    className="card-interactive rounded-lg border border-surface-border bg-surface-base p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-display text-body-sm font-semibold text-text-secondary">
                        {ind.label}
                      </h4>
                      {ind.description && (
                        <p className="mt-1 text-body-sm text-text-tertiary">
                          {ind.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      {ind.value.includes("→") ? (
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="text-text-tertiary line-through text-body-lg">
                            {ind.value.split("→")[0].trim()}
                          </span>
                          <span className="text-text-tertiary text-body-md">
                            →
                          </span>
                          <span className="font-display text-heading-xl font-bold text-brand-primary">
                            {ind.value.split("→")[1].trim()}
                          </span>
                        </span>
                      ) : (
                        <span className="font-display text-heading-xl font-bold text-brand-primary">
                          {ind.value}
                        </span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        </div>
      ))}

      <CtaSection />
    </>
  );
}
