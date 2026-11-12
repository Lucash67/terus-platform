"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, SIZE_BANDS, type ProfileValues } from "@terus/schemas";
import { Button, Checkbox, Input, Select, Textarea, cn } from "@terus/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Field } from "@/components/onboarding/field";
import { JourneyFrame } from "@/components/onboarding/journey-frame";
import { Notice } from "@/components/onboarding/notice";
import { useSaveProfile } from "@/lib/api/hooks";
import type { Journey } from "@/lib/api/types";
import { trackEvent } from "@/lib/analytics";
import {
  ERP_GROUPS,
  PRIORITY_OPTIONS,
  SIZE_BAND_LABELS,
  TIMELINE_OPTIONS,
} from "@/lib/constants/onboarding";

function ProfileForm({ journey }: { journey: Journey }) {
  const router = useRouter();
  const save = useSaveProfile(journey.organization.id);
  const p = journey.profile;
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: p
      ? {
          erp: p.erp as ProfileValues["erp"],
          erp_other: p.erp_other ?? "",
          stores_band: p.stores_band as ProfileValues["stores_band"],
          priorities: p.priorities as ProfileValues["priorities"],
          has_it_contact: p.has_it_contact,
          timeline: p.timeline as ProfileValues["timeline"],
          notes: p.notes ?? "",
        }
      : {
          priorities: [],
          has_it_contact: false,
          stores_band: journey.organization
            .size_band as ProfileValues["stores_band"],
        },
  });
  const { errors, isSubmitting } = form.formState;
  const erp = form.watch("erp");
  const priorities = form.watch("priorities") ?? [];

  async function onSubmit(values: ProfileValues) {
    try {
      await save.mutateAsync(values);
      trackEvent("qualification_completed");
      router.push("/onboarding/solicitacao");
    } catch {
      /* exibido abaixo */
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6 rounded-2xl border border-surface-border bg-surface-elevated-1 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="erp" label="ERP usado hoje" error={errors.erp?.message}>
          <Select
            id="erp"
            defaultValue=""
            aria-invalid={Boolean(errors.erp)}
            {...form.register("erp")}
          >
            <option value="" disabled>
              Selecione
            </option>
            {ERP_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </Field>
        <Field
          id="stores_band"
          label="Lojas / unidades"
          error={errors.stores_band?.message}
        >
          <Select id="stores_band" {...form.register("stores_band")}>
            {SIZE_BANDS.map((s) => (
              <option key={s} value={s}>
                {SIZE_BAND_LABELS[s]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      {erp === "outro" ? (
        <Field
          id="erp_other"
          label="Qual ERP?"
          error={errors.erp_other?.message}
          hint="Vamos avaliar a compatibilidade com o time técnico."
        >
          <Input
            id="erp_other"
            aria-invalid={Boolean(errors.erp_other)}
            {...form.register("erp_other")}
          />
        </Field>
      ) : null}

      <fieldset>
        <legend className="text-body-sm font-medium text-text-secondary">
          O que você quer resolver primeiro?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PRIORITY_OPTIONS.map((opt) => {
            const checked = priorities.includes(
              opt.id as ProfileValues["priorities"][number],
            );
            return (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                  checked
                    ? "border-brand-primary/50 bg-brand-primary-dim"
                    : "border-surface-border hover:border-brand-primary/30",
                )}
              >
                <Checkbox value={opt.id} {...form.register("priorities")} />
                <span>
                  <span className="block text-body-sm font-semibold text-text-primary">
                    {opt.label}
                  </span>
                  <span className="block text-caption text-text-tertiary">
                    {opt.hint}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.priorities ? (
          <p role="alert" className="mt-2 text-body-sm text-status-error">
            {errors.priorities.message}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="timeline"
          label="Quando quer começar?"
          error={errors.timeline?.message}
        >
          <Select id="timeline" defaultValue="" {...form.register("timeline")}>
            <option value="" disabled>
              Selecione
            </option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <label className="flex items-start gap-3 self-end rounded-lg border border-surface-border p-3 text-body-sm text-text-secondary">
          <Checkbox {...form.register("has_it_contact")} />
          <span>
            Temos uma pessoa de TI para cuidar da integração com o ERP.
          </span>
        </label>
      </div>
      <Field id="notes" label="Algo mais que devemos saber?" optional>
        <Textarea id="notes" rows={3} {...form.register("notes")} />
      </Field>
      {save.error ? <Notice tone="error">{save.error.message}</Notice> : null}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/onboarding/empresa")}
        >
          Voltar
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Salvando…" : "Ver recomendação"}
        </Button>
      </div>
    </form>
  );
}

export function ProfileStep() {
  return (
    <JourneyFrame
      step="perfil"
      title="Como é a operação"
      description="Respostas rápidas para indicarmos por onde começar. Nenhum dado do ERP é acessado."
      requiresOrganization
    >
      {({ journey }) => (journey ? <ProfileForm journey={journey} /> : null)}
    </JourneyFrame>
  );
}
