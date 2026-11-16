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
import { PlatformScreenshot } from "@/components/sections/platform-screenshot";
import { PLATFORM_SCREENS, type PlatformScreen } from "@/lib/constants/lp";
import { CAMADA_INTEGRACAO_HEADER } from "@/lib/constants/site-data";

interface Station {
  code: string;
  name: string;
  role: string;
  text: string;
  facts: string[];
  href?: string;
  /** Tela real do portal no lugar da sigla grande */
  screen?: PlatformScreen;
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
    code: "AGE",
    name: "Agente",
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
    text: "Toda a gestão do varejo e do fornecedor. No Portal do Varejo, a diretoria vê o resumo do dia e o comprador aprova a reposição; no Portal do Fornecedor, a indústria acompanha alertas, vendas e pedidos dos seus produtos.",
    facts: ["Portal do Varejo", "Portal do Fornecedor", "Resumo do dia"],
    href: "/tecnologia/portal-do-cliente",
  },
  {
    code: "TAR",
    name: "Terus Tarefa",
    role: "Execução na loja",
    text: "O aplicativo conduz o operador um produto de cada vez: ir à seção, ler o código, corrigir e registrar a foto.",
    facts: [
      "Leitura do código de barras",
      "Foto de evidência",
      "Android 8+ e iOS 15+",
    ],
    href: "/modulos/task",
  },
  {
    code: "VIN",
    name: "Vínculo",
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
    screen: PLATFORM_SCREENS.monitor,
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
      {s.screen ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-surface-border">
          <PlatformScreenshot
            screen={s.screen}
            sizes="(min-width: 1024px) 26rem, 90vw"
            className="h-[5.5rem] w-full object-cover object-top sm:h-28"
          />
        </div>
      ) : (
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
      )}
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

  // Rolagem para o lado (trackpad ou Shift + roda) também anda pelo trilho
  React.useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
      if (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      const rect = scene.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const p = -rect.top / span;
      if ((p <= 0 && dx < 0) || (p >= 1 && dx > 0)) return;
      const track = trackRef.current;
      const travel = track
        ? Math.max(1, track.scrollWidth - window.innerWidth + 96)
        : span;
      e.preventDefault();
      window.scrollBy({ top: dx * (span / travel) });
    };
    scene.addEventListener("wheel", onWheel, { passive: false });
    return () => scene.removeEventListener("wheel", onWheel);
  }, [sceneRef]);

  const goTo = (i: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const span = scene.offsetHeight - window.innerHeight;
    const top = scene.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + span * ((i + 0.5) / STATIONS.length),
      behavior: "smooth",
    });
  };

  const intro = (
    <InView className="max-w-3xl">
      <Kicker index="02" className="xp-in">
        O caminho do dado
      </Kicker>
      <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
        <KineticText text="Do ERP até a foto da gôndola." />
      </h2>
      <p
        className="xp-in mt-6 text-body-lg text-text-secondary"
        style={{ "--d": "250ms" } as React.CSSProperties}
      >
        Sete paradas, um ciclo fechado. Role para baixo ou para o lado para
        seguir o sinal.
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
            <div className="flex items-center gap-3">
              {STATIONS.map((s, i) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir para ${s.name}`}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex-1 py-2"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-colors duration-500 group-hover:bg-brand-primary/60",
                      i <= active ? "bg-brand-primary" : "bg-surface-border",
                    )}
                  />
                </button>
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
