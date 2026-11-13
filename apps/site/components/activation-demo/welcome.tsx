"use client";

import Link from "next/link";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { CheckIcon } from "@/components/activation-demo/demo-chrome";
import { DEMO_STEPS } from "@/lib/constants/activation-demo";
import {
  getUnlockedStep,
  useActivationDemo,
} from "@/lib/activation-demo/store";

/** Fatos dos manuais de integração da wiki. */
const TRUST = [
  "Só leitura no ERP",
  "Sem VPN",
  "Usuário dedicado, permissões mínimas",
];

const NODES = [
  { label: "Seu ERP", sub: "banco ou API" },
  { label: "Terus", sub: "captura + diagnóstico" },
  { label: "Loja", sub: "fila de ação" },
];

const ROWS = [
  "IP da Terus liberado",
  "Permissões de leitura conferidas",
  "Módulos contratados ativos",
];

function FlowDiagram() {
  return (
    <div className="ob-float-slow relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-surface-border bg-surface-base/90 p-6 shadow-premium backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Caminho do dado
          </span>
          <span className="flex items-center gap-1.5 font-mono text-caption uppercase text-text-tertiary">
            <span className="relative flex h-2 w-2">
              <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-brand-primary" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            Ilustração
          </span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-2">
          {NODES.map((node, index) => (
            <div key={node.label} className="flex flex-1 items-center gap-2">
              {index > 0 ? (
                <div
                  className="relative h-0.5 flex-1 rounded bg-surface-elevated-2"
                  aria-hidden="true"
                >
                  <span
                    className="hero-flow-dot-right absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-primary"
                    style={{ animationDelay: `${index * 0.9}s` }}
                  />
                </div>
              ) : null}
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
        <ul className="mt-6 space-y-2.5">
          {ROWS.map((row, i) => (
            <li
              key={row}
              className="ob-enter flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-elevated-1 px-3 py-2"
              style={{ animationDelay: `${700 + i * 180}ms` }}
            >
              <CheckIcon className="h-4 w-4 shrink-0 text-status-success" />
              <span className="text-body-sm text-text-secondary">{row}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DemoWelcome() {
  const state = useActivationDemo();
  const unlocked = getUnlockedStep(state);
  const hasProgress = state.hasHydrated && unlocked > 1;
  const target = DEMO_STEPS[(hasProgress ? unlocked : 1) - 1].href;

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="ob-enter font-mono text-caption uppercase tracking-widest text-brand-primary">
            Ativação técnica · 7 etapas
          </p>
          <h1
            className="ob-enter mt-5 font-display text-display-xl text-text-primary sm:text-display-2xl"
            style={{ animationDelay: "80ms" }}
          >
            Do cadastro à{" "}
            <span className="text-gradient">primeira leitura do ERP</span>
          </h1>
          <p
            className="ob-enter mt-5 max-w-lg text-body-lg text-text-secondary"
            style={{ animationDelay: "160ms" }}
          >
            Você escolhe o ERP, o seu TI libera o acesso de leitura com o
            roteiro pronto, a Terus testa a conexão e os módulos são ativados.
            Percorra o caminho para ver como funciona.
          </p>
          <div
            className="ob-enter mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              size="lg"
              asChild
              className="font-semibold shadow-elevated ring-2 ring-brand-primary/15"
            >
              <Link href={target}>
                {hasProgress
                  ? "Continuar de onde parei"
                  : "Começar a demonstração"}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/criar-conta">Pedir uma proposta de verdade</Link>
            </Button>
          </div>
          <ul
            className="ob-enter mt-8 flex flex-wrap gap-x-6 gap-y-2"
            style={{ animationDelay: "320ms" }}
          >
            {TRUST.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-body-sm text-text-tertiary"
              >
                <CheckIcon
                  className="h-4 w-4 text-brand-primary"
                  draw={false}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="ob-enter-right" style={{ animationDelay: "300ms" }}>
          <FlowDiagram />
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <h2
          className="ob-enter font-mono text-caption uppercase tracking-widest text-text-tertiary"
          style={{ animationDelay: "400ms" }}
        >
          O caminho até a ativação
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {DEMO_STEPS.map((step, index) => {
            const done = state.hasHydrated && step.order < unlocked;
            return (
              <li
                key={step.id}
                className={cn(
                  "ob-enter-scale flex items-start gap-3 rounded-xl border bg-surface-base/80 p-3.5 backdrop-blur lg:flex-col lg:gap-2.5",
                  done ? "border-brand-primary/40" : "border-surface-border",
                )}
                style={{ animationDelay: `${450 + index * 80}ms` }}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-body-sm font-semibold",
                    done
                      ? "bg-brand-primary text-surface-base"
                      : "bg-brand-primary-dim text-brand-primary",
                  )}
                >
                  {done ? (
                    <CheckIcon className="h-3.5 w-3.5" draw={false} />
                  ) : (
                    step.order
                  )}
                </span>
                <span className="text-body-sm font-medium leading-snug text-text-secondary">
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Container>
  );
}
