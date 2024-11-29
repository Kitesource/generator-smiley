import { isNaN } from 'lodash-es'

/**
 * JSON 深拷贝
 * @param target 拷贝目标
 */
export function cloneJSON<T>(target: T): T {
  return JSON.parse(JSON.stringify(target))
}

/**
 * JSON 值相等判断
 * @param target1 比较目标一
 * @param target2 比较目标二
 */
export function isEqualJSON<T, K>(target1: T, target2: K): boolean {
  return JSON.stringify(target1) === JSON.stringify(target2)
}

/**
 * add common
 * @param val origin value
 * @return value with separator
 */
export function addCommon(val: string) {
  const int = parseInt(val, 10)
  const idx = val.indexOf('.')
  const formattedInt = String(int)
    .split('')
    .reverse()
    .map((c, id) => (id !== 0 && (id + 1) % 3 === 0 && id !== String(int).length - 1 ? `,${c}` : c))
    .reverse()
    .join('')

  return idx !== -1 ? formattedInt.concat(val.slice(idx)) : formattedInt
}

/**
 * format number
 * val < 1000 -> val
 * val >= 1000 -> (val/1000)k
 * @param val origin number
 * @param digits controls decimal places
 */
export function numFormat(val: any, digits = 0) {
  let num = val
  if (typeof num !== 'number') {
    num = Number(num)
  }
  if (isNaN(num)) return val

  const absoluteVal = Math.abs(num)
  const isNegative = num < 0
  let result = ''
  let suffix = ''

  if (absoluteVal < 10 * 1000) result = absoluteVal.toFixed(digits)
  else {
    result = Number(absoluteVal / 10000).toFixed(0)
    suffix = 'w'
  }

  result = addCommon(result)
  return `${isNegative ? '-' : ''}${result}${suffix}`
}
