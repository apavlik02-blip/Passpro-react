// Licensed in 30 Days — agency pricing (business config; see the
// "Licensed in 30 Days" plan in the Claude project). Billing is manual during
// pilots; these drive the /agencies page only.
export const AGENCY_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$750',
    period: '/mo',
    recruits: 'Up to 10 recruits',
    blurb: 'For agencies bringing on a few new producers each quarter.',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,500',
    period: '/mo',
    recruits: 'Up to 25 recruits',
    blurb: 'For agencies with steady recruiting. The pilot runs on this plan.',
    featured: true,
  },
  {
    id: 'imo',
    name: 'IMO',
    price: '$4,000+',
    period: '/mo',
    recruits: 'Unlimited recruits',
    blurb: 'For IMOs and FMOs licensing recruits across many downline agencies.',
  },
  {
    id: 'payg',
    name: 'Pay as you go',
    price: '$199',
    period: '/recruit',
    recruits: 'Per recruit',
    blurb: 'For occasional hires. No monthly commitment.',
  },
]

export const PLAN_NOTES = [
  '$49 per recruit above your plan cap',
  'Annual prepay: 2 months free',
  'Free 60-day pilot on Growth, in exchange for pass-rate data and a testimonial',
]

export const INCLUDED = [
  'Wisconsin exam prep for every recruit: lessons, 100-question mock exams, drills, flashcards',
  'ARIA, the AI study coach, available around the clock',
  'A 30-day license path for each recruit, from prelicensing through appointments',
  'Owner dashboard: every recruit’s scores, readiness, and where they’re stuck',
  'Weekly progress report you can forward to managers',
]
