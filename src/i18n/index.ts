import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonZh from './locales/zh/common.json'
import dashboardZh from './locales/zh/dashboard.json'
import commonEn from './locales/en/common.json'
import dashboardEn from './locales/en/dashboard.json'

export const defaultNS = 'common'
export const resources = {
  zh: { common: commonZh, dashboard: dashboardZh },
  en: { common: commonEn, dashboard: dashboardEn },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    defaultNS,
    interpolation: { escapeValue: false },
  })

export default i18n
