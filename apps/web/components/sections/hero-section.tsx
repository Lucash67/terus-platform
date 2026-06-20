import Link from "next/link";
import { Badge, Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { SITE_TAGLINE } from "@/lib/constants/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
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
      </Container>
    </section>
  );
}
