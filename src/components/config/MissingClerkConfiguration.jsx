export function MissingClerkConfiguration() {
  return (
    <main className="min-h-screen bg-ink-950 px-6 py-10 text-paper sm:px-10">
      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,420px)]">
        <div>
          <p className="mb-4 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Configuration required
          </p>
          <h1 className="mb-4 font-serif text-4xl leading-tight font-medium sm:text-5xl">
            Add your Clerk publishable key to enable auth.
          </h1>
          <p className="max-w-[62ch] text-lg leading-relaxed text-muted">
            The member routes are built, but the app needs
            <code className="mx-1 bg-white/10 px-1.5 py-0.5 font-mono">
              VITE_CLERK_PUBLISHABLE_KEY
            </code>
            in <code className="mx-1 bg-white/10 px-1.5 py-0.5 font-mono">.env.local</code> before
            users can sign in.
          </p>
        </div>

        <div className="border border-line bg-ink-900 p-6">
          <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            Needed env vars
          </p>
          <ul className="space-y-2 text-paper">
            <li>
              <code className="bg-white/10 px-1.5 py-0.5 font-mono">
                VITE_CLERK_PUBLISHABLE_KEY
              </code>
            </li>
            <li>
              <code className="bg-white/10 px-1.5 py-0.5 font-mono">
                VITE_STRIPE_PAYMENT_LINK_URL
              </code>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
