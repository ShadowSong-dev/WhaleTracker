import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Props for GlassCard wrapper. */
export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content. */
  children: ReactNode
  /** Visual strength of the frosting effect. */
  tone?: 'default' | 'strong'
  /** Add a subtle aurora glow ring (used for emphasised cards). */
  glow?: boolean
}

/**
 * Generic glassmorphism container. Provides the frosted surface used across
 * the dashboard. Other components (StatCard, panels, modals) compose it.
 */
export function GlassCard({
  children,
  tone = 'default',
  glow = false,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      data-slot="glass-card"
      data-tone={tone}
      className={cn(
        'relative rounded-2xl',
        tone === 'strong' ? 'glass-panel-strong' : 'glass-panel',
        glow && 'shadow-[var(--shadow-glow-primary)]',
        // top highlight
        'before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px',
        'before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
