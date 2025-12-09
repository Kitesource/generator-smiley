<template>
  <van-nav-bar :title="$t($route.meta.title as string)" :left-arrow="!tabbarVisible" @click-left="goBack">
    <template #left>
      <SvgIcon svg="dog" :size="20" />
    </template>
    <template #right>
      <div class="btn-wrap">
        <van-button shape="square" size="small" type="default" @click="changeLang()">
          {{ locale === CommonNS.Language.EN ? 'En' : '中文' }}
        </van-button>
      </div>
    </template>
  </van-nav-bar>
  <div class="main-page" :class="{ tabbar: tabbarVisible, ['px-8']: showBorder }">
    <RouterView v-if="$route.meta.keepAlive" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
  <van-tabbar v-show="tabbarVisible" v-model="activeTab" fixed @change="tabSwitch">
    <van-tabbar-item v-for="item in tabItem" :key="item.key" :tab-title="$t(`tabbar.${item.key}`)" :icon="item.icon" />
  </van-tabbar>
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useI18n } from 'vue-i18n'
  import { setLang } from '@/i18n'
  import { useRouter } from 'vue-router'
  import { CommonNS } from '#/common.d'

  const { locale } = useI18n()
  const changeLang = () => {
    setLang(locale.value === CommonNS.Language.EN ? CommonNS.Language.ZH : CommonNS.Language.EN)
  }

  const tabItem = [
    { key: 'home', icon: 'home-o' },
    { key: 'list', icon: 'search' },
    { key: 'member', icon: 'friends-o' },
    { key: 'demo', icon: 'setting-o' },
  ]

  const router = useRouter()

  const activeTab = ref(0)

  const tabbarVisible = ref(true)

  const showBorder = ref(true)

  watch(
    () => router,
    () => {
      const judgeRoute = tabItem.some((item) => item.key === router.currentRoute.value.path.replace('/', ''))
      activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''))
      tabbarVisible.value = judgeRoute
      showBorder.value = judgeRoute
    },
    { deep: true, immediate: true },
  )

  const tabSwitch = (index: number) => {
    switch (index) {
      case 0:
        router.push('/home')
        break
      case 1:
        router.push('/list')
        break
      case 2:
        router.push('/member')
        break
      case 3:
        router.push('/demo')
        break
    }
    activeTab.value = index
  }

  const goBack = () => {
    router.go(-1)
  }
</script>

<style scoped lang="scss">
  .main-page {
    box-sizing: border-box;
    height: calc(100vh - 92px);
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .tabbar {
    height: calc(100vh - 92px);
    padding-bottom: 100px;
  }
</style>
