import { CommonNS } from '@/typings'

export default [
  {
    path: '/',
    redirect: { name: CommonNS.LayoutRouter.DASHBOARD },
  },
  {
    name: CommonNS.LayoutRouter.DASHBOARD,
    path: '/dashboard',
    component: () => import('@/layouts/Layout.vue'),
    redirect: {
      name: CommonNS.DashboardRouter.HOME,
    },
    children: [
      {
        name: CommonNS.DashboardRouter.HOME,
        path: CommonNS.DashboardRouter.HOME,
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
]
