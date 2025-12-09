import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  //
  next()
})

/** 使用vue-router */
export function useRouter(app: App): void {
  app.use(router)
}

export default router
