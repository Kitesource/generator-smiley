import { useEffect, useState } from 'react'

/**
 * 防抖Hook
 * @param value 需要防抖的值
 * @param delay 延迟时间(ms)
 * @returns 防抖后的值
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 设置定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清除定时器
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
