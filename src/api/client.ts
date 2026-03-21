import axios from 'axios'

import { apiBaseUrl } from '../config/env'

const TOKEN_KEY = '265da_token'

const resolvedBase =
  apiBaseUrl.trim().length > 0 ? apiBaseUrl.replace(/\/$/, '') : '/api'

export const apiClient = axios.create({
  baseURL: resolvedBase,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { TOKEN_KEY }
