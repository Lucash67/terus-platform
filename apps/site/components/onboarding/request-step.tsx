"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  commercialRequestSchema,
  type CommercialRequestValues,
} from "@terus/schemas/self-onboarding";
import { Button, cn } from "@terus/ui";
import { Textarea } from "@terus/ui/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Field } from "@/components/onboarding/field";
import { JourneyFrame } from "@/components/onboarding/journey-frame";
import { Notice } from "@/components/onboarding/notice";
import { useRequestCommercial } from "@/lib/api/hooks";
import type { Journey } from "@/lib/api/types";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_OPTIONS } from "@/lib/constants/onboarding";

export function Recommendations({ journey }: { journey: Journey }) {
  return (
    <section aria-labelledby="rec-title">
      <h2
        id="rec-title"
        className="font-display text-heading-lg font-semibold text-text-primary"
      >
        Módulos indicados para as suas prioridades
      </h2>
      <p className="mt-1 text-body-sm text-text-tertiary">
        Sugestão baseada só no que você respondeu. A proposta final é montada
        pela equipe Terus.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {journey.recommendations.map((rec, i) => (
          <li
            key={rec.module}
            className="ob-enter rounded-xl border border-surface-border bg-surface-elevated-1 p-4 transition-colors hover:border-brand-primary/40"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="font-display text-heading-md font-semibold text-text-primary">
              {rec.name}
            </p>
            <p className="mt-1 text-body-sm text-text-secondary">
              {rec.reason}
            </p>
            <Link
              href={`/modulos/${rec.module}`}
              target="_blank"
              className="mt-2 inline-block text-body-sm text-text-link hover:underline"
            >
              Conhecer o módulo
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RequestForm({ journey }: { journey: Journey }) {
  const router = useRouter();
  const request = useRequestCommercial(journey.organization.id);
  const form = useForm<CommercialRequestValues>({
    resolver: zodResolver(commercialRequestSchema),
    defaultValues: { kind: "proposal", preferred_contact: "whatsapp" },
  });
  const kind = form.watch("kind");
  const contact = form.watch("preferred_contact");
  const { isSubmitting } = form.formState;

  async function onSubmit(values: CommercialRequestValues) {
    try {
      await request.mutateAsync(values);
      trackEvent("proposal_requested", { kind: values.kind });
      router.push("/portal");
    } catch {
      /* exibido abaixo */
    }
  }

  const choice = (active: boolean) =>
    cn(
      "flex cursor-pointer flex-col rounded-lg border p-4 transition-colors",
      active
        ? "border-brand-primary/60 bg-brand-primary-dim"
        : "border-surface-border hover:border-brand-primary/30",
    );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-surface-border bg-surface-elevated-1 p-6 sm:p-8"
    >
      <fieldset>
        <legend className="text-body-sm font-medium text-text-secondary">
          O que você prefere?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className={choice(kind === "proposal")}>
            <span className="flex items-center gap-2">
              <input
                type="radio"
                value="proposal"
                className="accent-brand-primary"
                {...form.register("kind")}
              />
              <span className="font-semibold text-text-primary">
                Solicitar proposta
              </span>
            </span>
            <span className="mt-1 text-body-sm text-text-tertiary">
              A equipe prepara uma proposta para a sua rede.
            </span>
          </label>
          <label className={choice(kind === "specialist_contact")}>
            <span className="flex items-center gap-2">
              <input
                type="radio"
                value="specialist_contact"
                className="accent-brand-primary"
                {...form.register("kind")}
              />
              <span className="font-semibold text-text-primary">
                Falar com especialista
              </span>
            </span>
            <span className="mt-1 text-body-sm text-text-tertiary">
              Uma conversa antes de qualquer proposta.
            </span>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-body-sm font-medium text-text-secondary">
          Canal preferido de contato
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACT_OPTIONS.map((c) => (
            <label
              key={c.id}
              className={cn(
                choice(contact === c.id),
                "flex-row items-center gap-2 px-4 py-2",
              )}
            >
              <input
                type="radio"
                value={c.id}
                className="accent-brand-primary"
                {...form.register("preferred_contact")}
              />
              <span className="text-body-sm font-medium text-text-primary">
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="message" label="Mensagem para a equipe" optional>
        <Textarea
          id="message"
          rows={3}
          placeholder="Ex.: queremos começar pelas lojas de Fortaleza."
          {...form.register("message")}
        />
      </Field>
      <Notice tone="info">
        A solicitação fica registrada na sua conta e aparece no painel da equipe
        Terus. Não há preço automático: valores e condições vêm na proposta.
      </Notice>
      {request.error ? (
        <Notice tone="error">{request.error.message}</Notice>
      ) : null}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/onboarding/perfil")}
        >
          Voltar
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Enviando…" : "Enviar solicitação"}
        </Button>
      </div>
    </form>
  );
}

export function RequestStep() {
  return (
    <JourneyFrame
      step="solicitacao"
      title="Recomendação e próximo passo"
      description="Veja por onde começar e peça a proposta ou uma conversa com especialista."
      requiresOrganization
    >
      {({ journey }) => {
        if (!journey) return null;
        if (!journey.profile) {
          return (
            <Notice tone="warning" title="Falta uma etapa">
              Conte como é a operação para ver a recomendação.{" "}
              <Link href="/onboarding/perfil" className="underline">
                Preencher agora
              </Link>
            </Notice>
          );
        }
        const open = journey.requests.find(
          (r) => !["lost", "archived", "contracted"].includes(r.status),
        );
        return (
          <div className="flex flex-col gap-8">
            <Recommendations journey={journey} />
            {open ? (
              <Notice tone="success" title="Solicitação já registrada">
                Acompanhe o andamento no{" "}
                <Link href="/portal" className="underline">
                  portal
                </Link>
                .
              </Notice>
            ) : (
              <RequestForm journey={journey} />
            )}
          </div>
        );
      }}
    </JourneyFrame>
  );
}
