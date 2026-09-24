export interface NavLink {
  label: string;
  href: string;
}

/**
 * LP mode: menu lateral oculto até a expansão do site.
 * Para reativar as abas, copie de MAIN_NAV_LINKS_ARCHIVED → MAIN_NAV_LINKS
 * e restaure as colunas do footer (FOOTER_LINKS_ARCHIVED).
 */
export const LP_NAV_MODE = true;

/** Abas arquivadas — não excluir; serão reativadas na expansão do site */
export const MAIN_NAV_LINKS_ARCHIVED: NavLink[] = [
  { label: "Terus Varejo", href: "/plataforma" },
  { label: "Módulos", href: "/modulos" },
  { label: "Ecossistema", href: "/ecossistema" },
  { label: "Cases", href: "/cases" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Sobre", href: "/sobre" },
];

/** Menu ativo da LP (vazio = só logo + CTAs) */
export const MAIN_NAV_LINKS: NavLink[] = LP_NAV_MODE
  ? []
  : MAIN_NAV_LINKS_ARCHIVED;

export const FOOTER_LINKS_ARCHIVED = {
  plataforma: [
    { label: "Terus Varejo", href: "/plataforma" },
    { label: "Módulos", href: "/modulos" },
    { label: "Ecossistema", href: "/ecossistema" },
  ],
  modulos: [
    { label: "Terus Alert", href: "/modulos/alert" },
    { label: "Terus Strategy", href: "/modulos/strategy" },
    { label: "Terus Order", href: "/modulos/order" },
    { label: "Terus Task", href: "/modulos/task" },
    { label: "Terus Log", href: "/modulos/log" },
    { label: "Terus Pulse", href: "/modulos/pulse" },
  ],
  sobre: [{ label: "Sobre", href: "/sobre" }],
} as const;

export const FOOTER_LINKS = LP_NAV_MODE
  ? {
      plataforma: [] as NavLink[],
      modulos: [] as NavLink[],
      sobre: [] as NavLink[],
    }
  : {
      plataforma: [...FOOTER_LINKS_ARCHIVED.plataforma],
      modulos: [...FOOTER_LINKS_ARCHIVED.modulos],
      sobre: [...FOOTER_LINKS_ARCHIVED.sobre],
    };
