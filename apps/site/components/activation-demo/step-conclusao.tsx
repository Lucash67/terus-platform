"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import {
  DEMO_BASE,
  DEMO_MODULES,
  findErp,
} from "@/lib/constants/activation-demo";
import { useActivationDemo } from "@/lib/activation-demo/store";

/** Pausa para o selo terminar de desenhar antes da cascata dos módulos. */
const FIRST_DELAY_MS = 1300;
const STEP_MS = 420;

export function StepConclusao() {
  const router = useRouter();
  const { cadastro, erp, conexao, contratoAceitoEm, reset } =
    useActivationDemo();
  const [active, setActive] = useState(0);
  const option = findErp(erp);
  const allActive = active >= DEMO_MODULES.length;
  const endpoint = conexao
    ? conexao.kind === "db"
      ? `${conexao.host}:${conexao.port}`
      : conexao.baseUrl
    : "—";

  useEffect(() => {
    if (allActive) return;
    const id = window.setTimeout(
      () => setActive((n) => n + 1),
      active === 0 ? FIRST_DELAY_MS : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, allActive]);

  const restart = () => {
    reset();
    router.push(DEMO_BASE);
  };

  const summary = [
    { label: "ERP", value: option ? `${option.name} · ${option.vendor}` : "—" },
    { label: "Endereço testado", value: endpoint, mono: true },
    {
      label: "Lojas",
      value: cadastro?.storeCount ? String(cadastro.storeCount) : "—",
    },
    {
      label: "Aceite (simulado)",
      value: contratoAceitoEm
        ? new Date(contratoAceitoEm).toLocaleDateString("pt-BR")
        : "—",
    },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="relative mx-auto h-24 w-24">
          <span
            className="ob-success-ring absolute inset-0 rounded-full border-2 border-status-success/40"
            aria-hidden="true"
          />
          <span
            className="ob-success-ring absolute inset-0 rounded-full border-2 border-status-success/25"
            style={{ animationDelay: "0.6s" }}
            aria-hidden="true"
          />
          <span className="ob-enter-scale relative flex h-24 w-24 items-center justify-center rounded-full bg-status-success text-surface-base shadow-floating">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-11 w-11"
              aria-hidden="true"
            >
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ob-check-big"
              />
            </svg>
          </span>
        </div>

        <p
          className="ob-enter mt-8 font-mono text-caption uppercase tracking-widest text-brand-primary"
          style={{ animationDelay: "200ms" }}
        >
          Etapa 7 de 7 — Demonstração concluída
        </p>
        <h1
          className="ob-enter mt-3 font-display text-display-lg text-text-primary sm:text-display-xl"
          style={{ animationDelay: "280ms" }}
        >
          Este é o caminho,{" "}
          <span className="text-gradient">
            {cadastro?.companyName ?? "sua rede"}
          </span>
        </h1>
        <p
          className="ob-enter mx-auto mt-4 max-w-xl text-body-lg text-text-secondary"
          style={{ animationDelay: "360ms" }}
        >
          Numa ativação real, depois do diagnóstico e do contrato, a equipe
          Terus confere a primeira carga do {option?.name ?? "ERP"} e liga os
          módulos contratados.
        </p>

        <div className="ob-enter mt-10" style={{ animationDelay: "440ms" }}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
              Módulos essenciais
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-caption",
                allActive
                  ? "bg-status-success-dim text-status-success"
                  : "bg-surface-elevated-2 text-text-secondary",
              )}
              aria-live="polite"
            >
              {Math.min(active, DEMO_MODULES.length)}/{DEMO_MODULES.length}
            </span>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {DEMO_MODULES.map((m, i) => {
              const on = i < active;
              return (
                <li
                  key={m.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-500",
                    on
                      ? "ob-module-activate border-brand-primary/30 bg-surface-base/90 shadow-card"
                      : "border-surface-border-subtle bg-surface-elevated-1/60 opacity-50",
                  )}
                >
                  <span
                    className="relative flex h-2.5 w-2.5 shrink-0"
                    aria-hidden="true"
                  >
                    {on ? (
                      <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-status-success" />
                    ) : null}
                    <span
                      className={cn(
                        "relative inline-flex h-2.5 w-2.5 rounded-full",
                        on ? "bg-status-success" : "bg-surface-elevated-3",
                      )}
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-body-md font-semibold text-text-primary">
                      {m.name}
                    </p>
                    <p className="truncate text-body-sm text-text-tertiary">
                      {m.tagline}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-caption uppercase text-text-tertiary">
                    {on ? "ativo" : "…"}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-body-sm text-text-tertiary">
            Expansão (Unitization, Production, Chain, Vitrine) entra conforme a
            proposta.
          </p>
        </div>

        <div
          className="ob-enter mx-auto mt-10 max-w-xl rounded-2xl border border-surface-border bg-surface-base/85 p-6 text-left shadow-card backdrop-blur"
          style={{ animationDelay: "520ms" }}
        >
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Resumo da demonstração
          </p>
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {summary.map((row) => (
              <div key={row.label} className="min-w-0">
                <dt className="text-body-sm text-text-tertiary">{row.label}</dt>
                <dd
                  className={cn(
                    "truncate text-body-md font-medium text-text-primary",
                    row.mono && "font-mono text-body-sm",
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="ob-enter mt-10 flex flex-col items-center gap-4"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="font-semibold shadow-elevated">
              <Link href="/criar-conta">Pedir uma proposta de verdade</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Voltar ao site</Link>
            </Button>
          </div>
          <button
            type="button"
            onClick={restart}
            className="text-body-sm text-text-tertiary underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
          >
            Refazer a demonstração
          </button>
        </div>
      </div>
    </Container>
  );
}
