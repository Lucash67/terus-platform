import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CTA } from "@/lib/constants/conversion";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";

/** Canais reais de contato (WhatsApp comercial confirmado em CLAUDE.md). */
export function ContactSection() {
  const channels = [
    {
      title: "WhatsApp comercial",
      detail: "(85) 99738-4940",
      text: "Conversa direta com o time comercial.",
      href: CTA.secondary.href,
      label: "Abrir WhatsApp",
      external: true,
    },
    ONBOARDING_ENABLED
      ? {
          title: "Cadastro online",
          detail: "Conta + empresa + proposta",
          text: "Registre a empresa e acompanhe a solicitação pelo portal.",
          href: "/criar-conta",
          label: "Criar conta",
          external: false,
        }
      : {
          title: "Pré-cadastro",
          detail: "ERP e número de lojas",
          text: "Envie os dados da rede; seguimos pelo WhatsApp.",
          href: "/comecar#pre-cadastro",
          label: "Fazer pré-cadastro",
          external: false,
        },
    {
      title: "Demonstração",
      detail: "Sem cadastro",
      text: "Veja como alertas viram a fila da loja (dados fictícios).",
      href: "/plataforma#demo",
      label: "Explorar",
      external: false,
    },
  ];
  return (
    <section className="section-rhythm">
      <Container>
        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal
              key={c.title}
              as="li"
              delay={i * 80}
              className="flex flex-col rounded-2xl border border-surface-border bg-surface-elevated-1 p-6"
            >
              <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
                {c.title}
              </p>
              <p className="mt-3 font-display text-heading-lg font-semibold text-text-primary">
                {c.detail}
              </p>
              <p className="mt-2 flex-1 text-body-sm text-text-secondary">
                {c.text}
              </p>
              {c.external ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-semibold text-text-link hover:underline"
                >
                  {c.label} ↗
                </a>
              ) : (
                <Link
                  href={c.href}
                  className="mt-5 font-semibold text-text-link hover:underline"
                >
                  {c.label} →
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
