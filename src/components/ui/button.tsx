import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'group relative inline-flex shrink-0 select-none items-center justify-center gap-2',
    'whitespace-nowrap rounded-xl font-medium tracking-tight',
    'transition-[transform,box-shadow,background,border-color,color] duration-200',
    'ease-(--ease-glass) outline-none cursor-pointer',
    'focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    'active:scale-[0.98]',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'text-primary-foreground border border-white/20',
          'bg-linear-to-br from-primary/95 via-primary/85 to-accent/75',
          'shadow-[var(--shadow-glow-primary)]',
          'hover:from-primary hover:via-primary/95 hover:to-accent/90',
          'hover:shadow-[0_0_36px_-4px_var(--color-primary)]',
        ),
        secondary: cn(
          'text-foreground border border-white/12',
          'bg-white/8 backdrop-blur-xl supports-[backdrop-filter]:bg-white/6',
          'hover:bg-white/14 hover:border-white/20',
        ),
        outline: cn(
          'text-foreground border border-white/18 bg-transparent',
          'backdrop-blur-md',
          'hover:bg-white/8 hover:border-white/30',
        ),
        ghost: cn(
          'text-foreground/85 border border-transparent bg-transparent',
          'hover:bg-white/8 hover:text-foreground',
        ),
        destructive: cn(
          'text-destructive-foreground border border-destructive/40',
          'bg-linear-to-br from-destructive/90 to-destructive/70',
          'shadow-[0_0_24px_-6px_var(--color-destructive)]',
          'hover:from-destructive hover:to-destructive/85',
        ),
        link: 'text-primary underline-offset-4 hover:underline px-0',
      },
      size: {
        sm: 'h-8 px-3 text-xs has-[>svg]:px-2.5',
        md: 'h-10 px-4 text-sm has-[>svg]:px-3.5',
        lg: 'h-12 px-6 text-base has-[>svg]:px-5',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

/** Props for the glass-styled Button. */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. for `<a>` or router `<Link>`). */
  asChild?: boolean
}

/**
 * Glass-styled button used across the app. Supports primary/secondary/outline/
 * ghost/destructive/link variants with Aurora-aware coloring.
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      type={asChild ? undefined : (type ?? 'button')}
      {...props}
    />
  )
}

export { buttonVariants }
