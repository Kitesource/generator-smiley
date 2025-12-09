import { CommonNS } from '#/common.d'
import { APP_LANGUAGE } from '@/configs/common'
import { createI18n } from 'vue-i18n'

export function getLocales() {
  const modules: Record<string, any> = import.meta.glob('./locales/*.json', { eager: true })
  const langs: Record<string, any> = {}

  for (const path in modules) {
    const name = path.replace(/(\.\/locales\/|\.json)/g, '')
    langs[name] = modules[path].default
  }
  return langs
}

const userLanguage = navigator.language.match(/^en/i) ? CommonNS.Language.EN : CommonNS.Language.ZH
const browserLanguage = Object.values(CommonNS.Language).includes(userLanguage) ? userLanguage : CommonNS.Language.ZH
const localLanguage = localStorage.getItem(APP_LANGUAGE)

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: localLanguage || browserLanguage,
  fallbackLocale: CommonNS.Language.ZH,
  messages: getLocales(),
})

export function setLang(locale?: string) {
  if (locale) {
    localStorage.setItem(APP_LANGUAGE, locale)
  }
  i18n.global.locale.value = locale || localStorage.getItem(APP_LANGUAGE) || ''
}
