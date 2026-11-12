import * as React from "react";

import { cn } from "../lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-md border border-surface-border bg-surface-base px-3.5 py-2.5 text-body-md text-text-primary transition-all duration-200",
        "placeholder:text-text-disabled hover:border-surface-elevated-3",
        "focus-visible:border-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-[invalid=true]:border-status-error",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
