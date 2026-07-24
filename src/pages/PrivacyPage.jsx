// DRAFT — generated template, not legal advice. Alex must review before launch.
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'

const sections = [
  {
    title: '1. Information we collect',
    body: [
      'Account information — your name, email address, and authentication details are collected and managed by Clerk, our authentication provider, when you create an account.',
      'Study progress — your module completion, practice exam scores, readiness metrics, and study activity are stored with Supabase so the app can track your preparation over time.',
      'AI coaching messages — messages you send to the ARIA study coach are processed via Anthropic’s API to generate responses, and related progress data is stored so coaching can reflect your study history.',
    ],
  },
  {
    title: '2. How we use your information',
    body: [
      'We use your information to provide the service: authenticating you, saving your study progress, generating personalized coaching, and verifying your access to the platform.',
      'We do not sell your personal data. We do not share your personal data with third parties except the service providers named above (Clerk, Supabase, Anthropic), each of which processes data on our behalf to operate the service.',
    ],
  },
  {
    title: '3. Cookies and local storage',
    body: [
      'PassPro uses cookies and browser localStorage for essential functionality: keeping you signed in (session management via Clerk) and remembering onboarding state, such as whether you have completed the initial setup flow. When you unlock the platform with an access code, that unlock is recorded on our servers against your account, not in your browser.',
      'We do not use advertising or cross-site tracking cookies.',
    ],
  },
  {
    title: '4. Data retention and deletion',
    body: [
      'We retain your account and study progress data while your account is active so your preparation history remains available to you. If you would like your account and associated data deleted, contact us at the address below and we will process the request.',
    ],
  },
  {
    title: '5. Security',
    body: [
      'We rely on established providers — Clerk for authentication and Supabase for data storage — each of which maintains industry-standard security practices. No method of transmission or storage is completely secure, but we take reasonable measures to protect your information.',
    ],
  },
  {
    title: '6. Changes to this policy',
    body: [
      'We may update this policy from time to time. Material changes will be posted on this page with an updated effective date.',
    ],
  },
  {
    title: '7. Contact',
    body: [
      'Questions about this policy or your data? Email us at agilifesolutions@gmail.com.',
    ],
  },
]

export function PrivacyPage() {
  useDocumentMeta({
    title: 'Privacy Policy — PassPro',
    description:
      'Privacy Policy for PassPro — what data we collect, how it is used, and the providers that process it.',
  })

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <Link to="/">PassPro</Link>
        <span className="text-gold-500">Privacy Policy</span>
      </div>

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Legal
        </p>
        <h1 className="mb-3 font-serif text-4xl leading-[1.15] font-medium text-balance">
          Privacy Policy
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
