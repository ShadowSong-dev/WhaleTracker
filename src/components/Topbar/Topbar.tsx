import { useTranslation } from 'react-i18next'
import { Plus, Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { cn } from '@/lib/utils'

/** Props for Topbar. */
export interface TopbarProps {
  /** Triggered when the import-CSV button is clicked. */
  onImportCsv?: () => void
  /** Triggered when the primary "Add whale" button is clicked. */
  onAddWhale?: () => void
}

/** Top horizontal app bar: brand status + search + locale + primary CTA. */
export function Topbar({ onImportCsv, onAddWhale }: TopbarProps) {
  const { t } = useTranslation('dashboard')
  const { t: tCommon } = useTranslation('common')

  return (
    <header
      data-slot="topbar"
      className={cn(
        'glass-panel flex w-full items-center gap-3 rounded-2xl px-4 py-3',
      )}
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            'relative inline-flex size-2 rounded-full bg-success',
            'before:absolute before:inset-0 before:rounded-full before:bg-success before:animate-ping before:opacity-60',
          )}
        />
        <span className="text-xs font-medium tracking-wide text-foreground/80 uppercase">
          {tCommon('status.live')}
        </span>
      </div>

      <label
        className={cn(
          'group flex flex-1 items-center gap-2 rounded-xl border border-white/12 px-3 py-2',
          'bg-white/4 backdrop-blur transition-colors focus-within:border-white/25 focus-within:bg-white/8',
        )}
      >
        <Search
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">{t('header.search')}</span>
        <input
          type="search"
          placeholder={t('header.search')}
          className={cn(
            'w-full bg-transparent text-sm text-foreground outline-none',
            'placeholder:text-muted-foreground/80',
          )}
        />
      </label>

      <div className="flex items-center gap-2">
        <LanguageToggle />

        <Button variant="secondary" size="sm" onClick={onImportCsv}>
          <Upload aria-hidden="true" />
          <span className="hidden sm:inline">{tCommon('actions.import')}</span>
        </Button>

        <Button variant="primary" size="sm" onClick={onAddWhale}>
          <Plus aria-hidden="true" />
          <span>{t('header.addWhale')}</span>
        </Button>
      </div>
    </header>
  )
}
