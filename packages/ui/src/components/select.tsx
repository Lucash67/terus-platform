import * as React from "react";

import { cn } from "../lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-md border border-surface-border bg-surface-base px-3.5 py-2 pr-10 text-body-md text-text-primary transition-all duration-200",
          "hover:border-surface-elevated-3",
          "focus-visible:border-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/10",
          "disabled:cursor-not-allowed disabled:bg-surface-elevated-1 disabled:opacity-60",
          "aria-[invalid=true]:border-status-error aria-[invalid=true]:focus-visible:ring-status-error/10",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
