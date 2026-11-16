import { cn } from "@terus/ui";

const TONES = {
  error: "border-status-error/30 bg-status-error-dim text-status-error",
  warning: "border-status-warning/30 bg-status-warning-dim text-text-primary",
  info: "border-brand-primary/25 bg-brand-primary-dim text-text-primary",
  success: "border-status-success/30 bg-status-success-dim text-text-primary",
} as const;

export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof TONES;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-4 py-3 text-body-sm",
        TONES[tone],
        className,
      )}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      <div className={cn(title && "mt-1", "leading-relaxed")}>{children}</div>
    </div>
  );
}
