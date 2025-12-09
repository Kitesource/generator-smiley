/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HTTP_BASE_URL: string
  readonly VITE_ENV: string
  readonly VITE_API: string
  readonly VITE_BASE_URL: string
  readonly VITE_GZIP: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 为vite-plugin-svg-icons添加类型声明
declare module 'virtual:svg-icons-register'
