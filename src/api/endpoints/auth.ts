import { apiClient } from '../client'

export type LoginPayload = {
  email: string
  password: string
}

export type AuthUser = {
  id: string
  name: string
  email: string
  role?: string
}

export type LoginResponse = {
  token: string
  user: AuthUser
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('auth/login', payload)
  return data
}

export async function register(payload: LoginPayload & { name: string }): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('auth/register', payload)
  return data
}
