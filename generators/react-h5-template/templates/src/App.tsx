import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider } from 'antd-mobile'
import { useCommonStore } from '@/store/modules/common'
// 导入antd-mobile的语言包
import zhCN from 'antd-mobile/es/locales/zh-CN'
import enUS from 'antd-mobile/es/locales/en-US'

const App: React.FC = () => {
  // 从commonStore获取语言状态
  const { language } = useCommonStore()

  // 获取当前antd-mobile语言包
  const getAntdMobileLocale = () => {
    return language === 'zh-CN' ? zhCN : enUS
  }

  return (
    <ConfigProvider locale={getAntdMobileLocale()}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
