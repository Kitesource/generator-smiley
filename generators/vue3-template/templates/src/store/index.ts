/* eslint-disable no-param-reassign */
import { createPinia } from 'pinia'

import { cloneJSON } from '@/utils/util'

const pinia = createPinia()

pinia.use(({ store }) => {
  type State = typeof store.$state
  store.setState = <T extends keyof State>(key: T, value: State[T]) => {
    store.$state[key] = typeof value === 'object' ? cloneJSON(value) : value
  }
})

export { useCommonStore } from './module/common'

export default pinia
