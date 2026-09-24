import { useEffect, useState } from 'react'
import { SignInButton, SignUpButton, SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader.jsx'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useLicense } from '../hooks/useLicense.jsx'
import { AgencyError, callAgency } from '../lib/agencyApi.js'
import { getLicense } from '../lib/licenses.js'

const primaryButton =
  'inline-flex items-center justify-center rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:opacity-50'
const secondaryButton =
  'inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70'

const STATUS_MESSAGES = {
  accepted: 'This invite has already been used.',
  revoked: 'This invite was cancelled by the agency.',
  expired: 'This invite has expired. Ask your agency for a new link.',
}

export function JoinPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const { user } = useUser()
  const { setLicenseKey } = useLicense()
  const [invite, setInvite] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [accepting, setAccepting] = useState(false)
  const [acceptError, setAcceptError] = useState('')

  useDocumentMeta({ title: 'Join your agency on PassPro', description: 'Accept your agency invite.' })

  useEffect(() => {
    let active = true
    callAgency('invite_preview', { code })
      .then((data) => active && setInvite(data))
      .catch((err) => active && setLoadError(err.message))
    return () => {
      active = false
    }
  }, [code])

  const license = getLicense(invite?.license_key)

  const accept = async () => {
    setAccepting(true)
    setAcceptError('')
    try {
      await callAgency(
        'accept_invite',
        {
          code,
          display_name: user?.fullName ?? '',
          email: user?.primaryEmailAddress?.emailAddress ?? '',
        },
        getToken,
      )
      if (license) setLicenseKey(license.key)
      navigate('/journey')
    } catch (err) {
      setAcceptError(err instanceof AgencyError ? err.message : 'Could not accept the invite.')
      setAccepting(false)
    }
  }

  let body
  if (loadError) {
    body = <p className="text-muted">{loadError}</p>
  } else if (!invite) {
    body = <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Checking your invite…</p>
  } else if (!invite.agency_name) {
    body = (
      <p className="text-muted">
        This invite link isn't valid. Check the link your agency sent you, or ask them for a new
        one.
      </p>
    )
  } else if (!invite.valid) {
    body = <p className="text-muted">{STATUS_MESSAGES[invite.status] ?? 'This invite is no longer valid.'}</p>
  } else {
    body = (
      <>
        <p className="mb-6 text-lg text-muted">
          {invite.agency_name} is sponsoring your{' '}
          <span className="text-paper">{license ? `Wisconsin ${license.name} license` : 'license'}</span>
          . You get full PassPro exam prep and a 30-day path from prelicensing to appointed.
        </p>
        <div className="mb-8 border border-line bg-ink-900 p-5 text-sm text-muted">
          <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
            What your agency will see
          </p>
          Your license path steps, practice exam scores, readiness, and when you last studied.
          They won't see your answers to individual questions or your ARIA conversations.
        </div>
        <SignedIn>
          <div className="flex flex-wrap items-center gap-3">
            <button className={primaryButton} disabled={accepting} onClick={accept} type="button">
              {accepting ? 'Joining…' : `Join ${invite.agency_name}`}
            </button>
            {user?.primaryEmailAddress ? (
              <span className="text-xs text-muted">as {user.primaryEmailAddress.emailAddress}</span>
            ) : null}
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-wrap gap-3">
            <SignUpButton mode="modal">
              <button className={primaryButton} type="button">
                Create your account
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className={secondaryButton} type="button">
                I already have an account
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        {acceptError ? <p className="mt-4 text-sm text-red-300">{acceptError}</p> : null}
      </>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <PublicHeader />
      <section className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Licensed in 30 Days · agency invite
        </p>
        <h1 className="mb-6 font-serif text-4xl leading-tight font-medium sm:text-5xl">
          {invite?.invitee_name ? `Welcome, ${invite.invitee_name.split(' ')[0]}.` : 'Your agency invited you.'}
        </h1>
        {body}
        <p className="mt-10 text-sm text-muted">
          Questions about the program? <Link className="text-gold-400 underline" to="/agencies">How it works</Link>
        </p>
      </section>
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  )
}
