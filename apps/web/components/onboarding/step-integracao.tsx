"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import { ERP_OPTIONS, type OnboardingErpId } from "@/lib/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StepIntegracao() {
  const router = useRouter();
  const { erp, setErp } = useOnboardingStore();
  const [selected, setSelected] = useState<OnboardingErpId | null>(erp);
  const [analysisRequested, setAnalysisRequested] = useState(false);

  const selectedOption = ERP_OPTIONS.find((option) => option.id === selected);
  const canContinue = !!selectedOption?.homologated;

  const handleContinue = () => {
    if (!selected || !canContinue) return;
    setErp(selected);
    router.push("/onboarding/instrucoes");
  };

  return (
    <StepShell
      step={2}
      eyebrow="Integração"
      title={
        <>
          Qual ERP roda a <span className="text-gradient">sua operação</span>?
        </>
      }
      description="A integração é homologada por ERP — cada um tem instruções e diagnóstico específicos, prontos para uso."
      wide
    >
      <div
        className="grid gap-4 md:grid-cols-3"
        role="radiogroup"
        aria-label="Escolha do ERP"
      >
        {ERP_OPTIONS.map((option, index) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                setSelected(option.id);
                setAnalysisRequested(false);
              }}
              className={cn(
                "ob-enter-scale group relative flex flex-col rounded-2xl border bg-surface-base/85 p-6 text-left backdrop-blur transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-elevated",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                isSelected
                  ? "border-brand-primary shadow-premium ring-4 ring-brand-primary/10"
                  : "border-surface-border shadow-card",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span
                className={cn(
                  "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300",
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-surface-base"
                    : "border-surface-border bg-surface-elevated-1 text-transparent group-hover:border-surface-elevated-3",
                )}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isSelected ? "ob-check-draw" : undefined}
                  />
                </svg>
              </span>

              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
                  isSelected
                    ? "bg-brand-primary text-surface-base"
                    : "bg-brand-primary-dim text-brand-primary",
                )}
              >
                <DatabaseIcon />
              </span>

              <span className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
                {option.name}
              </span>
              <span className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                {option.vendor}
              </span>

              <span className="mt-3 flex-1 text-body-sm leading-relaxed text-text-secondary">
                {option.description}
              </span>

              <span className="mt-4 flex flex-wrap items-center gap-2">
                {option.homologated ? (
                  <Badge variant="success">Homologado</Badge>
                ) : (
                  <Badge variant="warning">Sob análise</Badge>
                )}
                <span className="text-caption text-text-tertiary">
                  {option.marketShare}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {selected === "other" && (
        <div
          className="ob-enter mt-6 rounded-2xl border border-status-warning/30 bg-status-warning/5 p-6"
          role="status"
        >
          {analysisRequested ? (
            <div className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 h-5 w-5 shrink-0 text-status-success"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8.5 12.5l2.5 2.5 4.5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ob-check-draw"
                />
              </svg>
              <div>
                <p className="text-body-md font-semibold text-text-primary">
                  Solicitação registrada
                </p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  Nossa equipe de integrações vai analisar a viabilidade do seu
                  ERP e retorna em até 48h úteis no e-mail cadastrado. Você pode
                  fechar esta página — seu progresso fica salvo.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-body-md font-semibold text-text-primary">
                  Seu ERP ainda não é homologado
                </p>
                <p className="mt-1 max-w-lg text-body-sm text-text-secondary">
                  Envie uma solicitação de análise: avaliamos as tabelas e
                  queries necessárias e habilitamos seu onboarding assim que a
                  homologação for concluída.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setAnalysisRequested(true)}
                className="shrink-0"
              >
                Solicitar análise
              </Button>
            </div>
          )}
        </div>
      )}

      <StepNav
        backHref="/onboarding/cadastro"
        continueDisabled={!canContinue}
        onContinue={handleContinue}
      />
    </StepShell>
  );
}
