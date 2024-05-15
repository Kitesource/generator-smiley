<template>
  <aside class="absolute left-0 z-10">
    <Sidebar class="sidebar" header-height="60px" />
  </aside>

  <main class="main bg-white">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store'

const commonStore = useCommonStore()

const sidebarWidth = computed(() =>
  commonStore.expandSidebar ? '250px' : '60px',
)
</script>

<style lang="scss" scoped>
.sidebar {
  width: v-bind(sidebarWidth);
  transition: linear 300ms;
}

.main {
  @apply relative flex h-screen flex-1 flex-col;
  padding-left: v-bind(sidebarWidth);
}
</style>
