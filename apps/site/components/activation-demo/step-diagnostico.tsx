"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { CheckIcon } from "@/components/activation-demo/demo-chrome";
import { StepNav, StepShell } from "@/components/activation-demo/step-shell";
import {
  DEMO_BASE,
  DEMO_RUNNERS,
  RUNNER_LOGS,
  SIMULATED_FAILURE,
  findErp,
  type ConnectionKind,
} from "@/lib/constants/activation-demo";
import { useActivationDemo } from "@/lib/activation-demo/store";

type Status = "pending" | "running" | "done" | "failed";
interface Line {
  id: number;
  tag: string;
  text: string;
  kind: "info" | "ok" | "error";
}

/** Runner que falha quando a falha didática está ligada. */
const FAIL_AT = DEMO_RUNNERS.findIndex((r) => r.id === "permission");

function Radar({ state }: { state: "running" | "ok" | "failed" }) {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-surface-border" />
      <div className="absolute inset-3 rounded-full border border-surface-border/70" />
      <div className="absolute inset-6 rounded-full border border-surface-border/50" />
      {state === "ok" ? (
        <>
          <span className="ob-success-ring absolute inset-0 rounded-full border-2 border-status-success/40" />
          <div className="absolute inset-0 flex items-center justify-center text-status-success">
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
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
        </>
      ) : state === "failed" ? (
        <div className="absolute inset-0 flex items-center justify-center text-status-error">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
            <path
              d="M12 7v6M12 16.5h.01"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <>
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
          <div className="ob-radar-sweep absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left"
              style={{
                background:
                  "conic-gradient(from 0deg, rgb(var(--brand-primary-rgb) / 0.35), transparent 70deg)",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  if (status === "done")
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-status-success-dim text-status-success">
        <CheckIcon className="h-4 w-4" />
      </span>
    );
  if (status === "failed")
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-status-error/15 font-bold text-status-error"
        aria-hidden="true"
      >
        !
      </span>
    );
  if (status === "running")
    return (
      <span
        className="ob-spin h-6 w-6 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary"
        aria-hidden="true"
      />
    );
  return (
    <span
      className="h-2.5 w-2.5 rounded-full bg-surface-elevated-3"
      aria-hidden="true"
    />
  );
}

const STATUS_LABEL: Record<Status, string> = {
  done: "OK",
  failed: "Falhou",
  running: "Rodando",
  pending: "Na fila",
};

export function StepDiagnostico() {
  const router = useRouter();
  const {
    erp,
    conexao,
    diagnosticoConcluido,
    concluirDiagnostico,
    reabrirDiagnostico,
  } = useActivationDemo();
  const option = findErp(erp);
  const kind: ConnectionKind = option?.kind ?? "oracle";
  const target = conexao
    ? conexao.kind === "db"
      ? `${conexao.host}:${conexao.port}`
      : conexao.baseUrl
    : "servidor";

  const [failMode, setFailMode] = useState(false);
  const [runId, setRunId] = useState(diagnosticoConcluido ? -1 : 0);
  const [statuses, setStatuses] = useState<Status[]>(() =>
    DEMO_RUNNERS.map(() => (diagnosticoConcluido ? "done" : "pending")),
  );
  const [lines, setLines] = useState<Line[]>([]);
  const [progress, setProgress] = useState(diagnosticoConcluido ? 100 : 0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const failed = statuses.includes("failed");
  const allDone = statuses.every((s) => s === "done");
  const running = !allDone && !failed;
  const doneCount = statuses.filter((s) => s === "done").length;
  const failure = SIMULATED_FAILURE[kind];

  useEffect(() => {
    if (runId < 0) return; // já concluído antes: mostra o resultado sem reencenar
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    const total = DEMO_RUNNERS.length;
    let id = 0;
    let t = 500;
    const push = (tag: string, text: string, k: Line["kind"]) =>
      setLines((prev) => [...prev, { id: ++id, tag, text, kind: k }]);
    const setStatus = (i: number, s: Status) =>
      setStatuses((prev) => prev.map((v, j) => (j === i ? s : v)));

    at(150, () =>
      push("terus", `alvo ${target} · origem 177.104.156.26`, "info"),
    );

    for (let i = 0; i < total; i++) {
      const runner = DEMO_RUNNERS[i];
      const script = RUNNER_LOGS[kind][runner.id];
      const tag = runner.id;
      const willFail = failMode && i === FAIL_AT;
      const logs = willFail ? script.logs.slice(0, 1) : script.logs;
      const step = runner.durationMs / (logs.length + 1);

      at(t, () => setStatus(i, "running"));
      logs.forEach((log, j) =>
        at(t + step * (j + 1), () => {
          push(tag, log, "info");
          setProgress(
            Math.round(((i + (j + 1) / (logs.length + 1)) / total) * 100),
          );
        }),
      );
      t += runner.durationMs;
      if (willFail) {
        at(t, () => {
          setStatus(i, "failed");
          push(tag, failure.error, "error");
        });
        break;
      }
      at(t, () => {
        setStatus(i, "done");
        push(tag, script.ok, "ok");
        setProgress(Math.round(((i + 1) / total) * 100));
      });
    }
    return () => timers.forEach(clearTimeout);
  }, [runId, failMode, kind, target, failure.error]);

  useEffect(() => {
    if (allDone && !diagnosticoConcluido) concluirDiagnostico();
  }, [allDone, diagnosticoConcluido, concluirDiagnostico]);

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (withFailure: boolean) => {
    reabrirDiagnostico();
    setFailMode(withFailure);
    setStatuses(DEMO_RUNNERS.map(() => "pending"));
    setLines([]);
    setProgress(0);
    setRunId((n) => Math.max(n, 0) + 1);
  };

  return (
    <StepShell
      step={5}
      eyebrow="Diagnóstico"
      title={
        <>
          Testando o acesso{" "}
          <span className="text-gradient">antes de ativar</span>
        </>
      }
      description={`Cinco verificações em sequência contra ${target}: rede, autenticação, permissões, consultas do ${option?.name ?? "ERP"} e desempenho. Na demonstração, a execução é encenada.`}
      wide
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_380px] [&>*]:min-w-0">
        <div className="rounded-2xl border border-surface-border bg-surface-base/85 shadow-card backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-heading-md font-semibold text-text-primary">
                Verificações
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 font-mono text-caption",
                  allDone
                    ? "bg-status-success-dim text-status-success"
                    : "bg-surface-elevated-2 text-text-secondary",
                )}
              >
                {doneCount}/{DEMO_RUNNERS.length}
              </span>
              <span className="rounded-full bg-status-warning/15 px-2.5 py-0.5 font-mono text-caption uppercase text-status-warning">
                Simulação
              </span>
            </div>
            {!running ? (
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={() => run(false)}>
                  Rodar de novo
                </Button>
                {!failed ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => run(true)}
                    className="text-text-tertiary"
                  >
                    Ver como é uma falha
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          <ul className="px-6 py-2">
            {DEMO_RUNNERS.map((runner, i) => {
              const s = statuses[i];
              const result =
                s === "done"
                  ? RUNNER_LOGS[kind][runner.id].ok
                  : s === "failed"
                    ? failure.error
                    : runner.description;
              return (
                <li
                  key={runner.id}
                  className={cn(
                    "flex items-center gap-4 border-b border-surface-border-subtle py-4 transition-opacity duration-500 last:border-b-0",
                    s === "pending" && "opacity-45",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <StatusDot status={s} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="font-mono text-body-sm font-semibold text-text-primary">
                        {runner.name}
                      </span>
                      <span className="text-body-sm text-text-tertiary">
                        {runner.label}
                      </span>
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 truncate text-body-sm",
                        s === "done" &&
                          "ob-log-line font-mono text-status-success",
                        s === "failed" &&
                          "ob-log-line font-mono text-status-error",
                        (s === "pending" || s === "running") &&
                          "text-text-tertiary",
                      )}
                    >
                      {result}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 font-mono text-caption uppercase tracking-wider",
                      s === "done" && "text-status-success",
                      s === "failed" && "text-status-error",
                      s === "running" && "text-brand-primary",
                      s === "pending" && "text-text-disabled",
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-surface-border px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-medium text-text-secondary">
                Progresso
              </span>
              <span className="font-mono text-body-sm font-semibold text-text-primary">
                {progress}%
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-elevated-2"
              role="progressbar"
              aria-label="Progresso do diagnóstico"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={cn(
                  "relative h-full rounded-full transition-all duration-700 ease-out",
                  allDone
                    ? "bg-status-success"
                    : failed
                      ? "bg-status-error"
                      : "bg-brand-primary",
                )}
                style={{ width: `${progress}%` }}
              >
                {running ? (
                  <span className="ob-progress-stripes absolute inset-0" />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-surface-border bg-surface-base/85 p-5 shadow-card backdrop-blur">
            <Radar state={allDone ? "ok" : failed ? "failed" : "running"} />
            <p
              className="mt-3 text-center text-body-sm text-text-tertiary"
              role="status"
            >
              {allDone
                ? "Acesso de leitura conferido"
                : failed
                  ? "Uma verificação falhou"
                  : "Verificando o ambiente…"}
            </p>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-surface-border bg-surface-elevated-1 shadow-card">
            <div className="flex items-center gap-2 border-b border-surface-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-status-error/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-warning/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-success/60" />
              <span className="ml-2 font-mono text-caption text-text-tertiary">
                terus-diagnostic · simulação
              </span>
            </div>
            <div
              ref={terminalRef}
              className="h-64 overflow-y-auto scroll-smooth p-4"
              aria-label="Registro do diagnóstico"
              role="log"
            >
              {lines.length === 0 ? (
                <p className="font-mono text-code-sm text-text-disabled">
                  {diagnosticoConcluido && runId < 0
                    ? "diagnóstico já concluído · rode de novo para rever"
                    : "aguardando início…"}
                </p>
              ) : null}
              {lines.map((line) => (
                <p
                  key={line.id}
                  className="ob-log-line break-words font-mono text-code-sm leading-relaxed"
                >
                  <span className="text-text-disabled">[{line.tag}]</span>{" "}
                  <span
                    className={
                      line.kind === "ok"
                        ? "text-status-success"
                        : line.kind === "error"
                          ? "text-status-error"
                          : "text-text-secondary"
                    }
                  >
                    {line.kind === "ok"
                      ? "✓ "
                      : line.kind === "error"
                        ? "✗ "
                        : ""}
                    {line.text}
                  </span>
                </p>
              ))}
            </div>
            {running ? (
              <div
                className="ob-scanline pointer-events-none absolute inset-x-0 top-10 h-10 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent"
                aria-hidden="true"
              />
            ) : null}
          </div>
        </aside>
      </div>

      {failed ? (
        <div
          className="ob-enter mt-6 flex flex-col gap-4 rounded-2xl border border-status-error/30 bg-status-error/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <p className="text-body-md text-text-secondary">
            <span className="font-semibold text-text-primary">
              {failure.error}.
            </span>{" "}
            {failure.fix}
          </p>
          <Button onClick={() => run(false)} className="shrink-0">
            Corrigi, rodar de novo
          </Button>
        </div>
      ) : null}

      {allDone ? (
        <div
          className="ob-enter mt-6 flex items-center gap-3 rounded-2xl border border-status-success/30 bg-status-success/5 px-5 py-4"
          role="status"
        >
          <CheckIcon className="h-5 w-5 shrink-0 text-status-success" />
          <p className="text-body-md text-text-secondary">
            <span className="font-semibold text-text-primary">
              Tudo certo nas 5 verificações.
            </span>{" "}
            Numa ativação real, a equipe Terus confere a primeira carga antes de
            ligar os módulos.
          </p>
        </div>
      ) : null}

      <StepNav
        backHref={`${DEMO_BASE}/conexao`}
        continueLabel="Ir para o contrato"
        continueDisabled={!allDone}
        hint={
          failed
            ? "Corrija e rode de novo para continuar."
            : "Aguarde as 5 verificações."
        }
        onContinue={() => router.push(`${DEMO_BASE}/contrato`)}
      />
    </StepShell>
  );
}
