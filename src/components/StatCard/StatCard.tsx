import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/GlassCard/GlassCard'

/** Props for StatCard. */
export interface StatCardProps {
  /** Localized label describing the metric. */
  label: string
  /** Primary metric value (string, already formatted by caller). */
  value: string
  /** Trend percentage, positive means up. Omit to hide trend chip. */
  trend?: number
  /** Localized text shown after the trend chip (e.g. "vs yesterday"). */
  trendLabel?: string
  /** Decorative icon shown on the top-right of the card. */
  icon?: ReactNode
  /** Highlight the card with the aurora glow (use for the lead metric). */
  emphasis?: boolean
}

/** A glass-styled metric card used in the dashboard overview grid. */
export function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  emphasis = false,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight

  return (
    <GlassCard
      tone={emphasis ? 'strong' : 'default'}
      glow={emphasis}
      className="flex flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        {icon ? (
          <span className="text-foreground/70" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>

      <p
        className="text-3xl font-semibold text-foreground tabular-nums tracking-tight"
        data-testid="stat-value"
      >
        {value}
      </p>

      {trend !== undefined ? (
        <div className="flex items-center gap-2 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium',
              isPositive
                ? 'border-success/40 bg-success/15 text-success'
                : 'border-destructive/40 bg-destructive/15 text-destructive',
            )}
          >
            <TrendIcon className="size-3" aria-hidden="true" />
            <span className="tabular-nums">
              {isPositive ? '+' : ''}
              {trend.toFixed(1)}%
            </span>
          </span>
          {trendLabel ? (
            <span className="text-muted-foreground">{trendLabel}</span>
          ) : null}
        </div>
      ) : null}
    </GlassCard>
  )
}
