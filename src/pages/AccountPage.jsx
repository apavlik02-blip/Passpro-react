import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { AccessGate } from '../components/AccessGate.jsx'
import { useAccess } from '../hooks/useAccess.js'

export function AccountPage() {
  const { user } = useUser()
  const { hasAccess, grantedAt, loading, redeemCode, configured } = useAccess()
  const open = !configured || hasAccess

  let accessStatus = 'The access service is not configured — the platform is open.'
  if (configured) {
    if (loading) {
      accessStatus = 'Checking your access...'
    } else if (hasAccess) {
      accessStatus = `Access active${grantedAt ? ` since ${new Date(grantedAt).toLocaleDateString()}` : ''} — it follows your account on every device.`
    } else {
      accessStatus = 'Enter the access code you were given to unlock the study platform.'
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Account
        </p>
        <h2 className="font-serif text-3xl font-medium">
          {open && !loading
            ? "You're all set."
            : 'One access code unlocks the full study platform.'}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="border border-line bg-ink-900 p-6">
          <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Clerk profile
          </p>
          <ul className="space-y-2 text-paper">
            <li>
              <strong>Name:</strong> {user?.fullName ?? 'Not provided'}
            </li>
            <li>
              <strong>Email:</strong>{' '}
              {user?.primaryEmailAddress?.emailAddress ?? 'No primary email'}
            </li>
            <li>
              <strong>User ID:</strong> {user?.id}
            </li>
          </ul>
        </article>

        <article className="border border-line bg-ink-900 p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              Access
            </p>
            {configured && hasAccess ? (
              <span className="border border-line px-2.5 py-1 font-mono text-[11px] text-gold-400">
                UNLOCKED
              </span>
            ) : null}
          </div>
          <p className="mb-4 text-lg text-paper">{accessStatus}</p>
          {configured && !loading && !hasAccess ? (
            <AccessGate onRedeem={redeemCode} />
          ) : null}
          {open && !loading ? (
            <Link
              className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              to="/dashboard"
            >
              Go to dashboard
            </Link>
          ) : null}
        </article>
      </div>
    </section>
  )
}
