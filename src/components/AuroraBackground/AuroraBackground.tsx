import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Props for the decorative Aurora background. */
export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual intensity of the aurora (affects blob opacity). */
  intensity?: 'subtle' | 'normal' | 'vivid'
}

const intensityToOpacity: Record<
  NonNullable<AuroraBackgroundProps['intensity']>,
  string
> = {
  subtle: 'opacity-20',
  normal: 'opacity-35',
  vivid: 'opacity-55',
}

/**
 * Fixed, decorative Aurora gradient background. Renders softly animated color
 * washes over a dark base. Uses transform-only animation and respects
 * prefers-reduced-motion via base styles. Tuned for low-glare comfort:
 * low-chroma colors, soft-light blending, dark veil overlay.
 */
export function AuroraBackground({
  intensity = 'normal',
  className,
  ...rest
}: AuroraBackgroundProps) {
  const opacity = intensityToOpacity[intensity]

  return (
    <div
      aria-hidden="true"
      data-testid="aurora-background"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        'bg-background',
        className,
      )}
      {...rest}
    >
      {/* Deep base wash — gentle radial darken at top */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.04_280/0.5),transparent_65%)]',
        )}
      />

      {/* Violet wash (top-left) */}
      <div
        className={cn(
          'absolute -top-40 -left-40 size-[46rem] rounded-full blur-[120px]',
          'bg-aurora-1 mix-blend-soft-light will-change-transform',
          'animate-aurora',
          opacity,
        )}
      />

      {/* Dusk-blue wash (top-right) */}
      <div
        className={cn(
          'absolute -top-32 right-[-12rem] size-[40rem] rounded-full blur-[120px]',
          'bg-aurora-2 mix-blend-soft-light will-change-transform',
          'animate-aurora-slow [animation-delay:-12s]',
          opacity,
        )}
      />

      {/* Soft-teal wash (bottom-left) */}
      <div
        className={cn(
          'absolute bottom-[-14rem] left-[18%] size-[48rem] rounded-full blur-[120px]',
          'bg-aurora-3 mix-blend-soft-light will-change-transform',
          'animate-aurora [animation-delay:-22s]',
          opacity,
        )}
      />

      {/* Dark veil to flatten glare without losing color */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Fine grain to mask banding */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.025]',
          'bg-[radial-gradient(oklch(1_0_0/0.6)_1px,transparent_1px)] bg-[size:3px_3px]',
        )}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-background to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent" />
    </div>
  )
}
