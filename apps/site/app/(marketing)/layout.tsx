import { AttributionCapture } from "@/components/analytics/attribution-capture";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StickyDemoCta } from "@/components/conversion/sticky-demo-cta";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AttributionCapture />
      <Navbar />
      <main id="conteudo" className="flex-1 pb-24 lg:pb-0">
        {children}
      </main>
      <Footer />
      <StickyDemoCta />
    </div>
  );
}
