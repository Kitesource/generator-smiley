/*
 * @Author: wangqian
 * @Date: 2022-03-29 14:10:52
 * @LastEditTime: 2024-11-25 11:23:03
 * @LastEditors: 王迁 wangqian@gwell.cc
 * @Description: 国际化翻译处理
 * @FilePath: /codeguide/Vue_2.x_Demo/src/util/i18n.js
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './lang/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // 设置语言环境
  fallbackLocale: 'en',
  messages: {
    en
  }, // 设置语言环境信息
  silentFallbackWarn: true,
  silentTranslationWarn: true
})

const loadedLanguages = ['en'] // 我们的预装默认语言

function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}.js`).then((messages) => {
    i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}

export default i18n
