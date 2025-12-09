import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export enum MethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export interface AppAxiosInstance extends AxiosInstance {
  (config?: AxiosRequestConfig): Promise<void>
  (url: string, config?: AxiosRequestConfig): Promise<void>
}
export interface RequestConfig extends AxiosRequestConfig {
  api: string
  query?: { [key: string]: string }
  signal?: AbortSignal
  doneHook?: (bool: boolean) => void
}

export interface ResponseBody {
  data: any
  msg: string
  code: string
}

export type HttpFunction = {
  (config: RequestConfig): Promise<ResponseBody['data']>
}

export type HttpObject = {
  [key in MethodEnum]: (config: RequestConfig) => Promise<ResponseBody['data']>
}

export interface Http extends HttpObject, HttpFunction {}
