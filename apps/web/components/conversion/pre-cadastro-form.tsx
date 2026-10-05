"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { preCadastroSchema } from "@terus/schemas";
import { Button, Input, Label, Select, cn } from "@terus/ui";

import {
  DEMO_PAGE,
  PRE_CADASTRO_ERPS,
  WHATSAPP_NUMBER,
} from "@/lib/constants/conversion";

type PreCadastro = z.infer<typeof preCadastroSchema>;

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

function buildWhatsappUrl(data: PreCadastro): string {
  const erp =
    PRE_CADASTRO_ERPS.find((option) => option.id === data.erp)?.label ??
    data.erp;
  const message = [
    "Olá! Quero começar com a Terus Varejo.",
    `Nome: ${data.contactName}`,
    `Rede: ${data.companyName}`,
    `ERP: ${erp}`,
    `Lojas: ${data.storeCount}`,
    `Telefone: ${data.phone}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
      {error ? (
        <p className="text-body-sm text-status-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PreCadastroForm({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PreCadastro>({
    resolver: zodResolver(preCadastroSchema),
    defaultValues: {
      contactName: "",
      companyName: "",
      erp: undefined,
      storeCount: undefined,
      phone: "",
    },
  });

  const onSubmit = (data: PreCadastro) => {
    const url = buildWhatsappUrl(data);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "rounded-2xl border border-surface-border bg-surface-elevated-1 p-6 text-left shadow-elevated sm:p-8",
        className,
      )}
    >
      <p className="font-display text-heading-md font-semibold text-text-primary">
        {DEMO_PAGE.form.title}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Seu nome"
          htmlFor="contactName"
          error={errors.contactName?.message}
        >
          <Input
            id="contactName"
            autoComplete="name"
            aria-invalid={!!errors.contactName}
            {...register("contactName")}
          />
        </Field>

        <Field
          label="Nome da rede"
          htmlFor="companyName"
          error={errors.companyName?.message}
        >
          <Input
            id="companyName"
            autoComplete="organization"
            aria-invalid={!!errors.companyName}
            {...register("companyName")}
          />
        </Field>

        <Field
          label="ERP da rede"
          htmlFor="erp"
          error={errors.erp && "Escolha o ERP"}
        >
          <Select
            id="erp"
            defaultValue=""
            aria-invalid={!!errors.erp}
            {...register("erp")}
          >
            <option value="" disabled>
              Selecione
            </option>
            {PRE_CADASTRO_ERPS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Número de lojas"
          htmlFor="storeCount"
          error={errors.storeCount?.message}
        >
          <Input
            id="storeCount"
            type="number"
            inputMode="numeric"
            min={1}
            aria-invalid={!!errors.storeCount}
            {...register("storeCount")}
          />
        </Field>

        <Field
          label="WhatsApp"
          htmlFor="phone"
          error={errors.phone?.message}
          className="sm:col-span-2"
        >
          <Input
            id="phone"
            type="tel"
            placeholder="(85) 99999-0000"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue("phone", maskPhone(event.target.value));
              },
            })}
          />
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full font-semibold shadow-glow-sm transition-shadow duration-300 hover:shadow-glow"
      >
        {DEMO_PAGE.form.submit}
      </Button>

      <p
        className={cn(
          "mt-4 text-center text-body-sm",
          sent ? "text-status-success" : "text-text-tertiary",
        )}
        aria-live="polite"
      >
        {sent ? DEMO_PAGE.form.sent : DEMO_PAGE.form.privacy}
      </p>
    </form>
  );
}
