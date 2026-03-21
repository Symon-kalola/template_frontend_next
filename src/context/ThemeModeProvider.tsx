import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material/styles'

import { createAppTheme } from '../theme/createAppTheme'

import { ThemeModeContext, type ThemePreference } from './themeModeContext'

const STORAGE_KEY = '265da_theme'

function readStoredPreference(): ThemePreference {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return 'system'
}

function getSystemMode(): PaletteMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => readStoredPreference())
  const [systemMode, setSystemMode] = useState<PaletteMode>(() => getSystemMode())

  const resolvedMode = useMemo(
    () => (preference === 'system' ? systemMode : preference),
    [preference, systemMode],
  )

  const setPreference = useCallback((value: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, value)
    setPreferenceState(value)
  }, [])

  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemMode(getSystemMode())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  const theme = useMemo(() => createAppTheme(resolvedMode), [resolvedMode])

  const value = useMemo(
    () => ({
      preference,
      resolvedMode,
      setPreference,
    }),
    [preference, resolvedMode, setPreference],
  )

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
