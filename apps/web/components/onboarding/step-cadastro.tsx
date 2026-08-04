"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingCadastroSchema } from "@terus/schemas";
import { Input, Label, Select, cn } from "@terus/ui";

import { StepNav, StepShell } from "@/components/onboarding/step-shell";
import {
  useOnboardingStore,
  type OnboardingCadastro,
} from "@/store/onboarding-store";

const FORM_ID = "onboarding-cadastro-form";

function maskCnpj(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

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

export function StepCadastro() {
  const router = useRouter();
  const { cadastro, setCadastro } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingCadastro>({
    resolver: zodResolver(onboardingCadastroSchema),
    defaultValues: cadastro ?? {
      contactName: "",
      email: "",
      phone: "",
      companyName: "",
      cnpj: "",
      segment: "retail",
      storeCount: undefined,
    },
  });

  const onSubmit = (data: OnboardingCadastro) => {
    setCadastro(data);
    router.push("/onboarding/integracao");
  };

  return (
    <StepShell
      step={1}
      eyebrow="Cadastro"
      title={
        <>
          Vamos conhecer a <span className="text-gradient">sua operação</span>
        </>
      }
      description="Esses dados criam a sua sessão de onboarding e personalizam o restante da jornada — leva menos de dois minutos."
    >
      <form
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-surface-border bg-surface-base/85 p-6 shadow-card backdrop-blur sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Nome do responsável"
            htmlFor="contactName"
            error={errors.contactName?.message}
          >
            <Input
              id="contactName"
              placeholder="Quem conduz a integração"
              autoComplete="name"
              aria-invalid={!!errors.contactName}
              {...register("contactName")}
            />
          </Field>

          <Field
            label="E-mail corporativo"
            htmlFor="email"
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              placeholder="voce@suaempresa.com.br"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>

          <Field label="Telefone" htmlFor="phone" error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-0000"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                onChange: (event) => {
                  setValue("phone", maskPhone(event.target.value));
                },
              })}
            />
          </Field>

          <Field
            label="Empresa"
            htmlFor="companyName"
            error={errors.companyName?.message}
          >
            <Input
              id="companyName"
              placeholder="Razão social ou nome fantasia"
              autoComplete="organization"
              aria-invalid={!!errors.companyName}
              {...register("companyName")}
            />
          </Field>

          <Field label="CNPJ" htmlFor="cnpj" error={errors.cnpj?.message}>
            <Input
              id="cnpj"
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              aria-invalid={!!errors.cnpj}
              {...register("cnpj", {
                onChange: (event) => {
                  setValue("cnpj", maskCnpj(event.target.value));
                },
              })}
            />
          </Field>

          <Field
            label="Segmento"
            htmlFor="segment"
            error={errors.segment?.message}
          >
            <Select
              id="segment"
              aria-invalid={!!errors.segment}
              {...register("segment")}
            >
              <option value="retail">Varejo</option>
              <option value="industry">Indústria</option>
              <option value="distribution">Distribuição</option>
            </Select>
          </Field>

          <Field
            label="Número de lojas / filiais"
            htmlFor="storeCount"
            error={errors.storeCount?.message}
            className="sm:col-span-2 sm:max-w-56"
          >
            <Input
              id="storeCount"
              type="number"
              min={1}
              placeholder="Ex: 12"
              aria-invalid={!!errors.storeCount}
              {...register("storeCount")}
            />
          </Field>
        </div>
      </form>

      <StepNav backHref="/onboarding" formId={FORM_ID} loading={isSubmitting} />
    </StepShell>
  );
}
