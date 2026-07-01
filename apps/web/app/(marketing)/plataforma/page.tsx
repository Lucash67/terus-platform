import type { Metadata } from "next";

import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { PageHero } from "@/components/sections/page-hero";
import { PLATFORM_ROADMAP_BADGE } from "@/lib/constants/copy";
import { PLATFORM_PILLARS } from "@/lib/constants/site";
import { PILARES_CONFIABILIDADE } from "@/lib/constants/site-data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Plataforma de Onboarding, Ativação e Operação",
  description:
    "Conheça a Terus Platform — plataforma de Supply Chain Intelligence com integração, diagnóstico, automação e monitoramento em tempo real para varejo e distribuição.",
  path: "/plataforma",
});

export default function PlataformaPage() {
  return (
    <>
      <PageHero
        badge="Plataforma"
        title="Jornada completa do cliente em uma única plataforma"
        description="Da integração ao monitoramento contínuo da operação, a Terus centraliza onboarding, ativação, execução e acompanhamento em um único ambiente."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {PLATFORM_PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className="relative rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <span className="font-mono text-display-lg font-bold text-brand-primary/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-heading-lg font-semibold text-text-primary">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-body-md text-text-secondary">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-rhythm-alt">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">
                {PLATFORM_ROADMAP_BADGE}
              </Badge>
              <h2 className="font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
                Onboarding autônomo
              </h2>
              <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                Meta do produto: clientes com ERP Winthor ou RMS completam a
                ativação — do cadastro à operação — com assistência guiada e
                mínima dependência da equipe técnica Terus.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Assistente guiado de integração",
                  "Diagnóstico automatizado de integração operacional",
                  "Contratos digitais integrados",
                  "Ativação operacional em minutos",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-body-md text-text-secondary"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-status-success-dim text-status-success">
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <CtaButtons size="md" align="start" className="mt-8" />
            </div>

            <div className="rounded-lg border border-surface-border bg-surface-base p-8">
              <PlatformFlowDiagram />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Integração
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Integração operacional desde o primeiro dia
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              A jornada operacional começa com integração estruturada,
              permitindo ativação rápida e continuidade da operação.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_PILLARS.slice(0, 4).map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Operação contínua
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Monitoramento e automação em tempo real
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              Após a ativação, a plataforma assume a operação contínua com
              visibilidade completa, alertas automáticos e execução rastreada.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Monitoramento",
                description:
                  "Visibilidade 24/7 da operação com dashboards executivos",
              },
              {
                title: "Alertas",
                description: "Detecção de anomalias e rupturas em tempo real",
              },
              {
                title: "Automações",
                description: "Reposições e tarefas geradas automaticamente",
              },
              {
                title: "Execução",
                description: "Tarefas priorizadas para equipes de loja",
              },
              {
                title: "Rastreabilidade",
                description: "Evidências e trilha de auditoria completa",
              },
              {
                title: "Indicadores",
                description: "Métricas e KPIs de performance operacional",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Benefícios Executivos
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Resultados para líderes de operação
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              A Terus entrega visibilidade, controle e eficiência para operações
              de varejo em escala.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Redução de trabalho manual",
                description:
                  "Automação de tarefas repetitivas e eliminação de processos manuais",
              },
              {
                title: "Maior visibilidade operacional",
                description:
                  "Dashboards executivos com visibilidade completa da operação",
              },
              {
                title: "Menos ruptura e desperdício",
                description:
                  "Detecção proativa de anomalias e otimização de estoque",
              },
              {
                title: "Decisões mais rápidas",
                description:
                  "Dados em tempo real para tomada de decisão informada",
              },
              {
                title: "Escalabilidade operacional",
                description:
                  "Crescimento sem dependência de expansão de equipe técnica",
              },
              {
                title: "Governança de processos",
                description:
                  "Rastreabilidade completa e conformidade operacional",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Operação, segurança e governança
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Confiabilidade para operações críticas
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              A Terus foi projetada para operar processos críticos com
              rastreabilidade, segurança de dados e visibilidade completa da
              operação.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES_CONFIABILIDADE.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-surface-border bg-surface-elevated-1 p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.name}
                </h3>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Segurança e Governança
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Segurança, governança e confiabilidade operacional
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              A Terus foi projetada para operar processos críticos com
              rastreabilidade, segurança de dados e visibilidade completa da
              operação.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Integrações Seguras",
                description:
                  "Conexões criptografadas com ERPs e sistemas legados",
              },
              {
                title: "Controle de Acesso",
                description: "Permissões granulares e autenticação segura",
              },
              {
                title: "Auditoria e Rastreabilidade",
                description:
                  "Trilha completa de ações e evidências operacionais",
              },
              {
                title: "Operação Monitorada",
                description: "Visibilidade 24/7 de toda a jornada operacional",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-surface-border bg-surface-base p-8"
              >
                <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-md text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

function PlatformFlowDiagram() {
  const steps = [
    "Onboarding",
    "Integração",
    "Diagnóstico",
    "Ativação",
    "Operação",
    "Monitoramento",
  ];

  return (
    <div className="space-y-4">
      <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
        Jornada operacional
      </p>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim text-caption font-semibold text-brand-primary">
            {index + 1}
          </div>
          <div className="flex-1 rounded-md border border-surface-border bg-surface-elevated-2 px-4 py-3">
            <p className="text-body-md font-medium text-text-primary">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
