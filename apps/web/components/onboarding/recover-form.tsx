"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { recoverSchema, type RecoverValues } from "@terus/schemas";
import { Button, Input } from "@terus/ui";
import { useForm } from "react-hook-form";

import { Field } from "@/components/onboarding/field";
import { Notice } from "@/components/onboarding/notice";
import { useRecover } from "@/lib/api/hooks";
import { CTA } from "@/lib/constants/conversion";

export function RecoverForm() {
  const recover = useRecover();
  const form = useForm<RecoverValues>({ resolver: zodResolver(recoverSchema) });
  const { errors, isSubmitting } = form.formState;

  if (recover.data) {
    return recover.data.delivery === "sent" ? (
      <Notice tone="success" title="Verifique seu e-mail">
        {recover.data.message}
      </Notice>
    ) : (
      <div className="flex flex-col gap-4">
        <Notice tone="warning" title="Envio de e-mail não configurado">
          {recover.data.message}
        </Notice>
        <a
          href={CTA.secondary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-body-md font-semibold text-text-link hover:underline"
        >
          Falar com a Terus pelo WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(async (v) => {
        try {
          await recover.mutateAsync(v.email);
        } catch {
          /* exibido abaixo */
        }
      })}
      noValidate
      className="flex flex-col gap-5"
    >
      <Field id="email" label="E-mail da conta" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...form.register("email")}
        />
      </Field>
      {recover.error ? (
        <Notice tone="error">{recover.error.message}</Notice>
      ) : null}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        Recuperar acesso
      </Button>
    </form>
  );
}
