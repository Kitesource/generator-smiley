import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/i18n' // 引入i18n配置
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import 'virtual:svg-icons-register' // 引入SVG图标配置
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
