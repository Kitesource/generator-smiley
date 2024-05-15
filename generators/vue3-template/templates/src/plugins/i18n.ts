import { createI18n } from 'vue-i18n'
import messages from '@/locales'
import { CommonNS } from '@/typings'
import { APP_LANGUAGE } from '@/configs/common'

interface Locale {
  [key: string]: Record<string, any>
}

function getLocale(lang: CommonNS.Language, lcs: Locale): Locale {
  let locale: Locale = {}

  if (Object.prototype.hasOwnProperty.call(lcs, lang)) {
    locale = lcs[lang]
  } else {
    Object.keys(lcs).forEach((key: string) => {
      locale[key] = getLocale(lang, lcs[key])
    })
  }

  return locale
}

const userLanguage = navigator.language.match(/^en/i)
  ? CommonNS.Language.EN
  : CommonNS.Language.ZH
const supportLanguages: string[] = Object.values(CommonNS.Language)
const browserLanguage = supportLanguages.includes(userLanguage)
  ? userLanguage
  : CommonNS.Language.ZH
const localLanguage = localStorage.getItem(APP_LANGUAGE)

const i18n = createI18n({
  legacy: false,
  locale: localLanguage || browserLanguage,
  fallbackLocale: CommonNS.Language.ZH,
  messages: {
    [CommonNS.Language.EN]: getLocale(CommonNS.Language.EN, messages),
    [CommonNS.Language.ZH]: getLocale(CommonNS.Language.ZH, messages),
  },
})

export default i18n

// @ts-ignore
export const $t = i18n.global.t
