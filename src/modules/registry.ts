import type { SvgIconComponent } from '@mui/icons-material'
import {
  AccountBalanceWalletOutlined,
  ConstructionOutlined,
  HomeWorkOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  PaymentsOutlined,
  RocketLaunchOutlined,
  StorefrontOutlined,
  TwoWheelerOutlined,
  WorkOutline,
} from '@mui/icons-material'

export type ModuleStatus = 'live' | 'beta' | 'coming_soon'

export type PlatformModule = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  Icon: SvgIconComponent
  accent: string
  status: ModuleStatus
}

export const platformModules: PlatformModule[] = [
  {
    id: 'nyumba',
    slug: 'nyumba',
    name: '265Nyumba',
    tagline: 'Rent without agent fees',
    description:
      'Landlords list homes; tenants search by city, price, and rooms—then contact owners directly. Built to cut the “half rent to agents” problem in Malawi.',
    Icon: HomeWorkOutlined,
    accent: '#0d4f2b',
    status: 'live',
  },
  {
    id: 'sendus',
    slug: 'sendus',
    name: 'SendUs',
    tagline: 'Errands on demand',
    description:
      'Request groceries, parcel pickup, bill payments, queue standing, or document runs. Runners accept jobs like a lightweight “Uber for errands”.',
    Icon: LocalShippingOutlined,
    accent: '#1565c0',
    status: 'live',
  },
  {
    id: 'courier',
    slug: 'courier',
    name: '265Courier',
    tagline: 'City-to-city parcels',
    description:
      'Book Blantyre ↔ Lilongwe (and beyond) deliveries with tracking and clear pricing for senders and drivers.',
    Icon: Inventory2Outlined,
    accent: '#6a1b9a',
    status: 'coming_soon',
  },
  {
    id: 'market',
    slug: 'market',
    name: '265Market',
    tagline: 'Buy & sell locally',
    description:
      'Electronics, furniture, phones, and cars—peer-to-peer listings with chat and safer handoffs than random Facebook threads.',
    Icon: StorefrontOutlined,
    accent: '#e65100',
    status: 'coming_soon',
  },
  {
    id: 'services',
    slug: 'services',
    name: '265Services',
    tagline: 'Find trusted pros',
    description:
      'Plumbers, electricians, cleaners, movers—post a job, compare offers, and hire verified service providers near you.',
    Icon: ConstructionOutlined,
    accent: '#455a64',
    status: 'coming_soon',
  },
  {
    id: 'jobs',
    slug: 'jobs',
    name: '265Jobs',
    tagline: 'Gigs & short work',
    description:
      'Event help, cleaning shifts, security, temp labour—quick jobs for students and casual workers.',
    Icon: WorkOutline,
    accent: '#00695c',
    status: 'coming_soon',
  },
  {
    id: 'property-mgmt',
    slug: 'property-mgmt',
    name: '265Property Management',
    tagline: 'For multi-unit landlords',
    description:
      'Rent rolls, tenant records, reminders, maintenance tickets, and simple reports—after Nyumba scales, this owns the landlord back-office.',
    Icon: PaymentsOutlined,
    accent: '#283593',
    status: 'coming_soon',
  },
  {
    id: 'payments',
    slug: 'payments',
    name: '265Payments',
    tagline: 'Wallet & settlements',
    description:
      'Mobile money and bank rails across modules: escrow for SendUs, listing fees for Nyumba, and payouts to runners or couriers.',
    Icon: AccountBalanceWalletOutlined,
    accent: '#2e7d32',
    status: 'coming_soon',
  },
  {
    id: 'ride',
    slug: 'ride',
    name: '265Ride',
    tagline: 'Suggested: shared mobility',
    description:
      'Motorbike or car rides and pooled routes in Blantyre / Lilongwe—natural upsell once trust and payments exist on the platform.',
    Icon: TwoWheelerOutlined,
    accent: '#ad1457',
    status: 'coming_soon',
  },
  {
    id: 'launchpad',
    slug: 'launchpad',
    name: 'Module launchpad',
    tagline: 'Internal',
    description:
      'Placeholder for future verticals (e.g. agritech leads, student housing, or B2B logistics). Swap in real modules as you ship.',
    Icon: RocketLaunchOutlined,
    accent: '#5d4037',
    status: 'coming_soon',
  },
]

export function getModuleBySlug(slug: string): PlatformModule | undefined {
  return platformModules.find((m) => m.slug === slug)
}
