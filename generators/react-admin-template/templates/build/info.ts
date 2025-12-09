import { loadEnv } from 'vite'
import { resolve } from 'path'
import pc from 'picocolors'
import type { Plugin } from 'vite'

// 环境变量
const envDir = resolve(__dirname, '../env')
const loadEnvFunc = (mode: string) => {
  return loadEnv(mode, envDir)
}

// 打印vite运行的一些信息
export function viteRunInfo(mode: string): Plugin {
  // 环境变量
  const env = loadEnvFunc(mode)
  const { VITE_ENV, VITE_API } = env
  const { NODE_ENV } = process.env
  return {
    name: 'viteRunInfo',
    configResolved() {
      console.log(pc.white(pc.bold('---------- 开始打印信息 ----------')), mode)
      console.log(pc.white(pc.bold(`1环境变量NODE_ENV是: ${pc.cyan(NODE_ENV)}`)))
      console.log(pc.white(pc.bold(`2环境变量VITE_ENV是: ${pc.cyan(VITE_ENV)}`)))
      console.log(pc.white(pc.bold(`3接口地址VITE_API是: ${pc.cyan(VITE_API)}`)))
      console.log(pc.white(pc.bold('---------- 结束打印信息 ----------')))
    }
  }
}

// 构建信息打印
export function viteBuildInfo(mode?: string): Plugin {
  interface ConfigObj {
    command: string
  }
  let config: ConfigObj
  let startTime: number
  let endTime
  return {
    name: 'viteBuildInfo',
    configResolved(resolvedConfig: ConfigObj) {
      config = resolvedConfig
      // 环境变量
      const env = loadEnvFunc(mode!)
      const { VITE_GZIP } = env
      console.log(pc.white(pc.bold(`'是否打包成gzip': ${VITE_GZIP}`)))
    },
    buildStart() {
      if (config.command === 'build') {
        startTime = Date.now()
        console.log(pc.white(pc.bold(`开始打包了: ${pc.cyan(startTime)}`)))
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = Date.now()
        const duration = (endTime - startTime) / 1000
        console.log(pc.white(pc.bold(`构建耗时: ${duration}s`)))
      }
    }
  }
}
