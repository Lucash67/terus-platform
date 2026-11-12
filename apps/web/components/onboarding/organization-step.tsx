"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  formatCnpj,
  organizationSchema,
  SEGMENTS,
  SIZE_BANDS,
  UFS,
  type OrganizationValues,
} from "@terus/schemas";
import { Button, Input, Select } from "@terus/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { describedBy, Field } from "@/components/onboarding/field";
import { JourneyFrame } from "@/components/onboarding/journey-frame";
import { Notice } from "@/components/onboarding/notice";
import { fieldErrors } from "@/lib/api/client";
import { useCreateOrganization, useUpdateOrganization } from "@/lib/api/hooks";
import type { Journey } from "@/lib/api/types";
import { trackEvent } from "@/lib/analytics";
import { SEGMENT_LABELS, SIZE_BAND_LABELS } from "@/lib/constants/onboarding";

function OrganizationForm({ journey }: { journey: Journey | null }) {
  const router = useRouter();
  const create = useCreateOrganization();
  const update = useUpdateOrganization(journey?.organization.id ?? "");
  const mutation = journey ? update : create;
  const org = journey?.organization;
  const form = useForm<OrganizationValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: org
      ? {
          legal_name: org.legal_name,
          trade_name: org.trade_name ?? "",
          cnpj: formatCnpj(org.cnpj),
          segment: org.segment as OrganizationValues["segment"],
          size_band: org.size_band as OrganizationValues["size_band"],
          city: org.city ?? "",
          state: (org.state ?? "") as OrganizationValues["state"],
        }
      : { state: "" },
  });
  const { errors, isSubmitting } = form.formState;
  const server = fieldErrors(mutation.error);

  async function onSubmit(values: OrganizationValues) {
    try {
      await mutation.mutateAsync(values);
      if (!journey) trackEvent("company_registered");
      router.push("/onboarding/perfil");
    } catch {
      /* exibido abaixo */
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-surface-border bg-surface-elevated-1 p-6 sm:p-8"
    >
      <Field
        id="legal_name"
        label="Razão social"
        error={errors.legal_name?.message ?? server.legal_name}
      >
        <Input
          id="legal_name"
          autoComplete="organization"
          aria-invalid={Boolean(errors.legal_name)}
          {...form.register("legal_name")}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="trade_name" label="Nome fantasia" optional>
          <Input id="trade_name" {...form.register("trade_name")} />
        </Field>
        <Field
          id="cnpj"
          label="CNPJ"
          error={errors.cnpj?.message ?? server.cnpj}
          hint={journey ? "O CNPJ não pode ser alterado aqui." : undefined}
        >
          <Input
            id="cnpj"
            inputMode="numeric"
            placeholder="00.000.000/0000-00"
            readOnly={Boolean(journey)}
            aria-invalid={Boolean(errors.cnpj)}
            aria-describedby={describedBy("cnpj", errors.cnpj?.message)}
            {...form.register("cnpj", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = formatCnpj(e.target.value);
              },
            })}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="segment" label="Segmento" error={errors.segment?.message}>
          <Select
            id="segment"
            defaultValue=""
            aria-invalid={Boolean(errors.segment)}
            {...form.register("segment")}
          >
            <option value="" disabled>
              Selecione
            </option>
            {SEGMENTS.map((s) => (
              <option key={s} value={s}>
                {SEGMENT_LABELS[s]}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          id="size_band"
          label="Número de lojas / unidades"
          error={errors.size_band?.message}
        >
          <Select
            id="size_band"
            defaultValue=""
            aria-invalid={Boolean(errors.size_band)}
            {...form.register("size_band")}
          >
            <option value="" disabled>
              Selecione
            </option>
            {SIZE_BANDS.map((s) => (
              <option key={s} value={s}>
                {SIZE_BAND_LABELS[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
        <Field id="city" label="Cidade" optional>
          <Input
            id="city"
            autoComplete="address-level2"
            {...form.register("city")}
          />
        </Field>
        <Field id="state" label="UF" optional>
          <Select id="state" {...form.register("state")}>
            <option value="">—</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <p className="text-body-sm text-text-tertiary">
        Usamos estes dados para identificar a empresa e preparar a proposta.
        Nenhuma senha ou acesso ao banco do ERP é pedido nesta jornada.
      </p>
      {mutation.error ? (
        <Notice tone="error">{mutation.error.message}</Notice>
      ) : null}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Salvando…" : "Salvar e continuar"}
        </Button>
      </div>
    </form>
  );
}

export function OrganizationStep() {
  return (
    <JourneyFrame
      step="empresa"
      title="Sobre a empresa"
      description="Cadastre a empresa uma vez. O progresso fica salvo na sua conta."
    >
      {({ journey }) => <OrganizationForm journey={journey} />}
    </JourneyFrame>
  );
}
