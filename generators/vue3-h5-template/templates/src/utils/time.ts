import dayjs from 'dayjs'

const defaultFormat = 'YYYY-MM-DD'

/**
 * 日期格式化
 * @param time 日期参数
 * @param format? [default=YYYY-MM-DD] 格式化字符串
 */
export function formatDate(time: string, format?: string) {
  const dayTime = dayjs(time)
  return dayTime.isValid() ? dayTime.format(format || defaultFormat) : time
}
