import { useUser } from '@clerk/clerk-react'
import { CheckoutButton } from '../components/CheckoutButton.jsx'
import { useEntitlement } from '../hooks/useEntitlement.js'
import { subscriptionPrice } from '../lib/constants.js'

export function AccountPage({ stripePaymentLinkUrl }) {
  const { user } = useUser()
  const { hasPaid, paidAt, loading, refetch, configured } = useEntitlement()

  let billingStatus = `Stripe checkout is configured at ${subscriptionPrice}.`
  if (configured) {
    if (loading) {
      billingStatus = 'Checking your access...'
    } else if (hasPaid) {
      billingStatus = `Access active${paidAt ? ` since ${new Date(paidAt).toLocaleDateString()}` : ''}.`
    } else {
      billingStatus = `No active access yet. Full access is ${subscriptionPrice}, one time.`
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Account
        </p>
        <h2 className="font-serif text-3xl font-medium">
          {hasPaid ? "You're all set." : 'One purchase unlocks the full study platform.'}
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
              Billing
            </p>
            {configured && hasPaid ? (
              <span className="border border-line px-2.5 py-1 font-mono text-[11px] text-gold-400">
                PAID
              </span>
            ) : null}
          </div>
          <p className="mb-4 text-lg text-paper">{billingStatus}</p>
          <div className="flex flex-wrap items-center gap-3">
            {!hasPaid ? <CheckoutButton stripePaymentLinkUrl={stripePaymentLinkUrl} /> : null}
            {configured ? (
              <button
                className="rounded-sm border border-line px-4 py-2.5 text-sm font-semibold text-paper transition hover:border-gold-500/60"
                onClick={refetch}
                type="button"
              >
                {hasPaid ? 'Refresh status' : "I just paid, check again"}
              </button>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  )
}
