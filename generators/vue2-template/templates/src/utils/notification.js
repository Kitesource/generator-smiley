// utils/notification.js

// 默认配置
const DEFAULT_OPTIONS = {
  title: '新消息通知', // 默认标题
  body: '您有新的未读消息，请及时处理', // 默认内容
  timeout: 0, // 默认5秒后自动关闭
  silent: false, // 默认有提示音
  data: {}, // any
  requireInteraction: false // 不自动关闭通知 默认值为false，通知会在三四秒之后自动关闭
}

var currentNotification = null

/**
 * 显示浏览器通知
 * @param {Object} options - 通知配置
 * @param {Function} callbacks - 回调函数集合
 * @returns {Notification|null} 通知实例
 */
export const showNotification = (options = {}, callbacks = {}) => {
  // 1. 检测浏览器支持
  if (!('Notification' in window)) {
    console.error('当前浏览器不支持桌面通知功能')
    return null
  }

  // 2. 合并配置
  const config = { ...DEFAULT_OPTIONS, ...options }

  // 3. 处理权限
  if (Notification.permission === 'granted') {
    return createNotification(config, callbacks)
  } else if (Notification.permission !== 'denied') {
    // 请求权限
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        createNotification(config, callbacks)
      }
    })
  } else {
    console.warn('用户已拒绝通知权限')
  }
  return null
}

/**
 * 创建通知实例
 * @param {Object} config - 通知配置
 * @param {Object} callbacks - 回调函数
 * @returns {Notification}
 */
const createNotification = (config, callbacks) => {
  const { title, body, icon, timeout, silent, ...otherOptions } = config

  if (currentNotification) {
    currentNotification.close()
    currentNotification = null
  }

  // 创建通知实例
  currentNotification = new Notification(title, {
    body,
    icon,
    silent,
    ...otherOptions
  })

  // 4. 设置回调函数
  if (typeof callbacks.onclick === 'function') {
    currentNotification.onclick = callbacks.onclick
  }

  if (typeof callbacks.onclose === 'function') {
    currentNotification.onclose = callbacks.onclose
  }

  if (typeof callbacks.onshow === 'function') {
    currentNotification.onshow = callbacks.onshow
  }

  if (typeof callbacks.onerror === 'function') {
    currentNotification.onerror = callbacks.onerror
  }

  // 5. 设置自动关闭
  if (timeout && timeout > 0) {
    setTimeout(() => {
      currentNotification.close()
    }, timeout)
  }

  return currentNotification
}
