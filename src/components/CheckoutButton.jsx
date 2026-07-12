import { useUser } from '@clerk/clerk-react'
import { subscriptionPrice } from '../lib/constants.js'

export function CheckoutButton({ stripePaymentLinkUrl }) {
  const { user } = useUser()
  const stripeConfigured = Boolean(stripePaymentLinkUrl)

  function goToCheckout() {
    const url = new URL(stripePaymentLinkUrl)
    if (user?.id) {
      url.searchParams.set('client_reference_id', user.id)
    }
    window.location.assign(url.toString())
  }

  return (
    <button
      className="inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-gold-500"
      disabled={!stripeConfigured}
      onClick={goToCheckout}
      type="button"
    >
      {stripeConfigured ? `Start access for ${subscriptionPrice}` : 'Add Stripe payment link'}
    </button>
  )
}
