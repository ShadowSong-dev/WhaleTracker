import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Activity, Bell, Coins, Waves } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Topbar } from '@/components/Topbar/Topbar'
import { StatCard } from '@/components/StatCard/StatCard'
import { GlassCard } from '@/components/GlassCard/GlassCard'
import { Button } from '@/components/ui/button'

type NavKey = 'overview' | 'whales' | 'transactions' | 'alerts' | 'settings'

/** Main monitoring dashboard page. */
export default function Dashboard() {
  const { t } = useTranslation('dashboard')
  const { t: tCommon } = useTranslation('common')
  const [activeNav, setActiveNav] = useState<NavKey>('overview')

  return (
    <main
      className="mx-auto flex w-full max-w-[1440px] flex-1 gap-4 p-4 md:p-6"
      data-slot="dashboard"
    >
      <Sidebar activeKey={activeNav} onSelect={setActiveNav} />

      <div className="flex flex-1 flex-col gap-4">
        <Topbar />

        <section
          aria-labelledby="dashboard-overview-title"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 px-1">
            <div>
              <h1
                id="dashboard-overview-title"
                className="text-2xl font-semibold tracking-tight text-foreground"
              >
                {t('nav.overview')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {tCommon('app.tagline')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label={t('metrics.trackedWhales')}
              value="128"
              icon={<Waves className="size-5" />}
              trend={3.2}
              trendLabel={t('metrics.trendUp', { value: '3.2' })}
              emphasis
            />
            <StatCard
              label={t('metrics.alertsToday')}
              value="42"
              icon={<Bell className="size-5" />}
              trend={-8.1}
              trendLabel={t('metrics.trendDown', { value: '8.1' })}
            />
            <StatCard
              label={t('metrics.totalVolume')}
              value="$1.27M"
              icon={<Activity className="size-5" />}
              trend={12.4}
              trendLabel={t('metrics.trendUp', { value: '12.4' })}
            />
            <StatCard
              label={t('metrics.activeTokens')}
              value="36"
              icon={<Coins className="size-5" />}
            />
          </div>
        </section>

        <section
          aria-labelledby="dashboard-panels-title"
          className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]"
        >
          <h2 id="dashboard-panels-title" className="sr-only">
            {t('panels.liveFeed')}
          </h2>

          <GlassCard className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {t('panels.liveFeed')}
              </h3>
              <Button variant="ghost" size="sm">
                {tCommon('actions.viewAll')}
              </Button>
            </div>
            <div className="glass-divider" />
            <div className="flex min-h-72 flex-1 items-center justify-center text-sm text-muted-foreground">
              {t('panels.empty')}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {t('panels.topWhales')}
              </h3>
              <Button variant="ghost" size="sm">
                {tCommon('actions.viewAll')}
              </Button>
            </div>
            <div className="glass-divider" />
            <div className="flex min-h-72 flex-1 items-center justify-center text-sm text-muted-foreground">
              {t('panels.empty')}
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  )
}
