import type { ModuleStatus } from '@/modules/registry'

export type AuthCarouselSlide = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  status: ModuleStatus
  accent: string
  /** Curated hero art — replace with `/your-path.jpg` from `public/` when you have brand assets */
  heroImage: string
}

/** Thematic Unsplash images; swap for production module screenshots or branded photography */
const heroBySlug: Record<string, string> = {
  nyumba:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  sendus:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  courier:
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1600&q=80',
  market:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
  services:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
  payments:
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80',
}

const fallbackHero =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80'

export const authCarouselSlides: AuthCarouselSlide[] = [
  {
    id: 'nyumba',
    slug: 'nyumba',
    name: '265Nyumba',
    tagline: 'Rent without agent fees',
    description:
      'Landlords list homes; tenants search by city, price, and rooms—then contact owners directly.',
    status: 'live',
    accent: '#0d4f2b',
    heroImage: heroBySlug.nyumba ?? fallbackHero,
  },
  {
    id: 'sendus',
    slug: 'sendus',
    name: 'SendUs',
    tagline: 'Errands on demand',
    description:
      'Groceries, parcel pickup, bill payments, and document runs—runners accept jobs when you need them.',
    status: 'live',
    accent: '#1565c0',
    heroImage: heroBySlug.sendus ?? fallbackHero,
  },
  {
    id: 'courier',
    slug: 'courier',
    name: '265Courier',
    tagline: 'City-to-city parcels',
    description:
      'Book Blantyre ↔ Lilongwe deliveries with tracking and clear pricing for senders and drivers.',
    status: 'coming_soon',
    accent: '#6a1b9a',
    heroImage: heroBySlug.courier ?? fallbackHero,
  },
  {
    id: 'market',
    slug: 'market',
    name: '265Market',
    tagline: 'Buy & sell locally',
    description:
      'Peer-to-peer listings with chat and safer handoffs than random social threads.',
    status: 'coming_soon',
    accent: '#e65100',
    heroImage: heroBySlug.market ?? fallbackHero,
  },
  {
    id: 'services',
    slug: 'services',
    name: '265Services',
    tagline: 'Find trusted pros',
    description:
      'Plumbers, electricians, cleaners—post a job, compare offers, and hire nearby.',
    status: 'coming_soon',
    accent: '#455a64',
    heroImage: heroBySlug.services ?? fallbackHero,
  },
  {
    id: 'payments',
    slug: 'payments',
    name: '265Payments',
    tagline: 'Wallet & settlements',
    description:
      'Mobile money and bank rails across modules—escrow, fees, and payouts in one place.',
    status: 'coming_soon',
    accent: '#2e7d32',
    heroImage: heroBySlug.payments ?? fallbackHero,
  },
]
