import { ClerkProvider } from '@clerk/clerk-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const stripePaymentLinkUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL ?? ''

const app = (
  <React.StrictMode>
    <App
      clerkEnabled={Boolean(clerkPublishableKey)}
      stripePaymentLinkUrl={stripePaymentLinkUrl}
    />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  clerkPublishableKey ? (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInFallbackRedirectUrl={import.meta.env.BASE_URL}
      signUpFallbackRedirectUrl={import.meta.env.BASE_URL}
    >
      {app}
    </ClerkProvider>
  ) : (
    app
  ),
)
