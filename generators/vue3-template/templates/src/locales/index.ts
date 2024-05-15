import { commonEN, commonZH } from './common'
import { errorsEN, errorsZH } from './errors'

import { CommonNS } from '@/typings'

export default {
  [CommonNS.Language.EN]: {
    ...commonEN,
    ...errorsEN,
  },
  [CommonNS.Language.ZH]: {
    ...commonZH,
    ...errorsZH,
  },
}
