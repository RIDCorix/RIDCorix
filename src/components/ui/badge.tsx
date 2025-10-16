import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-visible whitespace-nowrap rounded-sm border-0 px-1 py-0.5 text-xs font-medium transition-all duration-200 focus-visible:ring focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3 before:content-["["] after:content-["]"] before:mr-0.5 after:ml-0.5',
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-primary before:text-primary after:text-primary shadow-[0_0_6px_rgba(59,130,246,0.3)] hover:shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_8px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_12px_rgba(59,130,246,0.7)]',
        secondary:
          'bg-transparent text-slate-600 before:text-slate-600 after:text-slate-600 shadow-[0_0_6px_rgba(71,85,105,0.3)] hover:shadow-[0_0_10px_rgba(71,85,105,0.4)] dark:text-slate-400 dark:before:text-slate-400 dark:after:text-slate-400 dark:shadow-[0_0_8px_rgba(148,163,184,0.5)] dark:hover:shadow-[0_0_12px_rgba(148,163,184,0.7)]',
        destructive:
          'bg-transparent text-destructive before:text-destructive after:text-destructive shadow-[0_0_6px_rgba(239,68,68,0.3)] hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] dark:shadow-[0_0_8px_rgba(239,68,68,0.5)] dark:hover:shadow-[0_0_12px_rgba(239,68,68,0.7)]',
        outline:
          'bg-transparent text-foreground before:text-muted-foreground after:text-muted-foreground shadow-[0_0_6px_rgba(148,163,184,0.25)] hover:shadow-[0_0_10px_rgba(148,163,184,0.35)] dark:shadow-[0_0_8px_rgba(148,163,184,0.4)] dark:hover:shadow-[0_0_12px_rgba(148,163,184,0.6)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
