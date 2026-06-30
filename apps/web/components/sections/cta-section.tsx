import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";

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
            <CtaButtons size="lg" inverted className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
