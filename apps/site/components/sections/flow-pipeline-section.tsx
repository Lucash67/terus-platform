"use client";

import { useEffect, useState } from "react";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Fluxo ERP → sinais → decisões → tarefas → evidências.
 * Conteúdo: camadas Agent/IAproc e módulos (wiki.terus.tec.br/varejo).
 * Animação ilustrativa — não representa dados ao vivo.
 */
const STAGES = [
  {
    id: "erp",
    label: "ERP",
    title: "Captura só leitura",
    text: "O Agent lê o banco ou a API do ERP da rede a partir de um IP fixo da Terus — sem VPN e sem gravar nada.",
  },
  {
    id: "sinais",
    label: "Sinais",
    title: "13 tipos de alerta",
    text: "O IAproc cruza estoque, venda, preço e oferta: ruptura, excesso, sem venda, queda, margem e mais.",
  },
  {
    id: "decisoes",
    label: "Decisões",
    title: "Prioridade por R$",
    text: "Cada alerta ganha o valor que pode recuperar. Diretoria, comprador e loja veem o próprio recorte.",
  },
  {
    id: "tarefas",
    label: "Tarefas",
    title: "Execução guiada",
    text: "O Terus Task conduz a loja produto a produto; o pedido de reposição segue ao ERP do fornecedor.",
  },
  {
    id: "evidencias",
    label: "Evidências",
    title: "Foto e resultado",
    text: "Cada visita fecha com foto. O portal mede R$ antes e depois, acerto e reincidência.",
  },
] as const;

export function FlowPipelineSection({ id = "como-funciona" }: { id?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % STAGES.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const stage = STAGES[active];

  return (
    <section
      id={id}
      className="section-rhythm relative scroll-mt-24 overflow-hidden"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Como funciona
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Do banco do ERP à gôndola, em cinco passos
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Coleta, inteligência e execução conectadas. Toque em cada etapa.
          </p>
        </Reveal>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
        >
          <div
            role="tablist"
            aria-label="Etapas do fluxo"
            className="grid gap-3 lg:grid-cols-5 lg:gap-0"
          >
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className="flex flex-col items-stretch lg:flex-row lg:items-center"
              >
                <button
                  role="tab"
                  id={`flow-tab-${s.id}`}
                  aria-selected={i === active}
                  aria-controls="flow-panel"
                  data-active={i === active}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className={cn(
                    "flow-node flex flex-1 items-center gap-3 rounded-xl border bg-surface-elevated-1 px-4 py-3 text-left lg:flex-col lg:items-start",
                    i === active
                      ? "text-text-primary"
                      : "border-surface-border text-text-secondary hover:border-brand-primary/30",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-caption font-bold",
                      i === active
                        ? "text-brand-primary"
                        : "text-text-tertiary",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-heading-md font-semibold">
                    {s.label}
                  </span>
                </button>
                {i < STAGES.length - 1 ? (
                  <>
                    <span
                      className="flow-track hidden h-px w-6 shrink-0 bg-surface-border lg:block"
                      aria-hidden="true"
                    />
                    <span
                      className="flow-track flow-track-vertical mx-auto h-3 w-px bg-surface-border lg:hidden"
                      aria-hidden="true"
                    />
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <div
            id="flow-panel"
            role="tabpanel"
            aria-labelledby={`flow-tab-${stage.id}`}
            aria-live="polite"
            className="mt-6 rounded-2xl border border-surface-border bg-gradient-to-br from-brand-primary/10 via-surface-elevated-1 to-surface-elevated-1 p-6 sm:p-8"
          >
            <p
              key={stage.id}
              className="demo-row-enter font-display text-heading-lg font-semibold text-text-primary"
            >
              {stage.title}
            </p>
            <p className="mt-2 max-w-2xl text-body-lg text-text-secondary">
              {stage.text}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
