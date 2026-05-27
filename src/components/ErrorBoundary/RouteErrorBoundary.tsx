import { useRouteError, isRouteErrorResponse } from 'react-router'
import { useTranslation } from 'react-i18next'
import { GlassCard } from '@/components/GlassCard/GlassCard'
import { Button } from '@/components/ui/button'

/** Renders friendly error UI when a route load or render fails. */
export function RouteErrorBoundary() {
  const error = useRouteError()
  const { t } = useTranslation('common')

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Unexpected error'

  const detail =
    isRouteErrorResponse(error)
      ? typeof error.data === 'string'
        ? error.data
        : ''
      : error instanceof Error
        ? error.message
        : ''

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div
      role="alert"
      className="flex min-h-svh items-center justify-center p-6"
    >
      <GlassCard tone="strong" className="max-w-md p-6">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {detail ? (
          <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        ) : null}
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={handleReload}>
            {t('actions.refresh')}
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
