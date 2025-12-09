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
