import { apiClient } from '../client'

import type { AuthUser } from './auth'

export type UpdateProfilePayload = {
  name?: string
  email?: string
}

export async function updateMe(payload: UpdateProfilePayload): Promise<AuthUser> {
  const { data } = await apiClient.patch<AuthUser>('users/me', payload)
  return data
}
