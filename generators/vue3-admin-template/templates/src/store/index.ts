import { createPinia } from 'pinia'
import router from '@/router'
import { cloneJSON } from '@/utils/util'

const pinia = createPinia()

pinia.use(({ store }) => {
  type State = typeof store.$state

  store.router = markRaw(router)

  store.setState = <T extends keyof State>(key: T, value: State[T]) => {
    store.$state[key] = typeof value === 'object' ? cloneJSON(value) : value
  }

  store.updateState = <T extends keyof State>(key: T, value: Partial<State[T]>) => {
    store.$state[key] = cloneJSON({
      ...store.$state[key],
      ...value,
    })
  }
})

export { useCommonStore } from './modules/common'

export default pinia
