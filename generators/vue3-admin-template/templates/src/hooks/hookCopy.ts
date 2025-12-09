import ClipboardJS from 'clipboard'
import { hookNotify } from '@/hooks'
import { i18n } from '@/plugins/i18n'

const { t } = i18n.global
export default function (target: string, config?: ClipboardJS.Options & { onSuccess?: () => void }) {
  const { onSuccess } = config || {}
  const clipboard = new ClipboardJS(target, { ...config })

  clipboard.on('success', () => {
    if (onSuccess && onSuccess instanceof Function) {
      onSuccess()
    } else {
      hookNotify.successMessage(t('page.copy_success'))
    }
  })

  clipboard.on('error', (error) => {
    hookNotify.errorMessage(t('page.copy_failed'))
    console.error('复制失败', error)
  })

  return clipboard
}
