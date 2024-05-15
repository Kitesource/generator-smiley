import $day from 'dayjs'

const defaultFormat = 'YYYY-MM-DD'

/**
 * 日期格式化
 * @param time 日期参数
 * @param format? [default=YYYY-MM-DD] 格式化字符串
 */
export function formatDate(time: string, format?: string) {
  const dayTime = $day(time)
  return dayTime.isValid() ? dayTime.format(format || defaultFormat) : time
}

/**
 * 计算两日期的天数差
 * @param start 被减日期参数
 * @param end 日期参数
 */
export function daysDifference(start: string, end: string) {
  const diff = $day(end).diff($day(start), 'd', true)
  return diff < 1 ? 0 : Math.ceil(diff)
}
