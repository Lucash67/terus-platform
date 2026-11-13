"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { DEMO_STEPS, DEMO_TOTAL_STEPS } from "@/lib/constants/activation-demo";
import {
  getUnlockedStep,
  useActivationDemo,
} from "@/lib/activation-demo/store";

interface StepShellProps {
  step: number;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
}

/** Cabeçalho da etapa em cascata (ob-enter) e conteúdo logo em seguida. */
export function StepShell({
  step,
  eyebrow,
  title,
  description,
  children,
  wide = false,
}: StepShellProps) {
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  // Ao trocar de etapa, o foco vai para o título (leitor de tela anuncia a nova etapa)
  React.useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <div className={cn("mx-auto", wide ? "max-w-5xl" : "max-w-2xl")}>
        <header className="mb-8 sm:mb-10">
          <p className="ob-enter font-mono text-caption uppercase tracking-widest text-brand-primary">
            Etapa {step} de {DEMO_TOTAL_STEPS} — {eyebrow}
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="ob-enter mt-3 font-display text-display-lg text-text-primary outline-none sm:text-display-xl"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          <p
            className="ob-enter mt-3 max-w-2xl text-body-lg text-text-secondary"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        </header>
        <div className="ob-enter" style={{ animationDelay: "240ms" }}>
          {children}
        </div>
      </div>
    </Container>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={back ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StepNavProps {
  backHref?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
  /** Mensagem curta do que falta para continuar (evita botão desabilitado mudo). */
  hint?: string;
  formId?: string;
  onContinue?: () => void;
  onSkip?: () => void;
  skipLabel?: string;
  loading?: boolean;
}

export function StepNav({
  backHref,
  continueLabel = "Continuar",
  continueDisabled = false,
  hint,
  formId,
  onContinue,
  onSkip,
  skipLabel = "Pular esta etapa",
  loading = false,
}: StepNavProps) {
  return (
    <div className="mt-8 border-t border-surface-border pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {backHref ? (
          <Button variant="ghost" size="lg" asChild>
            <Link href={backHref}>
              <Arrow back />
              Voltar
            </Link>
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {onSkip ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onSkip}
              disabled={loading}
            >
              {skipLabel}
            </Button>
          ) : null}
          <Button
            size="lg"
            type={formId ? "submit" : "button"}
            form={formId}
            disabled={continueDisabled || loading}
            onClick={onContinue}
            aria-describedby={
              continueDisabled && hint ? "step-nav-hint" : undefined
            }
            className="min-w-40 font-semibold shadow-elevated ring-2 ring-brand-primary/15 transition-all hover:ring-brand-primary/30"
          >
            {loading ? (
              <span
                className="ob-spin h-4 w-4 rounded-full border-2 border-surface-base/40 border-t-surface-base"
                aria-hidden="true"
              />
            ) : (
              <>
                {continueLabel}
                <Arrow />
              </>
            )}
          </Button>
        </div>
      </div>
      {continueDisabled && hint ? (
        <p
          id="step-nav-hint"
          className="mt-3 text-right text-body-sm text-text-tertiary"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Impede abrir uma etapa ainda bloqueada: leva à mais avançada disponível. */
export function StepGuard({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const state = useActivationDemo();
  const unlocked = getUnlockedStep(state);
  const blocked = state.hasHydrated && step > unlocked;

  React.useEffect(() => {
    if (blocked) router.replace(DEMO_STEPS[unlocked - 1].href);
  }, [blocked, unlocked, router]);

  if (!state.hasHydrated || blocked) {
    return (
      <div
        className="flex min-h-[40vh] items-center justify-center"
        aria-busy="true"
      >
        <span className="sr-only">Carregando etapa</span>
        <span className="ob-spin h-8 w-8 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary" />
      </div>
    );
  }
  return <>{children}</>;
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-border bg-surface-base/85 shadow-card backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
