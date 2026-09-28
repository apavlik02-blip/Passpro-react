import { useEffect, useRef, useState } from 'react'
import { useLicense } from '../../hooks/useLicense.jsx'
import { LICENSE_FAMILIES, LICENSES } from '../../lib/licenses.js'

// Compact dropdown for switching the active Wisconsin license track.
export function LicenseSwitcher({ onChange }) {
  const { license, setLicenseKey } = useLicense()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handlePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const choose = (key) => {
    setLicenseKey(key)
    setOpen(false)
    onChange?.(key)
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between gap-3 border border-line bg-ink-900 px-3 py-2.5 text-left transition hover:border-gold-500/50"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="min-w-0">
          <span className="block font-mono text-[10px] tracking-widest text-muted uppercase">
            Studying for · {license.series}
          </span>
          <span className="block truncate font-serif text-[15px] text-paper">{license.name}</span>
        </span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-gold-500 transition ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div
          className="absolute right-0 left-0 z-50 mt-1 border border-line bg-ink-950 py-1 shadow-2xl shadow-black/50"
          role="listbox"
        >
          {LICENSE_FAMILIES.map((family) => (
            <div key={family}>
              <p className="px-3 pt-2.5 pb-1 font-mono text-[10px] tracking-widest text-muted uppercase">
                {family}
              </p>
              {LICENSES.filter((item) => item.family === family).map((item) => {
                const active = item.key === license.key
                return (
                  <button
                    aria-selected={active}
                    className={`flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm transition ${
                      active ? 'bg-gold-500/10 text-gold-400' : 'text-paper hover:bg-white/5'
                    }`}
                    key={item.key}
                    onClick={() => choose(item.key)}
                    role="option"
                    type="button"
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-[11px] text-muted tabular-nums">
                      {item.series}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
