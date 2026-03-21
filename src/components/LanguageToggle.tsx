import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'

import type { AppLanguage } from '@/i18n'

type LanguageToggleProps = {
  size?: 'small' | 'medium'
}

export function LanguageToggle({ size = 'small' }: LanguageToggleProps) {
  const { i18n, t } = useTranslation()
  const lang: AppLanguage = i18n.language.startsWith('ny') ? 'ny' : 'en'

  function handleChange(_: MouseEvent<HTMLElement>, value: AppLanguage | null) {
    if (value !== null) void i18n.changeLanguage(value)
  }

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      size={size}
      onChange={handleChange}
      aria-label={t('language.label')}
      sx={{
        '& .MuiToggleButton-root': { px: { xs: 1, sm: 1.25 }, fontWeight: 700, fontSize: '0.75rem' },
      }}
    >
      <Tooltip title={t('language.en')}>
        <ToggleButton value="en" aria-label={t('language.en')}>
          EN
        </ToggleButton>
      </Tooltip>
      <Tooltip title={t('language.ny')}>
        <ToggleButton value="ny" aria-label={t('language.ny')}>
          NY
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  )
}
