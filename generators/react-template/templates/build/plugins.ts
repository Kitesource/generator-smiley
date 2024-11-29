import compressPlugin from 'vite-plugin-compression'
import { viteRunInfo, viteBuildInfo } from './info'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import react from '@vitejs/plugin-react'
import vitePluginEslint from 'vite-plugin-eslint'

export const pluginsConfig = (mode: string, command: string) => {
  const isBuild = command === 'build'
  const isDev = command === 'serve'
  const vitePlugins = [
    viteRunInfo(mode),
    AutoImport({
      include: [
        /\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
      ],
      imports: ['react'],
      // 指定引入根目录下的某些目录内的所有函数
      dirs: ['./src/utils/**'],
      // 使用 Typescript，需要设置 dts 为 true
      // dts: true, // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
      dts: 'auto-imports.d.ts',
      // 使用了 eslint，需要设置 eslintrc 字段
      eslintrc: {
        // 1.默认是false, 控制生成eslintrc-auto-import.json文件，首次搭建项目时生成；
        // 2.生成好后，最好关闭掉，改回false，避免重复生成消耗。
        enabled: false
        // 此文件是为了避免eslint 对自动导入的api报错，同时tsconfig.json也需加上自动导入所生成的配置文件auto-imports.d.ts
        // filepath: '../.eslintrc-auto-import.json',
      }
    }),
    // 打包成.gz文件
    compressPlugin({
      // 生成的压缩包后缀
      ext: '.gz',
      // 对大于 10KB 的文件进行压缩
      threshold: 10240,
      // 压缩后是是否删除原始文件
      deleteOriginFile: false,
      // 是否在控制台输出压缩结果
      verbose: true
      // 是否禁用,相当于开关在这里, 默认就是false, 为开启
      // disable: mode !== 'production',
    }),
    react()
  ]
  // eslint校验，在development开发模式下起作用
  if (isDev) {
    // Vite中输出eslint错误信息
    vitePlugins.push(
      vitePluginEslint({
        // lintOnStart: true, // 启动时候是否就执行eslint校验，如果开启的话有eslint的报错则服务是会启动失败
      })
    )
  }

  if (isBuild) {
    // 构建打包时才运行
    vitePlugins.push(viteBuildInfo(mode))
    // 是否生成打包分析文件
    vitePlugins.push(
      visualizer({
        // 注意这里要设置为true，否则无效
        open: true,
        // 设置打包文件的位置位于打包目录下
        emitFile: true,
        filename: 'build-report.html',
        // 收集 gzip 大小并将其显示
        gzipSize: true
      })
    )
  }

  return vitePlugins
}
