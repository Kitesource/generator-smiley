import { CommonNS } from '@/typings'
import { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

/** 路由信息 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/index',
    children: [
      // 欢迎页
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index.vue'),
        meta: { title: '欢迎页', icon: 'House' },
      },
      // 仪表盘
      {
        path: '/dashboard',
        name: 'Dashboard',
        redirect: '/dashboard/overview',
        meta: { title: '仪表盘', icon: 'Odometer' },
        children: [
          {
            path: 'overview',
            name: 'DashboardOverview',
            component: () => import('@/views/dashboard/Overview.vue'),
            meta: { title: '概览', icon: 'DataBoard' },
          },
          {
            path: 'analysis',
            name: 'DashboardAnalysis',
            component: () => import('@/views/dashboard/Analysis.vue'),
            meta: { title: '数据分析', icon: 'DataAnalysis' },
          },
        ],
      },
      // 用户管理
      {
        path: '/user',
        name: 'User',
        redirect: '/user/list',
        meta: { title: '用户管理', icon: 'User' },
        children: [
          {
            path: 'list',
            name: 'UserList',
            component: () => import('@/views/user/List.vue'),
            meta: { title: '用户列表', icon: 'UserFilled' },
          },
          {
            path: 'role',
            name: 'UserRole',
            component: () => import('@/views/user/Role.vue'),
            meta: { title: '角色管理', icon: 'Avatar' },
          },
        ],
      },
      // 系统管理
      {
        path: '/system',
        name: 'System',
        redirect: '/system/menu',
        meta: { title: '系统管理', icon: 'Setting' },
        children: [
          {
            path: 'menu',
            name: 'SystemMenu',
            component: () => import('@/views/system/Menu.vue'),
            meta: { title: '菜单管理', icon: 'Menu' },
          },
          {
            path: 'log',
            name: 'SystemLog',
            component: () => import('@/views/system/Log.vue'),
            meta: { title: '系统日志', icon: 'Document' },
          },
          {
            path: 'config',
            name: 'SystemConfig',
            component: () => import('@/views/system/Config.vue'),
            meta: { title: '系统配置', icon: 'Tools' },
          },
        ],
      },
    ],
  },
  {
    name: CommonNS.ErrorRouter.FORBIDDEN,
    path: '/403',
    component: () => import('@/views/common/Forbidden.vue'),
  },
  {
    name: CommonNS.ErrorRouter.NOTFOUND,
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/common/NotFound.vue'),
  },
]

export default routes
