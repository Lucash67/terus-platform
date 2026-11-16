import * as React from "react";

import { cn } from "../src/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/** Checkbox nativo estilizado — acessível por padrão (teclado, leitor de tela). */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-surface-border bg-surface-base accent-brand-primary",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20",
        "aria-[invalid=true]:border-status-error",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
