/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */

import { loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { ConfigCompressPlugin } from './compress'
import { ConfigPagesPlugin } from './pages'
import { ConfigRestartPlugin } from './restart'
import { ConfigProgressPlugin } from './progress'
import { ConfigEruda } from './eruda'
import { ConfigImageminPlugin } from './imagemin'
import { ConfigVisualizerConfig } from './visualizer'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { wrapperEnv } from '../utils'

export function createVitePlugins(mode, command) {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build'

  const { VITE_USE_ERUDA, VITE_USE_COMPRESS, VITE_USE_REPORT, VITE_USE_HTTPS } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    vue(),
    // JSX支持
    vueJsx(),
    // setup语法糖组件名支持
    vueSetupExtend(),
  ]

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents())

  // 自动按需引入依赖
  vitePlugins.push(AutoImportDeps())

  // 自动生成路由
  vitePlugins.push(ConfigPagesPlugin())

  // 监听配置文件改动重启
  vitePlugins.push(ConfigRestartPlugin())

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin())

  // eruda
  VITE_USE_ERUDA && vitePlugins.push(ConfigEruda())

  // rollup-plugin-visualizer
  VITE_USE_REPORT && vitePlugins.push(ConfigVisualizerConfig())

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))

  VITE_USE_HTTPS && vitePlugins.push(basicSsl())

  if (isBuild) {
    // vite-plugin-imagemin
    vitePlugins.push(ConfigImageminPlugin())

    // 开启.gz压缩  rollup-plugin-gzip
    VITE_USE_COMPRESS && vitePlugins.push(ConfigCompressPlugin())
  }

  return vitePlugins
}
