"use client";

import Link from "next/link";
import { Badge, Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { ONBOARDING_STEPS } from "@/lib/constants/onboarding";
import { getUnlockedStep, useOnboardingStore } from "@/store/onboarding-store";

const TRUST_ITEMS = [
  "Acesso somente-leitura",
  "Credenciais em cofre criptografado",
  "Conforme LGPD",
];

function FlowDiagram() {
  return (
    <div className="ob-float-slow relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-surface-border bg-surface-base/90 p-6 shadow-premium backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Fluxo de integração
          </span>
          <span className="flex items-center gap-1.5 text-caption font-semibold text-status-success">
            <span className="relative flex h-2 w-2">
              <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-status-success" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
            </span>
            AO VIVO
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          {[
            { label: "Seu ERP", sub: "Winthor · RMS" },
            { label: "Terus", sub: "Diagnóstico + Sync" },
            { label: "Operação", sub: "6 módulos ativos" },
          ].map((node, index) => (
            <div key={node.label} className="flex flex-1 items-center gap-2">
              {index > 0 && (
                <div
                  className="relative h-0.5 flex-1 overflow-visible rounded bg-surface-elevated-2"
                  aria-hidden="true"
                >
                  <span
                    className="hero-flow-dot absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-primary"
                    style={{ animationDelay: `${index * 0.9}s` }}
                  />
                </div>
              )}
              <div
                className={cn(
                  "ob-enter-scale flex min-w-20 flex-col items-center rounded-xl border px-3 py-3 text-center",
                  index === 1
                    ? "border-brand-primary/40 bg-brand-primary/5"
                    : "border-surface-border bg-surface-elevated-1",
                )}
                style={{ animationDelay: `${300 + index * 150}ms` }}
              >
                <span className="text-body-sm font-semibold text-text-primary">
                  {node.label}
                </span>
                <span className="mt-0.5 whitespace-nowrap font-mono text-caption text-text-tertiary">
                  {node.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2.5">
          {[
            { label: "Conectividade validada", delay: 600 },
            { label: "12 tabelas mapeadas", delay: 750 },
            { label: "Reposição automática ativa", delay: 900 },
          ].map((row) => (
            <div
              key={row.label}
              className="ob-enter flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-elevated-1 px-3 py-2"
              style={{ animationDelay: `${row.delay}ms` }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 shrink-0 text-status-success"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-body-sm text-text-secondary">
                {row.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WelcomeHero() {
  const store = useOnboardingStore();
  const unlocked = getUnlockedStep(store);
  const hasProgress = store.hasHydrated && unlocked > 1;
  const resumeHref = ONBOARDING_STEPS[unlocked - 1].href;

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge
            variant="secondary"
            className="ob-enter font-medium"
            style={{ animationDelay: "0ms" }}
          >
            Onboarding autônomo · sem fila de implantação
          </Badge>
          <h1
            className="ob-enter mt-5 font-display text-display-xl text-text-primary sm:text-display-2xl"
            style={{ animationDelay: "80ms" }}
          >
            Sua operação conectada à Terus{" "}
            <span className="text-gradient">em minutos</span>
          </h1>
          <p
            className="ob-enter mt-5 max-w-lg text-body-lg text-text-secondary"
            style={{ animationDelay: "160ms" }}
          >
            Do cadastro à ativação dos módulos, você mesmo conduz a integração
            do seu ERP — com diagnóstico automatizado validando cada passo em
            tempo real.
          </p>

          <div
            className="ob-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              size="lg"
              asChild
              className="font-semibold shadow-elevated ring-2 ring-brand-primary/15 transition-all hover:ring-brand-primary/30"
            >
              <Link href={hasProgress ? resumeHref : "/onboarding/cadastro"}>
                {hasProgress ? "Continuar de onde parei" : "Começar agora"}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/solicitar-demo">Falar com especialista</Link>
            </Button>
          </div>

          <ul
            className="ob-enter mt-8 flex flex-wrap gap-x-6 gap-y-2"
            style={{ animationDelay: "320ms" }}
          >
            {TRUST_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-body-sm text-text-tertiary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-brand-primary"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="ob-enter-right" style={{ animationDelay: "300ms" }}>
          <FlowDiagram />
        </div>
      </div>

      {/* Trilha das 7 etapas */}
      <div className="mt-16 lg:mt-24">
        <p
          className="ob-enter font-mono text-caption uppercase tracking-widest text-text-tertiary"
          style={{ animationDelay: "400ms" }}
        >
          O caminho até a ativação
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {ONBOARDING_STEPS.map((step, index) => (
            <li
              key={step.id}
              className="ob-enter-scale flex items-start gap-3 rounded-xl border border-surface-border bg-surface-base/80 p-3.5 backdrop-blur lg:flex-col lg:gap-2.5"
              style={{ animationDelay: `${450 + index * 80}ms` }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim font-mono text-body-sm font-semibold text-brand-primary">
                {step.order}
              </span>
              <span className="text-body-sm font-medium leading-snug text-text-secondary">
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
