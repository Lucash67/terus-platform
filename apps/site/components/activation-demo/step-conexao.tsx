"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@terus/ui";

import { Field, describedBy } from "@/components/onboarding/field";
import {
  Panel,
  StepNav,
  StepShell,
} from "@/components/activation-demo/step-shell";
import {
  DEMO_BASE,
  TERUS_NAT_IP,
  findErp,
  type DemoErp,
} from "@/lib/constants/activation-demo";
import {
  demoApiConnectionSchema,
  demoDbConnectionSchema,
  useActivationDemo,
  type DemoApiConnection,
  type DemoDbConnection,
} from "@/lib/activation-demo/store";

const FORM_ID = "demo-conexao";

function Preview({
  scheme,
  children,
}: {
  scheme: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="ob-enter-right rounded-2xl border border-surface-border bg-surface-elevated-1/90 p-5"
      style={{ animationDelay: "150ms" }}
    >
      <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
        O que a Terus vai testar
      </p>
      <div className="mt-3 overflow-hidden rounded-lg border border-surface-border bg-surface-base p-3.5">
        <code className="block break-all font-mono text-code-sm leading-relaxed text-text-secondary">
          <span className="text-brand-primary">{scheme}</span>
          {children}
        </code>
      </div>
      <p className="mt-3 text-body-sm leading-relaxed text-text-tertiary">
        A partir do IP{" "}
        <span className="font-mono text-text-secondary">{TERUS_NAT_IP}</span>,
        no diagnóstico da próxima etapa.
      </p>
    </div>
  );
}

function SecretNotice() {
  return (
    <div
      className="ob-enter-right flex items-start gap-3 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5"
      style={{ animationDelay: "250ms" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10V7a4 4 0 018 0v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-body-sm leading-relaxed text-text-secondary">
        <span className="font-semibold text-text-primary">
          A senha não entra neste formulário.
        </span>{" "}
        Ela vai para a Terus por canal seguro, combinado com a equipe — nunca
        por e-mail aberto, como manda o manual de integração.
      </p>
    </div>
  );
}

function DbForm({ erp }: { erp: DemoErp }) {
  const router = useRouter();
  const { conexao, setConexao } = useActivationDemo();
  const saved = conexao?.kind === "db" ? conexao : null;
  const isOracle = erp.kind === "oracle";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemoDbConnection>({
    resolver: zodResolver(demoDbConnectionSchema),
    defaultValues: {
      host: saved?.host ?? "",
      port: saved?.port ?? erp.defaultPort ?? undefined,
      database: saved?.database ?? "",
      schemaOwner:
        saved?.schemaOwner ?? (isOracle ? erp.name.toUpperCase() : ""),
    },
  });
  const v = watch();
  const err = (k: keyof DemoDbConnection) => errors[k]?.message;

  const onSubmit = (data: DemoDbConnection) => {
    setConexao({ kind: "db", ...data });
    router.push(`${DEMO_BASE}/diagnostico`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] [&>*]:min-w-0">
      <Panel className="p-6 sm:p-8">
        <form
          id={FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-5 sm:grid-cols-3"
        >
          <Field
            id="host"
            label="IP ou hostname público"
            error={err("host")}
            className="sm:col-span-2"
          >
            <Input
              id="host"
              placeholder={
                isOracle ? "oracle.suarede.com.br" : "postgres.suarede.com.br"
              }
              autoComplete="off"
              aria-invalid={!!errors.host}
              aria-describedby={describedBy("host", err("host"))}
              {...register("host")}
            />
          </Field>
          <Field
            id="port"
            label="Porta"
            error={err("port")}
            hint={isOracle ? "Listener" : "Ou a porta NAT"}
          >
            <Input
              id="port"
              type="number"
              inputMode="numeric"
              aria-invalid={!!errors.port}
              aria-describedby={describedBy("port", err("port"), "x")}
              {...register("port")}
            />
          </Field>
          <Field
            id="database"
            label={isOracle ? "SID ou service name" : "Database"}
            error={err("database")}
            className={isOracle ? "sm:col-span-2" : "sm:col-span-3"}
          >
            <Input
              id="database"
              placeholder={isOracle ? "ORCL" : "vr"}
              autoComplete="off"
              aria-invalid={!!errors.database}
              aria-describedby={describedBy("database", err("database"))}
              {...register("database")}
            />
          </Field>
          {isOracle ? (
            <Field
              id="schemaOwner"
              label="Schema owner"
              hint="O DONODOBANCO do script"
            >
              <Input
                id="schemaOwner"
                autoComplete="off"
                aria-describedby="schemaOwner-hint"
                {...register("schemaOwner")}
              />
            </Field>
          ) : null}
          <div className="sm:col-span-3">
            <p className="text-body-sm text-text-tertiary">
              Usuário:{" "}
              <span className="font-mono text-text-primary">terus</span> — fixo,
              criado na etapa anterior.
            </p>
          </div>
        </form>
      </Panel>
      <aside className="flex flex-col gap-4">
        <Preview scheme={isOracle ? "oracle://" : "postgresql://"}>
          terus<span className="text-text-disabled">:•••</span>@
          {v.host || "host"}:{v.port || "porta"}/
          {v.database || (isOracle ? "service" : "database")}
        </Preview>
        <SecretNotice />
      </aside>
      <div className="lg:col-span-2">
        <StepNav
          backHref={`${DEMO_BASE}/preparacao`}
          continueLabel="Testar a conexão"
          formId={FORM_ID}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
}

function ApiForm({ erp }: { erp: DemoErp }) {
  const router = useRouter();
  const { conexao, setConexao } = useActivationDemo();
  const saved = conexao?.kind === "api" ? conexao : null;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemoApiConnection>({
    resolver: zodResolver(demoApiConnectionSchema),
    defaultValues: {
      baseUrl: saved?.baseUrl ?? "",
      apiUser: saved?.apiUser ?? "",
    },
  });
  const v = watch();
  const err = (k: keyof DemoApiConnection) => errors[k]?.message;
  const placeholder =
    erp.id === "cisspoder"
      ? "http://servico.suarede.com.br:27009"
      : "https://api.suarede.com.br";

  const onSubmit = (data: DemoApiConnection) => {
    setConexao({ kind: "api", ...data });
    router.push(`${DEMO_BASE}/diagnostico`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] [&>*]:min-w-0">
      <Panel className="p-6 sm:p-8">
        <form
          id={FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-5"
        >
          <Field
            id="baseUrl"
            label="URL base pública da API"
            error={err("baseUrl")}
            hint="Sem barra no fim"
          >
            <Input
              id="baseUrl"
              type="url"
              inputMode="url"
              placeholder={placeholder}
              autoComplete="off"
              aria-invalid={!!errors.baseUrl}
              aria-describedby={describedBy("baseUrl", err("baseUrl"), "x")}
              {...register("baseUrl")}
            />
          </Field>
          <Field
            id="apiUser"
            label="Usuário de integração"
            error={err("apiUser")}
          >
            <Input
              id="apiUser"
              autoComplete="off"
              placeholder="terus"
              aria-invalid={!!errors.apiUser}
              aria-describedby={describedBy("apiUser", err("apiUser"))}
              {...register("apiUser")}
            />
          </Field>
        </form>
      </Panel>
      <aside className="flex flex-col gap-4">
        <Preview scheme="">
          {(v.baseUrl || placeholder).replace(/\/$/, "")}
          <span className="text-text-disabled">
            {" "}
            · usuário {v.apiUser || "…"}
          </span>
        </Preview>
        <SecretNotice />
      </aside>
      <div className="lg:col-span-2">
        <StepNav
          backHref={`${DEMO_BASE}/preparacao`}
          continueLabel="Testar a conexão"
          formId={FORM_ID}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
}

export function StepConexao() {
  const erp = findErp(useActivationDemo((s) => s.erp));
  if (!erp || !erp.kind) return null;
  const isApi = erp.kind === "api";

  return (
    <StepShell
      step={4}
      eyebrow="Conexão"
      title={
        <>
          Onde a Terus encontra o{" "}
          <span className="text-gradient">{erp.name}</span>
        </>
      }
      description={
        isApi
          ? "O endereço público da API e o usuário de integração. É o que o seu TI devolve no checklist do manual."
          : "O endereço público do banco e o nome da base. É o que o seu TI devolve no checklist do manual."
      }
      wide
    >
      {isApi ? <ApiForm erp={erp} /> : <DbForm erp={erp} />}
    </StepShell>
  );
}
