import { useEffect, useRef, useState } from 'react'

/**
 * 节流Hook
 * @param value 需要节流的值
 * @param delay 延迟时间(ms)
 * @returns 节流后的值
 */
export const useThrottle = <T>(value: T, delay: number = 300): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdateTime = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 如果距离上次更新时间小于delay，设置定时器
    if (Date.now() - lastUpdateTime.current < delay) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        lastUpdateTime.current = Date.now()
        setThrottledValue(value)
      }, delay)
    } else {
      // 否则立即更新
      lastUpdateTime.current = Date.now()
      setThrottledValue(value)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return throttledValue
}
