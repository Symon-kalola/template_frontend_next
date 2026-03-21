import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'

import { authCarouselSlides, type AuthCarouselSlide } from './authCarouselData'
import { AUTH_SHOWCASE_TRANSITION_MS } from './authShowcaseConstants'

const AUTO_MS = 6500

export type ModuleShowcaseCarouselProps = {
  onSlideChange?: (slide: AuthCarouselSlide) => void
}

export function ModuleShowcaseCarousel({ onSlideChange }: ModuleShowcaseCarouselProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const slides = authCarouselSlides
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    onSlideChange?.(slides[active]!)
  }, [active, onSlideChange, slides])

  const go = useCallback(
    (delta: number) => {
      setActive((i) => {
        const n = slides.length
        return (i + delta + n) % n
      })
    },
    [slides.length],
  )

  useEffect(() => {
    if (isPaused) return
    const id = window.setInterval(() => go(1), AUTO_MS)
    return () => window.clearInterval(id)
  }, [isPaused, go])

  const slide = slides[active]
  const ck = `carousel.${slide.slug}`

  function statusLabel(status: (typeof authCarouselSlides)[number]['status']): string {
    if (status === 'live') return t('status.live')
    if (status === 'beta') return t('status.beta')
    return t('status.comingSoon')
  }

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label={t('auth.carouselAria')}
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: 'relative',
        isolation: 'isolate',
        flex: { xs: '0 0 auto', md: '0 0 50%' },
        minWidth: 0,
        width: { xs: 1, md: '50%' },
        minHeight: { xs: '50vh', sm: '50vh', md: '100vh' },
        height: { md: '100vh' },
        overflow: 'hidden',
        bgcolor: '#050a08',
        alignSelf: { md: 'stretch' },
      }}
    >
      <Fade in timeout={AUTH_SHOWCASE_TRANSITION_MS} key={slide.id}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component="img"
            src={slide.heroImage}
            alt=""
            loading={active === 0 ? 'eager' : 'lazy'}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.02)',
            }}
          />
          {/* Readability + brand tint */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: [
                `linear-gradient(180deg, ${alpha('#020403', 0.15)} 0%, ${alpha('#020403', 0.55)} 45%, ${alpha(slide.accent, 0.35)} 100%)`,
                `linear-gradient(135deg, ${alpha(slide.accent, 0.25)} 0%, transparent 55%)`,
              ].join(', '),
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(120% 80% at 20% 0%, ${alpha(slide.accent, 0.35)} 0%, transparent 55%)`,
            }}
          />

          <Stack
            spacing={{ xs: 1.5, md: 2 }}
            sx={{
              position: 'relative',
              mt: 'auto',
              p: { xs: 3, sm: 3.5, md: 4 },
              pb: { xs: 4.5, md: 5 },
              maxWidth: 520,
            }}
          >
            <Chip
              size="small"
              label={statusLabel(slide.status)}
              sx={{
                alignSelf: 'flex-start',
                fontWeight: 700,
                letterSpacing: 0.02,
                color: 'common.white',
                bgcolor: alpha('#fff', slide.status === 'live' ? 0.22 : 0.12),
                border: `1px solid ${alpha('#fff', 0.25)}`,
                backdropFilter: 'blur(8px)',
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: alpha('#fff', 0.85),
                letterSpacing: 0.28,
                fontWeight: 700,
              }}
            >
              {t(`${ck}.name`)}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: 'common.white',
                fontWeight: 800,
                lineHeight: 1.2,
                fontSize: { xs: '1.55rem', sm: '1.75rem', md: '1.9rem' },
                textShadow: '0 2px 24px rgba(0,0,0,0.35)',
              }}
            >
              {t(`${ck}.tagline`)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha('#fff', 0.88),
                lineHeight: 1.55,
                maxWidth: 460,
                fontSize: { xs: '0.875rem', md: '0.95rem' },
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {t(`${ck}.description`)}
            </Typography>
          </Stack>
        </Box>
      </Fade>

      {/* Top brand strip */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: { xs: 2.5, md: 2.5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(180deg, ${alpha('#000', 0.55)} 0%, transparent 100%)`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: alpha('#fff', 0.92),
            fontWeight: 800,
            letterSpacing: 0.04,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          {t('common.brand')}
        </Typography>
        <Typography variant="caption" sx={{ color: alpha('#fff', 0.65), fontWeight: 600 }}>
          {t('auth.carouselStack')}
        </Typography>
      </Box>

      <IconButton
        onClick={() => go(-1)}
        aria-label={t('auth.carouselPrev')}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'common.white',
          bgcolor: alpha('#000', 0.22),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha('#fff', 0.12)}`,
          '&:hover': { bgcolor: alpha('#000', 0.38) },
        }}
      >
        <ChevronLeftRounded />
      </IconButton>
      <IconButton
        onClick={() => go(1)}
        aria-label={t('auth.carouselNext')}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'common.white',
          bgcolor: alpha('#000', 0.22),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha('#fff', 0.12)}`,
          '&:hover': { bgcolor: alpha('#000', 0.38) },
        }}
      >
        <ChevronRightRounded />
      </IconButton>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 24 },
          left: 0,
          right: 0,
        }}
      >
        {slides.map((s, i) => (
          <Box
            key={s.id}
            component="button"
            type="button"
            onClick={() => setActive(i)}
            aria-label={t('auth.carouselDot', { n: i + 1 })}
            aria-current={i === active ? 'true' : undefined}
            sx={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              p: 0,
              cursor: 'pointer',
              transition: `width ${AUTH_SHOWCASE_TRANSITION_MS * 0.5}ms ease, background-color ${AUTH_SHOWCASE_TRANSITION_MS * 0.5}ms ease`,
              bgcolor: i === active ? theme.palette.common.white : alpha('#fff', 0.28),
              '&:hover': {
                bgcolor: i === active ? theme.palette.common.white : alpha('#fff', 0.45),
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
