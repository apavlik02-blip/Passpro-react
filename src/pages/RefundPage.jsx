// DRAFT — generated template, not legal advice. Alex must review before launch.
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'

const sections = [
  {
    title: '7-day money-back guarantee',
    body: [
      // TODO(Alex): confirm refund terms (window length + usage threshold) before launch.
      'If PassPro is not the right fit, you can request a full refund within 7 days of purchase, provided you have completed less than one full practice exam.',
      'To request a refund, email us with the address associated with your account. Refunds are issued to the original payment method via Stripe and typically appear within 5–10 business days.',
    ],
  },
  {
    title: 'When refunds are not available',
    body: [
      'Refunds are not available more than 7 days after purchase, after one or more full practice exams have been completed, or for accounts terminated for violating our Terms of Service (for example, account sharing).',
    ],
  },
  {
    title: 'Questions',
    body: [
      'If you have a question about a charge or believe you were billed in error, contact us at support@passpro.example.com and we will sort it out.', // TODO: replace placeholder contact email before launch
    ],
  },
]

export function RefundPage() {
  useDocumentMeta({
    title: 'Refund Policy — PassPro',
    description:
      'Refund Policy for PassPro — 7-day money-back guarantee details and how to request a refund.',
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
