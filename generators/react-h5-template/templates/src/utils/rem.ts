/**
 * 移动端适配工具函数
 * 设置根字体大小，实现 rem 适配
 */
export const setRem = () => {
  // 基准大小，设计稿宽度为 375px，基准值为 75px
  const baseSize = 37.5
  // 获取当前设备宽度
  const deviceWidth = document.documentElement.clientWidth || window.innerWidth
  // 计算缩放比例
  const scale = deviceWidth / 375
  // 设置根字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}

/**
 * 初始化移动端适配
 */
export const initMobileAdapter = () => {
  // 初始化设置
  setRem()
  // 监听窗口大小变化
  window.addEventListener('resize', setRem)
  // 监听横竖屏切换
  window.addEventListener('orientationchange', setRem)
}
