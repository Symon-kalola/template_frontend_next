import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import SettingsBrightnessOutlined from '@mui/icons-material/SettingsBrightnessOutlined'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'

import type { ThemePreference } from '../context/themeModeContext'
import { useThemeMode } from '../hooks/useThemeMode'

type ThemeModeToggleProps = {
  size?: 'small' | 'medium'
}

export function ThemeModeToggle({ size = 'small' }: ThemeModeToggleProps) {
  const { t } = useTranslation()
  const { preference, setPreference } = useThemeMode()

  const handleChange = (_: MouseEvent<HTMLElement>, value: ThemePreference | null) => {
    if (value !== null) setPreference(value)
  }

  return (
    <ToggleButtonGroup
      value={preference}
      exclusive
      size={size}
      onChange={handleChange}
      aria-label={t('theme.colorMode')}
      sx={{
        '& .MuiToggleButton-root': { px: { xs: 1, sm: 1.25 } },
      }}
    >
      <Tooltip title={t('theme.light')}>
        <ToggleButton value="light" aria-label={t('theme.light')}>
          <LightModeOutlined fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('theme.system')}>
        <ToggleButton value="system" aria-label={t('theme.system')}>
          <SettingsBrightnessOutlined fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('theme.dark')}>
        <ToggleButton value="dark" aria-label={t('theme.dark')}>
          <DarkModeOutlined fontSize="small" />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  )
}
