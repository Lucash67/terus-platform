"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import { ERP_INSTRUCTIONS, ERP_OPTIONS } from "@/lib/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-caption font-medium transition-all duration-200",
        copied
          ? "border-status-success/40 bg-status-success-dim text-status-success"
          : "border-surface-border bg-surface-base text-text-tertiary hover:text-text-primary",
      )}
      aria-label={copied ? "Código copiado" : "Copiar código"}
    >
      {copied ? (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ob-check-draw"
            />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M5 15V6a2 2 0 012-2h9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

export function StepInstrucoes() {
  const router = useRouter();
  const { erp, instrucoesConfirmadas, confirmarInstrucoes } =
    useOnboardingStore();
  const [confirmed, setConfirmed] = useState(instrucoesConfirmadas);

  if (!erp || erp === "other") return null;

  const erpOption = ERP_OPTIONS.find((option) => option.id === erp);
  const instructions = ERP_INSTRUCTIONS[erp];

  const handleContinue = () => {
    if (!confirmed) return;
    confirmarInstrucoes();
    router.push("/onboarding/banco");
  };

  const handleSkip = () => {
    // Libera a próxima etapa; o diagnóstico aponta o que ainda falta no ERP.
    confirmarInstrucoes();
    router.push("/onboarding/banco");
  };

  return (
    <StepShell
      step={3}
      eyebrow="Preparação"
      title={
        <>
          Prepare o acesso no{" "}
          <span className="text-gradient">{erpOption?.name}</span>
        </>
      }
      description="Três passos no seu ambiente e a Terus consegue enxergar o ERP. Encaminhe para o seu time de TI se preferir — tudo é somente-leitura. Pode pular e resolver depois."
      wide
    >
      <ol className="space-y-4">
        {instructions.map((instruction, index) => (
          <li
            key={instruction.title}
            className="ob-enter relative overflow-hidden rounded-2xl border border-surface-border bg-surface-base/85 p-6 shadow-card backdrop-blur"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary-dim font-mono text-body-md font-semibold text-brand-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-heading-md font-semibold text-text-primary">
                  {instruction.title}
                </h2>
                <p className="mt-1.5 text-body-sm leading-relaxed text-text-secondary">
                  {instruction.description}
                </p>
                {instruction.code && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1">
                    <div className="flex items-center justify-between border-b border-surface-border px-4 py-2">
                      <span className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
                        {erpOption?.databases[0]}
                      </span>
                      <CopyButton code={instruction.code} />
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-code-md leading-relaxed text-text-secondary">
                      {instruction.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div
        className="ob-enter mt-6 flex items-start gap-3 rounded-2xl border border-surface-border bg-surface-elevated-1/80 p-5"
        style={{ animationDelay: "400ms" }}
      >
        <input
          id="confirm-instructions"
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-primary"
        />
        <label
          htmlFor="confirm-instructions"
          className="cursor-pointer select-none"
        >
          <span className="block text-body-md font-medium text-text-primary">
            Os passos acima foram executados no meu ambiente
          </span>
          <span className="mt-0.5 block text-body-sm text-text-tertiary">
            Sem problema se algo ficou pendente — o diagnóstico da etapa 5
            aponta exatamente o que falta.
          </span>
        </label>
        <Badge
          variant="secondary"
          className="ml-auto hidden shrink-0 sm:inline-flex"
        >
          ~10 min de TI
        </Badge>
      </div>

      <StepNav
        backHref="/onboarding/integracao"
        continueDisabled={!confirmed}
        onContinue={handleContinue}
        onSkip={handleSkip}
        skipLabel="Pular esta etapa"
      />
    </StepShell>
  );
}
