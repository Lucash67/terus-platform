import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TechDetail } from "@/components/technology/tech-detail";
import { getTech, TECH_COMPONENTS } from "@/lib/constants/technology";
import { createPageMetadata } from "@/lib/seo/metadata";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return TECH_COMPONENTS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tech = getTech(params.slug);
  if (!tech)
    return createPageMetadata({
      title: "Componente não encontrado",
      description: "",
      path: "/tecnologia",
      noIndex: true,
    });
  return createPageMetadata({
    title: `${tech.name} — ${tech.kicker}`,
    description: tech.summary,
    path: `/tecnologia/${tech.slug}`,
  });
}

export default function TechPage({ params }: Props) {
  const tech = getTech(params.slug);
  if (!tech) notFound();
  return <TechDetail tech={tech} />;
}
