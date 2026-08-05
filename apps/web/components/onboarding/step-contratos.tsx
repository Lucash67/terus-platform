"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import { CONTRACT_CLAUSES } from "@/lib/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";

type SignState = "idle" | "generating" | "sending" | "signed";

const SIGN_STAGES: { state: SignState; label: string; durationMs: number }[] = [
  { state: "generating", label: "Gerando documento…", durationMs: 1600 },
  { state: "sending", label: "Enviando para a D4Sign…", durationMs: 1800 },
];

function SignaturePanel({ signedAt }: { signedAt: string | null }) {
  const formatted = signedAt
    ? new Date(signedAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="rounded-xl border border-status-success/30 bg-status-success/5 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-caption uppercase tracking-widest text-status-success">
          Assinado digitalmente
        </span>
        <Badge variant="success">D4Sign</Badge>
      </div>
      <svg
        viewBox="0 0 280 70"
        fill="none"
        className="mt-3 h-16 w-full max-w-64 text-text-primary"
        aria-hidden="true"
      >
        <path
          d="M12 48c14-26 22-34 26-30 4 5-9 32-4 34 6 3 17-24 26-24 7 0-2 22 4 24 7 2 15-18 24-18 8 0 2 16 8 18 7 2 14-12 24-14 22-4 44 6 66 2 18-3 36-10 82-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="ob-pen-draw"
        />
      </svg>
      <div className="mt-2 border-t border-status-success/20 pt-3">
        <p className="font-mono text-code-sm text-text-secondary">
          hash sha-256 · 8f3a…c41e
        </p>
        {formatted && (
          <p className="mt-1 text-body-sm text-text-tertiary">{formatted}</p>
        )}
      </div>
    </div>
  );
}

export function StepContratos() {
  const router = useRouter();
  const { cadastro, contratoAssinado, contratoAssinadoEm, assinarContrato } =
    useOnboardingStore();

  const [accepted, setAccepted] = useState(contratoAssinado);
  const [signState, setSignState] = useState<SignState>(
    contratoAssinado ? "signed" : "idle",
  );

  useEffect(() => {
    if (signState === "generating" || signState === "sending") {
      const stage = SIGN_STAGES.find((item) => item.state === signState);
      const timeout = setTimeout(() => {
        if (signState === "generating") {
          setSignState("sending");
        } else {
          setSignState("signed");
          assinarContrato();
        }
      }, stage?.durationMs ?? 1500);
      return () => clearTimeout(timeout);
    }
  }, [signState, assinarContrato]);

  const isProcessing = signState === "generating" || signState === "sending";

  return (
    <StepShell
      step={6}
      eyebrow="Contrato"
      title={
        <>
          Formalize com <span className="text-gradient">um clique</span>
        </>
      }
      description="Contrato digital gerado com os dados da sua sessão e assinado via D4Sign — sem imprimir, sem cartório, com validade jurídica."
      wide
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Documento */}
        <article className="overflow-hidden rounded-2xl border border-surface-border bg-surface-base/90 shadow-card backdrop-blur">
          <header className="border-b border-surface-border bg-surface-elevated-1/80 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-heading-md font-semibold text-text-primary">
                  Contrato de Licenciamento SaaS
                </h2>
                <p className="mt-0.5 font-mono text-caption text-text-tertiary">
                  TERUS-{new Date().getFullYear()}-
                  {(cadastro?.cnpj ?? "0000").replace(/\D/g, "").slice(0, 4)} ·
                  minuta v1.0
                </p>
              </div>
              <Badge variant="secondary">
                {cadastro?.companyName ?? "Sua empresa"}
              </Badge>
            </div>
          </header>

          <div className="max-h-80 overflow-y-auto px-6 py-5">
            <ol className="space-y-5">
              {CONTRACT_CLAUSES.map((clause, index) => (
                <li
                  key={clause.title}
                  className="ob-enter"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <h3 className="flex items-baseline gap-2 text-body-md font-semibold text-text-primary">
                    <span className="font-mono text-body-sm text-brand-primary">
                      {index + 1}.
                    </span>
                    {clause.title}
                  </h3>
                  <p className="mt-1 pl-6 text-body-sm leading-relaxed text-text-secondary">
                    {clause.summary}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-lg bg-surface-elevated-1 px-4 py-3 text-body-sm text-text-tertiary">
              Este resumo destaca os pontos principais. O documento integral é
              disponibilizado na íntegra pela D4Sign antes da assinatura.
            </p>
          </div>
        </article>

        {/* Painel de assinatura */}
        <aside className="flex flex-col gap-4">
          {signState === "signed" ? (
            <div className="ob-enter-scale">
              <SignaturePanel signedAt={contratoAssinadoEm} />
            </div>
          ) : (
            <div className="rounded-2xl border border-surface-border bg-surface-base/85 p-5 shadow-card backdrop-blur">
              <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                Assinatura digital
              </p>

              <label
                className="mt-4 flex cursor-pointer items-start gap-3"
                htmlFor="accept-contract"
              >
                <input
                  id="accept-contract"
                  type="checkbox"
                  checked={accepted}
                  disabled={isProcessing}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-primary"
                />
                <span className="select-none text-body-sm leading-relaxed text-text-secondary">
                  Li e concordo com os termos do contrato de licenciamento e
                  autorizo a assinatura digital em nome da empresa.
                </span>
              </label>

              <Button
                size="lg"
                disabled={!accepted || isProcessing}
                onClick={() => setSignState("generating")}
                className="mt-5 w-full font-semibold shadow-elevated"
              >
                {isProcessing ? (
                  <>
                    <span
                      className="ob-spin h-4 w-4 rounded-full border-2 border-surface-base/40 border-t-surface-base"
                      aria-hidden="true"
                    />
                    {
                      SIGN_STAGES.find((item) => item.state === signState)
                        ?.label
                    }
                  </>
                ) : (
                  "Assinar com D4Sign"
                )}
              </Button>

              {isProcessing && (
                <div className="mt-4 space-y-2" aria-live="polite">
                  {SIGN_STAGES.map((stage, index) => {
                    const stageIndex = SIGN_STAGES.findIndex(
                      (item) => item.state === signState,
                    );
                    const isDone = index < stageIndex;
                    const isActive = index === stageIndex;
                    return (
                      <div
                        key={stage.state}
                        className={cn(
                          "ob-log-line flex items-center gap-2.5 text-body-sm",
                          isDone && "text-status-success",
                          isActive && "text-text-primary",
                          !isDone && !isActive && "text-text-disabled",
                        )}
                      >
                        {isDone ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4"
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
                        ) : isActive ? (
                          <span className="ob-spin h-3.5 w-3.5 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-surface-elevated-3" />
                        )}
                        {stage.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex items-start gap-3 rounded-2xl border border-surface-border bg-surface-elevated-1/80 p-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
              aria-hidden="true"
            >
              <path
                d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-body-sm leading-relaxed text-text-tertiary">
              A assinatura via D4Sign tem validade jurídica conforme a MP
              2.200-2/2001 e registra trilha de auditoria completa do processo.
            </p>
          </div>
        </aside>
      </div>

      <StepNav
        backHref="/onboarding/diagnostico"
        continueLabel="Ativar plataforma"
        continueDisabled={signState !== "signed"}
        onContinue={() => router.push("/onboarding/conclusao")}
      />
    </StepShell>
  );
}
