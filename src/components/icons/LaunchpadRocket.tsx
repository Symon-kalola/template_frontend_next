import FlashOn from '@mui/icons-material/FlashOn'
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

type Tone = 'default' | 'onPrimary'

type LaunchpadRocketMarkProps = {
  size?: number
  tone?: Tone
  sx?: SxProps<Theme>
}

/** Rocket + flash — brand mark (replaces umbrella everywhere). */
export function LaunchpadRocketMark({ size = 24, tone = 'default', sx }: LaunchpadRocketMarkProps) {
  const onPrimary = tone === 'onPrimary'

  return (
    <Box
      component="span"
      aria-hidden
      sx={[
        {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <RocketLaunchOutlined
        sx={{
          fontSize: size * 0.92,
          display: 'block',
          color: onPrimary ? 'primary.contrastText' : 'primary.main',
        }}
      />
      <FlashOn
        sx={{
          position: 'absolute',
          right: size * 0.02,
          top: size * 0.08,
          fontSize: size * 0.5,
          color: onPrimary ? 'warning.light' : 'secondary.main',
          filter: onPrimary ? 'drop-shadow(0 0 1px rgba(0,0,0,0.35))' : undefined,
        }}
      />
    </Box>
  )
}

type LaunchpadRocketLoaderProps = {
  size?: number
  tone?: Tone
  sx?: SxProps<Theme>
}

/** Firing rocket + flash — loading state. */
export function LaunchpadRocketLoader({ size = 26, tone = 'onPrimary', sx }: LaunchpadRocketLoaderProps) {
  const onPrimary = tone === 'onPrimary'
  const rocketColor = onPrimary ? 'primary.contrastText' : 'primary.main'

  return (
    <Box
      component="span"
      role="status"
      aria-label="Loading"
      sx={[
        {
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: size * 1.15,
          height: size * 1.2,
          flexShrink: 0,
          overflow: 'visible',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <RocketLaunchOutlined
        sx={{
          fontSize: size,
          color: rocketColor,
          zIndex: 1,
          '@keyframes launchpadRumble': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-1.5px)' },
          },
          animation: 'launchpadRumble 0.14s ease-in-out infinite',
        }}
      />
      <FlashOn
        sx={{
          position: 'absolute',
          right: size * 0.02,
          top: size * 0.04,
          fontSize: size * 0.44,
          color: onPrimary ? 'warning.light' : 'secondary.main',
          zIndex: 2,
          filter: onPrimary ? 'drop-shadow(0 0 1px rgba(0,0,0,0.35))' : undefined,
          '@keyframes flashPulse': {
            '0%, 100%': { opacity: 0.85 },
            '50%': { opacity: 1 },
          },
          animation: 'flashPulse 0.2s ease-in-out infinite',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -1,
          left: '50%',
          width: size * 0.5,
          height: size * 0.42,
          borderRadius: '45% 45% 55% 55%',
          background: 'linear-gradient(180deg, rgba(255, 220, 120, 0.95) 0%, rgba(255, 140, 50, 0.9) 40%, rgba(220, 60, 40, 0.35) 100%)',
          mixBlendMode: 'screen',
          '@keyframes launchpadFlame': {
            '0%, 100%': {
              opacity: 0.88,
              transform: 'translateX(-50%) scaleY(1) scaleX(1)',
            },
            '50%': {
              opacity: 1,
              transform: 'translateX(-50%) scaleY(1.35) scaleX(1.08)',
            },
          },
          animation: 'launchpadFlame 0.16s ease-in-out infinite',
          transform: 'translateX(-50%)',
          filter: 'blur(0.6px)',
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: size * 0.08,
          left: '50%',
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: '50%',
          bgcolor: 'rgba(255, 255, 220, 0.75)',
          '@keyframes launchpadCore': {
            '0%, 100%': { opacity: 0.65, transform: 'translateX(-50%) scale(0.85)' },
            '50%': { opacity: 1, transform: 'translateX(-50%) scale(1.15)' },
          },
          animation: 'launchpadCore 0.12s ease-in-out infinite',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      />
    </Box>
  )
}
