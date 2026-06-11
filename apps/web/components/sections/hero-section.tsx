import Link from "next/link";
import { Badge, Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { SITE_TAGLINE } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-glow blur-3xl" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            {SITE_TAGLINE}
          </Badge>

          <h1 className="font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl lg:text-display-2xl">
            Inteligência operacional para{" "}
            <span className="text-gradient">toda a cadeia</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-text-secondary">
            A Terus conecta varejo, indústria e distribuição em tempo real —
            eliminando ruptura de gôndola, excesso de estoque e execução manual
            inconsistente.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/plataforma">Conhecer a plataforma</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/modulos">Ver módulos</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <SupplyChainDiagram />
        </div>
      </Container>
    </section>
  );
}

function SupplyChainDiagram() {
  const nodes = [
    { label: "Indústria", x: 80, y: 60 },
    { label: "Distribuição", x: 200, y: 60 },
    { label: "Varejo", x: 320, y: 60 },
    { label: "Terus Platform", x: 200, y: 160, highlight: true },
    { label: "Loja", x: 80, y: 240 },
    { label: "Operação", x: 200, y: 240 },
    { label: "Execução", x: 320, y: 240 },
  ];

  return (
    <div className="rounded-lg border border-surface-border bg-surface-elevated-1/80 p-6 backdrop-blur-sm">
      <svg
        viewBox="0 0 400 300"
        className="mx-auto w-full max-w-lg"
        aria-label="Diagrama da cadeia de suprimentos integrada pela Terus"
        role="img"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="var(--brand-primary)"
              stopOpacity="0.3"
            />
            <stop
              offset="50%"
              stopColor="var(--brand-primary)"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="var(--brand-secondary)"
              stopOpacity="0.3"
            />
          </linearGradient>
        </defs>

        <line
          x1="80"
          y1="80"
          x2="200"
          y2="140"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />
        <line
          x1="200"
          y1="80"
          x2="200"
          y2="140"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />
        <line
          x1="320"
          y1="80"
          x2="200"
          y2="140"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="220"
          x2="200"
          y2="180"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />
        <line
          x1="200"
          y1="220"
          x2="200"
          y2="180"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />
        <line
          x1="320"
          y1="220"
          x2="200"
          y2="180"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
        />

        {nodes.map((node) => (
          <g key={node.label}>
            <rect
              x={node.x - 55}
              y={node.y - 18}
              width="110"
              height="36"
              rx="8"
              fill={
                node.highlight
                  ? "var(--brand-primary-dim)"
                  : "var(--surface-elevated-2)"
              }
              stroke={
                node.highlight
                  ? "var(--brand-primary)"
                  : "var(--surface-border)"
              }
              strokeWidth="1"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill={
                node.highlight
                  ? "var(--brand-primary)"
                  : "var(--text-secondary)"
              }
              fontSize="11"
              fontFamily="var(--font-ibm-plex-sans)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
