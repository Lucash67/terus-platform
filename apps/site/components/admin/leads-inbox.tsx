"use client";

import { Button, Input, Select } from "@terus/ui";
import Link from "next/link";
import { useState } from "react";

import { Notice } from "@/components/onboarding/notice";
import { RequireSession } from "@/components/onboarding/require-session";
import { StatusPill } from "@/components/onboarding/status-pill";
import { useFunnel, useLeads } from "@/lib/api/hooks";
import {
  JOURNEY_STATUS,
  REQUEST_STATUS,
  SIZE_BAND_LABELS,
} from "@/lib/constants/onboarding";
import { formatCnpj } from "@terus/schemas/self-onboarding";

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

function Funnel({
  onPick,
  active,
}: {
  onPick: (s: string) => void;
  active: string;
}) {
  const funnel = useFunnel();
  if (!funnel.data) return null;
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {Object.entries(funnel.data.counts)
        .filter(([status]) => status !== "draft")
        .map(([status, count]) => (
          <button
            key={status}
            onClick={() => onPick(active === status ? "" : status)}
            aria-pressed={active === status}
            className={`rounded-xl border p-3 text-left transition-colors ${active === status ? "border-brand-primary bg-brand-primary-dim" : "border-surface-border bg-surface-elevated-1 hover:border-brand-primary/40"}`}
          >
            <p className="font-display text-heading-lg font-bold text-text-primary">
              {count}
            </p>
            <p className="text-caption text-text-tertiary">
              {JOURNEY_STATUS[status]?.label ?? status}
            </p>
          </button>
        ))}
    </div>
  );
}

function Inbox() {
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const leads = useLeads({
    status: status || undefined,
    q: q || undefined,
    page,
  });
  const totalPages = leads.data
    ? Math.max(1, Math.ceil(leads.data.total / leads.data.page_size))
    : 1;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="font-mono text-caption uppercase tracking-widest text-brand-primary">
          Equipe Terus
        </p>
        <h1 className="mt-2 font-display text-heading-xl font-bold text-text-primary">
          Leads e solicitações
        </h1>
        <p className="mt-1 text-body-md text-text-secondary">
          Conversão por etapa e caixa de entrada do self onboarding.
        </p>
      </header>
      <Funnel
        active={status}
        onPick={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setQ(query.trim());
          setPage(1);
        }}
      >
        <label className="sr-only" htmlFor="lead-search">
          Buscar
        </label>
        <Input
          id="lead-search"
          placeholder="Empresa, CNPJ, nome ou e-mail"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="sr-only" htmlFor="lead-status">
          Status
        </label>
        <Select
          id="lead-status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="sm:w-56"
        >
          <option value="">Todos os status</option>
          {Object.entries(JOURNEY_STATUS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </Select>
        <Button type="submit">Buscar</Button>
      </form>

      {leads.error ? <Notice tone="error">{leads.error.message}</Notice> : null}
      {leads.data && leads.data.items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-surface-border p-8 text-center text-text-tertiary">
          Nenhum lead encontrado com esses filtros.
        </p>
      ) : null}
      <ul className="flex flex-col gap-3">
        {leads.data?.items.map((lead) => {
          const s = JOURNEY_STATUS[lead.status];
          return (
            <li key={lead.tenant_id}>
              <Link
                href={`/admin/leads/${lead.tenant_id}`}
                className="grid gap-2 rounded-xl border border-surface-border bg-surface-elevated-1 p-4 transition-colors hover:border-brand-primary/40 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center"
              >
                <div>
                  <p className="font-semibold text-text-primary">
                    {lead.trade_name || lead.legal_name}
                  </p>
                  <p className="font-mono text-caption text-text-tertiary">
                    {formatCnpj(lead.cnpj)} · {SIZE_BAND_LABELS[lead.size_band]}
                  </p>
                </div>
                <div className="text-body-sm">
                  <p className="text-text-primary">{lead.owner_name}</p>
                  <p className="truncate text-text-tertiary">
                    {lead.owner_email}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={s?.tone ?? "neutral"}>
                    {s?.label ?? lead.status}
                  </StatusPill>
                  {lead.latest_request_status ? (
                    <span className="text-caption text-text-tertiary">
                      Solicitação: {REQUEST_STATUS[lead.latest_request_status]}
                    </span>
                  ) : null}
                </div>
                <div className="text-right text-caption text-text-tertiary">
                  <p>Score {lead.qualification_score ?? "—"}</p>
                  <p>{dateFmt.format(new Date(lead.updated_at))}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {leads.data && leads.data.total > leads.data.page_size ? (
        <nav
          className="flex items-center justify-between"
          aria-label="Paginação"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>
          <span className="text-body-sm text-text-tertiary">
            Página {page} de {totalPages} · {leads.data.total} leads
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </Button>
        </nav>
      ) : null}
    </div>
  );
}

export function LeadsInbox() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <RequireSession staffOnly>{() => <Inbox />}</RequireSession>
    </div>
  );
}
