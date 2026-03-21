import { createContext } from 'react'

import type { AuthUser, LoginResponse } from '../api/endpoints/auth'
import type { UpdateProfilePayload } from '../api/endpoints/user'

export type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isReady: boolean
  login: (email: string, password: string) => Promise<void>
  setSession: (session: LoginResponse) => void
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
