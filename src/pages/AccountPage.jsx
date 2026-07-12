import { useUser } from '@clerk/clerk-react'
import { CheckoutButton } from '../components/CheckoutButton.jsx'
import { subscriptionPrice } from '../lib/constants.js'

export function AccountPage({ stripePaymentLinkUrl }) {
  const { user } = useUser()

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Account
        </p>
        <h2 className="font-serif text-3xl font-medium">
          Member identity is live, billing is link-based for now.
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
          <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Billing
          </p>
          <p className="mb-3 text-lg text-paper">
            Stripe checkout is configured at {subscriptionPrice}.
          </p>
          <p className="mb-4 text-muted">
            Subscription state is not stored in the app yet. The next backend step is syncing
            Stripe purchases to user access.
          </p>
          <div>
            <CheckoutButton stripePaymentLinkUrl={stripePaymentLinkUrl} />
          </div>
        </article>
      </div>
    </section>
  )
}
