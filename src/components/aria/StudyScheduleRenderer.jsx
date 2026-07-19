// Renders the structured JSON that the aria Edge Function's
// create_study_schedule tool returns (see supabase/functions/aria/tools.ts,
// StudySchedule interface) as a compact Ledger-styled plan inside the ARIA
// chat modal: summary stats, focus domains, then day rows grouped into weeks
// with milestone (timed simulation) days highlighted.

import { humanizeSlug } from '../../lib/format.js'

function formatDay(isoDate) {
  const parsed = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return isoDate
  return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function Stat({ label, value }) {
  return (
    <div className="bg-ink-900 px-3 py-2.5">
      <p className="font-mono text-[10px] tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-semibold text-gold-500 tabular-nums">{value}</p>
    </div>
  )
}

export function StudyScheduleRenderer({ schedule }) {
  if (!schedule || !Array.isArray(schedule.schedule) || schedule.schedule.length === 0) {
    return null
  }

  const days = schedule.schedule
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="mt-3 border border-line bg-ink-950 text-paper">
      <div className="border-b border-line px-4 py-3">
        <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Study schedule
        </p>
        <p className="mt-1 text-xs text-muted">
          Readiness {schedule.starting_readiness}% today, targeting {schedule.target_readiness}% by
          exam day.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
        <Stat label="Exam date" value={formatDay(schedule.exam_date)} />
        <Stat label="Days left" value={schedule.days_until_exam} />
        <Stat label="Daily" value={`${schedule.daily_minutes} min`} />
      </div>

      {schedule.weak_domains_focus?.length ? (
        <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3">
          <span className="mr-1 font-mono text-[10px] tracking-wide text-muted uppercase">
            Focus
          </span>
          {schedule.weak_domains_focus.map((domain) => (
            <span
              className="border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 font-mono text-[10px] text-gold-400"
              key={domain}
            >
              {humanizeSlug(domain)}
            </span>
          ))}
        </div>
      ) : null}

      <div className="max-h-64 overflow-y-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex}>
            <p className="border-b border-line bg-ink-900 px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest text-muted uppercase">
              Week {weekIndex + 1}
            </p>
            {week.map((item) => {
              const milestone = item.event?.includes('Simulation')
              return (
                <div
                  className={`flex items-center justify-between gap-3 border-b border-line px-4 py-2 ${
                    milestone ? 'border-l-2 border-l-gold-500 bg-gold-500/10' : ''
                  }`}
                  key={item.day}
                >
                  <div className="min-w-0">
                    <p className="text-xs">
                      <span className="font-mono text-muted tabular-nums">
                        D{String(item.day).padStart(2, '0')}
                      </span>{' '}
                      <span className="font-mono text-muted">{formatDay(item.date)}</span>{' '}
                      <span className={milestone ? 'font-semibold text-gold-400' : 'text-paper'}>
                        {milestone
                          ? item.event
                          : item.focus_domains.map((d) => humanizeSlug(d)).join(' · ')}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {item.spaced_repetition ? (
                      <span
                        className="border border-line px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-muted uppercase"
                        title="Spaced repetition review"
                      >
                        SR
                      </span>
                    ) : null}
                    <span className="font-mono text-[11px] text-muted tabular-nums">
                      {item.minutes}m
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {schedule.notes ? (
        <p className="px-4 py-2.5 text-[11px] text-muted">{schedule.notes}</p>
      ) : null}
    </div>
  )
}
