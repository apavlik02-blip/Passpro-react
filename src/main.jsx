import { ClerkProvider } from '@clerk/clerk-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const app = (
  <React.StrictMode>
    <App clerkEnabled={Boolean(clerkPublishableKey)} />
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
