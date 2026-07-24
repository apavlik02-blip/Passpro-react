import { useState } from 'react'

const errorMessages = {
  invalid_code: 'That code is not valid. Check for typos and try again.',
  network: 'Could not reach the access service. Check your connection and try again.',
  not_configured: 'The access service is not configured.',
}

// onRedeem(code) -> { ok, error } — provided by useAccess().redeemCode, which
// validates the code server-side so valid codes never ship in the bundle.
export function AccessGate({ onRedeem }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const candidate = code.trim()
    if (!candidate) {
      setError('Enter your access code.')
      return
    }
    setPending(true)
    const result = await onRedeem(candidate)
    setPending(false)
    if (!result.ok) {
      setError(errorMessages[result.error] ?? 'Something went wrong. Try again in a moment.')
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label
        className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase"
        htmlFor="access-code"
      >
        Access code
      </label>
      <div className="flex flex-wrap gap-3">
        <input
          autoComplete="off"
          className="min-w-[200px] flex-1 rounded-sm border border-line bg-ink-950 px-4 py-3 font-mono text-sm text-paper outline-none transition focus:border-gold-500/70"
          id="access-code"
          onChange={(event) => {
            setCode(event.target.value)
            setError('')
          }}
          placeholder="Enter your code"
          spellCheck={false}
          value={code}
        />
        <button
          className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-55"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Checking...' : 'Unlock access'}
        </button>
      </div>
      {error ? <p className="font-mono text-xs text-red-400">{error}</p> : null}
    </form>
  )
}
