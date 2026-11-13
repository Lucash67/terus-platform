import { MODULES } from "@/lib/constants/modules";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** Itens do menu suspenso (desktop) / acordeão (mobile) */
  items?: NavLink[];
}

/**
 * Navegação institucional (Digital Experience 2.0).
 * Módulos e textos vêm de modules.ts (wiki.terus.tec.br/varejo).
 */
export const MAIN_NAV: NavGroup[] = [
  {
    label: "Plataforma",
    href: "/plataforma",
    items: [
      {
        label: "Visão geral",
        href: "/plataforma",
        description: "Do ERP à gôndola: detectar, executar e medir.",
      },
      {
        label: "Como funciona",
        href: "/plataforma#como-funciona",
        description: "Captura, inteligência e integração.",
      },
      {
        label: "Demonstração",
        href: "/plataforma#demo",
        description: "Fila de alertas com dados fictícios.",
      },
      {
        label: "Tecnologia",
        href: "/tecnologia",
        description:
          "Agent, IAproc, Bond, Portal do Cliente, Task Web e Teams.",
      },
      {
        label: "Integrações",
        href: "/integracoes",
        description: "ERPs documentados, requisitos e segurança.",
      },
    ],
  },
  {
    label: "Soluções",
    href: "/modulos",
    items: MODULES.map((m) => ({
      label: m.name,
      href: `/modulos/${m.slug}`,
      description: m.tagline,
    })),
  },
  {
    label: "Segmentos",
    href: "/varejo",
    items: [
      {
        label: "Varejo",
        href: "/varejo",
        description: "Diretoria, comprador e loja na mesma rotina.",
      },
      {
        label: "Indústria e distribuidores",
        href: "/industria-distribuidores",
        description: "Pedido da rede direto no seu ERP.",
      },
      {
        label: "Ecossistema",
        href: "/ecossistema",
        description: "Rede Terus: varejos e fornecedores conectados.",
      },
    ],
  },
  { label: "Cases", href: "/cases" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Sobre", href: "/sobre" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Plataforma",
    links: [
      { label: "Visão geral", href: "/plataforma" },
      { label: "Tecnologia", href: "/tecnologia" },
      { label: "Integrações", href: "/integracoes" },
      { label: "Ecossistema", href: "/ecossistema" },
      { label: "Varejo", href: "/varejo" },
      {
        label: "Indústria e distribuidores",
        href: "/industria-distribuidores",
      },
    ],
  },
  {
    title: "Soluções",
    links: MODULES.map((m) => ({ label: m.name, href: `/modulos/${m.slug}` })),
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Cases", href: "/cases" },
      { label: "Conteúdos", href: "/conteudos" },
      { label: "Contato", href: "/contato" },
      { label: "Começar agora", href: "/comecar" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];
