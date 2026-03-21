import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { isAxiosError } from 'axios'

import { AuthSplitShell } from '@/components/auth/AuthSplitShell'
import { LaunchpadRocketLoader, LaunchpadRocketMark } from '@/components/icons/LaunchpadRocket'

import { LanguageToggle } from '../components/LanguageToggle'
import { ThemeModeToggle } from '../components/ThemeModeToggle'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { t } = useTranslation()
  const { token, login } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  /** Demo: shows firing rocket + disabled fields for 8s on load. Remove this block when you no longer need it. */
  const [loadingPreview, setLoadingPreview] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => setLoadingPreview(false), 8000)
    return () => window.clearTimeout(id)
  }, [])

  const showLoading = loading || loadingPreview

  if (token) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      if (isAxiosError(err)) {
        const msg =
          (err.response?.data as { message?: string })?.message ??
          err.response?.statusText ??
          err.message
        setError(typeof msg === 'string' ? msg : t('errors.signInFailed'))
      } else {
        setError(t('errors.generic'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthSplitShell>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
        <LanguageToggle />
        <ThemeModeToggle />
      </Stack>
      <Card elevation={3} sx={{ maxWidth: 440, width: 1 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <LaunchpadRocketMark size={36} />
              <Typography variant="h5" fontWeight={800} color="primary">
                {t('common.brand')}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t('auth.loginSubtitle')}
            </Typography>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label={t('auth.email')}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              disabled={showLoading}
            />
            <TextField
              label={t('auth.password')}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              disabled={showLoading}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={showLoading}
              sx={
                showLoading
                  ? {
                      '&.Mui-disabled': {
                        opacity: 1,
                        color: 'primary.contrastText',
                        backgroundColor: 'primary.main',
                      },
                      '&.Mui-disabled .MuiButton-startIcon': { opacity: 1 },
                    }
                  : undefined
              }
              startIcon={
                showLoading ? (
                  <LaunchpadRocketLoader size={28} tone="onPrimary" />
                ) : (
                  <LaunchpadRocketMark size={24} tone="onPrimary" />
                )
              }
            >
              {showLoading ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
            <Typography variant="caption" color="text.secondary" component="div">
              <Trans
                i18nKey="auth.backendHint"
                components={{
                  0: <code />,
                  1: <code />,
                  2: <code />,
                }}
              />
            </Typography>
            <Typography variant="body2">
              {t('auth.noAccount')}{' '}
              <Link component={RouterLink} to="/register" underline="hover">
                {t('auth.registerLink')}
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </AuthSplitShell>
  )
}
