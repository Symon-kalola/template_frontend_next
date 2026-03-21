import { createContext } from 'react'
import type { PaletteMode } from '@mui/material/styles'

export type ThemePreference = 'light' | 'dark' | 'system'

export type ThemeModeContextValue = {
  preference: ThemePreference
  resolvedMode: PaletteMode
  setPreference: (value: ThemePreference) => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)
