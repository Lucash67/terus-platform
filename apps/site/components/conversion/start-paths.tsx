import Link from "next/link";
import { cn } from "@terus/ui";

import { Reveal } from "@/components/motion/reveal";
import { CTA } from "@/lib/constants/conversion";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";

/** Os três caminhos genuínos de entrada (pacote DX 2.0, doc 05). */
export function StartPaths() {
  const paths = [
    {
      eyebrow: "Sem cadastro",
      title: "Explorar a demonstração",
      description:
        "Veja alertas virarem a fila da loja, com dados fictícios identificados.",
      href: "/plataforma#demo",
      cta: "Abrir demonstração",
      external: false,
      highlight: false,
    },
    ONBOARDING_ENABLED
      ? {
          eyebrow: "≈ 3 minutos",
          title: "Começar agora",
          description:
            "Crie sua conta, cadastre a empresa e peça a proposta. O progresso fica salvo.",
          href: "/criar-conta",
          cta: "Criar conta",
          external: false,
          highlight: true,
        }
      : {
          eyebrow: "Pré-cadastro",
          title: "Começar agora",
          description:
            "Envie ERP e número de lojas pelo formulário abaixo; seguimos pelo WhatsApp.",
          href: "#pre-cadastro",
          cta: "Ir para o pré-cadastro",
          external: false,
          highlight: true,
        },
    {
      eyebrow: "Conversa",
      title: "Falar com especialista",
      description: "Abre o WhatsApp comercial da Terus em uma nova aba.",
      href: CTA.secondary.href,
      cta: "Abrir WhatsApp",
      external: true,
      highlight: false,
    },
  ];

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {paths.map((p, i) => (
        <Reveal key={p.title} as="li" delay={i * 90}>
          <div
            className={cn(
              "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
              p.highlight
                ? "border-brand-primary/50 bg-brand-primary-dim shadow-premium"
                : "border-surface-border bg-surface-elevated-1 hover:border-brand-primary/40",
            )}
          >
            <p className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
              {p.eyebrow}
            </p>
            <p className="mt-3 font-display text-heading-lg font-semibold text-text-primary">
              {p.title}
            </p>
            <p className="mt-2 flex-1 text-body-sm text-text-secondary">
              {p.description}
            </p>
            {p.external ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-body-md font-semibold text-text-link group-hover:underline"
              >
                {p.cta} ↗
              </a>
            ) : (
              <Link
                href={p.href}
                className="mt-5 text-body-md font-semibold text-text-link group-hover:underline"
              >
                {p.cta} →
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
