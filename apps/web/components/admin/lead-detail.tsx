"use client";

import { Button, Checkbox, Input, Select, Textarea } from "@terus/ui";
import Link from "next/link";
import { useState } from "react";

import { Notice } from "@/components/onboarding/notice";
import { RequireSession } from "@/components/onboarding/require-session";
import { StatusPill } from "@/components/onboarding/status-pill";
import {
  useAddNote,
  useAssignRequest,
  useChangeRequestStatus,
  useLead,
  useStaff,
} from "@/lib/api/hooks";
import type { CommercialRequest, LeadDetail } from "@/lib/api/types";
import {
  ERP_LABELS,
  JOURNEY_STATUS,
  PRIORITY_OPTIONS,
  REQUEST_STATUS,
  REQUEST_TRANSITIONS,
  SEGMENT_LABELS,
  SIZE_BAND_LABELS,
  TIMELINE_OPTIONS,
} from "@/lib/constants/onboarding";
import { formatCnpj } from "@terus/schemas";

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-surface-border bg-surface-elevated-1 p-5">
      <h2 className="font-display text-heading-md font-semibold text-text-primary">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function RequestControls({
  tenantId,
  request,
}: {
  tenantId: string;
  request: CommercialRequest;
}) {
  const change = useChangeRequestStatus(tenantId);
  const assign = useAssignRequest(tenantId);
  const addNote = useAddNote(tenantId);
  const staff = useStaff();
  const [toStatus, setToStatus] = useState("");
  const [note, setNote] = useState("");
  const [evidence, setEvidence] = useState("");
  const [internal, setInternal] = useState("");
  const [visible, setVisible] = useState(false);
  const options = REQUEST_TRANSITIONS[request.status] ?? [];
  const error = change.error ?? assign.error ?? addNote.error;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-text-primary">
          {request.kind === "proposal"
            ? "Proposta"
            : "Contato com especialista"}
        </span>
        <StatusPill tone="info">{REQUEST_STATUS[request.status]}</StatusPill>
        <span className="text-caption text-text-tertiary">
          Canal: {request.preferred_contact}
        </span>
      </div>
      {request.message ? (
        <p className="rounded-lg bg-surface-elevated-2 p-3 text-body-sm text-text-secondary">
          “{request.message}”
        </p>
      ) : null}
      {request.contract_evidence ? (
        <p className="text-body-sm text-text-secondary">
          Evidência do contrato:{" "}
          <span className="font-mono">{request.contract_evidence}</span>
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`assign-${request.id}`}
            className="text-body-sm text-text-secondary"
          >
            Responsável
          </label>
          <Select
            id={`assign-${request.id}`}
            value={request.assigned_to ?? ""}
            onChange={(e) =>
              assign.mutate({
                requestId: request.id,
                body: { assignee_id: e.target.value || null },
              })
            }
          >
            <option value="">Sem responsável</option>
            {staff.data?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.full_name}
              </option>
            ))}
          </Select>
        </div>
        {options.length > 0 ? (
          <div>
            <label
              htmlFor={`status-${request.id}`}
              className="text-body-sm text-text-secondary"
            >
              Mover para
            </label>
            <Select
              id={`status-${request.id}`}
              value={toStatus}
              onChange={(e) => setToStatus(e.target.value)}
            >
              <option value="">Selecione</option>
              {options.map((s) => (
                <option key={s} value={s}>
                  {REQUEST_STATUS[s]}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
      </div>
      {toStatus ? (
        <form
          className="flex flex-col gap-3 rounded-lg border border-surface-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            change.mutate(
              {
                requestId: request.id,
                body: {
                  to_status: toStatus,
                  note: note || undefined,
                  contract_evidence: evidence || undefined,
                },
              },
              {
                onSuccess: () => {
                  setToStatus("");
                  setNote("");
                  setEvidence("");
                },
              },
            );
          }}
        >
          <label
            htmlFor={`note-${request.id}`}
            className="text-body-sm text-text-secondary"
          >
            Nota (visível ao cliente)
          </label>
          <Textarea
            id={`note-${request.id}`}
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          {toStatus === "contracted" ? (
            <>
              <label
                htmlFor={`evidence-${request.id}`}
                className="text-body-sm text-text-secondary"
              >
                Referência do contrato assinado (obrigatória)
              </label>
              <Input
                id={`evidence-${request.id}`}
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="Ex.: ID do documento no provedor de assinatura"
              />
            </>
          ) : null}
          <Button type="submit" size="sm" disabled={change.isPending}>
            Confirmar: {REQUEST_STATUS[toStatus]}
          </Button>
        </form>
      ) : null}

      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (internal.trim().length < 2) return;
          addNote.mutate(
            {
              requestId: request.id,
              body: { note: internal, visible_to_customer: visible },
            },
            { onSuccess: () => setInternal("") },
          );
        }}
      >
        <label
          htmlFor={`internal-${request.id}`}
          className="text-body-sm text-text-secondary"
        >
          Adicionar nota
        </label>
        <Textarea
          id={`internal-${request.id}`}
          rows={2}
          value={internal}
          onChange={(e) => setInternal(e.target.value)}
        />
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-body-sm text-text-secondary">
            <Checkbox
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />{" "}
            Visível ao cliente
          </label>
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            disabled={addNote.isPending}
          >
            Salvar nota
          </Button>
        </div>
      </form>
      {error ? <Notice tone="error">{error.message}</Notice> : null}

      <ol className="border-l border-surface-border pl-4">
        {request.events.map((ev) => (
          <li key={ev.id} className="relative pb-3 text-body-sm">
            <span
              className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-primary"
              aria-hidden="true"
            />
            <p className="text-text-tertiary">
              {dateFmt.format(new Date(ev.created_at))} · {ev.event_type}
              {ev.visible_to_customer ? "" : " · interno"}
            </p>
            <p className="text-text-primary">
              {ev.from_status ? `${REQUEST_STATUS[ev.from_status]} → ` : ""}
              {ev.to_status ? `${REQUEST_STATUS[ev.to_status]}. ` : ""}
              {ev.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Detail({ data, tenantId }: { data: LeadDetail; tenantId: string }) {
  const { journey, owner } = data;
  const org = journey.organization;
  const status = JOURNEY_STATUS[journey.status];
  const priorityLabels = Object.fromEntries(
    PRIORITY_OPTIONS.map((p) => [p.id, p.label]),
  );
  const timelineLabels: Record<string, string> = Object.fromEntries(
    TIMELINE_OPTIONS.map((t) => [t.id, t.label]),
  );
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin"
        className="text-body-sm text-text-link hover:underline"
      >
        ← Voltar aos leads
      </Link>
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-heading-xl font-bold text-text-primary">
          {org.trade_name || org.legal_name}
        </h1>
        <StatusPill tone={status?.tone ?? "neutral"}>
          {status?.label ?? journey.status}
        </StatusPill>
      </header>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          <Section title="Contato">
            {owner ? (
              <dl className="grid grid-cols-[6rem_1fr] gap-2 text-body-sm">
                <dt className="text-text-tertiary">Nome</dt>
                <dd>{owner.full_name}</dd>
                <dt className="text-text-tertiary">E-mail</dt>
                <dd className="break-all">{owner.email}</dd>
                <dt className="text-text-tertiary">Telefone</dt>
                <dd>{owner.phone ?? "—"}</dd>
                <dt className="text-text-tertiary">Cargo</dt>
                <dd>{owner.job_title ?? "—"}</dd>
              </dl>
            ) : (
              <p className="text-text-tertiary">Sem responsável.</p>
            )}
          </Section>
          <Section title="Empresa">
            <dl className="grid grid-cols-[6rem_1fr] gap-2 text-body-sm">
              <dt className="text-text-tertiary">Razão social</dt>
              <dd>{org.legal_name}</dd>
              <dt className="text-text-tertiary">CNPJ</dt>
              <dd className="font-mono">{formatCnpj(org.cnpj)}</dd>
              <dt className="text-text-tertiary">Segmento</dt>
              <dd>{SEGMENT_LABELS[org.segment]}</dd>
              <dt className="text-text-tertiary">Porte</dt>
              <dd>{SIZE_BAND_LABELS[org.size_band]}</dd>
              <dt className="text-text-tertiary">Local</dt>
              <dd>
                {[org.city, org.state].filter(Boolean).join(" / ") || "—"}
              </dd>
              <dt className="text-text-tertiary">Origem</dt>
              <dd>
                {data.source
                  ? Object.entries(data.source)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ")
                  : "—"}
              </dd>
            </dl>
          </Section>
          <Section
            title={`Qualificação · score ${data.qualification_score ?? "—"}`}
          >
            {journey.profile ? (
              <>
                <p className="text-body-sm text-text-secondary">
                  ERP{" "}
                  {journey.profile.erp === "outro"
                    ? journey.profile.erp_other
                    : ERP_LABELS[journey.profile.erp]}{" "}
                  · {timelineLabels[journey.profile.timeline]} ·{" "}
                  {journey.profile.priorities
                    .map((p) => priorityLabels[p])
                    .join(", ")}
                </p>
                <ul className="mt-3 flex flex-col gap-1 text-body-sm">
                  {data.qualification_reasons.map((r) => (
                    <li key={r.factor} className="flex justify-between gap-3">
                      <span className="text-text-secondary">
                        {r.explanation}
                      </span>
                      <span className="font-mono text-text-primary">
                        +{r.points}
                      </span>
                    </li>
                  ))}
                </ul>
                {journey.profile.notes ? (
                  <p className="mt-3 text-body-sm text-text-tertiary">
                    Notas: {journey.profile.notes}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="text-body-sm text-text-tertiary">
                Perfil ainda não preenchido.
              </p>
            )}
          </Section>
        </div>
        <div className="flex flex-col gap-6">
          <Section title="Solicitações">
            {journey.requests.length === 0 ? (
              <p className="text-body-sm text-text-tertiary">
                Nenhuma solicitação ainda.
              </p>
            ) : (
              journey.requests.map((r) => (
                <RequestControls key={r.id} tenantId={tenantId} request={r} />
              ))
            )}
          </Section>
          <Section title="Auditoria">
            <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto font-mono text-caption text-text-tertiary">
              {data.audit.map((a) => (
                <li key={a.id}>
                  {dateFmt.format(new Date(a.created_at))} · {a.action}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function LeadLoader({ tenantId }: { tenantId: string }) {
  const lead = useLead(tenantId);
  if (lead.isLoading)
    return <p className="py-16 text-center text-text-tertiary">Carregando…</p>;
  if (lead.error) return <Notice tone="error">{lead.error.message}</Notice>;
  return lead.data ? <Detail data={lead.data} tenantId={tenantId} /> : null;
}

export function LeadDetailView({ tenantId }: { tenantId: string }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <RequireSession staffOnly>
        {() => <LeadLoader tenantId={tenantId} />}
      </RequireSession>
    </div>
  );
}
