<template>
  <div class="flex h-screen flex-col justify-start bg-brand-700">
    <div class="sidebar-header">
      <div v-if="commonStore.expandSidebar" class="flex gap-2">
        <img src="@/assets/logo.svg" alt="Logo" class="h-6" />
      </div>
      <div
        class="flex items-center justify-center"
        :class="{ 'w-full': !commonStore.expandSidebar }"
        @click="
          commonStore.setState('expandSidebar', !commonStore.expandSidebar)
        "
      >
        <el-icon size="20" class="cursor-pointer opacity-75 hover:opacity-100">
          <Expand v-if="commonStore.expandSidebar" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>

    <el-scrollbar noresize>
      <div />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { useCommonStore } from '@/store'

interface Props {
  headerHeight: string
}
defineProps<Props>()

const commonStore = useCommonStore()
</script>

<style lang="scss" scoped>
.sidebar-header {
  @apply z-50 flex items-center justify-between p-4 text-white shadow-md;
  min-height: v-bind(headerHeight);
}
</style>
