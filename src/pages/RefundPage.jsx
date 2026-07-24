// DRAFT — generated template, not legal advice. Alex must review before launch.
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'

const sections = [
  {
    title: 'PassPro is currently free to use',
    body: [
      'Access to PassPro is currently granted by access code, free of charge. Because no payment is collected, there is nothing to refund.',
    ],
  },
  {
    title: 'If we introduce paid access',
    body: [
      'If PassPro moves to paid access in the future, this page will be updated with the refund terms that apply before any purchase is offered. Any change will not affect access you were already granted by code.',
    ],
  },
  {
    title: 'Questions',
    body: [
      'If you believe you were charged in connection with PassPro, contact us at agilifesolutions@gmail.com and we will sort it out.',
    ],
  },
]

export function RefundPage() {
  useDocumentMeta({
    title: 'Refund Policy — PassPro',
    description:
      'Refund Policy for PassPro — the service is currently free, access-code based, and collects no payment.',
  })

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <Link to="/">PassPro</Link>
        <span className="text-gold-500">Refund Policy</span>
      </div>

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Legal
        </p>
        <h1 className="mb-3 font-serif text-4xl leading-[1.15] font-medium text-balance">
          Refund Policy
        </h1>
        <p className="mb-10 font-mono text-xs text-muted">
          Effective date: July 2026 · Draft pending review
        </p>

        <div className="flex flex-col gap-px border border-line bg-line">
          {sections.map((section) => (
            <div className="bg-ink-950 px-6 py-6" key={section.title}>
              <h2 className="mb-3 font-serif text-xl font-medium">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p
                  className="mb-3 text-sm leading-relaxed text-muted last:mb-0"
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
