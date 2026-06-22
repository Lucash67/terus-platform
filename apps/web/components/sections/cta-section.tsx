import Link from "next/link";
import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";

export function CtaSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="cta-gradient relative overflow-hidden rounded-lg border border-brand-primary/20 px-8 py-16 text-center sm:px-16">
          <div className="relative">
            <h2 className="font-display text-heading-xl font-bold text-white sm:text-display-lg">
              Pronto para transformar sua operação?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/80">
              Conheça como a Terus Platform elimina ruptura, reduz capital
              imobilizado e automatiza a reposição em toda a cadeia.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/solicitar-demo">Agendar demonstração</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white text-brand-primary hover:bg-white/90"
              >
                <Link href="/plataforma">Explorar plataforma</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
