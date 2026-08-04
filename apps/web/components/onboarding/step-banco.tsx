"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingBancoSchema } from "@terus/schemas";
import { Input, Label, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import { ERP_OPTIONS } from "@/lib/constants/onboarding";
import {
  useOnboardingStore,
  type OnboardingBanco,
} from "@/store/onboarding-store";

const FORM_ID = "onboarding-banco-form";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="ob-log-line text-body-sm text-status-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function StepBanco() {
  const router = useRouter();
  const { erp, banco, setBanco } = useOnboardingStore();
  const [showPassword, setShowPassword] = useState(false);

  const erpOption = ERP_OPTIONS.find((option) => option.id === erp);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingBanco>({
    resolver: zodResolver(onboardingBancoSchema),
    defaultValues: {
      erpHost: banco?.erpHost ?? "",
      erpPort: banco?.erpPort ?? 1521,
      erpDatabase: banco?.erpDatabase ?? "",
      erpUser: banco?.erpUser ?? "terus_reader",
      erpPassword: "",
    },
  });

  const values = watch();

  const onSubmit = (data: OnboardingBanco) => {
    setBanco(data);
    router.push("/onboarding/diagnostico");
  };

  return (
    <StepShell
      step={4}
      eyebrow="Conexão"
      title={
        <>
          Aponte a Terus para o{" "}
          <span className="text-gradient">banco do ERP</span>
        </>
      }
      description="Informe o endereço do banco e o usuário de leitura criado na etapa anterior. A senha vai direto para o cofre — nunca fica no navegador."
      wide
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <form
          id={FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-surface-border bg-surface-base/85 p-6 shadow-card backdrop-blur sm:p-8"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Field
              label="Host ou IP"
              htmlFor="erpHost"
              error={errors.erpHost?.message}
              className="sm:col-span-2"
            >
              <Input
                id="erpHost"
                placeholder="db.suaempresa.com.br"
                autoComplete="off"
                aria-invalid={!!errors.erpHost}
                {...register("erpHost")}
              />
            </Field>

            <Field
              label="Porta"
              htmlFor="erpPort"
              error={errors.erpPort?.message}
            >
              <Input
                id="erpPort"
                type="number"
                placeholder="1521"
                aria-invalid={!!errors.erpPort}
                {...register("erpPort")}
              />
            </Field>

            <Field
              label={erp === "rms" ? "Banco / Service name" : "Service name"}
              htmlFor="erpDatabase"
              error={errors.erpDatabase?.message}
              className="sm:col-span-3"
            >
              <Input
                id="erpDatabase"
                placeholder={erp === "winthor" ? "WINT" : "RMS_PROD"}
                autoComplete="off"
                aria-invalid={!!errors.erpDatabase}
                {...register("erpDatabase")}
              />
            </Field>

            <Field
              label="Usuário de leitura"
              htmlFor="erpUser"
              error={errors.erpUser?.message}
              className="sm:col-span-2"
            >
              <Input
                id="erpUser"
                placeholder="terus_reader"
                autoComplete="off"
                aria-invalid={!!errors.erpUser}
                {...register("erpUser")}
              />
            </Field>

            <Field
              label="Senha"
              htmlFor="erpPassword"
              error={errors.erpPassword?.message}
            >
              <div className="relative">
                <Input
                  id="erpPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={!!errors.erpPassword}
                  className="pr-11"
                  {...register("erpPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors hover:text-text-primary"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  >
                    {showPassword ? (
                      <>
                        <path
                          d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4 4l16 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </Field>
          </div>
        </form>

        <aside className="flex flex-col gap-4">
          <div
            className="ob-enter-right rounded-2xl border border-surface-border bg-surface-elevated-1/90 p-5"
            style={{ animationDelay: "150ms" }}
          >
            <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
              Pré-visualização da conexão
            </p>
            <div className="mt-3 overflow-hidden rounded-lg border border-surface-border bg-surface-base p-3.5">
              <code className="block break-all font-mono text-code-sm leading-relaxed text-text-secondary">
                <span className="text-brand-primary">
                  {erpOption?.databases[0]?.toLowerCase() ?? "oracle"}://
                </span>
                {values.erpUser || "usuario"}
                <span className="text-text-disabled">:•••••</span>@
                {values.erpHost || "host"}:{values.erpPort || "porta"}/
                {values.erpDatabase || "banco"}
              </code>
            </div>
            <p className="mt-3 text-body-sm leading-relaxed text-text-tertiary">
              Testaremos exatamente esta conexão no diagnóstico da próxima
              etapa.
            </p>
          </div>

          <div
            className="ob-enter-right flex items-start gap-3 rounded-2xl border border-brand-primary/20 bg-brand-primary-dim/40 p-5"
            style={{ animationDelay: "250ms" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 10V7a4 4 0 018 0v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="15" r="1.5" fill="currentColor" />
            </svg>
            <p className="text-body-sm leading-relaxed text-text-secondary">
              <span className="font-semibold text-text-primary">
                Custódia segura.
              </span>{" "}
              A senha é enviada por canal criptografado ao cofre de credenciais
              e revogada automaticamente após cada uso.
            </p>
          </div>
        </aside>
      </div>

      <StepNav
        backHref="/onboarding/instrucoes"
        continueLabel="Validar conexão"
        formId={FORM_ID}
        loading={isSubmitting}
      />
    </StepShell>
  );
}
