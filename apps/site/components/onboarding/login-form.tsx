"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@terus/schemas/self-onboarding";
import { Button, Input } from "@terus/ui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { describedBy, Field } from "@/components/onboarding/field";
import { Notice } from "@/components/onboarding/notice";
import { useLogin } from "@/lib/api/hooks";
import { trackEvent } from "@/lib/analytics";

function safeNext(value: string | null): string | null {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : null;
}

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const login = useLogin();
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const { errors, isSubmitting } = form.formState;

  async function onSubmit(values: LoginValues) {
    try {
      const session = await login.mutateAsync(values);
      trackEvent("onboarding_resumed");
      const fallback =
        session.user.role === "customer" ? "/onboarding" : "/admin";
      router.push(safeNext(params.get("next")) ?? fallback);
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
      <Field id="email" label="E-mail" error={errors.email?.message}>
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
      <Field id="password" label="Senha" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...form.register("password")}
        />
      </Field>
      <div className="-mt-2 text-right">
        <Link
          href="/recuperar-acesso"
          className="text-body-sm text-text-link hover:underline"
        >
          Esqueci a senha
        </Link>
      </div>
      {login.error ? <Notice tone="error">{login.error.message}</Notice> : null}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
