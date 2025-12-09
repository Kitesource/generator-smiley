// antd主题配置
// 注意：这里的变量值需要与 src/styles/variable.scss 中的变量保持一致
import type { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    // 主题色
    colorPrimary: '#1890ff', // 对应 scss 变量 $primary-color
    // 成功色
    colorSuccess: '#52c41a', // 对应 scss 变量 $success-color
    // 警告色
    colorWarning: '#faad14', // 对应 scss 变量 $warning-color
    // 错误色
    colorError: '#f5222d', // 对应 scss 变量 $error-color
    // 信息色
    colorInfo: '#1890ff', // 对应 scss 变量 $info-color
    // 文本颜色
    colorTextBase: 'rgba(0, 0, 0, 0.85)', // 对应 scss 变量 $text-color
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)', // 对应 scss 变量 $text-color-secondary
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)', // 对应 scss 变量 $text-color-tertiary
    colorTextDisabled: 'rgba(0, 0, 0, 0.25)', // 对应 scss 变量 $text-color-disabled
    // 边框颜色
    colorBorder: '#d9d9d9', // 对应 scss 变量 $border-color-base
    colorSplit: '#f0f0f0', // 对应 scss 变量 $border-color-split
    // 背景颜色
    colorBgBase: '#f5f5f5', // 对应 scss 变量 $bg-color-base
    colorBgContainer: '#ffffff', // 对应 scss 变量 $bg-color-container
    // 字体大小
    fontSize: 14, // 对应 scss 变量 $font-size-base
    fontSizeLG: 16, // 对应 scss 变量 $font-size-lg
    fontSizeSM: 12, // 对应 scss 变量 $font-size-sm
    // 圆角
    borderRadius: 4, // 对应 scss 变量 $border-radius-base
    borderRadiusLG: 8, // 对应 scss 变量 $border-radius-lg
    borderRadiusSM: 2, // 对应 scss 变量 $border-radius-sm
    // 间距
    margin: 8, // 对应 scss 变量 $margin-base
    padding: 8, // 对应 scss 变量 $padding-base
    // 阴影
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // 对应 scss 变量 $box-shadow-base
    // 行高
    lineHeight: 1.5715, // 对应 scss 变量 $line-height-base
    // 字体家族
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  }
}
