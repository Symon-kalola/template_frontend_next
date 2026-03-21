import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { isAxiosError } from 'axios'

import { useAuth } from '../hooks/useAuth'

function getInitials(name: string | undefined, email: string | undefined): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
    return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase()
  }
  if (email?.trim()) return email.trim().slice(0, 2).toUpperCase()
  return '?'
}

export function UserAccountMenu() {
  const { t } = useTranslation()
  const { user, token, logout, updateProfile } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const open = Boolean(anchorEl)

  function openMenu(e: MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget)
  }

  function closeMenu() {
    setAnchorEl(null)
  }

  function openEdit() {
    if (!user) return
    closeMenu()
    setName(user.name ?? '')
    setEmail(user.email ?? '')
    setError(null)
    setEditOpen(true)
  }

  async function handleSaveProfile(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)
    setSaving(true)
    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
      })
      setEditOpen(false)
    } catch (err) {
      if (isAxiosError(err)) {
        const msg =
          (err.response?.data as { message?: string })?.message ??
          err.response?.statusText ??
          err.message
        setError(typeof msg === 'string' ? msg : t('errors.updateProfile'))
      } else {
        setError(t('errors.somethingWrong'))
      }
    } finally {
      setSaving(false)
    }
  }

  if (!token) {
    return null
  }

  const initials = user ? getInitials(user.name, user.email) : undefined

  return (
    <>
      <Tooltip title={t('account.profileTooltip')}>
        <IconButton
          onClick={openMenu}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-label={t('account.openMenu')}
          sx={{
            p: 0.5,
            color: 'primary.main',
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          {user ? (
            <Avatar
              alt={user.name}
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {initials}
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'action.hover',
                color: 'primary.main',
              }}
              aria-hidden
            >
              <AccountCircleOutlined />
            </Avatar>
          )}
        </IconButton>
      </Tooltip>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 280, mt: 1 } } }}
      >
        {user ? (
          <>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}>
                  {initials}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email}
                  </Typography>
                  {user.role ? (
                    <Typography variant="caption" color="text.secondary">
                      {t('account.role', { role: user.role })}
                    </Typography>
                  ) : null}
                </Box>
              </Stack>
            </Box>
            <Divider />
            <MenuItem onClick={openEdit}>
              <ListItemIcon>
                <EditOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t('account.editProfile')} secondary={t('account.editProfileSecondary')} />
            </MenuItem>
          </>
        ) : (
          <>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" color="text.secondary">
                {t('account.profileNotLoaded')}
              </Typography>
            </Box>
            <Divider />
          </>
        )}
        <MenuItem
          onClick={() => {
            closeMenu()
            logout()
          }}
        >
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('account.signOut')} />
        </MenuItem>
      </Menu>

      {user ? (
        <Dialog open={editOpen} onClose={() => !saving && setEditOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>{t('account.editDialogTitle')}</DialogTitle>
          <Box component="form" onSubmit={handleSaveProfile}>
            <DialogContent>
              <Stack spacing={2} sx={{ pt: 0.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
                    <AccountCircleOutlined fontSize="large" />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" component="div">
                    <Trans
                      i18nKey="account.dialogHint"
                      components={{
                        0: <Box component="span" sx={{ fontFamily: 'monospace' }} />,
                      }}
                    />
                  </Typography>
                </Stack>
                {error ? <Alert severity="error">{error}</Alert> : null}
                <TextField label={t('auth.fullName')} value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
                <TextField
                  label={t('auth.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  autoComplete="email"
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button type="button" onClick={() => setEditOpen(false)} disabled={saving}>
                {t('account.cancel')}
              </Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? t('account.saving') : t('account.save')}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      ) : null}
    </>
  )
}
