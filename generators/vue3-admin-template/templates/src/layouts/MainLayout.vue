<template>
  <el-container class="h-screen">
    <!-- 侧边栏 -->
    <el-aside
      :width="isCollapse ? '64px' : '200px'"
      class="transition-all duration-300"
      style="background-color: var(--color-neutral-800)"
    >
      <div class="flex h-16 items-center justify-center bg-neutral-900 text-xl font-bold text-white">
        <el-icon :size="24" class="mr-2">
          <Apple />
        </el-icon>
        <span v-show="!isCollapse"> 后台管理系统</span>
      </div>
      <aside-menu :is-collapse="isCollapse" />
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="flex items-center justify-between bg-white px-4 shadow-sm">
        <div class="flex items-center">
          <el-icon class="cursor-pointer" :size="20" @click="toggleCollapse">
            <Fold v-show="!isCollapse" />
            <Expand v-show="isCollapse" />
          </el-icon>
          <el-breadcrumb separator="/" class="ml-4">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">
              {{ item.meta?.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex items-center">
          <LanguageSwitcher class="mr-4" />
          <el-dropdown>
            <div class="flex cursor-pointer items-center">
              <el-avatar :src="userInfo.avatar" />
              <span class="ml-2">{{ userInfo.username }}</span>
              <el-icon class="ml-1"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容区域 -->
      <el-main class="bg-gray-100 p-4">
        <router-view v-slot="{ Component, route }">
          <transition :name="transitionName" mode="out-in" appear>
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand, ArrowDown, Apple } from '@element-plus/icons-vue'
import { mockUserInfo } from '@/configs'
import { CommonNS } from '@/typings'
import AsideMenu from './components/AsideMenu.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

// 菜单折叠状态
const isCollapse = ref(false)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 当前激活的菜单
const route = useRoute()
const router = useRouter()

// 面包屑导航
const breadcrumbList = ref<Array<{ path: string; meta?: { title?: string } }>>([])

// 动画名称
const transitionName = ref('slide-fade')

// 监听路由变化，更新面包屑
watch(
  () => route.path,
  (newPath) => {
    updateBreadcrumb(newPath)
    // 根据路由层级决定动画方向
    const depth = newPath.split('/').length
    transitionName.value = depth % 2 === 0 ? 'slide-left' : 'slide-right'
  },
  { immediate: true },
)

// 更新面包屑导航
function updateBreadcrumb(path: string) {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  breadcrumbList.value = matched
}

// 用户信息
const userInfo = ref<CommonNS.UserInfo>(mockUserInfo)
</script>

<style scoped>
/* MainLayout组件的样式 */

/* 路由过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
