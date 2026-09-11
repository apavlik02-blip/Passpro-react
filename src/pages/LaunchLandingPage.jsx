import { useId, useState } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import './LaunchLandingPage.css'

// PassPro's Kit (formerly ConvertKit) lead-capture form — Kit dashboard:
// Grow -> Landing Pages & Forms -> "PassPro cheat sheet". Posting directly
// to Kit's own subscribe endpoint (rather than loading Kit's embed script)
// keeps this on our own styling and lets React own the success/error UI.
const KIT_FORM_ACTION = 'https://app.kit.com/forms/9880772/subscriptions'

function EmailCaptureForm({ formId, ctaLabel = 'Get the free cheat sheet' }) {
  const emailFieldId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(event) {
    event.preventDefault()
    if (!email || status === 'submitting') return

    setStatus('submitting')

    try {
      const response = await fetch(KIT_FORM_ACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({ email_address: email }).toString(),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="success" data-success-for={formId}>
        Check your inbox to confirm — your cheat sheet is on its way right after.
      </p>
    )
  }

  return (
    <form className="capture-form" data-form-id={formId} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={emailFieldId}>
        Email address
      </label>
      <input
        id={emailFieldId}
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === 'submitting'}
      />
      <button type="submit" className="btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : ctaLabel}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong — try again, or email us directly.
        </p>
      )}
    </form>
  )
}

export function LaunchLandingPage() {
  useDocumentMeta({
    title: 'PassPro — Wisconsin Life & Health Exam Prep',
    description:
      'PassPro is the only Wisconsin Life & Health exam-prep platform built specifically for the PSI exam — not a national template with your state name added to the cover.',
  })

  return (
    <div className="launch-landing">
      <section className="hero">
        <div className="container hero-inner">
          <h1>
            Stop reading a 400-page phone book. Start talking to a tutor that
            knows the Wisconsin exam cold.
          </h1>
          <p>
            PassPro is the only Wisconsin Life &amp; Health exam-prep platform
            built specifically for the PSI exam — not a national template
            with your state name added to the cover.
          </p>

          <EmailCaptureForm formId="hero" />
          <p className="fine">
            No credit card. Just the 12 statutes that fail half of
            first-time test-takers.
          </p>
        </div>
      </section>

      <section className="problem">
        <div className="container">
          <h2>You&rsquo;re not failing because you&rsquo;re not smart.</h2>
          <p>
            Most Wisconsin candidates prep with generic national study
            guides — the same material used by someone studying for the
            Texas exam or the Florida exam. Wisconsin has its own statutes,
            its own PSI exam quirks, and its own most-missed questions.
            Studying generic material for a state-specific test is like
            using a map of the wrong city.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>ARIA, your study tutor</h3>
          <p>
            Stuck on why an answer is wrong? Ask ARIA. It explains concepts
            in plain English, on demand, instead of leaving you to reread
            the same static paragraph a fifth time.
          </p>
        </div>
        <div className="feature">
          <h3>Spaced repetition that adapts</h3>
          <p>
            PassPro tracks what you actually know and resurfaces only what
            you&rsquo;re at risk of forgetting — so review time never goes
            to cards you&rsquo;ve already mastered.
          </p>
        </div>
        <div className="feature">
          <h3>Built for Wisconsin, not everywhere</h3>
          <p>
            Content is built around WI statutes, the PSI exam format, and
            the questions Wisconsin candidates actually get wrong.
          </p>
        </div>
      </section>

      <section className="proof">
        <div className="container">
          <blockquote>
            &ldquo;I failed the national guide&rsquo;s practice tests three
            times. Switched to PassPro two weeks before my retake and passed
            on the first try.&rdquo;
            <cite>— Placeholder testimonial, swap in a real one</cite>
          </blockquote>
        </div>
      </section>

      <section className="guarantee">
        <div className="container">
          <h2>The pass guarantee</h2>
          <p>
            If you complete the PassPro program and don&rsquo;t pass, you get
            your money back. No fine print, no list of conditions to qualify
            for it.
          </p>
          <p className="disclosure">
            PassPro is independent exam-prep material, not a state-approved
            pre-licensing education provider — completing it doesn&rsquo;t
            fulfill Wisconsin&rsquo;s required pre-licensing coursework hours.
          </p>
        </div>
      </section>

      <section className="final">
        <div className="container">
          <h2>Your exam date is coming whether you&rsquo;re ready or not.</h2>
          <EmailCaptureForm formId="final" />
        </div>
      </section>
    </div>
  )
}
