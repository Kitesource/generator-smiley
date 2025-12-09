import $day from 'dayjs'
import utc from 'dayjs/plugin/utc'

$day.extend(utc)

const defaultFmt = 'YYYY-MM-DD'

/**
 * 日期格式化
 * @param time 日期参数
 * @param format? [default=YYYY-MM-DD] 格式化字符串
 */
export function formatDate(time: string, format?: string) {
  const dayTime = $day(time)
  return dayTime.isValid() ? dayTime.format(format || defaultFmt) : time
}

/**
 * 日期零时区格式化
 * @param time 日期参数
 */
export function formatUTCZeroDate(time: string) {
  const dayTime = $day(time)
  return dayTime.isValid() ? `${dayTime.format('YYYY-MM-DD')}T00:00:00Z` : time
}

/**
 * 转换日期参数为本地时区时间
 * @param time 日期参数
 * @param format? 格式化字符串
 */
export function convertUTCToLocal(time: string | Date, format?: string) {
  if (!time || !$day(time).isValid()) {
    return time
  }
  const utcTime = $day.utc(time).toDate()
  return $day(utcTime).format(format || defaultFmt)
}
