import { useOutletContext } from 'react-router-dom'

export default function PremiumRouteGuard({ children }) {
  const { user } = useOutletContext()

  if (!user || !user.isPremium) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold">Upgrade to Premium</h2>
        <p className="text-center text-muted">
          This feature is available for premium members only. Please upgrade your account to access this content.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gold-500 text-white rounded"
          onClick={() => {
            // Placeholder for Stripe checkout logic
            alert('Redirecting to payment gateway...')
          }}
        >
          Upgrade Now
        </button>
      </div>
    )
  }

  return children
}
