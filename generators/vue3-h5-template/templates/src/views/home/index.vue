<template>
  <header class="header">
    <span> {{ $t('title') }}</span>
  </header>
  <van-cell-group :title="$t('home.support')" class="supportList">
    <van-cell v-for="(item, index) in cellList" :key="index" :value="item">
      <template #title>
        <van-icon name="fire-o" color="#ee0a24" />
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group :title="$t('home.cssMultiLanguage')" class="supportList">
    <van-cell>
      <div :class="['btn-confirm', locale]"></div>
    </van-cell>
  </van-cell-group>
</template>

<script lang="ts" setup name="HomePage">
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const cellList = [
    'vue3',
    'vite',
    'vue-router',
    'axios',
    'Pinia',
    'vue-i18n',
    'postcss-px-to-viewport',
    'vant',
    'eruda',
  ]
</script>
<style lang="scss">
  @use '@/styles/mixin.scss' as *;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 40px;

    img {
      width: 90px;
      height: 90px;
    }
  }

  .intro-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 24px;
  }

  .supportList {
    margin: 0 16px;
  }

  .btn-wrap {
    margin: 20px;
  }

  .btn-confirm {
    @include main-lang-bg(302px, 82px, '@/assets/button', 'confirm.png');
  }
</style>
