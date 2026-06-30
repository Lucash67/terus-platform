import { MODULE_SLUGS } from "@/lib/constants/modules";

/** Rotas públicas indexáveis — alinhado ao sitemap aprovado (Fase 3B) */
export const PUBLIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/plataforma", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/modulos", priority: 0.9, changeFrequency: "monthly" as const },
  ...MODULE_SLUGS.map((slug) => ({
    path: `/modulos/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/ecossistema", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cases", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/conteudos", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sobre", priority: 0.7, changeFrequency: "monthly" as const },
  {
    path: "/solicitar-demo",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
];
