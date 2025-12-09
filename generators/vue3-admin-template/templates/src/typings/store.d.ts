import { CommonNS } from './common.d'

export namespace Common {
  export const name = 'common'
  export interface State {
    locale: CommonNS.Language
  }
}
