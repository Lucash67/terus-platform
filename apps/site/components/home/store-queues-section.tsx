"use client";

import * as React from "react";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import {
  InView,
  Kicker,
  KineticText,
  prefersReducedMotion,
} from "@/components/motion/xp";
import { RETURN_BANDS, STORE_QUEUES } from "@/lib/constants/store-queues";

/** Contagens fictícias exibidas no celular (ilustração). */
const FAKE_COUNTS = [12, 27, 8, 5, 3, 9];

export function StoreQueuesSection() {
  const [active, setActive] = React.useState(1);
  const [auto, setAuto] = React.useState(true);
  const q = STORE_QUEUES[active];

  React.useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STORE_QUEUES.length),
      4200,
    );
    return () => window.clearInterval(id);
  }, [auto]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <div
        className="xp-dots pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <Container className="relative">
        <InView className="max-w-3xl">
          <Kicker index="03" className="xp-in">
            Terus Task · o app da loja
          </Kicker>
          <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
            <KineticText text="Seis filas. Um produto de cada vez." />{" "}
            <KineticText
              text="O mais valioso primeiro."
              delay={250}
              wordClassName="text-brand-primary"
            />
          </h2>
          <p
            className="xp-in mt-6 text-body-lg text-text-secondary"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            O operador não escolhe o próximo item por memória. O app diz o
            departamento, a seção, o produto, o que conferir — e pede a foto. A
            ordem anda pela loja sem ir e voltar entre corredores.
          </p>
        </InView>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12">
          {/* Celular */}
          <InView className="xp-in flex justify-center lg:col-span-5">
            <div className="relative w-[300px] rounded-[44px] border border-surface-border bg-surface-elevated-1 p-3 shadow-premium">
              <div
                className="mx-auto mb-3 h-5 w-24 rounded-full bg-surface-base"
                aria-hidden="true"
              />
              <div className="rounded-[32px] bg-surface-base p-4">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
                  Mercearia · Turno
                </p>
                <p className="mt-1 font-display text-heading-lg font-semibold text-text-primary">
                  O que deseja fazer?
                </p>
                <div className="mt-3 flex gap-1" role="presentation">
                  {["Alto", "Médio", "Baixo"].map((b, i) => (
                    <span
                      key={b}
                      className={cn(
                        "flex-1 whitespace-nowrap rounded-full px-1 py-1 text-center font-mono text-[10px] leading-tight",
                        i === 0
                          ? "bg-status-success-dim text-status-success"
                          : "bg-surface-elevated-2 text-text-tertiary",
                      )}
                    >
                      {b} R$
                    </span>
                  ))}
                </div>
                <ul
                  className="mt-3 grid grid-cols-2 gap-2"
                  role="tablist"
                  aria-label="Filas do app"
                >
                  {STORE_QUEUES.map((item, i) => (
                    <li key={item.id} role="presentation">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        aria-controls="fila-detalhe"
                        onClick={() => choose(i)}
                        className={cn(
                          "relative flex h-24 w-full flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-500",
                          i === active
                            ? "scale-[1.03] border-brand-primary bg-brand-primary-dim"
                            : "border-surface-border bg-surface-elevated-1 hover:border-brand-primary/40",
                        )}
                      >
                        <span className="text-caption font-semibold leading-tight text-text-primary">
                          {item.title}
                        </span>
                        <span className="self-end font-mono text-heading-md text-brand-primary">
                          {FAKE_COUNTS[i]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-center font-mono text-caption text-text-tertiary">
                  Tela ilustrativa · números fictícios
                </p>
              </div>
            </div>
          </InView>

          {/* Detalhe da fila */}
          <div className="lg:col-span-7">
            <div
              id="fila-detalhe"
              role="tabpanel"
              aria-live="polite"
              key={q.id}
              className="xp-pop rounded-[32px] border border-surface-border bg-surface-elevated-1/60 p-8 backdrop-blur-sm lg:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-code-sm text-text-tertiary">
                  Fila {String(active + 1).padStart(2, "0")}
                </span>
                {q.tag ? (
                  <span className="rounded-full bg-brand-primary-dim px-3 py-1 font-mono text-caption text-brand-primary">
                    trata {q.tag}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-display-lg font-bold tracking-tight text-text-primary">
                {q.title}
              </h3>
              <p className="mt-2 font-mono text-code-sm uppercase tracking-[0.14em] text-brand-primary">
                {q.short}
              </p>
              <p className="mt-6 text-body-lg text-text-secondary">{q.what}</p>
              <ol className="mt-8 space-y-3">
                {q.steps.map((s, i) => (
                  <li
                    key={s}
                    className="xp-pop flex items-start gap-4 rounded-2xl bg-surface-base/60 p-4"
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-primary/40 font-mono text-code-sm text-brand-primary">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-body-md text-text-primary">
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <InView className="mt-6 grid gap-3 sm:grid-cols-3">
              {RETURN_BANDS.map((b, i) => (
                <div
                  key={b.band}
                  className="xp-in rounded-2xl border border-surface-border p-5"
                  style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
                >
                  <p
                    className={cn(
                      "font-mono text-code-md font-medium",
                      i === 0 && "text-status-success",
                      i === 1 && "text-status-warning",
                      i === 2 && "text-text-secondary",
                    )}
                  >
                    {b.band}
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {b.text}
                  </p>
                </div>
              ))}
            </InView>
          </div>
        </div>
      </Container>
    </section>
  );
}
