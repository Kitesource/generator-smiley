import { ElMessage } from 'element-plus'

import type { ElementNS } from '@/typings'

export default {
  message(type: ElementNS.MessageType, message: string, showClose = true, duration = 1500) {
    return ElMessage({
      type,
      message,
      showClose,
      duration,
    })
  },
  errorMessage(message: string, showClose = true, duration = 1500, offset = 20) {
    return ElMessage({
      type: 'error',
      message,
      showClose,
      offset,
      duration,
    })
  },
  successMessage(message: string, showClose = true, duration = 1500) {
    ElMessage({
      type: 'success',
      message,
      showClose,
      duration,
    })
  },
  warnMessage(message: string, showClose = true, duration = 1500) {
    ElMessage({
      type: 'warning',
      message,
      showClose,
      duration,
    })
  },
}
