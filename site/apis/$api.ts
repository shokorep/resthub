/* eslint-disable */
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { Methods as Methods0 } from './users/index'
import { Methods as Methods1 } from './users/_id'

const apiBaseURL = ''

const api = (client: AxiosInstance = axios) => {
  const prefix = (client.defaults.baseURL ? '' : apiBaseURL).replace(/\/$/, '')

  return {
    users: {
      _id: (val0: number | string) => ({
        get: (config?: AxiosRequestConfig) =>
          client.get<Methods1['get']['response']>(`${prefix}/users/${val0}`, config),
        $get: async (config?: AxiosRequestConfig) =>
          (await client.get<Methods1['get']['response']>(`${prefix}/users/${val0}`, config)).data
      }),
      get: (config?: AxiosRequestConfig) =>
        client.get<Methods0['get']['response']>(`${prefix}/users`, config),
      $get: async (config?: AxiosRequestConfig) =>
        (await client.get<Methods0['get']['response']>(`${prefix}/users`, config)).data,
      post: (data: Methods0['post']['data'], config?: AxiosRequestConfig) =>
        client.post<void>(`${prefix}/users`, data, config),
      $post: async (data: Methods0['post']['data'], config?: AxiosRequestConfig) =>
        (await client.post<void>(`${prefix}/users`, data, config)).data
    }
  }
}

type ApiInstance = ReturnType<typeof api>

export { ApiInstance, apiBaseURL }
export default api
