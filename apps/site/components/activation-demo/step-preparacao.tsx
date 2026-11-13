"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@terus/ui";

import { CheckIcon } from "@/components/activation-demo/demo-chrome";
import {
  Panel,
  StepNav,
  StepShell,
} from "@/components/activation-demo/step-shell";
import {
  DEMO_BASE,
  PREP_STEPS,
  TERUS_NAT_IP,
  findErp,
} from "@/lib/constants/activation-demo";
import { useActivationDemo } from "@/lib/activation-demo/store";

type CopyState = "idle" | "copied" | "failed";

function CopyButton({
  text,
  label = "Copiar",
}: {
  text: string;
  label?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-caption font-medium transition-all duration-200",
        state === "copied" &&
          "border-status-success/40 bg-status-success-dim text-status-success",
        state === "failed" && "border-status-error/40 text-status-error",
        state === "idle" &&
          "border-surface-border bg-surface-base text-text-tertiary hover:text-text-primary",
      )}
    >
      {state === "copied" ? <CheckIcon className="h-3.5 w-3.5" /> : null}
      <span aria-live="polite">
        {state === "copied"
          ? "Copiado"
          : state === "failed"
            ? "Selecione e copie"
            : label}
      </span>
    </button>
  );
}

const CHECKS = [
  `Firewall liberado para ${TERUS_NAT_IP}`,
  "Usuário de integração criado",
  "Permissões de leitura aplicadas",
];

export function StepPreparacao() {
  const router = useRouter();
  const { erp, preparacaoConfirmada, confirmarPreparacao } =
    useActivationDemo();
  const [checked, setChecked] = useState<boolean[]>(() =>
    CHECKS.map(() => preparacaoConfirmada),
  );
  const option = findErp(erp);
  if (!erp || erp === "outro" || !option) return null;

  const steps = PREP_STEPS[erp];
  const done = checked.filter(Boolean).length;
  const allDone = done === CHECKS.length;
  const roteiro = [
    `Roteiro de integração Terus — ${option.name}`,
    ...steps.map(
      (s, i) =>
        `\n${i + 1}. ${s.title}\n${s.description}${s.code ? `\n\n${s.code.text}` : ""}`,
    ),
    option.manual ? `\nManual completo: ${option.manual}` : "",
  ].join("\n");

  const advance = () => {
    confirmarPreparacao();
    router.push(`${DEMO_BASE}/conexao`);
  };

  return (
    <StepShell
      step={3}
      eyebrow="Preparação"
      title={
        <>
          O roteiro do seu TI no{" "}
          <span className="text-gradient">{option.name}</span>
        </>
      }
      description="Três passos no ambiente da rede, todos de leitura. Encaminhe para o TI ou o DBA: o roteiro e o script vêm do manual oficial da Terus."
      wide
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
          {option.method}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={roteiro} label="Copiar roteiro para o TI" />
          {option.manual ? (
            <a
              href={option.manual}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-surface-border px-2.5 py-1 text-caption font-medium text-brand-primary hover:border-brand-primary/50"
            >
              Manual na wiki ↗
            </a>
          ) : null}
        </div>
      </div>

      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="ob-enter rounded-2xl border border-surface-border bg-surface-base/85 p-6 shadow-card backdrop-blur"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-body-md font-semibold transition-colors duration-500",
                  checked[index]
                    ? "bg-status-success text-surface-base"
                    : "bg-brand-primary-dim text-brand-primary",
                )}
              >
                {checked[index] ? <CheckIcon className="h-4 w-4" /> : index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-heading-md font-semibold text-text-primary">
                  {step.title}
                </h2>
                <p className="mt-1.5 text-body-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
                {step.code ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1">
                    <div className="flex items-center justify-between border-b border-surface-border px-4 py-2">
                      <span className="font-mono text-caption uppercase tracking-wider text-text-tertiary">
                        {step.code.lang}
                      </span>
                      <CopyButton text={step.code.text} />
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-code-sm leading-relaxed text-text-secondary">
                      {step.code.text}
                    </pre>
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Panel className="ob-enter mt-6 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
            O TI confirma
          </p>
          <span
            className={cn(
              "font-mono text-caption",
              allDone ? "text-status-success" : "text-text-tertiary",
            )}
          >
            {done}/{CHECKS.length}
          </span>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {CHECKS.map((label, i) => (
            <li key={label}>
              <label
                className={cn(
                  "flex h-full cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                  checked[i]
                    ? "border-status-success/40 bg-status-success/5"
                    : "border-surface-border hover:border-brand-primary/40",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={(e) =>
                    setChecked((c) =>
                      c.map((v, j) => (j === i ? e.target.checked : v)),
                    )
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-primary"
                />
                <span className="text-body-sm text-text-primary">{label}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-body-sm text-text-tertiary">
          Se algo ficou pendente, tudo bem: o diagnóstico da etapa 5 aponta
          exatamente o que falta.
        </p>
      </Panel>

      <StepNav
        backHref={`${DEMO_BASE}/erp`}
        continueDisabled={!allDone}
        hint="Marque os três itens ou pule e deixe o diagnóstico apontar o que falta."
        onContinue={advance}
        onSkip={allDone ? undefined : advance}
        skipLabel="Pular e resolver depois"
      />
    </StepShell>
  );
}
