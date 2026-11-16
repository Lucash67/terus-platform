/**
 * Recriado a cada navegação: cortina rápida nas cores da marca e entrada suave
 * do conteúdo. Desligado com prefers-reduced-motion (experience.css).
 */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="xp-curtain" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="xp-page">{children}</div>
    </>
  );
}
