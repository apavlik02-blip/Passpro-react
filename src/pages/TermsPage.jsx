// DRAFT — generated template, not legal advice. Alex must review before launch.
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'

const sections = [
  {
    title: '1. What PassPro is — and is not',
    body: [
      'PassPro is an exam preparation service for candidates preparing for the Wisconsin life and health insurance licensing examination. It provides study modules, practice questions, practice exams, progress tracking, and AI-assisted study coaching.',
      'PassPro is NOT a prelicensing education provider. It is not the OCI-approved 20-hour prelicensing education course required under Wis. Admin. Code ch. Ins 26, and completing PassPro does not satisfy any prelicensing education requirement imposed by the Wisconsin Office of the Commissioner of Insurance. You are responsible for completing an approved prelicensing course through an approved provider before sitting for the state examination.',
      'PassPro does not guarantee that you will pass the Wisconsin licensing examination or any other examination. Exam outcomes depend on many factors outside our control, including your own preparation.',
    ],
  },
  {
    title: '2. Your account and access',
    body: [
      'Access to PassPro study materials is currently granted by access code, free of charge. An access code grants a personal, non-transferable license to access the service for the named account holder only.',
      'You may not share your account credentials or your access code, resell access, or allow any other person to use your account. We may suspend or terminate accounts, and deactivate access codes, that show evidence of sharing or resale.',
      'You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.',
    ],
  },
  {
    title: '3. Intellectual property',
    body: [
      'All content on PassPro — including study modules, practice questions, explanations, and AI coaching output — is owned by PassPro or its licensors and is protected by copyright and other intellectual property laws.',
      'You may use the content solely for your own personal exam preparation. You may not copy, distribute, publish, scrape, or create derivative works from the content without our prior written permission.',
    ],
  },
  {
    title: '4. Educational content disclaimer',
    body: [
      'All content provided through PassPro is for educational and exam-preparation purposes only. It does not constitute legal, financial, tax, or insurance advice, and it should not be relied upon as a substitute for advice from a qualified professional or for the official statutes, rules, and bulletins published by the State of Wisconsin.',
      'While we work to keep content accurate and current, insurance laws and exam outlines change. We make no warranty that content is error-free, complete, or up to date.',
    ],
  },
  {
    title: '5. Fees',
    body: [
      'PassPro is currently free to use — access is granted by access code and no payment is collected. If we introduce paid access in the future, payment and refund terms will be posted here and in our Refund Policy before any purchase is offered.',
    ],
  },
  {
    title: '6. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, PassPro and its operators will not be liable for indirect, incidental, special, or consequential damages arising from your use of the service, including exam results, licensing outcomes, or lost income. Our total liability for any claim will not exceed the amount (if any) you paid for the service.',
    ],
  },
  {
    title: '7. Changes to the service and these terms',
    body: [
      'We may update the service and these terms from time to time. Material changes will be posted on this page with an updated effective date. Continued use of the service after changes take effect constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '8. Governing law',
    body: [
      'These terms are governed by the laws of the State of Wisconsin, without regard to its conflict-of-law rules. Any dispute arising from these terms or your use of PassPro will be resolved in the state or federal courts located in Wisconsin.',
    ],
  },
]

export function TermsPage() {
  useDocumentMeta({
    title: 'Terms of Service — PassPro',
    description:
      'Terms of Service for PassPro, the Wisconsin life & health insurance exam prep service.',
  })

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <Link to="/">PassPro</Link>
        <span className="text-gold-500">Terms of Service</span>
      </div>

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Legal
        </p>
        <h1 className="mb-3 font-serif text-4xl leading-[1.15] font-medium text-balance">
          Terms of Service
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
