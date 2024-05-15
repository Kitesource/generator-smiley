import 'pinia'

import type { CommonNS } from '@/typings/common'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface PiniaCustomProperties<Id, S> {
    setState: <T extends keyof S>(state: T, value: S[T]) => void
  }
}

// module[common]
export namespace Common {
  export const name = 'common'
  export interface State {
    locale: CommonNS.Language
    expandSidebar: boolean
  }
}

// module[controller]
export namespace Controller {
  export const name = 'controller'
  export interface State {
    controllers: AbortController[]
  }
}
