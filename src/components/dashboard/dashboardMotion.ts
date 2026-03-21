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
