import { cn } from "@terus/ui";

const TONE_CLASSES = {
  neutral: "border-surface-border bg-surface-elevated-2 text-text-secondary",
  info: "border-brand-primary/25 bg-brand-primary-dim text-brand-primary",
  success: "border-status-success/30 bg-status-success-dim text-status-success",
  warning: "border-status-warning/30 bg-status-warning-dim text-status-warning",
} as const;

export type Tone = keyof typeof TONE_CLASSES;

export function StatusPill({
  tone,
  children,
}: {
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-caption font-semibold uppercase tracking-wider",
        TONE_CLASSES[tone],
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
