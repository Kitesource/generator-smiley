import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import CommonRoutes from './routes/common'
import ExceptionRoutes from './routes/exception'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const routes: Array<RouteRecordRaw> = [...CommonRoutes, ...ExceptionRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((_, __, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
