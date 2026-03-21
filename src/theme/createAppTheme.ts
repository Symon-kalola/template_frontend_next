import { createTheme, type PaletteMode } from '@mui/material/styles'

const shared = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", system-ui, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' as const, fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
  },
} as const

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    ...shared,
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#0d4f2b',
              light: '#2e7d4a',
              dark: '#06301a',
              contrastText: '#fafafa',
            },
            secondary: {
              main: '#c9a227',
              dark: '#8f7318',
              contrastText: '#1a1a1a',
            },
            background: {
              default: '#f4f7f4',
              paper: '#ffffff',
            },
          }
        : {
            primary: {
              main: '#5cdb95',
              light: '#8ef4b8',
              dark: '#2e8f5c',
              contrastText: '#05130c',
            },
            secondary: {
              main: '#e6c04a',
              dark: '#b8962e',
              contrastText: '#1a1508',
            },
            background: {
              default: '#0b1210',
              paper: '#121b18',
            },
            divider: 'rgba(255, 255, 255, 0.08)',
          }),
    },
  })
}
