import * as React from "react";

import { cn } from "../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-surface-border bg-surface-base px-3.5 py-2 text-body-md text-text-primary transition-all duration-200",
          "placeholder:text-text-disabled",
          "hover:border-surface-elevated-3",
          "focus-visible:border-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20",
          "disabled:cursor-not-allowed disabled:bg-surface-elevated-1 disabled:opacity-60",
          "aria-[invalid=true]:border-status-error aria-[invalid=true]:focus-visible:ring-status-error/10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
