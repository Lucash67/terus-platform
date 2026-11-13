"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { CheckIcon } from "@/components/activation-demo/demo-chrome";
import { StepNav, StepShell } from "@/components/activation-demo/step-shell";
import { DEMO_BASE, DEMO_CLAUSES } from "@/lib/constants/activation-demo";
import { useActivationDemo } from "@/lib/activation-demo/store";

type SignState = "idle" | "generating" | "sending" | "signed";

const STAGES: {
  state: Exclude<SignState, "idle" | "signed">;
  label: string;
  ms: number;
}[] = [
  {
    state: "generating",
    label: "Montando a minuta com os dados da rede…",
    ms: 1500,
  },
  { state: "sending", label: "Enviando para assinatura eletrônica…", ms: 1700 },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SignedPanel({ at, name }: { at: string; name: string }) {
  return (
    <div className="rounded-2xl border border-status-success/30 bg-status-success/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-caption uppercase tracking-widest text-status-success">
          Aceite registrado
        </span>
        <span className="rounded-full bg-status-warning/15 px-2.5 py-0.5 font-mono text-caption uppercase text-status-warning">
          Simulação
        </span>
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
        <p className="text-body-sm font-medium text-text-primary">{name}</p>
        <p className="mt-0.5 text-body-sm text-text-tertiary">
          {formatDate(at)}
        </p>
      </div>
    </div>
  );
}

export function StepContrato() {
  const router = useRouter();
  const { cadastro, contratoAceitoEm, aceitarContrato } = useActivationDemo();
  const [accepted, setAccepted] = useState(Boolean(contratoAceitoEm));
  const [state, setState] = useState<SignState>(
    contratoAceitoEm ? "signed" : "idle",
  );
  const busy = state === "generating" || state === "sending";
  const stageIndex = STAGES.findIndex((s) => s.state === state);

  useEffect(() => {
    if (!busy) return;
    const stage = STAGES[stageIndex];
    const id = window.setTimeout(() => {
      if (state === "generating") setState("sending");
      else {
        aceitarContrato();
        setState("signed");
      }
    }, stage.ms);
    return () => window.clearTimeout(id);
  }, [busy, state, stageIndex, aceitarContrato]);

  return (
    <StepShell
      step={6}
      eyebrow="Contrato"
      title={
        <>
          Formalize <span className="text-gradient">sem papel</span>
        </>
      }
      description="Os pontos principais da minuta, com os dados da sua rede. Na contratação real, o documento integral chega para assinatura eletrônica pela D4Sign — ainda não configurada nesta demonstração."
      wide
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] [&>*]:min-w-0">
        <article className="overflow-hidden rounded-2xl border border-surface-border bg-surface-base/90 shadow-card backdrop-blur">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border bg-surface-elevated-1/80 px-6 py-4">
            <div>
              <h2 className="font-display text-heading-md font-semibold text-text-primary">
                Licenciamento SaaS — resumo
              </h2>
              <p className="mt-0.5 font-mono text-caption text-text-tertiary">
                minuta de demonstração
              </p>
            </div>
            <span className="rounded-full border border-surface-border px-3 py-1 text-body-sm text-text-secondary">
              {cadastro?.companyName ?? "Sua rede"}
            </span>
          </header>
          <ol className="space-y-5 px-6 py-5">
            {DEMO_CLAUSES.map((clause, i) => (
              <li
                key={clause.title}
                className="ob-enter"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <h3 className="flex items-baseline gap-2 text-body-md font-semibold text-text-primary">
                  <span className="font-mono text-body-sm text-brand-primary">
                    {i + 1}.
                  </span>
                  {clause.title}
                </h3>
                <p className="mt-1 pl-6 text-body-sm leading-relaxed text-text-secondary">
                  {clause.summary}
                </p>
              </li>
            ))}
          </ol>
          <p className="mx-6 mb-6 rounded-lg bg-surface-elevated-1 px-4 py-3 text-body-sm text-text-tertiary">
            Valores, módulos e condições comerciais são definidos na proposta da
            equipe Terus. Veja também os{" "}
            <Link
              href="/termos"
              className="text-brand-primary underline-offset-4 hover:underline"
            >
              termos
            </Link>{" "}
            e a{" "}
            <Link
              href="/privacidade"
              className="text-brand-primary underline-offset-4 hover:underline"
            >
              política de privacidade
            </Link>
            .
          </p>
        </article>

        <aside className="flex flex-col gap-4">
          {state === "signed" && contratoAceitoEm ? (
            <div className="ob-enter-scale">
              <SignedPanel
                at={contratoAceitoEm}
                name={cadastro?.contactName ?? "Responsável"}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-surface-border bg-surface-base/85 p-5 shadow-card backdrop-blur">
              <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                Assinatura
              </p>
              <label
                className="mt-4 flex cursor-pointer items-start gap-3"
                htmlFor="accept"
              >
                <input
                  id="accept"
                  type="checkbox"
                  checked={accepted}
                  disabled={busy}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-primary"
                />
                <span className="select-none text-body-sm leading-relaxed text-text-secondary">
                  Li os pontos acima e quero simular a assinatura em nome da
                  rede.
                </span>
              </label>
              <Button
                size="lg"
                disabled={!accepted || busy}
                onClick={() => setState("generating")}
                className="mt-5 w-full font-semibold shadow-elevated"
              >
                {busy ? (
                  <span
                    className="ob-spin h-4 w-4 rounded-full border-2 border-surface-base/40 border-t-surface-base"
                    aria-hidden="true"
                  />
                ) : null}
                {busy ? "Assinando…" : "Assinar (simulação)"}
              </Button>
              {busy ? (
                <ol className="mt-4 space-y-2" aria-live="polite">
                  {STAGES.map((stage, i) => (
                    <li
                      key={stage.state}
                      className={cn(
                        "ob-log-line flex items-center gap-2.5 text-body-sm",
                        i < stageIndex && "text-status-success",
                        i === stageIndex && "text-text-primary",
                        i > stageIndex && "text-text-disabled",
                      )}
                    >
                      {i < stageIndex ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : i === stageIndex ? (
                        <span className="ob-spin h-3.5 w-3.5 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-surface-elevated-3" />
                      )}
                      {stage.label}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          )}
        </aside>
      </div>

      <StepNav
        backHref={`${DEMO_BASE}/diagnostico`}
        continueLabel="Ativar"
        continueDisabled={state !== "signed"}
        hint="Assine para seguir para a ativação."
        onContinue={() => router.push(`${DEMO_BASE}/conclusao`)}
      />
    </StepShell>
  );
}
