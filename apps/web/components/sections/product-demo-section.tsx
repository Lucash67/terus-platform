import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ProductDemoPlayer } from "@/components/sections/product-demo-player";
import { PRODUCT_DEMO } from "@/lib/constants/site-data";

/**
 * Seção do vídeo demo de 60s — Home (após resultados) e página Terus Varejo (após hero).
 * O player aceita mídia quando PRODUCT_DEMO.src for preenchido.
 */
export function ProductDemoSection() {
  return (
    <section className="section-rhythm relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
            {PRODUCT_DEMO.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold tracking-tight text-text-primary sm:text-display-lg">
            {PRODUCT_DEMO.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            {PRODUCT_DEMO.description}
          </p>
        </Reveal>

        <Reveal variant="scale" delay={120} className="mx-auto mt-12 max-w-4xl">
          <ProductDemoPlayer />
        </Reveal>
      </Container>
    </section>
  );
}
