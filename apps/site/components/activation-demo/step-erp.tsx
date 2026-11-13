"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { CheckIcon } from "@/components/activation-demo/demo-chrome";
import { StepNav, StepShell } from "@/components/activation-demo/step-shell";
import {
  DEMO_BASE,
  DEMO_ERPS,
  SUPPLIER_ERPS,
  type ConnectionKind,
  type DemoErpId,
} from "@/lib/constants/activation-demo";
import { useActivationDemo } from "@/lib/activation-demo/store";

function KindIcon({ kind }: { kind: ConnectionKind | null }) {
  if (kind === "api") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === null) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.5M12 17h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StepErp() {
  const router = useRouter();
  const { erp, setErp } = useActivationDemo();
  const [selected, setSelected] = useState<DemoErpId | null>(erp);
  const isOther = selected === "outro";
  const canContinue = !!selected && !isOther;

  const next = () => {
    if (!selected || isOther) return;
    setErp(selected);
    router.push(`${DEMO_BASE}/preparacao`);
  };

  return (
    <StepShell
      step={2}
      eyebrow="Integração"
      title={
        <>
          Qual ERP roda <span className="text-gradient">nas suas lojas</span>?
        </>
      }
      description="Cada ERP tem um manual próprio na wiki da Terus: o que liberar na rede, o usuário a criar e o script de permissões. As próximas etapas mudam conforme a escolha."
      wide
    >
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        role="radiogroup"
        aria-label="ERP do varejo"
      >
        {DEMO_ERPS.map((option, index) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(option.id)}
              className={cn(
                "ob-enter-scale group relative flex flex-col rounded-2xl border bg-surface-base/85 p-5 text-left backdrop-blur transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
                isSelected
                  ? "border-brand-primary shadow-premium ring-4 ring-brand-primary/10"
                  : "border-surface-border shadow-card",
                option.id === "outro" && "border-dashed",
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span
                className={cn(
                  "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300",
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-surface-base"
                    : "border-surface-border bg-surface-elevated-1 text-transparent",
                )}
                aria-hidden="true"
              >
                {isSelected ? <CheckIcon className="h-3.5 w-3.5" /> : null}
              </span>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
                  isSelected
                    ? "bg-brand-primary text-surface-base"
                    : "bg-brand-primary-dim text-brand-primary",
                )}
              >
                <KindIcon kind={option.kind} />
              </span>
              <span className="mt-4 font-display text-heading-lg font-semibold text-text-primary">
                {option.name}
              </span>
              <span className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-tertiary">
                {option.vendor}
              </span>
              <span className="mt-3 flex-1 text-body-sm leading-relaxed text-text-secondary">
                {option.method}
              </span>
              <span className="mt-4">
                {option.kind ? (
                  <span className="rounded-full bg-status-success-dim px-2.5 py-1 font-mono text-caption text-status-success">
                    Manual na wiki
                  </span>
                ) : (
                  <span className="rounded-full bg-status-warning/10 px-2.5 py-1 font-mono text-caption text-status-warning">
                    Avaliação caso a caso
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {isOther ? (
        <div
          className="ob-enter mt-6 flex flex-col gap-4 rounded-2xl border border-status-warning/30 bg-status-warning/5 p-6 sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <div>
            <p className="text-body-md font-semibold text-text-primary">
              Esse ERP ainda não tem manual de integração na wiki
            </p>
            <p className="mt-1 max-w-xl text-body-sm text-text-secondary">
              A ativação técnica não segue sozinha nesse caso. Peça uma proposta
              informando o seu ERP: a equipe Terus avalia a integração com você.
            </p>
          </div>
          <Button variant="outline" asChild className="shrink-0">
            <Link href="/criar-conta">Pedir uma proposta</Link>
          </Button>
        </div>
      ) : null}

      <p
        className="ob-enter mt-6 rounded-2xl border border-surface-border bg-surface-elevated-1/70 px-5 py-4 text-body-sm text-text-secondary"
        style={{ animationDelay: "500ms" }}
      >
        <span className="font-semibold text-text-primary">
          Usa {SUPPLIER_ERPS.join(", ")}?
        </span>{" "}
        Esses ERPs ficam do lado da indústria e do distribuidor: recebem o
        pedido aprovado no portal. A captura do varejo parte de um dos ERPs
        acima.
      </p>

      <StepNav
        backHref={`${DEMO_BASE}/cadastro`}
        continueDisabled={!canContinue}
        hint={
          isOther
            ? "Com outro ERP, siga pelo pedido de proposta."
            : "Escolha um ERP para continuar."
        }
        onContinue={next}
      />
    </StepShell>
  );
}
