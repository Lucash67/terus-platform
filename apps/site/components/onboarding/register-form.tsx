"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  formatPhone,
  type RegisterValues,
} from "@terus/schemas/self-onboarding";
import { Button, Input } from "@terus/ui";
import { Checkbox } from "@terus/ui/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { describedBy, Field } from "@/components/onboarding/field";
import { Notice } from "@/components/onboarding/notice";
import { fieldErrors } from "@/lib/api/client";
import { useRegister } from "@/lib/api/hooks";
import { trackEvent } from "@/lib/analytics";

export function RegisterForm() {
  const router = useRouter();
  const register = useRegister();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { marketing_opt_in: false },
  });
  const { errors, isSubmitting } = form.formState;
  const serverFields = fieldErrors(register.error);

  async function onSubmit(values: RegisterValues) {
    try {
      await register.mutateAsync(values);
      trackEvent("account_created");
      router.push("/onboarding/empresa");
    } catch {
      /* exibido abaixo */
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <Field
        id="full_name"
        label="Nome completo"
        error={errors.full_name?.message}
      >
        <Input
          id="full_name"
          autoComplete="name"
          aria-invalid={Boolean(errors.full_name)}
          aria-describedby={describedBy("full_name", errors.full_name?.message)}
          {...form.register("full_name")}
        />
      </Field>
      <Field
        id="email"
        label="E-mail corporativo"
        error={errors.email?.message ?? serverFields.email}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email", errors.email?.message)}
          {...form.register("email")}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="phone"
          label="Telefone"
          optional
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(85) 99999-9999"
            aria-invalid={Boolean(errors.phone)}
            {...form.register("phone", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = formatPhone(e.target.value);
              },
            })}
          />
        </Field>
        <Field id="job_title" label="Cargo" optional>
          <Input
            id="job_title"
            autoComplete="organization-title"
            {...form.register("job_title")}
          />
        </Field>
      </div>
      <Field
        id="password"
        label="Senha"
        error={errors.password?.message}
        hint="Mínimo de 10 caracteres, com maiúsculas, minúsculas e número."
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={describedBy(
            "password",
            errors.password?.message,
            "Mínimo de 10 caracteres",
          )}
          {...form.register("password")}
        />
      </Field>

      <fieldset className="flex flex-col gap-3 rounded-lg border border-surface-border p-4">
        <legend className="px-1 text-body-sm font-medium text-text-secondary">
          Consentimentos
        </legend>
        <label className="flex items-start gap-3 text-body-sm text-text-secondary">
          <Checkbox
            aria-invalid={Boolean(errors.accept_terms)}
            {...form.register("accept_terms")}
          />
          <span>
            Li e aceito os{" "}
            <Link
              href="/termos"
              target="_blank"
              className="text-text-link underline"
            >
              Termos de Uso
            </Link>
            .
          </span>
        </label>
        {errors.accept_terms ? (
          <p role="alert" className="text-body-sm text-status-error">
            {errors.accept_terms.message}
          </p>
        ) : null}
        <label className="flex items-start gap-3 text-body-sm text-text-secondary">
          <Checkbox
            aria-invalid={Boolean(errors.accept_privacy)}
            {...form.register("accept_privacy")}
          />
          <span>
            Li a{" "}
            <Link
              href="/privacidade"
              target="_blank"
              className="text-text-link underline"
            >
              Política de Privacidade
            </Link>{" "}
            e concordo com o tratamento dos meus dados para o cadastro e o
            contato comercial.
          </span>
        </label>
        {errors.accept_privacy ? (
          <p role="alert" className="text-body-sm text-status-error">
            {errors.accept_privacy.message}
          </p>
        ) : null}
        <label className="flex items-start gap-3 text-body-sm text-text-secondary">
          <Checkbox {...form.register("marketing_opt_in")} />
          <span>
            Quero receber conteúdos da Terus (opcional, posso cancelar quando
            quiser).
          </span>
        </label>
      </fieldset>

      {register.error ? (
        <Notice tone="error">{register.error.message}</Notice>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Criando conta…" : "Criar conta e continuar"}
      </Button>
    </form>
  );
}
