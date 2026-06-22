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
            Ative, implante e opere clientes em uma{" "}
            <span className="text-gradient">única plataforma</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-text-secondary">
            A Terus conecta varejo, indústria e distribuição em uma única
            plataforma, automatizando a jornada desde o onboarding até a
            operação contínua dos clientes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/plataforma">Explorar plataforma</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/modulos">Ver jornada operacional</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
