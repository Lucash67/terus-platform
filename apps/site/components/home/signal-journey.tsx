"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import {
  InView,
  Kicker,
  KineticText,
  useSceneProgress,
} from "@/components/motion/xp";
import { CAMADA_INTEGRACAO_HEADER } from "@/lib/constants/site-data";

interface Station {
  code: string;
  name: string;
  role: string;
  text: string;
  facts: string[];
  href?: string;
}

/* Fontes: technology.ts e CAMADA_INTEGRACAO (wiki/terustec.com.br), lp.ts (FAQ). */
const STATIONS: Station[] = [
  {
    code: "ERP",
    name: "ERP da rede",
    role: "Onde o dado já está",
    text: "Nada muda no sistema que a rede usa. A Terus só lê — estoque, venda, preço, oferta e custo.",
    facts: [...CAMADA_INTEGRACAO_HEADER.retailErps],
    href: "/integracoes",
  },
  {
    code: "AGT",
    name: "Agent",
    role: "Captura",
    text: "Executa consultas padronizadas no banco do ERP, compacta e criptografa o resultado e envia para a nuvem da Terus.",
    facts: ["Só leitura", "Sem VPN", "IP fixo liberado no firewall"],
    href: "/tecnologia/agent",
  },
  {
    code: "IAP",
    name: "IAproc",
    role: "Inteligência",
    text: "Cruza estoque, venda, preço e oferta e decide o que a loja e o comprador fazem primeiro.",
    facts: ["13 tipos de alerta", "Fila ordenada por R$", "Pedido sugerido"],
    href: "/tecnologia/iaproc",
  },
  {
    code: "PRT",
    name: "Portal",
    role: "Decisão",
    text: "Diretoria vê o resumo do dia, o comprador abre a mesa com a carteira dele e aprova a reposição.",
    facts: ["Painel de alertas", "Mesa do comprador", "Resumo do dia"],
    href: "/tecnologia/portal-do-cliente",
  },
  {
    code: "TSK",
    name: "Terus Task",
    role: "Execução na loja",
    text: "O app conduz o operador um produto de cada vez: ir à seção, ler o código, corrigir e registrar a foto.",
    facts: [
      "Leitura do código de barras",
      "Foto de evidência",
      "Android 8+ e iOS 15+",
    ],
    href: "/modulos/task",
  },
  {
    code: "BND",
    name: "Bond",
    role: "Fornecedor",
    text: "O pedido aprovado no portal é gravado no ERP da indústria ou do distribuidor — sem redigitação.",
    facts: [...CAMADA_INTEGRACAO_HEADER.supplierErps, "NF e rastreio"],
    href: "/tecnologia/bond",
  },
  {
    code: "R$",
    name: "Resultado",
    role: "Medição",
    text: "O portal mede cada alerta: venda antes e depois, acerto, reincidência e o valor capturado contra o deixado na mesa.",
    facts: ["Por loja", "Por colaborador", "Por alerta"],
    href: "/plataforma",
  },
];

function StationCard({
  s,
  i,
  active,
}: {
  s: Station;
  i: number;
  active: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[28px] border bg-surface-elevated-1/60 p-8 backdrop-blur-sm transition-all duration-700",
        active
          ? "border-brand-primary/50 shadow-premium"
          : "border-surface-border opacity-60",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-code-sm text-text-tertiary">
          {String(i + 1).padStart(2, "0")} /{" "}
          {String(STATIONS.length).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-surface-border px-3 py-1 font-mono text-caption uppercase tracking-[0.16em] text-brand-primary">
          {s.role}
        </span>
      </div>
      <p
        className={cn(
          "mt-8 font-display font-bold leading-none tracking-tighter transition-colors duration-700",
          active ? "text-brand-primary" : "xp-outline-text",
        )}
        style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
        aria-hidden="true"
      >
        {s.code}
      </p>
      <h3 className="mt-6 font-display text-heading-xl font-bold text-text-primary">
        {s.name}
      </h3>
      <p className="mt-3 flex-1 text-body-md text-text-secondary">{s.text}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {s.facts.map((f) => (
          <li
            key={f}
            className="rounded-full bg-surface-base/70 px-3 py-1 font-mono text-caption text-text-secondary"
          >
            {f}
          </li>
        ))}
      </ul>
      {s.href ? (
        <Link
          href={s.href}
          className="group mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand-primary"
        >
          Saiba mais
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      ) : null}
    </article>
  );
}

export function SignalJourney() {
  const [active, setActive] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = useSceneProgress<HTMLDivElement>((p) => {
    setActive(Math.min(STATIONS.length - 1, Math.floor(p * STATIONS.length)));
  });

  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const scene = sceneRef.current;
      if (!track || !scene) return;
      const travel = Math.max(0, track.scrollWidth - window.innerWidth + 96);
      scene.style.setProperty("--travel", `${travel}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [sceneRef]);

  const intro = (
    <InView className="max-w-3xl">
      <Kicker index="02" className="xp-in">
        O caminho do dado
      </Kicker>
      <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
        <KineticText text="Do banco do ERP até a foto da gôndola." />
      </h2>
      <p
        className="xp-in mt-6 text-body-lg text-text-secondary"
        style={{ "--d": "250ms" } as React.CSSProperties}
      >
        Sete paradas, um ciclo fechado. Role para seguir o sinal.
      </p>
    </InView>
  );

  return (
    <section id="jornada" className="relative scroll-mt-24">
      {/* Desktop: cena fixada com trilho horizontal */}
      <div
        ref={sceneRef}
        className="relative hidden lg:block"
        style={{ height: `${STATIONS.length * 70 + 60}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
          <Container className="mb-10">{intro}</Container>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-surface-border"
              aria-hidden="true"
            />
            <div
              ref={trackRef}
              className="xp-track flex gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
            >
              {STATIONS.map((s, i) => (
                <div key={s.code} className="w-[26rem] shrink-0">
                  <StationCard s={s} i={i} active={i === active} />
                </div>
              ))}
            </div>
          </div>

          <Container className="mt-10">
            <div className="flex items-center gap-3" aria-hidden="true">
              {STATIONS.map((s, i) => (
                <span
                  key={s.code}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    i <= active ? "bg-brand-primary" : "bg-surface-border",
                  )}
                />
              ))}
            </div>
            <p
              className="mt-3 font-mono text-code-sm text-text-tertiary"
              aria-live="polite"
            >
              {STATIONS[active].name} · {STATIONS[active].role}
            </p>
          </Container>
        </div>
      </div>

      {/* Mobile e tablet: lista vertical */}
      <Container className="py-24 lg:hidden">
        {intro}
        <ol className="mt-12 space-y-4">
          {STATIONS.map((s, i) => (
            <InView as="li" key={s.code} className="xp-in">
              <StationCard s={s} i={i} active />
            </InView>
          ))}
        </ol>
      </Container>
    </section>
  );
}
