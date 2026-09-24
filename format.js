const ACRONYMS = new Set(['aca', 'hipaa', 'ltc', 'hmo', 'ppo', 'pos', 'hdhp', 'wi', 'pc'])

// Display labels for domains whose slug doesn't humanize cleanly.
const DOMAIN_LABELS = {
  pc_regulation: 'P&C Regulation & Licensing',
  wi_pc_statutes: 'Wisconsin P&C Statutes',
  wi_property_regulation: 'Wisconsin Property Rules',
  wi_auto_regulation: 'Wisconsin Auto Law',
  pc_general_insurance: 'General Insurance (P&C)',
  businessowners_property: 'Businessowners — Property',
  businessowners_liability: 'Businessowners — Liability',
  workers_comp: 'Worker’s Compensation',
  personal_other: 'Flood, Boats & Other Personal',
  umbrella: 'Umbrella & Excess',
  casualty_other: 'Specialty Liability & Surety',
}

export function humanizeSlug(slug) {
  if (!slug) return ''
  if (DOMAIN_LABELS[slug]) return DOMAIN_LABELS[slug]

  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ')
}
