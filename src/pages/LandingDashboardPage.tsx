import { Trans, useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

import { drift, fadeIn, fadeInUp } from '@/components/dashboard/dashboardMotion'

import { ModuleServicesGrid } from '../components/dashboard/ModuleServicesGrid'
import { useAuth } from '../hooks/useAuth'

const motionOk = {
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
  },
}

export function LandingDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const rawFirst = user?.name?.trim().split(/\s+/)[0]
  const firstName = rawFirst ?? t('common.there')

  const p = theme.palette.primary
  const s = theme.palette.secondary
  const paper = theme.palette.background.paper
  const def = theme.palette.background.default

  const heroMesh = [
    `radial-gradient(100% 90% at 12% -30%, ${alpha(p.main, isLight ? 0.2 : 0.28)} 0%, transparent 58%)`,
    `radial-gradient(90% 80% at 92% 108%, ${alpha(s.main, isLight ? 0.16 : 0.2)} 0%, transparent 55%)`,
    `radial-gradient(85% 70% at 50% 45%, ${alpha(p.light, isLight ? 0.08 : 0.12)} 0%, transparent 65%)`,
    `linear-gradient(152deg, ${alpha(paper, isLight ? 0.97 : 0.88)} 0%, ${alpha(def, isLight ? 0.55 : 0.35)} 42%, ${alpha(paper, isLight ? 0.92 : 0.82)} 100%)`,
  ].join(', ')

  const heroShadow = isLight
    ? `0 1px 0 ${alpha(theme.palette.common.black, 0.05)}, 0 28px 56px -28px ${alpha(p.main, 0.14)}, 0 12px 32px -16px ${alpha(s.main, 0.08)}`
    : `0 1px 0 ${alpha(theme.palette.common.white, 0.07)}, 0 32px 64px -24px ${alpha(theme.palette.common.black, 0.55)}, 0 0 0 1px ${alpha(p.main, 0.12)}`

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 2.5, sm: 3.5 },
          border: 1,
          borderColor: alpha(p.main, isLight ? 0.14 : 0.22),
          boxShadow: heroShadow,
          animation: `${fadeInUp} 0.65s ease-out both`,
          ...motionOk,
          background: heroMesh,
          backdropFilter: isLight ? 'blur(10px)' : 'blur(14px)',
          WebkitBackdropFilter: isLight ? 'blur(10px)' : 'blur(14px)',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: isLight ? 0.45 : 0.35,
            backgroundImage: `radial-gradient(${alpha(theme.palette.text.primary, isLight ? 0.09 : 0.12)} 0.6px, transparent 0.6px)`,
            backgroundSize: '18px 18px',
            pointerEvents: 'none',
          }}
        />

        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${alpha(theme.palette.common.white, isLight ? 0.55 : 0.06)} 0%, transparent 38%)`,
            pointerEvents: 'none',
          }}
        />

        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            top: -100,
            right: -70,
            background: `radial-gradient(circle, ${alpha(p.main, isLight ? 0.28 : 0.32)} 0%, ${alpha(p.light, 0.08)} 45%, transparent 72%)`,
            animation: `${drift} 14s ease-in-out infinite`,
            ...motionOk,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            bottom: -60,
            left: -50,
            background: `radial-gradient(circle, ${alpha(s.main, isLight ? 0.22 : 0.26)} 0%, transparent 70%)`,
            animation: `${drift} 18s ease-in-out infinite reverse`,
            ...motionOk,
          }}
        />

        <Stack spacing={1.25} sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: 0.12,
              animation: `${fadeIn} 0.5s ease-out 0.05s both`,
              ...motionOk,
            }}
          >
            {t('dashboard.hub')}
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={800}
            sx={{
              letterSpacing: -0.5,
              color: 'text.primary',
              animation: `${fadeInUp} 0.6s ease-out 0.08s both`,
              ...motionOk,
            }}
          >
            {t('dashboard.welcomeBack', { name: firstName })}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={500}
            sx={{
              maxWidth: 720,
              lineHeight: 1.45,
              animation: `${fadeInUp} 0.6s ease-out 0.14s both`,
              ...motionOk,
            }}
          >
            {t('dashboard.subtitle')}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: 800,
              pt: 0.25,
              lineHeight: 1.65,
              animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
              ...motionOk,
            }}
            component="div"
          >
            <Trans i18nKey="dashboard.blurbRich" components={{ 0: <strong />, 1: <strong /> }} />
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          animation: `${fadeInUp} 0.65s ease-out 0.12s both`,
          ...motionOk,
        }}
      >
        <Typography variant="h5" fontWeight={800} letterSpacing={-0.3} gutterBottom>
          {t('dashboard.yourModules')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 720, lineHeight: 1.6 }}>
          {t('dashboard.modulesIntro')}
        </Typography>
        <ModuleServicesGrid />
      </Box>
    </Stack>
  )
}
