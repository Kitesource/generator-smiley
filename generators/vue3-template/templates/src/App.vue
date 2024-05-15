<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { CommonNS } from '@/typings'

const { locale } = useI18n()

const elementLocale = computed(() =>
  locale.value === CommonNS.Language.EN ? en : zh,
)
</script>
