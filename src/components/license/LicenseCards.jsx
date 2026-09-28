import { Link } from 'react-router-dom'

// Horizontal bars for an outline's section weights (they sum to 100).
export function OutlineBars({ outline, counts }) {
  const max = Math.max(...outline.map(([, weight]) => weight))
  return (
    <div className="space-y-2.5">
      {outline.map(([label, weight]) => (
        <div key={label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-[13.5px]">
            <span className="text-paper">{label}</span>
            <span className="shrink-0 font-mono text-[12px] text-gold-400 tabular-nums">
              {weight}%{counts?.[label] != null ? ` · ${counts[label]} Q` : ''}
            </span>
          </div>
          <div className="h-1.5 bg-ink-800">
            <div className="h-full bg-gold-500/80" style={{ width: `${(weight / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// Thin stacked strip previewing the outline mix on a card.
function OutlineStrip({ outline }) {
  return (
    <div aria-hidden="true" className="flex h-1.5 gap-px bg-ink-950">
      {outline.map(([label, weight], index) => (
        <div
          className="h-full"
          key={label}
          style={{
            width: `${weight}%`,
            background: `color-mix(in srgb, var(--color-gold-500) ${100 - index * 11}%, var(--color-ink-800))`,
          }}
        />
      ))}
    </div>
  )
}

export function LicenseCard({ license, to, cta = 'View exam details', active = false }) {
  return (
    <Link
      className={`group flex flex-col border bg-ink-900 p-6 transition hover:-translate-y-0.5 hover:border-gold-500/60 ${
        active ? 'border-gold-500/70' : 'border-line'
      }`}
      to={to ?? `/licenses/${license.key}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Series {license.series}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
          {license.family}
        </span>
      </div>
      <h3 className="mb-2 font-serif text-2xl font-medium">{license.name}</h3>
      <p className="mb-5 flex-1 text-[14.5px] text-muted">{license.tagline}</p>
      <OutlineStrip outline={license.outline} />
      <p className="mt-4 font-mono text-[11px] tracking-wide text-paper uppercase transition group-hover:text-gold-400">
        {active ? 'Your current track · ' : ''}
        {cta} →
      </p>
    </Link>
  )
}
