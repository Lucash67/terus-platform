import Link from "next/link";
import { cn } from "@terus/ui";

import { JOURNEY_STEPS, type JourneyStepDef } from "@/lib/constants/onboarding";
import type { Journey } from "@/lib/api/types";

type StepState = "done" | "current" | "todo";

export function stepStates(
  journey: Journey | null,
  current: JourneyStepDef["id"],
) {
  const done = new Set<string>(["conta", ...(journey?.completed_steps ?? [])]);
  return JOURNEY_STEPS.map((step) => ({
    step,
    state: (step.id === current
      ? "current"
      : done.has(step.id)
        ? "done"
        : "todo") as StepState,
    reachable: done.has(step.id) || step.id === current,
  }));
}

/** Progresso calculado a partir das etapas gravadas no servidor. */
export function JourneyStepper({
  journey,
  current,
}: {
  journey: Journey | null;
  current: JourneyStepDef["id"];
}) {
  const states = stepStates(journey, current);
  const index = states.findIndex((s) => s.state === "current");
  return (
    <nav
      aria-label="Etapas do cadastro"
      className="mx-auto w-full max-w-3xl px-4 pt-8"
    >
      <p className="mb-3 text-center font-mono text-caption uppercase tracking-widest text-text-tertiary sm:hidden">
        Etapa {index + 1} de {states.length} · {states[index]?.step.label}
      </p>
      <ol className="flex items-center gap-2">
        {states.map(({ step, state, reachable }, i) => {
          const content = (
            <span className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border font-mono text-body-sm font-semibold transition-colors",
                  state === "done" &&
                    "border-status-success/40 bg-status-success-dim text-status-success",
                  state === "current" &&
                    "ob-node-current border-brand-primary bg-brand-primary text-surface-base",
                  state === "todo" &&
                    "border-surface-border bg-surface-elevated-1 text-text-tertiary",
                )}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-center text-caption font-medium sm:block",
                  state === "current"
                    ? "text-text-primary"
                    : "text-text-tertiary",
                )}
              >
                {step.label}
              </span>
            </span>
          );
          return (
            <li
              key={step.id}
              className="flex flex-1 items-center gap-2"
              aria-current={state === "current" ? "step" : undefined}
            >
              {reachable && state !== "current" && step.id !== "conta" ? (
                <Link
                  href={step.href}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {content}
                  <span className="sr-only">
                    {" "}
                    ({state === "done" ? "concluída" : "pendente"})
                  </span>
                </Link>
              ) : (
                <span>
                  {content}
                  <span className="sr-only">
                    {" "}
                    (
                    {state === "done"
                      ? "concluída"
                      : state === "current"
                        ? "atual"
                        : "pendente"}
                    )
                  </span>
                </span>
              )}
              {i < states.length - 1 ? (
                <span
                  className={cn(
                    "mb-6 hidden h-px flex-1 sm:block",
                    state === "done"
                      ? "bg-status-success/40"
                      : "bg-surface-border",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
