import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'

import { ModuleStatusIndicator } from '@/components/dashboard/ModuleStatusIndicator'
import { fadeInUp } from '@/components/dashboard/dashboardMotion'
import { platformModules } from '@/modules/registry'

const motionReduce = {
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none !important',
    transition: 'none !important',
    '&:hover': { transform: 'none' },
  },
}

export function ModuleServicesGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Grid container spacing={{ xs: 2, md: 2.5 }}>
      {platformModules.map((mod, index) => {
        const Icon = mod.Icon
        const open = mod.status === 'live' || mod.status === 'beta'
        const delay = index * 0.055
        const base = `modules.${mod.slug}`
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={mod.id}>
            <Card
              variant="outlined"
              sx={{
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                animation: `${fadeInUp} 0.55s ease ${delay}s both`,
                transition:
                  'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease',
                ...motionReduce,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: mod.accent,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '0 2px 2px 0',
                },
                '&:hover::before': open ? { opacity: 1 } : undefined,
                '&:hover': open
                  ? {
                      boxShadow: `0 16px 40px -12px ${alpha(mod.accent, theme.palette.mode === 'light' ? 0.35 : 0.45)}`,
                      transform: 'translateY(-4px)',
                      borderColor: alpha(mod.accent, 0.45),
                    }
                  : undefined,
              }}
            >
              <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2.5,
                      bgcolor: alpha(mod.accent, theme.palette.mode === 'light' ? 0.12 : 0.18),
                      color: mod.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: 1,
                      borderColor: alpha(mod.accent, 0.22),
                      transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.25s ease',
                      ...motionReduce,
                      '.MuiCard-root:hover &': open
                        ? {
                            transform: 'scale(1.08) rotate(-2deg)',
                            bgcolor: alpha(mod.accent, theme.palette.mode === 'light' ? 0.18 : 0.26),
                          }
                        : undefined,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} aria-hidden />
                  </Box>
                  <Stack spacing={0.5} flex={1} minWidth={0}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                      <Typography variant="h6" component="h2" fontWeight={800} letterSpacing={-0.2}>
                        {t(`${base}.name`)}
                      </Typography>
                      <ModuleStatusIndicator status={mod.status} />
                    </Stack>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      {t(`${base}.tagline`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                      {t(`${base}.description`)}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                  variant={open ? 'contained' : 'outlined'}
                  fullWidth
                  disabled={!open}
                  onClick={() => navigate(`/m/${mod.slug}`)}
                  sx={{
                    fontWeight: 700,
                    py: 1,
                    transition: 'transform 0.2s ease, box-shadow 0.25s ease',
                    ...motionReduce,
                    ...(open
                      ? {
                          '&:hover': {
                            boxShadow: `0 8px 24px -8px ${alpha(mod.accent, 0.55)}`,
                          },
                        }
                      : {}),
                  }}
                >
                  {open ? t('modules.openModule') : t('modules.locked')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
