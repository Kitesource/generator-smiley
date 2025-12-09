import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider } from 'antd'
import { themeConfig } from '@/configs/theme'
import { useCommonStore } from '@/store/modules/common'
// 导入antd的语言包
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

const App: React.FC = () => {
  // 从commonStore获取语言状态
  const { language } = useCommonStore()

  // 获取当前antd语言包
  const getAntdLocale = () => {
    return language === 'zh-CN' ? zhCN : enUS
  }

  return (
    <ConfigProvider theme={themeConfig} locale={getAntdLocale()}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
