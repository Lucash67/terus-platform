import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 caption font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-surface-base",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-primary text-surface-base shadow hover:bg-brand-primary-hover",
        secondary:
          "border-transparent bg-surface-elevated-2 text-text-primary hover:bg-surface-elevated-3",
        success:
          "border-transparent bg-status-success-dim text-status-success hover:bg-status-success-dim/80",
        warning:
          "border-transparent bg-status-warning-dim text-status-warning hover:bg-status-warning-dim/80",
        error:
          "border-transparent bg-status-error-dim text-status-error hover:bg-status-error-dim/80",
        outline: "text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
