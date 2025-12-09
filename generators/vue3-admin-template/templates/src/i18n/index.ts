import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import enLocale from 'element-plus/es/locale/lang/en'
import locales from './modules'

interface Locale {
  [key: string]: Record<string, unknown>
}

function getLocale(lang: string, lcs: Locale): Locale {
  let locale = {} as Locale
  if (Object.prototype.hasOwnProperty.call(lcs, lang)) {
    locale = lcs[lang] as Locale
  } else {
    Object.keys(lcs).forEach((key: string) => {
      locale[key] = getLocale(lang, lcs[key] as Locale)
    })
  }
  return locale
}

const supportedLanguages = ['zh-CN', 'en']
const userLocale = navigator.language.match(/^en/i) ? 'en' : 'zh-CN'
const browserLanguage = supportedLanguages.includes(userLocale) ? userLocale : 'zh-CN'

export const i18n = createI18n({
  legacy: false, // to use Composition API
  warnHtmlInMessage: 'off',
  locale: browserLanguage,
  messages: {
    'zh-CN': {
      el: zhLocale.el,
      ...getLocale('zh-CN', locales),
    },
    en: {
      el: enLocale.el,
      ...getLocale('en', locales),
    },
  },
})

export default (app: App): void => {
  app.use(i18n)
}
