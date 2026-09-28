import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `transition hover:text-paper ${isActive ? 'text-gold-400' : ''}`

export function PublicHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-10">
        <Link className="flex items-baseline gap-2" to="/">
          <span className="font-serif text-xl font-medium">PassPro</span>
          <span className="hidden font-mono text-[10px] tracking-widest text-gold-500 uppercase sm:inline">
            Wisconsin
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-widest text-muted uppercase">
          <NavLink className={linkClass} to="/licenses">
            Licenses
          </NavLink>
          <NavLink className={linkClass} to="/agencies">
            For agencies
          </NavLink>
          <NavLink className={linkClass} to="/blog">
            Study guides
          </NavLink>
          <NavLink className={linkClass} to="/pricing">
            Pricing
          </NavLink>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-paper transition hover:text-gold-400" type="button">
                SIGN IN
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <NavLink className="text-gold-400 transition hover:text-gold-500" to="/dashboard">
              Dashboard
            </NavLink>
            <UserButton afterSignOutUrl={import.meta.env.BASE_URL} />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
