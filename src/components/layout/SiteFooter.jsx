import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>&copy; 2026 PassPro</span>
        <nav className="flex items-center gap-5">
          <Link className="transition hover:text-paper" to="/terms">
            Terms
          </Link>
          <Link className="transition hover:text-paper" to="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-paper" to="/refunds">
            Refunds
          </Link>
        </nav>
      </div>
    </footer>
  )
}
