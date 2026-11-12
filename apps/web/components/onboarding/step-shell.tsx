import Link from "next/link";
import { Button, cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TOTAL_STEPS } from "@/lib/constants/onboarding";

interface StepShellProps {
  step: number;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function StepShell({
  step,
  eyebrow,
  title,
  description,
  children,
  wide = false,
}: StepShellProps) {
  return (
    <Container className="py-10 sm:py-14">
      <div className={cn("mx-auto", wide ? "max-w-4xl" : "max-w-2xl")}>
        <header className="mb-8 sm:mb-10">
          <p
            className="ob-enter font-mono text-caption uppercase tracking-widest text-brand-primary"
            style={{ animationDelay: "0ms" }}
          >
            Etapa {step} de {TOTAL_STEPS} — {eyebrow}
          </p>
          <h1
            className="ob-enter mt-3 font-display text-display-lg text-text-primary sm:text-display-xl"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          <p
            className="ob-enter mt-3 max-w-xl text-body-lg text-text-secondary"
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

interface StepNavProps {
  backHref?: string;
  continueLabel?: string;
  continueDisabled?: boolean;
  /** Quando definido, o botão de continuar age como submit de formulário. */
  formId?: string;
  onContinue?: () => void;
  /** Pular etapa (ex.: instruções opcionais / resolver depois). */
  onSkip?: () => void;
  skipLabel?: string;
  loading?: boolean;
}

export function StepNav({
  backHref,
  continueLabel = "Continuar",
  continueDisabled = false,
  formId,
  onContinue,
  onSkip,
  skipLabel = "Pular esta etapa",
  loading = false,
}: StepNavProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-surface-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      {backHref ? (
        <Button variant="ghost" size="lg" asChild>
          <Link href={backHref}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
            className="text-text-secondary"
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
          className="min-w-40 font-semibold shadow-elevated ring-2 ring-brand-primary/15 transition-all hover:ring-brand-primary/30"
        >
          {loading ? (
            <span
              className="h-4 w-4 rounded-full border-2 border-surface-base/40 border-t-surface-base ob-spin"
              aria-hidden="true"
            />
          ) : (
            <>
              {continueLabel}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
