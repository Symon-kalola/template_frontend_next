import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { AuthUser, LoginResponse } from '../api/endpoints/auth'
import * as authApi from '../api/endpoints/auth'
import type { UpdateProfilePayload } from '../api/endpoints/user'
import * as userApi from '../api/endpoints/user'
import { TOKEN_KEY, apiClient } from '../api/client'

import { AuthContext, type AuthContextValue } from './authContext'

const USER_KEY = '265da_user'

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())
  const [isReady] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
    delete apiClient.defaults.headers.common.Authorization
  }, [])

  const setSession = useCallback((session: LoginResponse) => {
    localStorage.setItem(TOKEN_KEY, session.token)
    localStorage.setItem(USER_KEY, JSON.stringify(session.user))
    setToken(session.token)
    setUser(session.user)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password })
      setSession(res)
    },
    [setSession],
  )

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    const next = await userApi.updateMe(payload)
    localStorage.setItem(USER_KEY, JSON.stringify(next))
    setUser(next)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isReady,
      login,
      setSession,
      updateProfile,
      logout,
    }),
    [user, token, isReady, login, setSession, updateProfile, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
