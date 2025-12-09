import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 导入翻译资源
import zhCN from './locales/zh-CN'
import en from './locales/en'

const resources = {
  en: {
    translation: en
  },
  'zh-CN': {
    translation: zhCN
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-CN', // 默认语言
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false // React 已经处理了转义
    }
  })

export default i18n
