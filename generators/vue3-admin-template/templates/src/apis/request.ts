import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface AxiosInstance2 extends AxiosInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config?: AxiosRequestConfig): Promise<any> // 使AxiosPromise兼容Promise
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (url: string, config?: AxiosRequestConfig): Promise<any>
}

const axios = Axios.create({
  baseURL: '/api',
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
  timeout: 8 * 1000,
}) as AxiosInstance2

/**
 *
 * 生成防止重复提交的请求，本次请求会Canceled上一次还未Finished的请求
 * @param {*} req
 * @returns
 * example: export const searchPlatformMapping =
 *  withAbortRequest((data, signal) => postData('/mapping/search', data, {
 *    signal,
 *  }));
 */
export function withAbortRequest(req) {
  let controller
  return (...args) => {
    if (controller) {
      controller.abort()
    }
    controller = new AbortController()
    return req(...args, controller.signal)
  }
}

export default axios
