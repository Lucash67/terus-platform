import Link from "next/link";

import { Container } from "@/components/layout/container";
import {
  InView,
  Kicker,
  KineticText,
  Marquee,
  SpotCard,
} from "@/components/motion/xp";
import {
  ERP_ECOSYSTEM,
  PILARES_CONFIABILIDADE,
} from "@/lib/constants/site-data";

/** O que o TI da rede faz (FAQ em lp.ts, fonte: manuais de integração da wiki). */
const IT_STEPS = [
  "Liberar o IP fixo da Terus no firewall",
  "Criar o usuário de integração",
  "Aplicar o script de permissões que entregamos pronto",
];

function ErpChip({ name, vendor }: { name: string; vendor: string }) {
  return (
    <span className="mx-3 flex items-center gap-3 rounded-full border border-surface-border bg-surface-elevated-1/60 px-6 py-3">
      <span className="font-display text-heading-md font-semibold text-text-primary">
        {name}
      </span>
      <span className="font-mono text-caption text-text-tertiary">
        {vendor}
      </span>
    </span>
  );
}

export function TrustSection() {
  const retail = ERP_ECOSYSTEM.filter((e) => e.side === "varejo");
  const supplier = ERP_ECOSYSTEM.filter((e) => e.side === "fornecedor");

  return (
    <section className="relative py-24 lg:py-36">
      <Container>
        <InView className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index="07" className="xp-in">
              Integração e segurança
            </Kicker>
            <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
              <KineticText text="Sem trocar de ERP." />{" "}
              <KineticText
                text="Sem escrever no seu banco."
                delay={200}
                wordClassName="text-brand-primary"
              />
            </h2>
          </div>
          <p
            className="xp-in text-body-lg text-text-secondary lg:col-span-5"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            No ERP da rede a Terus só lê. Do lado do fornecedor, o pedido
            aprovado é gravado no sistema dele.
          </p>
        </InView>
      </Container>

      <div className="mt-14 space-y-4">
        <div className="flex items-center gap-4">
          <span className="w-28 shrink-0 pl-6 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary sm:w-40 sm:pl-10">
            Varejo · leitura
          </span>
          <Marquee duration={30} className="flex-1">
            {retail.map((e) => (
              <ErpChip key={e.name} name={e.name} vendor={e.vendor} />
            ))}
          </Marquee>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-28 shrink-0 pl-6 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary sm:w-40 sm:pl-10">
            Fornecedor · pedido
          </span>
          <Marquee duration={22} reverse className="flex-1">
            {[...supplier, ...supplier].map((e, i) => (
              <ErpChip key={`${e.name}-${i}`} name={e.name} vendor={e.vendor} />
            ))}
          </Marquee>
        </div>
      </div>

      <Container className="mt-20">
        <div className="grid gap-4 lg:grid-cols-12">
          <InView as="ul" className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {PILARES_CONFIABILIDADE.map((p, i) => (
              <li
                key={p.name}
                className="xp-in"
                style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
              >
                <SpotCard className="h-full rounded-3xl border border-surface-border bg-surface-elevated-1/50 p-7">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-status-success-dim font-mono text-code-sm text-status-success"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <h3 className="mt-5 font-display text-heading-md font-semibold text-text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {p.description}
                  </p>
                </SpotCard>
              </li>
            ))}
          </InView>
          <InView className="xp-in rounded-3xl border border-brand-primary/30 bg-brand-primary-dim p-7 lg:col-span-4">
            <p className="font-mono text-caption uppercase tracking-[0.16em] text-brand-primary">
              O que o seu TI faz
            </p>
            <ol className="mt-5 space-y-4">
              {IT_STEPS.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-4 text-body-md text-text-primary"
                >
                  <span className="font-mono text-code-md text-brand-primary">
                    0{i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-body-sm text-text-secondary">
              Não precisa de VPN.
            </p>
            <Link
              href="/integracoes"
              className="group mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-brand-primary"
            >
              Ver requisitos de integração
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </InView>
        </div>
      </Container>
    </section>
  );
}
