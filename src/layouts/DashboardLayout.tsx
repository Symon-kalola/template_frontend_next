import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

import { LaunchpadRocketMark } from '@/components/icons/LaunchpadRocket'

import { LanguageToggle } from '../components/LanguageToggle'
import { ThemeModeToggle } from '../components/ThemeModeToggle'
import { UserAccountMenu } from '../components/UserAccountMenu'

type DashboardLayoutProps = {
  children: ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft page backdrop — subtle depth without clutter */}
      <Box
        aria-hidden
        sx={{
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 10% -10%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.09 : 0.14)} 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 0%, ${alpha(theme.palette.secondary.main, theme.palette.mode === 'light' ? 0.06 : 0.1)} 0%, transparent 45%)`,
          '@media (prefers-reduced-motion: reduce)': { background: 'none' },
        }}
      />

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.78 : 0.72),
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
      >
        <Toolbar sx={{ gap: 1.5, flexWrap: 'nowrap', minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component="button"
            type="button"
            onClick={() => navigate('/dashboard')}
            sx={{
              flexGrow: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              textAlign: 'left',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              p: 0,
              overflow: 'hidden',
              borderRadius: 2,
              transition: 'transform 0.25s ease, opacity 0.2s ease',
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              '&:hover': {
                opacity: 0.92,
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'translateY(0)' },
              '&:hover .dashboard-brand-icon': {
                transform: 'scale(1.06)',
              },
            }}
          >
            <Box
              className="dashboard-brand-icon"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              <LaunchpadRocketMark size={30} sx={{ flexShrink: 0 }} />
            </Box>
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: -0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {t('common.brand')}
            </Typography>
          </Box>
          {title ? (
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}
            >
              {title}
            </Typography>
          ) : null}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, ml: 'auto' }}>
            <LanguageToggle />
            <ThemeModeToggle />
            <UserAccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 }, position: 'relative', zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  )
}
