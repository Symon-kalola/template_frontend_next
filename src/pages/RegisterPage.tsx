import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { isAxiosError } from 'axios'

import * as authApi from '../api/endpoints/auth'
import { AuthSplitShell } from '@/components/auth/AuthSplitShell'
import { LaunchpadRocketLoader, LaunchpadRocketMark } from '@/components/icons/LaunchpadRocket'

import { LanguageToggle } from '../components/LanguageToggle'
import { ThemeModeToggle } from '../components/ThemeModeToggle'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { t } = useTranslation()
  const { token, setSession } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await authApi.register({ name: name.trim(), email: email.trim(), password })
      setSession(res)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (isAxiosError(err)) {
        const msg =
          (err.response?.data as { message?: string })?.message ??
          err.response?.statusText ??
          err.message
        setError(typeof msg === 'string' ? msg : t('errors.registrationFailed'))
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
                {t('auth.createAccount')}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t('auth.registerSubtitle')}
            </Typography>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label={t('auth.fullName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label={t('auth.email')}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label={t('auth.password')}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={
                loading
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
                loading ? (
                  <LaunchpadRocketLoader size={28} tone="onPrimary" />
                ) : (
                  <LaunchpadRocketMark size={24} tone="onPrimary" />
                )
              }
            >
              {loading ? t('auth.creating') : t('auth.register')}
            </Button>
            <Typography variant="body2">
              {t('auth.haveAccount')}{' '}
              <Link component={RouterLink} to="/login" underline="hover">
                {t('auth.signInLink')}
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </AuthSplitShell>
  )
}
