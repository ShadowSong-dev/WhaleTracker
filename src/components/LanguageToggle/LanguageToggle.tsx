import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Toggles between Chinese and English locales. */
export function LanguageToggle() {
  const { i18n, t } = useTranslation('common')
  const isZh = i18n.resolvedLanguage === 'zh'

  const handleToggle = () => {
    void i18n.changeLanguage(isZh ? 'en' : 'zh')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      aria-label={t('lang.label')}
    >
      <Languages aria-hidden="true" />
      <span className="font-medium">{isZh ? 'EN' : '中文'}</span>
    </Button>
  )
}
