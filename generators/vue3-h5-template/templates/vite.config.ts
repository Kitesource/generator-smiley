import { createVitePlugins } from './build/vite/plugins'
import { resolve } from 'path'
import { ConfigEnv, loadEnv, UserConfig } from 'vite'

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: '/',
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      hmr: true,
      port: Number(env.VITE_PORT),
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_API_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
        },
      },
    },
    plugins: createVitePlugins(mode, command),
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api'],
          // 配置 vant 全局 scss 变量
          additionalData: `@use '@/styles/vant.scss' as *;`,
        },
      },
    },
  }
}
