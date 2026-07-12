import { NavLink } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { CheckoutButton } from '../CheckoutButton.jsx'

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <path d="M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z" />
    ),
  },
  {
    to: '/study',
    label: 'Study',
    icon: (
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
    ),
  },
  {
    to: '/practice-exam',
    label: 'Practice Exam',
    icon: (
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    ),
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  },
  {
    to: '/account',
    label: 'Account',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
      </>
    ),
  },
]

function NavIcon({ children }) {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  )
}

export function Sidebar({ stripePaymentLinkUrl, onNavigate, onOpenAria }) {
  return (
    <div className="flex h-full flex-col border-r border-line bg-ink-950">
      <div className="border-b border-line px-6 py-6">
        <p className="font-serif text-lg font-medium">PassPro</p>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-muted uppercase">
          Wisconsin Life &amp; Health
        </p>
      </div>

      <nav aria-label="Member navigation" className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-gold-500/10 text-gold-400'
                  : 'text-muted hover:bg-white/5 hover:text-paper'
              }`
            }
            key={item.to}
            onClick={onNavigate}
            to={item.to}
          >
            <NavIcon>{item.icon}</NavIcon>
            {item.label}
          </NavLink>
        ))}

        <button
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-gold-400 transition hover:bg-gold-500/10"
          onClick={() => {
            onOpenAria?.()
            onNavigate?.()
          }}
          type="button"
        >
          <NavIcon>
            <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
            <circle cx="12" cy="12" r="3.5" />
          </NavIcon>
          Talk to ARIA
        </button>
      </nav>

      <div className="space-y-3 border-t border-line px-4 py-5">
        <CheckoutButton stripePaymentLinkUrl={stripePaymentLinkUrl} />
        <div className="flex items-center gap-2 px-1">
          <UserButton afterSignOutUrl={import.meta.env.BASE_URL} />
          <span className="font-mono text-[11px] text-muted">Manage account</span>
        </div>
      </div>
    </div>
  )
}
