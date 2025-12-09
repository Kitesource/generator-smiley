<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      class="w-full border-none"
      popper-class="aside-menu-popper"
      style="background-color: var(--color-neutral-800)"
      :collapse="isCollapse"
      :unique-opened="true"
      router
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="menu in projectMenuList" :key="menu.id">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
          <template #title>
            <el-icon v-if="menu.icon">
              <component :is="iconMap[menu.icon as keyof typeof iconMap]" />
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="child in menu.children" :key="child.id">
            <el-sub-menu v-if="child.children && child.children.length > 0" :index="child.path">
              <template #title>
                <el-icon v-if="child.icon">
                  <component :is="iconMap[child.icon as keyof typeof iconMap]" />
                </el-icon>
                <span>{{ child.name }}</span>
              </template>
              <el-menu-item v-for="grandChild in child.children" :key="grandChild.id" :index="grandChild.path">
                <el-icon v-if="grandChild.icon">
                  <component :is="iconMap[grandChild.icon as keyof typeof iconMap]" />
                </el-icon>
                <template #title>{{ grandChild.name }}</template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="child.path">
              <el-icon v-if="child.icon">
                <component :is="iconMap[child.icon as keyof typeof iconMap]" />
              </el-icon>
              <template #title>{{ child.name }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
          <el-icon v-if="menu.icon">
            <component :is="iconMap[menu.icon as keyof typeof iconMap]" />
          </el-icon>
          <template #title>{{ menu.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { CommonNS } from '@/typings'
import routes from '@/router/routes'
import {
  House,
  Odometer,
  DataBoard,
  DataAnalysis,
  User,
  UserFilled,
  Avatar,
  Setting,
  Menu,
  Document,
  Tools,
} from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    menusList?: CommonNS.MenuItem[]
    isCollapse: boolean
  }>(),
  {
    menusList: () => [],
  },
)

const route = useRoute()
const activeMenu = computed(() => route.path)

// 创建图标映射对象
const iconMap = {
  House,
  Odometer,
  DataBoard,
  DataAnalysis,
  User,
  UserFilled,
  Avatar,
  Setting,
  Menu,
  Document,
  Tools,
}

const projectMenuList = computed(() => (props.menusList.length > 0 ? props.menusList : generateMenuFromRoutes(routes)))

function generateMenuFromRoutes(routes: RouteRecordRaw[]): CommonNS.MenuItem[] {
  const menuItems: CommonNS.MenuItem[] = []

  // 查找主布局路由
  const mainLayoutRoute = routes.find((route) => route.path === '/')

  if (mainLayoutRoute && mainLayoutRoute.children) {
    // 遍历主布局路由的子路由
    mainLayoutRoute.children.forEach((route) => {
      // 只处理有meta.title的路由，这些是需要在菜单中显示的路由
      if (route.meta?.title) {
        const menuItem: CommonNS.MenuItem = {
          id: (route.name as string) || route.path,
          name: route.meta.title as string,
          path: route.path,
          icon: route.meta?.icon as string,
          children: [],
        }

        // 如果有子路由，递归处理
        if (route.children) {
          route.children.forEach((childRoute) => {
            if (childRoute.meta?.title) {
              const childMenuItem: CommonNS.MenuItem = {
                id: (childRoute.name as string) || childRoute.path,
                name: childRoute.meta.title as string,
                path: route.path + '/' + childRoute.path,
                icon: childRoute.meta?.icon as string,
              }

              // 处理三级菜单
              if (childRoute.children) {
                childMenuItem.children = []
                childRoute.children.forEach((grandChildRoute) => {
                  if (grandChildRoute.meta?.title) {
                    childMenuItem.children?.push({
                      id: (grandChildRoute.name as string) || grandChildRoute.path,
                      name: grandChildRoute.meta.title as string,
                      path: route.path + '/' + childRoute.path + '/' + grandChildRoute.path,
                      icon: grandChildRoute.meta?.icon as string,
                    })
                  }
                })
              }

              menuItem.children?.push(childMenuItem)
            }
          })
        }

        menuItems.push(menuItem)
      }
    })
  }

  return menuItems
}
</script>

<style scoped lang="scss">
:deep() {
  .el-menu {
    border-right: none;
  }

  .el-menu-item,
  .el-sub-menu__title {
    height: 50px;
    line-height: 50px;
  }

  .el-menu-item.is-active {
    background-color: var(--color-brand-500) !important;
    color: #fff !important;
  }

  /* 菜单项hover样式 */
  .el-menu-item:hover,
  .el-sub-menu__title:hover {
    background-color: var(--color-neutral-700) !important;
  }

  .el-sub-menu.is-active .el-sub-menu__title {
    color: var(--color-brand-400) !important;
  }

  /* 确保菜单项图标和文字的样式 */
  .el-menu-item .el-icon,
  .el-sub-menu__title .el-icon {
    margin-right: 10px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  /* 折叠状态下的样式 */
  .el-menu--collapse .el-menu-item .el-icon,
  .el-menu--collapse .el-sub-menu__title .el-icon {
    margin-right: 0;
  }

  /* 二级菜单背景色 */
  .el-sub-menu .el-menu {
    background-color: var(--color-neutral-800) !important;
  }

  /* 二级菜单项样式 */
  .el-sub-menu .el-menu-item {
    background-color: var(--color-neutral-800) !important;
    color: #fff !important;
  }

  /* 二级菜单项hover样式 */
  .el-sub-menu .el-menu-item:hover {
    background-color: var(--color-neutral-700) !important;
  }

  /* 二级菜单选中项样式 */
  .el-sub-menu .el-menu-item.is-active {
    background-color: var(--color-brand-500) !important;
    color: #fff !important;
  }
}
</style>
<style lang="scss">
/* 折叠状态下弹出菜单的样式 */
.aside-menu-popper {
  background-color: var(--color-neutral-800) !important;
}
.aside-menu-popper .el-menu--popup {
  padding: 0;
}

.aside-menu-popper .el-menu-item {
  background-color: var(--color-neutral-800) !important;
  color: #fff !important;
}

.aside-menu-popper .el-menu-item:hover {
  background-color: var(--color-neutral-700) !important;
}

.aside-menu-popper .el-menu-item.is-active {
  background-color: var(--color-brand-500) !important;
  color: #fff !important;
}

.aside-menu-popper .el-sub-menu__title {
  background-color: var(--color-neutral-800) !important;
  color: #fff !important;
}

.aside-menu-popper .el-sub-menu__title:hover {
  background-color: var(--color-neutral-700) !important;
}
</style>
