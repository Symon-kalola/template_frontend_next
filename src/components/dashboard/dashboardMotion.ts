import { keyframes } from '@emotion/react'

/** Entrance — module cards, sections */
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/** Hero headline */
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

/** Soft ambient motion for decorative orbs (respect reduced-motion in components) */
export const drift = keyframes`
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(2%, -2%) scale(1.03);
  }
  66% {
    transform: translate(-1.5%, 1.5%) scale(0.98);
  }
`

/** Live: green core softly pulses */
export const greenBeamCore = keyframes`
  0%,
  100% {
    box-shadow:
      0 0 0 0 rgba(76, 175, 80, 0.55),
      0 0 10px rgba(46, 125, 50, 0.45);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 0 5px rgba(76, 175, 80, 0.15),
      0 0 18px rgba(46, 125, 50, 0.75);
    transform: scale(1.05);
  }
`

/** Expanding ring — “beaming” halo */
export const greenBeamRing = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0.65;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
`

