import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import tailwindcss from '@tailwindcss/vite'
import { NaiveUiResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_CDN_ADDRESS || '/',
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: `${path.resolve(__dirname, 'src')}/`,
        }, // 模块路径alias
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/element.scss" as *;',
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      // tailwindcss
      tailwindcss(),
      // svg icon
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/sprites')],
        svgoOptions: true,
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // 自动引入vue、vue-router 等常用API
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        // 自定义导入
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      // 自动引入组件
      Components({
        // 扫描的目录
        dirs: ['src/components', 'src/views'],
        extensions: ['vue'],
        // 自动引入组件
        resolvers: [NaiveUiResolver(), ElementPlusResolver({ importStyle: 'sass' })],
        // 生成类型声明
        dts: './.components.d.ts',
      }),
      ElementPlus({
        useSource: true, // ✅ 启用源码编译
      }),
      // 生产环境启用压缩
      mode === 'production' && viteCompression(),
    ],
    server: {
      proxy: {
        // 本地接口转发
        '/api': {
          target: '',
          changeOrigin: true,
        },
      },
      open: false,
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
            } catch (err) {
              console.log('Package Assets Error:', err)
            }
            return '[ext]/[name]-[hash].[ext]'
          },
        },
      },
    },
  }
})
