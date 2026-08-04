"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import { DIAGNOSTIC_RUNNERS } from "@/lib/constants/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";

type RunnerStatus = "pending" | "running" | "done";

interface LogLine {
  id: number;
  runner: string;
  text: string;
  kind: "info" | "success";
}

function RadarVisual({ finished }: { finished: boolean }) {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-surface-border" />
      <div className="absolute inset-3 rounded-full border border-surface-border/70" />
      <div className="absolute inset-6 rounded-full border border-surface-border/50" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
      {finished ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10 text-status-success"
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
        </div>
      ) : (
        <div className="ob-radar-sweep absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left"
            style={{
              background:
                "conic-gradient(from 0deg, color-mix(in srgb, var(--brand-primary) 35%, transparent), transparent 70deg)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function StepDiagnostico() {
  const router = useRouter();
  const { diagnosticoConcluido, concluirDiagnostico, banco } =
    useOnboardingStore();

  const [runId, setRunId] = useState(0);
  const [skipToEnd, setSkipToEnd] = useState(diagnosticoConcluido);
  const [statuses, setStatuses] = useState<RunnerStatus[]>(() =>
    DIAGNOSTIC_RUNNERS.map(() => (diagnosticoConcluido ? "done" : "pending")),
  );
  const [logLines, setLogLines] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(diagnosticoConcluido ? 100 : 0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const allDone = statuses.every((status) => status === "done");
  const totalRunners = DIAGNOSTIC_RUNNERS.length;

  useEffect(() => {
    if (skipToEnd) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let logId = 0;
    let elapsed = 400;

    DIAGNOSTIC_RUNNERS.forEach((runner, runnerIndex) => {
      timeouts.push(
        setTimeout(() => {
          setStatuses((prev) =>
            prev.map((status, i) => (i === runnerIndex ? "running" : status)),
          );
          setLogLines((prev) => [
            ...prev,
            {
              id: ++logId,
              runner: runner.name,
              text: `iniciando ${runner.label.toLowerCase()}…`,
              kind: "info",
            },
          ]);
        }, elapsed),
      );

      const stepMs = runner.durationMs / (runner.logs.length + 1);
      runner.logs.forEach((log, logIndex) => {
        timeouts.push(
          setTimeout(
            () => {
              setLogLines((prev) => [
                ...prev,
                { id: ++logId, runner: runner.name, text: log, kind: "info" },
              ]);
              setProgress(
                Math.round(
                  ((runnerIndex + (logIndex + 1) / (runner.logs.length + 1)) /
                    totalRunners) *
                    100,
                ),
              );
            },
            elapsed + stepMs * (logIndex + 1),
          ),
        );
      });

      elapsed += runner.durationMs;
      timeouts.push(
        setTimeout(() => {
          setStatuses((prev) =>
            prev.map((status, i) => (i === runnerIndex ? "done" : status)),
          );
          setLogLines((prev) => [
            ...prev,
            {
              id: ++logId,
              runner: runner.name,
              text: runner.result,
              kind: "success",
            },
          ]);
          setProgress(Math.round(((runnerIndex + 1) / totalRunners) * 100));
        }, elapsed),
      );
    });

    return () => timeouts.forEach(clearTimeout);
  }, [runId, skipToEnd, totalRunners]);

  useEffect(() => {
    if (allDone && !diagnosticoConcluido) {
      concluirDiagnostico();
    }
  }, [allDone, diagnosticoConcluido, concluirDiagnostico]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) terminal.scrollTop = terminal.scrollHeight;
  }, [logLines]);

  const doneCount = useMemo(
    () => statuses.filter((status) => status === "done").length,
    [statuses],
  );

  const handleReplay = () => {
    setSkipToEnd(false);
    setStatuses(DIAGNOSTIC_RUNNERS.map(() => "pending"));
    setLogLines([]);
    setProgress(0);
    setRunId((id) => id + 1);
  };

  return (
    <StepShell
      step={5}
      eyebrow="Diagnóstico"
      title={
        <>
          Validando a conexão{" "}
          <span className="text-gradient">em tempo real</span>
        </>
      }
      description={`Cinco runners independentes testam conectividade, credenciais, permissões, queries e performance em ${banco?.erpHost ?? "seu banco"}.`}
      wide
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Runners */}
        <div className="rounded-2xl border border-surface-border bg-surface-base/85 shadow-card backdrop-blur">
          <div className="flex items-center justify-between border-b border-surface-border px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-heading-md font-semibold text-text-primary">
                Runners de diagnóstico
              </span>
              <Badge variant={allDone ? "success" : "secondary"}>
                {doneCount}/{totalRunners}
              </Badge>
            </div>
            {allDone && (
              <Button variant="ghost" size="sm" onClick={handleReplay}>
                Executar novamente
              </Button>
            )}
          </div>

          <div className="px-6 py-2">
            {DIAGNOSTIC_RUNNERS.map((runner, index) => {
              const status = statuses[index];
              return (
                <div
                  key={runner.id}
                  className={cn(
                    "flex items-center gap-4 border-b border-surface-border-subtle py-4 transition-opacity duration-500 last:border-b-0",
                    status === "pending" && "opacity-45",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {status === "done" ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-status-success-dim text-status-success">
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
                            className="ob-check-draw"
                          />
                        </svg>
                      </span>
                    ) : status === "running" ? (
                      <span
                        className="ob-spin h-6 w-6 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary"
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-surface-elevated-3"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="font-mono text-body-sm font-semibold text-text-primary">
                        {runner.name}
                      </span>
                      <span className="text-body-sm text-text-tertiary">
                        {runner.label}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-body-sm text-text-tertiary">
                      {status === "done" ? (
                        <span className="ob-log-line font-mono text-status-success">
                          {runner.result}
                        </span>
                      ) : (
                        runner.description
                      )}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 font-mono text-caption uppercase tracking-wider",
                      status === "done" && "text-status-success",
                      status === "running" && "text-brand-primary",
                      status === "pending" && "text-text-disabled",
                    )}
                    aria-live="polite"
                  >
                    {status === "done"
                      ? "OK"
                      : status === "running"
                        ? "Rodando"
                        : "Na fila"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Barra de progresso geral */}
          <div className="border-t border-surface-border px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-medium text-text-secondary">
                Progresso geral
              </span>
              <span className="font-mono text-body-sm font-semibold text-text-primary">
                {progress}%
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-elevated-2"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={cn(
                  "relative h-full rounded-full transition-all duration-700 ease-out",
                  allDone ? "bg-status-success" : "bg-brand-primary",
                )}
                style={{ width: `${progress}%` }}
              >
                {!allDone && (
                  <span className="ob-progress-stripes absolute inset-0" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Radar + terminal */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-surface-border bg-surface-base/85 p-5 shadow-card backdrop-blur">
            <RadarVisual finished={allDone} />
            <p className="mt-3 text-center text-body-sm text-text-tertiary">
              {allDone
                ? "Ambiente apto para sincronização em tempo real"
                : "Varredura do ambiente em andamento…"}
            </p>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-1 shadow-card">
            <div className="flex items-center gap-2 border-b border-surface-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-status-error/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-warning/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-success/60" />
              <span className="ml-2 font-mono text-caption text-text-tertiary">
                terus-diagnostic — live
              </span>
            </div>
            <div
              ref={terminalRef}
              className="h-64 overflow-y-auto scroll-smooth p-4"
              aria-live="polite"
              aria-label="Log do diagnóstico"
            >
              {logLines.length === 0 && (
                <p className="font-mono text-code-sm text-text-disabled">
                  aguardando início…
                </p>
              )}
              {logLines.map((line) => (
                <p
                  key={line.id}
                  className="ob-log-line font-mono text-code-sm leading-relaxed"
                >
                  <span className="text-text-disabled">
                    [{line.runner.replace("Runner", "").toLowerCase()}]
                  </span>{" "}
                  <span
                    className={
                      line.kind === "success"
                        ? "text-status-success"
                        : "text-text-secondary"
                    }
                  >
                    {line.kind === "success" ? "✓ " : ""}
                    {line.text}
                  </span>
                </p>
              ))}
            </div>
            {!allDone && (
              <div
                className="ob-scanline pointer-events-none absolute inset-x-0 top-10 h-10 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent"
                aria-hidden="true"
              />
            )}
          </div>
        </aside>
      </div>

      {allDone && (
        <div
          className="ob-enter mt-6 flex items-center gap-3 rounded-2xl border border-status-success/30 bg-status-success-dim/50 px-5 py-4"
          role="status"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0 text-status-success"
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
            />
          </svg>
          <p className="text-body-md text-text-secondary">
            <span className="font-semibold text-text-primary">
              Diagnóstico aprovado.
            </span>{" "}
            Todos os 5 runners passaram — seu ambiente está pronto para a
            sincronização Terus.
          </p>
        </div>
      )}

      <StepNav
        backHref="/onboarding/banco"
        continueLabel="Ir para o contrato"
        continueDisabled={!allDone}
        onContinue={() => router.push("/onboarding/contratos")}
      />
    </StepShell>
  );
}
