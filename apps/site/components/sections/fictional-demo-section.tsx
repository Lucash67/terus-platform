"use client";

import { useMemo, useState } from "react";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import {
  DEMO_ALERTS,
  DEMO_STORES,
  priorityOf,
  type DemoAlert,
} from "@/lib/constants/demo";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const PRIORITY_CLASS = {
  Alto: "border-status-error/30 bg-status-error-dim text-status-error",
  Médio: "border-status-warning/30 bg-status-warning-dim text-status-warning",
  Baixo: "border-surface-border bg-surface-elevated-2 text-text-secondary",
} as const;

/**
 * Demonstração interativa com dados FICTÍCIOS e rótulo explícito.
 * Nada aqui está conectado a ERP, loja ou cliente real.
 */
export function FictionalDemoSection({ id = "demo" }: { id?: string }) {
  const [store, setStore] = useState<DemoAlert["store"]>("loja-a");
  const [prioritized, setPrioritized] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());

  const alerts = useMemo(() => {
    const list = DEMO_ALERTS.filter((a) => a.store === store);
    return prioritized ? [...list].sort((a, b) => b.value - a.value) : list;
  }, [store, prioritized]);

  const pending = alerts.filter((a) => !done.has(a.id));
  const recovered = alerts
    .filter((a) => done.has(a.id))
    .reduce((s, a) => s + a.value, 0);

  return (
    <section
      id={id}
      className="section-rhythm relative scroll-mt-24 border-y border-surface-border bg-surface-elevated-1/40"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Demonstração interativa
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Do alerta à fila da loja
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Veja como alertas viram uma fila ordenada pelo valor que cada
            correção recupera.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-surface-border bg-surface-base shadow-premium">
          <div
            role="note"
            className="flex items-center gap-2 border-b border-status-warning/30 bg-status-warning-dim px-4 py-2 text-body-sm text-text-primary"
          >
            <span aria-hidden="true">●</span>
            <strong>Dados fictícios.</strong> Demonstração ilustrativa, sem
            conexão com ERP, loja ou cliente.
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Loja fictícia"
                className="flex gap-2"
              >
                {DEMO_STORES.map((s) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={store === s.id}
                    onClick={() => {
                      setStore(s.id);
                      setPrioritized(false);
                      setDone(new Set());
                    }}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors",
                      store === s.id
                        ? "bg-brand-primary text-surface-base"
                        : "border border-surface-border text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                onClick={() => setPrioritized(true)}
                disabled={prioritized}
              >
                {prioritized ? "Fila ordenada por R$" : "Gerar fila da loja"}
              </Button>
            </div>

            <ul className="flex flex-col gap-2" aria-live="polite">
              {alerts.map((a, i) => {
                const p = priorityOf(a.value);
                const isDone = done.has(a.id);
                return (
                  <li
                    key={`${a.id}-${prioritized}`}
                    className={cn(
                      "demo-row-enter grid items-center gap-3 rounded-xl border p-3 sm:grid-cols-[auto_1fr_auto_auto]",
                      isDone
                        ? "border-status-success/30 bg-status-success-dim"
                        : "border-surface-border bg-surface-elevated-1",
                    )}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="font-mono text-caption text-text-tertiary">
                      {prioritized ? `#${i + 1}` : a.type}
                    </span>
                    <div>
                      <p className="text-body-md font-semibold text-text-primary">
                        {a.product}
                      </p>
                      <p className="text-body-sm text-text-tertiary">
                        {a.section} · {prioritized ? a.action : a.type}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-caption font-semibold",
                        PRIORITY_CLASS[p],
                      )}
                    >
                      {p} · {brl.format(a.value)}
                    </span>
                    {prioritized ? (
                      <Button
                        size="sm"
                        variant={isDone ? "ghost" : "secondary"}
                        onClick={() =>
                          setDone((prev) => {
                            const next = new Set(prev);
                            if (next.has(a.id)) next.delete(a.id);
                            else next.add(a.id);
                            return next;
                          })
                        }
                      >
                        {isDone ? "Desfazer" : "Concluir com foto"}
                      </Button>
                    ) : (
                      <span />
                    )}
                  </li>
                );
              })}
            </ul>
            {prioritized ? (
              <div className="grid gap-3 rounded-xl border border-surface-border bg-surface-elevated-1 p-4 text-body-sm sm:grid-cols-2">
                <p className="text-text-secondary">
                  Na fila:{" "}
                  <strong className="text-text-primary">
                    {pending.length}
                  </strong>{" "}
                  tarefa(s)
                </p>
                <p className="text-text-secondary sm:text-right">
                  Valor fictício das tarefas concluídas:{" "}
                  <strong className="text-status-success">
                    {brl.format(recovered)}
                  </strong>
                </p>
              </div>
            ) : (
              <p className="text-body-sm text-text-tertiary">
                Na plataforma real, os alertas vêm do ERP da rede e a loja
                executa pelo app Terus Task.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
