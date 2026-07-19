import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Sidebar } from './Sidebar.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { AriaModal } from '../aria/AriaModal.jsx'
import { OnboardingFlow } from '../aria/OnboardingFlow.jsx'

export function MemberLayout({ stripePaymentLinkUrl }) {
  const { user } = useUser()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [ariaOpen, setAriaOpen] = useState(false)
  const openAria = () => setAriaOpen(true)

  return (
    <div className="min-h-screen bg-ink-950 text-paper md:flex">
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="fixed h-screen w-64">
          <Sidebar onOpenAria={openAria} stripePaymentLinkUrl={stripePaymentLinkUrl} />
        </div>
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-ink-950/80"
            onClick={() => setMobileNavOpen(false)}
            type="button"
          />
          <div className="relative h-full w-72 max-w-[80vw]">
            <Sidebar
              onNavigate={() => setMobileNavOpen(false)}
              onOpenAria={openAria}
              stripePaymentLinkUrl={stripePaymentLinkUrl}
            />
          </div>
        </div>
      ) : null}

      <div className="flex-1 md:min-w-0">
        <header className="flex items-center justify-between border-b border-line bg-ink-950 px-6 py-4 md:hidden">
          <div>
            <p className="font-serif text-sm font-medium">PassPro</p>
            <p className="font-mono text-[11px] text-muted">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
            </p>
          </div>
          <button
            aria-label="Open navigation"
            className="rounded-sm border border-line p-2 text-paper"
            onClick={() => setMobileNavOpen(true)}
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
          <Outlet context={{ openAria }} />
        </main>
        <SiteFooter />
      </div>

      <AriaModal onClose={() => setAriaOpen(false)} open={ariaOpen} />
      <OnboardingFlow />
    </div>
  )
}
