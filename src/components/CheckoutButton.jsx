import { subscriptionPrice } from '../lib/constants.js'

export function CheckoutButton({ stripePaymentLinkUrl }) {
  const stripeConfigured = Boolean(stripePaymentLinkUrl)

  return (
    <button
      className="inline-flex min-w-[180px] items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-gold-500"
      disabled={!stripeConfigured}
      onClick={() => window.location.assign(stripePaymentLinkUrl)}
      type="button"
    >
      {stripeConfigured ? `Start access for ${subscriptionPrice}` : 'Add Stripe payment link'}
    </button>
  )
}
