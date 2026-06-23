export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Plataforma", href: "/plataforma" },
  { label: "Módulos", href: "/modulos" },
  { label: "Ecossistema", href: "/ecossistema" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Sobre", href: "/sobre" },
];

export const FOOTER_LINKS = {
  plataforma: [
    { label: "Plataforma", href: "/plataforma" },
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
};
