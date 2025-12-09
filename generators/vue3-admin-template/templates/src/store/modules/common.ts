import { defineStore } from 'pinia'
import { Common, CommonNS } from '@/typings'
import { APP_LANGUAGE } from '@/configs/common'

export const useCommonStore = defineStore(Common.name, {
  state: (): Common.State => ({
    locale: CommonNS.Language.ZH,
  }),
  actions: {
    updateLanguage(lang: CommonNS.Language) {
      this.locale = lang
      localStorage.setItem(APP_LANGUAGE, lang)
    },
  },
})
