import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
  ElementPlusResolver,
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_STATE_CDN,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver(), NaiveUiResolver()],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        dirs: ['src/components', 'src/views', 'src/layouts'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          NaiveUiResolver(),
        ],
      }),
      visualizer({ open: true, gzipSize: true, brotliSize: false }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/sprites')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
    },
    server: {
      port: 2077,
      host: '0.0.0.0',
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, '/api'),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames(assetInfo: any) {
            try {
              const parts = assetInfo.name.split('.')
              const extension = parts[parts.length - 1]
              const EXTENSIONS = {
                fonts: ['woff', 'ttf', 'eot'],
                img: ['jpg', 'png', 'svg'],
                css: ['css'],
              }

              if (EXTENSIONS.fonts.includes(extension)) {
                return 'fonts/[name]-[hash].[ext]'
              }
              if (EXTENSIONS.css.includes(extension)) {
                return 'css/[name]-[hash].[ext]'
              }
              if (EXTENSIONS.img.includes(extension)) {
                return 'img/[name]-[hash].[ext]'
              }
            } catch (error) {
              console.warn('Package Assets Error: ', error)
            }

            return '[ext]/[name]-[hash].[ext]'
          },
        },
      },
    },
    esbuild: {
      pure: ['console.log'],
    },
  })
}
