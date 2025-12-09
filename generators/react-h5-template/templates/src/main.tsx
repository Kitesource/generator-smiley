import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/i18n' // 引入i18n配置
import '@/styles/index.scss'
import 'virtual:svg-icons-register' // 引入SVG图标配置
import { initMobileAdapter } from '@/utils/rem.ts' // 引入移动端适配
import App from './App.tsx'

// 初始化移动端适配
initMobileAdapter()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
