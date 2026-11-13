"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@terus/schemas/self-onboarding";
import { Button, Input } from "@terus/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Field } from "@/components/onboarding/field";
import { Notice } from "@/components/onboarding/notice";
import { useResetPassword } from "@/lib/api/hooks";

export function ResetPasswordForm() {
  const token = useSearchParams().get("token") ?? "";
  const reset = useResetPassword();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { errors, isSubmitting } = form.formState;

  if (!token) {
    return (
      <Notice tone="error">
        Link incompleto.{" "}
        <Link href="/recuperar-acesso" className="underline">
          Peça um novo
        </Link>
        .
      </Notice>
    );
  }
  if (reset.isSuccess) {
    return (
      <Notice tone="success" title="Senha atualizada">
        <Link href="/entrar" className="underline">
          Entrar com a nova senha
        </Link>
      </Notice>
    );
  }
  return (
    <form
      onSubmit={form.handleSubmit(async (v) => {
        try {
          await reset.mutateAsync({ token, new_password: v.new_password });
        } catch {
          /* exibido abaixo */
        }
      })}
      noValidate
      className="flex flex-col gap-5"
    >
      <Field
        id="new_password"
        label="Nova senha"
        error={errors.new_password?.message}
      >
        <Input
          id="new_password"
          type="password"
          autoComplete="new-password"
          {...form.register("new_password")}
        />
      </Field>
      <Field
        id="confirm"
        label="Confirme a nova senha"
        error={errors.confirm?.message}
      >
        <Input
          id="confirm"
          type="password"
          autoComplete="new-password"
          {...form.register("confirm")}
        />
      </Field>
      {reset.error ? <Notice tone="error">{reset.error.message}</Notice> : null}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        Salvar nova senha
      </Button>
    </form>
  );
}
