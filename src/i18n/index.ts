import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en.json'
import ny from '../locales/ny.json'

export const SUPPORTED_LANGUAGES = ['en', 'ny'] as const
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]

function setHtmlLang(lng: string) {
  document.documentElement.lang = lng.startsWith('ny') ? 'ny' : 'en'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ny: { translation: ny },
    },
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: '265digitalagents-lang',
    },
  })
  .then(() => {
    setHtmlLang(i18n.language)
  })

i18n.on('languageChanged', (lng) => {
  setHtmlLang(lng)
})

export default i18n
