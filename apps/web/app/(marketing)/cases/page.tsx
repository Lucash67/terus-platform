import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { CONTEUDOS_CASES } from "@/lib/constants/site-data";
import { Container } from "@/components/layout/container";
import { Badge } from "@terus/ui";
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
      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Cases de Sucesso
            </p>
            <h1 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Casos de Uso da Rede Terus
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
            </Container>
          </section>

          {/* Três pilares do Case */}
          <section className="bg-surface-elevated-1 py-12 border-t border-b border-surface-border">
            <Container className="max-w-4xl">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <h3 className="font-display text-heading-md font-semibold text-text-primary">
                    Desafio
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.challenge}
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <h3 className="font-display text-heading-md font-semibold text-text-primary">
                    Implementação
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.implementation}
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-base p-6">
                  <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                    Resultados
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary leading-relaxed">
                    {c.results}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* Comparativo Antes/Depois/Resultados */}
          <section className="bg-surface-base py-20">
            <Container className="max-w-4xl">
              <div className="text-center mb-12">
                <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
                  Transformação
                </p>
                <h3 className="mt-2 font-display text-heading-xl font-bold text-text-primary">
                  Transformação operacional validada
                </h3>
                <p className="mt-2 text-body-md text-text-secondary">
                  Resultados obtidos após a adoção da jornada operacional Terus
                  integrada ao ERP.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {/* ANTES DA TERUS (Mudo, Neutro, Alertas em Vermelho) */}
                <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-6 transition-all hover:shadow-sm">
                  <h4 className="font-display text-body-sm font-bold uppercase tracking-wider text-text-tertiary mb-6 border-b border-surface-border pb-2">
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
                </div>

                {/* DEPOIS DA TERUS (Premium, Destaque em Azul Gradient, Alta Tecnologia) */}
                <div className="rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-hover text-white p-6 shadow-lg shadow-brand-primary/10 transition-all hover:-translate-y-0.5">
                  <h4 className="font-display text-body-sm font-bold uppercase tracking-wider text-white/90 mb-6 border-b border-white/20 pb-2">
                    Depois da Terus
                  </h4>
                  <div className="space-y-4">
                    {c.beforeAfterIndicators.depois.map((ind, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-body-sm text-white/80 font-medium">
                          {ind.label}
                        </span>
                        <span className="font-display text-body-md font-bold text-white">
                          {ind.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESULTADO (Sucesso, Eficiência, Tons Verdes) */}
                <div className="rounded-lg border border-status-success/30 bg-status-success-dim p-6 transition-all hover:shadow-sm">
                  <h4 className="font-display text-body-sm font-bold uppercase tracking-wider text-status-success mb-6 border-b border-status-success/15 pb-2">
                    Resultado Obtido
                  </h4>
                  <div className="space-y-4">
                    {c.beforeAfterIndicators.resultados.map((ind, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-status-success/10 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-body-sm text-[#15803D] font-medium">
                          {ind.label}
                        </span>
                        <span className="font-display text-body-md font-bold text-[#16A34A]">
                          {ind.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Indicadores Executivos */}
          <section className="bg-surface-elevated-1 py-20 border-t border-surface-border">
            <Container className="max-w-4xl">
              <div className="text-center mb-12">
                <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
                  Indicadores
                </p>
                <h3 className="mt-2 font-display text-heading-xl font-bold text-text-primary">
                  Impacto financeiro e operacional
                </h3>
                <p className="mt-2 text-body-md text-text-secondary">
                  Painel executivo consolidando a evolução dos principais
                  indicadores da operação.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {c.executiveIndicators.map((ind, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-surface-border bg-surface-base p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 flex flex-col justify-between"
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
                  </div>
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
