import type { ReactNode } from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'

import { authCarouselSlides, type AuthCarouselSlide } from './authCarouselData'
import { ModuleShowcaseCarousel } from './ModuleShowcaseCarousel'
import { AUTH_SHOWCASE_TRANSITION_MS } from './authShowcaseConstants'

type AuthSplitShellProps = {
  children: ReactNode
}

/**
 * Split layout: full half-screen showcase (md+) + form column, with accent wash on the form
 * that transitions in sync with the carousel slide changes.
 */
export function AuthSplitShell({ children }: AuthSplitShellProps) {
  const theme = useTheme()
  const [slide, setSlide] = useState<AuthCarouselSlide>(authCarouselSlides[0]!)
  const tint =
    theme.palette.mode === 'light'
      ? { strong: 0.11, soft: 0.05 }
      : { strong: 0.18, soft: 0.09 }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'stretch' },
        bgcolor: 'background.default',
      }}
    >
      <ModuleShowcaseCarousel onSlideChange={setSlide} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 3, md: 4 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          minHeight: { xs: 'min-content', md: '100vh' },
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: [
              `radial-gradient(120% 90% at 100% 0%, ${alpha(slide.accent, tint.strong)} 0%, transparent 52%)`,
              `linear-gradient(145deg, ${alpha(slide.accent, tint.soft)} 0%, transparent 42%)`,
            ].join(', '),
            transition: `background ${AUTH_SHOWCASE_TRANSITION_MS}ms ease`,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
