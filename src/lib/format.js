const ACRONYMS = new Set(['aca', 'hipaa', 'ltc', 'hmo', 'ppo', 'pos', 'hdhp'])

export function humanizeSlug(slug) {
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
