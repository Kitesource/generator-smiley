import { CommonNS } from '@/typings'

export default [
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
