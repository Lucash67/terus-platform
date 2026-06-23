import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-[#1E3A8A]">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-primary-dim ring-1 ring-brand-primary/30">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-brand-primary"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h16M12 4v16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-display text-heading-md font-semibold">
                Terus<span className="text-brand-primary">.</span>
              </span>
            </div>
            <p className="mt-4 text-body-sm text-white/80">{SITE_TAGLINE}</p>
            <p className="mt-2 text-body-sm text-white/60">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Plataforma
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Módulos
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.modulos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Institucional
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Informações institucionais em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  CNPJ: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Endereço: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Contato: Em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Política de Privacidade: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Termos de Uso: Em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Comercial
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Informações comerciais em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Suporte
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Informações de suporte em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Demonstração
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/solicitar-demo"
                  className="text-body-sm text-white/70 transition-colors hover:text-white"
                >
                  Agendar demonstração
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              LinkedIn
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  LinkedIn em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Ecossistema
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Integrações: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Tecnologias: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Parceiros: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Conectividade: Em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Confiabilidade
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="text-body-sm text-white/70">
                  Segurança: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Governança: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Disponibilidade: Em atualização
                </span>
              </li>
              <li>
                <span className="text-body-sm text-white/70">
                  Suporte: Em atualização
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Cases
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/cases"
                  className="text-body-sm text-white/70 transition-colors hover:text-white"
                >
                  Cases de Sucesso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-body-sm font-semibold uppercase tracking-wider text-white">
              Sobre
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.sobre.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 sm:flex-row">
          <p className="text-caption text-white/60">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
            reservados.
          </p>
          <p className="text-caption text-white/60">
            Supply Chain Intelligence · Varejo · Indústria · Distribuição
          </p>
        </div>
      </Container>
    </footer>
  );
}
