/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import Axios from 'axios'
import type { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import type { AppAxiosInstance, ResponseBody } from '@/typings/api'
import { API_BASE_URL } from '@/configs/common'
import i18n from '@/plugins/i18n'

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
  timeout: 60 * 1000,
}) as AppAxiosInstance

axios.interceptors.request.use(
  (config: any) => {
    config.headers.token = 'token'
    return config
  },
  err => Promise.reject(err),
)

export function promptMessage(msg: string) {
  const { t } = i18n.global as any
  const message = t(msg)
  ElMessage.error(message)

  return message
}

function handleResponse(response: AxiosResponse<ResponseBody>) {
  if (!response) return Promise.reject(new Error('CANCELED'))

  if (response.status !== 200) {
    const message = promptMessage('error.status.INTERNAL_SERVER_ERROR')

    return Promise.reject(new Error(message))
  }

  if (response?.data?.code !== '0') {
    const { code, msg } = response.data
    return Promise.reject(
      new Error(msg, {
        cause: code,
      }),
    )
  }

  return Promise.resolve(response.data.data)
}

axios.interceptors.response.use(
  async response => handleResponse(response),
  (error: Error & { response: AxiosResponse<any> }) =>
    handleResponse(error.response),
)

export default axios