import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:py-16">
      <div className="ob-enter rounded-2xl border border-surface-border bg-surface-elevated-1/90 p-6 shadow-premium backdrop-blur sm:p-8">
        <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-heading-xl font-bold text-text-primary">
          {title}
        </h1>
        <p className="mt-2 text-body-md leading-relaxed text-text-secondary">
          {description}
        </p>
        <div className="mt-8">{children}</div>
      </div>
      {footer ? (
        <div className="mt-6 text-center text-body-sm text-text-secondary">
          {footer}
        </div>
      ) : null}
      <p className="mt-6 text-center text-body-sm text-text-tertiary">
        Dúvidas?{" "}
        <Link href="/contato" className="text-text-link hover:underline">
          Fale com a Terus
        </Link>
      </p>
    </div>
  );
}
