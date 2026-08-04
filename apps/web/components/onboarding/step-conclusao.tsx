"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { ERP_OPTIONS, TERUS_MODULES } from "@/lib/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";

const MODULE_ACTIVATION_INTERVAL_MS = 350;

export function StepConclusao() {
  const router = useRouter();
  const { cadastro, erp, banco, contratoAssinadoEm, resetOnboarding } =
    useOnboardingStore();
  const [activatedCount, setActivatedCount] = useState(0);

  const erpOption = ERP_OPTIONS.find((option) => option.id === erp);
  const allActive = activatedCount >= TERUS_MODULES.length;

  useEffect(() => {
    if (activatedCount >= TERUS_MODULES.length) return;
    const timeout = setTimeout(
      () => setActivatedCount((count) => count + 1),
      activatedCount === 0 ? 1200 : MODULE_ACTIVATION_INTERVAL_MS,
    );
    return () => clearTimeout(timeout);
  }, [activatedCount]);

  const handleRestart = () => {
    resetOnboarding();
    router.push("/onboarding");
  };

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        {/* Selo de sucesso */}
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
          Etapa 7 de 7 — Onboarding concluído
        </p>
        <h1
          className="ob-enter mt-3 font-display text-display-lg text-text-primary sm:text-display-xl"
          style={{ animationDelay: "280ms" }}
        >
          Bem-vindo à Terus,{" "}
          <span className="text-gradient">
            {cadastro?.companyName ?? "parceiro"}
          </span>
        </h1>
        <p
          className="ob-enter mx-auto mt-4 max-w-xl text-body-lg text-text-secondary"
          style={{ animationDelay: "360ms" }}
        >
          Sua operação está conectada e os módulos estão sendo ativados. A
          primeira sincronização completa do {erpOption?.name ?? "ERP"} começa
          agora.
        </p>

        {/* Módulos ativando */}
        <div
          className="ob-enter mt-10"
          style={{ animationDelay: "440ms" }}
          aria-live="polite"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
              Ativação dos módulos
            </span>
            <Badge variant={allActive ? "success" : "secondary"}>
              {Math.min(activatedCount, TERUS_MODULES.length)}/
              {TERUS_MODULES.length}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TERUS_MODULES.map((module, index) => {
              const isActive = index < activatedCount;
              return (
                <div
                  key={module.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-500",
                    isActive
                      ? "ob-module-activate border-brand-primary/30 bg-surface-base/90 shadow-card"
                      : "border-surface-border-subtle bg-surface-elevated-1/60 opacity-50",
                  )}
                >
                  <span
                    className={cn(
                      "relative flex h-2.5 w-2.5 shrink-0",
                      !isActive && "opacity-40",
                    )}
                    aria-hidden="true"
                  >
                    {isActive && (
                      <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-status-success" />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex h-2.5 w-2.5 rounded-full",
                        isActive
                          ? "bg-status-success"
                          : "bg-surface-elevated-3",
                      )}
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-body-md font-semibold text-text-primary">
                      {module.name}
                    </p>
                    <p className="truncate text-body-sm text-text-tertiary">
                      {module.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumo da sessão */}
        <div
          className="ob-enter mx-auto mt-10 max-w-xl rounded-2xl border border-surface-border bg-surface-base/85 p-6 text-left shadow-card backdrop-blur"
          style={{ animationDelay: "520ms" }}
        >
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            Resumo da integração
          </p>
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-body-sm text-text-tertiary">ERP conectado</dt>
              <dd className="text-body-md font-medium text-text-primary">
                {erpOption?.name} · {erpOption?.vendor}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-text-tertiary">Banco</dt>
              <dd className="truncate font-mono text-body-sm font-medium text-text-primary">
                {banco ? `${banco.erpHost}:${banco.erpPort}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-text-tertiary">
                Lojas na operação
              </dt>
              <dd className="text-body-md font-medium text-text-primary">
                {cadastro?.storeCount ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-text-tertiary">
                Contrato assinado em
              </dt>
              <dd className="text-body-md font-medium text-text-primary">
                {contratoAssinadoEm
                  ? new Date(contratoAssinadoEm).toLocaleDateString("pt-BR")
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Ações */}
        <div
          className="ob-enter mt-10 flex flex-col items-center gap-4"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              disabled
              className="font-semibold"
              title="Disponível após o provisionamento do ambiente"
            >
              Acessar plataforma
              <Badge
                variant="secondary"
                className="ml-1 border-surface-base/30 bg-surface-base/20 text-surface-base"
              >
                Em provisionamento
              </Badge>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Voltar ao site</Link>
            </Button>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="text-body-sm text-text-tertiary underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
          >
            Refazer o onboarding do zero
          </button>
        </div>
      </div>
    </Container>
  );
}
