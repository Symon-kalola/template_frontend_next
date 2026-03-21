import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ModuleStatusIndicator } from '@/components/dashboard/ModuleStatusIndicator'
import { getModuleBySlug } from '@/modules/registry'

export function ModulePlaceholderPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const mod = slug ? getModuleBySlug(slug) : undefined

  if (!mod) {
    return (
      <Stack spacing={2}>
        <Alert severity="warning">{t('modulePage.notFound')}</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          {t('modulePage.backDashboard')}
        </Button>
      </Stack>
    )
  }

  const open = mod.status === 'live' || mod.status === 'beta'
  const Icon = mod.Icon
  const mk = `modules.${mod.slug}`

  return (
    <Stack spacing={3}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ alignSelf: 'flex-start' }}>
        <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit" variant="body2">
          {t('nav.dashboard')}
        </Link>
        <Typography color="text.primary" variant="body2" fontWeight={600}>
          {t(`${mk}.name`)}
        </Typography>
      </Breadcrumbs>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="flex-start" flexWrap="wrap" useFlexGap>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: `${mod.accent}22`,
                color: mod.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon fontSize="large" aria-hidden />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" useFlexGap>
                <Typography variant="h4" component="h1" fontWeight={800}>
                  {t(`${mk}.name`)}
                </Typography>
                <ModuleStatusIndicator status={mod.status} />
              </Stack>
              <Typography color="text.secondary" variant="subtitle1" sx={{ mt: 0.5 }}>
                {t(`${mk}.tagline`)}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            {t(`${mk}.description`)}
          </Typography>

          {open ? (
            <Alert severity="info">{t('modulePage.shellOnly')}</Alert>
          ) : (
            <Alert severity="warning">{t('modulePage.notEnabled')}</Alert>
          )}

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="outlined" component={RouterLink} to="/dashboard">
              {t('modulePage.allModules')}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
