import type { ComponentType, SVGProps } from 'react'
import {
  Activity,
  Bell,
  LayoutDashboard,
  Settings,
  Waves,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

/** A single sidebar entry. */
interface SidebarItemDef {
  /** i18n key under the `dashboard.nav` namespace. */
  key: 'overview' | 'whales' | 'transactions' | 'alerts' | 'settings'
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const items: readonly SidebarItemDef[] = [
  { key: 'overview', icon: LayoutDashboard },
  { key: 'whales', icon: Waves },
  { key: 'transactions', icon: Activity },
  { key: 'alerts', icon: Bell },
  { key: 'settings', icon: Settings },
] as const

/** Props for Sidebar. */
export interface SidebarProps {
  /** The currently active item key. */
  activeKey?: SidebarItemDef['key']
  /** Click handler. Receives the activated item key. */
  onSelect?: (key: SidebarItemDef['key']) => void
}

/** Vertical glass sidebar used by the dashboard shell. */
export function Sidebar({ activeKey = 'overview', onSelect }: SidebarProps) {
  const { t } = useTranslation('dashboard')
  const { t: tCommon } = useTranslation('common')

  return (
    <aside
      data-slot="sidebar"
      aria-label={t('nav.overview')}
      className={cn(
        'glass-panel relative flex h-full w-60 flex-col gap-2 rounded-2xl p-4',
      )}
    >
      <div className="flex items-center gap-2 px-2 py-3">
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex size-9 items-center justify-center rounded-xl',
            'bg-linear-to-br from-primary to-accent shadow-[var(--shadow-glow-primary)]',
          )}
        >
          <Waves className="size-5 text-primary-foreground" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {tCommon('app.name')}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {tCommon('app.tagline')}
          </span>
        </div>
      </div>

      <div className="glass-divider mx-1 my-2" />

      <nav className="flex flex-col gap-1">
        {items.map(({ key, icon: Icon }) => {
          const isActive = key === activeKey
          return (
            <button
              key={key}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelect?.(key)}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5',
                'cursor-pointer text-sm transition-colors duration-200',
                isActive
                  ? cn(
                      'border border-white/15 bg-white/8 text-foreground',
                      'shadow-[var(--shadow-glow-primary)]',
                    )
                  : 'border border-transparent text-foreground/70 hover:bg-white/6 hover:text-foreground',
              )}
            >
              <Icon
                className={cn(
                  'size-4 transition-colors',
                  isActive ? 'text-primary' : 'text-foreground/60',
                )}
                aria-hidden="true"
              />
              <span className="font-medium">{t(`nav.${key}`)}</span>
              {isActive ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute right-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full',
                    'bg-primary shadow-[0_0_10px_var(--color-primary)]',
                  )}
                />
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto px-2 pb-1 pt-4 text-[10px] text-muted-foreground">
        <span>v0.1 • Aurora</span>
      </div>
    </aside>
  )
}
