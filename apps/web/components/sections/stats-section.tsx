import { Container } from "@/components/layout/container";

const STATS = [
  { value: "40%", label: "Redução de ruptura" },
  { value: "< 5min", label: "Detecção de anomalias" },
  { value: "6", label: "Módulos integrados" },
  { value: "24/7", label: "Monitoramento contínuo" },
];

export function StatsSection() {
  return (
    <section className="border-y border-surface-border">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-display-lg font-bold text-brand-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-body-sm text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
