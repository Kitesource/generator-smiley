import Axios from 'axios'
import type { AxiosResponse } from 'axios'
import { message } from 'antd'
import type { AppAxiosInstance, ResponseBody } from '@/typings'
import { ERROR_STATUS } from './errorsMapping'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_HTTP_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  timeout: 60 * 1000
}) as AppAxiosInstance

axios.interceptors.request.use(
  (config: any) => {
    // const token = localStorage.getItem('token')
    // config.headers.token = token
    return config
  },
  (err: any) => Promise.reject(err)
)

function handleResponse(response: AxiosResponse<ResponseBody>) {
  if (!response) return Promise.reject(new Error('CANCELED'))

  if (response.status !== 200) {
    const errMsg = ERROR_STATUS[response.status] || ERROR_STATUS[500]
    message.error(errMsg)
    return Promise.reject(new Error(errMsg))
  }

  if (response?.data?.code !== '0') {
    const { code, msg } = response?.data || {}
    if (msg) {
      message.error(msg)
    }
    return Promise.reject(
      new Error(msg, {
        cause: code
      })
    )
  }

  return Promise.resolve(response.data.data)
}

axios.interceptors.response.use(
  async response => handleResponse(response),
  (error: Error & { response: AxiosResponse<any> }) => handleResponse(error.response)
)

export default axios
