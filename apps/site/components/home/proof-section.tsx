import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/motion/count-up";
import { InView, Kicker, KineticText, Marquee } from "@/components/motion/xp";
import { FounderVideo } from "@/components/sections/founder-video";
import { FOUNDER, FOUNDER_VIDEOS } from "@/lib/constants/lp";
import { CLIENT_LOGOS } from "@/lib/constants/site-data";

/** Indicadores do case Cometa Supermercados — confirmados pela organização (CLAUDE.md). */
const COMETA = [
  {
    label: "Rejeição de pedidos no ERP",
    before: 35,
    after: 0.5,
    unit: "%",
    decimals: 1,
    lowerIsBetter: true,
  },
  {
    label: "Fill rate",
    before: 40,
    after: 96,
    unit: "%",
    decimals: 0,
    lowerIsBetter: false,
  },
  {
    label: "Pedidos digitalizados",
    before: 0,
    after: 96,
    unit: "%",
    decimals: 0,
    lowerIsBetter: false,
  },
];

export function ProofSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <InView className="lg:col-span-7">
            <Kicker index="06" className="xp-in">
              Resultado real · Cometa Supermercados
            </Kicker>
            <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl">
              <KineticText text="Quando o pedido entra certo," />{" "}
              <KineticText
                text="a gôndola agradece."
                delay={250}
                wordClassName="text-brand-primary"
              />
            </h2>

            <div className="mt-12 space-y-8">
              {COMETA.map((c, i) => (
                <div
                  key={c.label}
                  className="xp-in"
                  style={{ "--d": `${200 + i * 120}ms` } as React.CSSProperties}
                >
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-body-md text-text-secondary">
                      {c.label}
                    </p>
                    <p className="font-display text-display-lg font-bold text-text-primary">
                      <span className="mr-3 text-heading-lg font-medium text-text-tertiary line-through decoration-1">
                        {String(c.before).replace(".", ",")}
                        {c.unit}
                      </span>
                      <CountUp
                        value={c.after}
                        decimals={c.decimals}
                        suffix={c.unit}
                      />
                    </p>
                  </div>
                  <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-surface-elevated-2">
                    <span
                      className="absolute inset-y-0 left-0 w-full rounded-full bg-text-tertiary/40"
                      style={{
                        transform: `scaleX(${c.before / 100})`,
                        transformOrigin: "0 50%",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="xp-bar absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary"
                      style={
                        {
                          "--v": Math.max(c.after / 100, 0.01),
                          "--d": `${400 + i * 150}ms`,
                        } as React.CSSProperties
                      }
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="xp-in mt-12 grid grid-cols-2 gap-4"
              style={{ "--d": "600ms" } as React.CSSProperties}
            >
              <div className="rounded-3xl border border-surface-border p-6">
                <p className="font-display text-display-lg font-bold text-text-primary">
                  <CountUp value={31881} locale />
                </p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  pedidos rastreáveis no case
                </p>
              </div>
              <div className="rounded-3xl border border-surface-border p-6">
                <p className="font-display text-display-lg font-bold text-text-primary">
                  +<CountUp value={20} />
                </p>
                <p className="mt-1 text-body-sm text-text-secondary">
                  empresas na Rede Terus
                </p>
              </div>
            </div>
          </InView>

          <InView className="lg:col-span-5">
            <div className="xp-clip mx-auto max-w-[340px]">
              <FounderVideo {...FOUNDER_VIDEOS.institucional} />
            </div>
            <p
              className="xp-in mt-4 text-center text-body-sm text-text-secondary"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              {FOUNDER.name}, {FOUNDER.role}
            </p>
          </InView>
        </div>
      </Container>

      <Marquee
        duration={45}
        className="mt-24 border-y border-surface-border py-8"
      >
        {CLIENT_LOGOS.map((c) => (
          <span
            key={c.name}
            className="mx-10 flex h-12 w-32 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={c.logo}
              alt={c.name}
              width={128}
              height={48}
              className="h-auto max-h-12 w-auto object-contain"
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
