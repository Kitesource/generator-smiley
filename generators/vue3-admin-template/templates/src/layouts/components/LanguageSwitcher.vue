<template>
  <el-dropdown @command="handleLanguageChange">
    <div class="flex cursor-pointer items-center rounded-sm px-2">
      <svg-icon size="20" svg-name="global"></svg-icon>
      <span class="ml-2">{{ currentLanguageLabel }}</span>
      <el-icon class="ml-1"><ArrowDown /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-CN" :class="{ 'text-primary!': currentLanguage === 'zh-CN' }">
          简体中文
        </el-dropdown-item>
        <el-dropdown-item command="en" :class="{ 'text-primary!': currentLanguage === 'en' }">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const { locale, t } = useI18n()

const currentLanguage = computed(() => locale.value)

const currentLanguageLabel = computed(() => {
  return currentLanguage.value === 'zh-CN' ? '简体中文' : 'English'
})

const handleLanguageChange = (lang: string) => {
  locale.value = lang
  // 存储到本地存储
  localStorage.setItem('language', lang)
}
</script>

<style scoped>
.language-switcher {
  padding: 0 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.is-active {
  color: var(--el-color-primary);
}
</style>
