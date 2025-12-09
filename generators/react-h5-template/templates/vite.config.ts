import { defineConfig } from 'vite'
import { resolve } from 'path'
import { pluginsConfig } from './build/plugins'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    envDir: resolve(__dirname, './env'),
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.tsx', '.jsx', '.js', '.ts']
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/variable.scss" as *;`
        }
      }
    },
    // 插件相关配置
    plugins: pluginsConfig(mode, command),
    // 本地服务配置
    server: {
      port: 8500,
      // 默认启用并允许任何源
      // cors: true,
      // 在服务器启动时是否自动在浏览器中打开应用程序
      // open: true,
      host: '0.0.0.0',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      // 根据接口情况具体设置，是否需要代码等等
      proxy: {
        '/api': {
          // 本地node.js服务器运行的地址
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          // 允许websocket代理
          ws: true
          // rewrite: path => path.replace(/^\/api/, ''), // 将/api替换为空
        }
      }
    }
  }
})
