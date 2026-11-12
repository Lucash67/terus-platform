"use client";

import { Button } from "@terus/ui";
import Link from "next/link";
import { useState } from "react";

import { Recommendations } from "@/components/onboarding/request-step";
import { Notice } from "@/components/onboarding/notice";
import { RequireSession } from "@/components/onboarding/require-session";
import { StatusPill } from "@/components/onboarding/status-pill";
import { useOrganizations } from "@/lib/api/hooks";
import type { Journey, SessionInfo } from "@/lib/api/types";
import {
  ERP_LABELS,
  IMPLEMENTATION_STATUS,
  JOURNEY_STATUS,
  PRIORITY_OPTIONS,
  REQUEST_STATUS,
  SEGMENT_LABELS,
  SIZE_BAND_LABELS,
} from "@/lib/constants/onboarding";
import { formatCnpj } from "@terus/schemas/self-onboarding";

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-surface-border bg-surface-elevated-1 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-heading-md font-semibold text-text-primary">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Pending({ journey }: { journey: Journey }) {
  const items: { label: string; href: string }[] = [];
  if (!journey.profile)
    items.push({
      label: "Contar como é a operação",
      href: "/onboarding/perfil",
    });
  else if (journey.requests.length === 0)
    items.push({
      label: "Solicitar proposta ou conversa",
      href: "/onboarding/solicitacao",
    });
  if (items.length === 0)
    return (
      <p className="text-body-sm text-text-secondary">
        Nenhuma pendência sua agora. A próxima ação é da equipe Terus.
      </p>
    );
  return (
    <ul className="flex flex-col gap-2">
      {items.map((i) => (
        <li key={i.href}>
          <Link
            href={i.href}
            className="text-body-md font-semibold text-text-link hover:underline"
          >
            {i.label} →
          </Link>
        </li>
      ))}
    </ul>
  );
}

function JourneyPanel({ journey }: { journey: Journey }) {
  const status = JOURNEY_STATUS[journey.status] ?? JOURNEY_STATUS.draft;
  const org = journey.organization;
  const priorityLabels = Object.fromEntries(
    PRIORITY_OPTIONS.map((p) => [p.id, p.label]),
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="ob-enter rounded-2xl border border-surface-border bg-gradient-to-br from-brand-primary/10 via-surface-elevated-1 to-surface-elevated-1 p-6 sm:p-8">
        <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
          Status da jornada
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-heading-xl font-bold text-text-primary">
            {org.trade_name || org.legal_name}
          </h1>
          <StatusPill tone={status.tone}>{status.label}</StatusPill>
        </div>
        <p className="mt-2 text-body-md text-text-secondary">
          {status.description}
        </p>
        <p className="mt-4 text-caption text-text-tertiary">
          Atualizado em {dateFmt.format(new Date(journey.updated_at))} · salvo
          no servidor
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Suas pendências">
          <Pending journey={journey} />
        </Card>
        <Card
          title="Dados enviados"
          action={
            <Link
              href="/onboarding/empresa"
              className="text-body-sm text-text-link hover:underline"
            >
              Editar
            </Link>
          }
        >
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-2 text-body-sm">
            <dt className="text-text-tertiary">Razão social</dt>
            <dd className="text-text-primary">{org.legal_name}</dd>
            <dt className="text-text-tertiary">CNPJ</dt>
            <dd className="font-mono text-text-primary">
              {formatCnpj(org.cnpj)}
            </dd>
            <dt className="text-text-tertiary">Segmento</dt>
            <dd className="text-text-primary">{SEGMENT_LABELS[org.segment]}</dd>
            <dt className="text-text-tertiary">Porte</dt>
            <dd className="text-text-primary">
              {SIZE_BAND_LABELS[org.size_band]}
            </dd>
            {journey.profile ? (
              <>
                <dt className="text-text-tertiary">ERP</dt>
                <dd className="text-text-primary">
                  {journey.profile.erp === "outro"
                    ? journey.profile.erp_other
                    : ERP_LABELS[journey.profile.erp]}
                </dd>
                <dt className="text-text-tertiary">Prioridades</dt>
                <dd className="text-text-primary">
                  {journey.profile.priorities
                    .map((p) => priorityLabels[p] ?? p)
                    .join(", ")}
                </dd>
              </>
            ) : null}
          </dl>
        </Card>
      </div>

      {journey.recommendations.length > 0 ? (
        <Card title="Recomendação">
          <Recommendations journey={journey} />
        </Card>
      ) : null}

      <Card title="Solicitações e histórico">
        {journey.requests.length === 0 ? (
          <p className="text-body-sm text-text-secondary">
            Nenhuma solicitação ainda.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {journey.requests.map((r) => (
              <li key={r.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-text-primary">
                    {r.kind === "proposal"
                      ? "Proposta"
                      : "Conversa com especialista"}
                  </span>
                  <StatusPill
                    tone={
                      r.status === "contracted"
                        ? "success"
                        : r.status === "lost" || r.status === "archived"
                          ? "neutral"
                          : "warning"
                    }
                  >
                    {REQUEST_STATUS[r.status] ?? r.status}
                  </StatusPill>
                </div>
                <ol className="mt-3 border-l border-surface-border pl-4">
                  {r.events.map((e) => (
                    <li key={e.id} className="relative pb-3 text-body-sm">
                      <span
                        className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-primary"
                        aria-hidden="true"
                      />
                      <p className="text-text-tertiary">
                        {dateFmt.format(new Date(e.created_at))}
                      </p>
                      <p className="text-text-primary">
                        {e.to_status
                          ? `${REQUEST_STATUS[e.to_status] ?? e.to_status}. `
                          : ""}
                        {e.note}
                      </p>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Implantação (próximas etapas)">
        <p className="mb-4 text-body-sm text-text-tertiary">
          Cada item só aparece como concluído com confirmação da equipe ou do
          sistema da Terus.
        </p>
        <ul className="flex flex-col divide-y divide-surface-border">
          {journey.implementation.map((item) => {
            const s = IMPLEMENTATION_STATUS[item.status];
            return (
              <li
                key={item.key}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-body-md font-medium text-text-primary">
                    {item.label}
                  </p>
                  <p className="text-body-sm text-text-tertiary">
                    {item.detail}
                  </p>
                </div>
                <StatusPill tone={s.tone}>{s.label}</StatusPill>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title="Documentos">
        <p className="text-body-sm text-text-secondary">
          Nenhum documento disponível ainda. Propostas e contratos aparecem aqui
          quando a equipe Terus publicar.
        </p>
      </Card>
    </div>
  );
}

function Portal({ session }: { session: SessionInfo }) {
  const orgs = useOrganizations();
  const [selected, setSelected] = useState(0);
  if (orgs.isLoading)
    return <p className="py-16 text-center text-text-tertiary">Carregando…</p>;
  if (orgs.error) return <Notice tone="error">{orgs.error.message}</Notice>;
  const items = orgs.data?.items ?? [];
  return (
    <div className="flex flex-col gap-6">
      {session.email_verification !== "verified" ? (
        <Notice tone="warning" title="Confirmação de e-mail pendente">
          O envio automático de e-mails ainda não está configurado, por isso seu
          e-mail não foi confirmado. Isso não bloqueia o cadastro.
        </Notice>
      ) : null}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-surface-border bg-surface-elevated-1 p-8 text-center">
          <p className="text-body-lg text-text-secondary">
            Você ainda não cadastrou uma empresa.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/onboarding/empresa">Cadastrar empresa</Link>
          </Button>
        </div>
      ) : (
        <>
          {items.length > 1 ? (
            <div
              role="tablist"
              aria-label="Empresas"
              className="flex flex-wrap gap-2"
            >
              {items.map((j, i) => (
                <button
                  key={j.organization.id}
                  role="tab"
                  aria-selected={i === selected}
                  onClick={() => setSelected(i)}
                  className={
                    i === selected
                      ? "rounded-full bg-brand-primary px-4 py-1.5 text-body-sm font-semibold text-surface-base"
                      : "rounded-full border border-surface-border px-4 py-1.5 text-body-sm text-text-secondary"
                  }
                >
                  {j.organization.trade_name || j.organization.legal_name}
                </button>
              ))}
            </div>
          ) : null}
          <JourneyPanel journey={items[Math.min(selected, items.length - 1)]} />
        </>
      )}
    </div>
  );
}

export function PortalView() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <RequireSession>
        {(session) => <Portal session={session} />}
      </RequireSession>
    </div>
  );
}
