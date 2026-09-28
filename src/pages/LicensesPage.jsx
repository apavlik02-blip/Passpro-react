import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { FactTable } from '../components/study/FactTable.jsx'
import { LicenseCard, OutlineBars } from '../components/license/LicenseCards.jsx'
import { PublicHeader } from '../components/layout/PublicHeader.jsx'
import { SiteFooter } from '../components/layout/SiteFooter.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useLicense } from '../hooks/useLicense.jsx'
import { LICENSE_FAMILIES, LICENSES, SHARED_EXAM_FACTS, getLicense } from '../lib/licenses.js'

function Shell({ children }) {
  return (
    <main className="flex min-h-screen flex-col bg-ink-950 text-paper">
      <PublicHeader />
      {children}
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  )
}

export function LicensesPage() {
  useDocumentMeta({
    title: 'Wisconsin Insurance Licenses — PassPro',
    description:
      'Compare Wisconsin insurance producer licenses and PSI exams: Life (22-01), Accident & Health (22-03), Property (22-05), Casualty (22-07), and Personal Lines (22-09).',
  })

  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10">
        <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
          Wisconsin licenses
        </p>
        <h1 className="mb-4 max-w-[22ch] font-serif text-4xl font-medium sm:text-5xl">
          Which Wisconsin license are you going for?
        </h1>
        <p className="mb-12 max-w-[62ch] text-lg text-muted">
          Each major line has its own PSI exam and its own outline. Many producers hold more
          than one. Life + Accident &amp; Health, and Property + Casualty, are the most common
          pairings.
        </p>

        {LICENSE_FAMILIES.map((family) => (
          <div className="mb-12" key={family}>
            <p className="mb-4 font-mono text-[11px] tracking-widest text-muted uppercase">{family}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LICENSES.filter((license) => license.family === family).map((license) => (
                <LicenseCard key={license.key} license={license} />
              ))}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FactTable title="Every major-line exam" rows={SHARED_EXAM_FACTS} />
          <div className="my-6 border border-line bg-ink-900 p-6">
            <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              Property vs. Personal Lines
            </p>
            <p className="mb-3 text-[15px] text-paper">
              Personal Lines covers only individual and family risks: home, dwelling, personal
              auto, flood, and umbrella. Property and Casualty together add commercial lines such
              as the BOP, CGL, commercial auto, crime, and worker&apos;s compensation.
            </p>
            <p className="text-[15px] text-muted">
              If you'll ever write business insurance, take Property and Casualty. If you'll only
              quote homes and cars for households, Personal Lines is the shorter path.
            </p>
          </div>
        </div>
      </section>
    </Shell>
  )
}

export function LicenseDetailPage() {
  const { licenseKey } = useParams()
  const license = getLicense(licenseKey)
  const { setLicenseKey } = useLicense()
  const navigate = useNavigate()

  useDocumentMeta({
    title: license ? `Wisconsin ${license.name} Exam (Series ${license.series}) — PassPro` : 'PassPro',
    description: license?.description,
  })

  if (!license) {
    return <Navigate replace to="/licenses" />
  }

  const others = LICENSES.filter((item) => item.key !== license.key)

  const startTrack = () => {
    setLicenseKey(license.key)
    navigate('/dashboard')
  }

  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
        <Link
          className="font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase hover:text-gold-400"
          to="/licenses"
        >
          ← All Wisconsin licenses
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-3 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
              PSI Series {license.series} · {license.family}
            </p>
            <h1 className="mb-4 font-serif text-4xl leading-tight font-medium sm:text-5xl">
              {license.fullName}
            </h1>
            <p className="mb-6 max-w-[56ch] text-lg text-muted">{license.description}</p>

            <div className="mb-8 flex flex-wrap gap-2">
              {license.careers.map((career) => (
                <span
                  className="border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-paper uppercase"
                  key={career}
                >
                  {career}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <SignedIn>
                <button
                  className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                  onClick={startTrack}
                  type="button"
                >
                  Study for {license.name}
                </button>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button
                    className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                    onClick={() => setLicenseKey(license.key)}
                    type="button"
                  >
                    Create account to study {license.name}
                  </button>
                </SignUpButton>
              </SignedOut>
              <Link
                className="rounded-sm border border-line px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-gold-500/70"
                to="/pricing"
              >
                Pricing
              </Link>
            </div>

            <FactTable
              title="Exam at a glance"
              rows={[
                { label: 'Exam', value: `WI ${license.name} (${license.series})` },
                ...SHARED_EXAM_FACTS.filter((fact) => fact.label !== 'Exam vendor'),
              ]}
            />
          </div>

          <div>
            <div className="border border-line bg-ink-900 p-6">
              <p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
                Official content outline
              </p>
              <p className="mb-6 text-sm text-muted">
                Percent of the 100 scored questions per section (PSI, effective July 15, 2022).
              </p>
              <OutlineBars outline={license.outline} />
            </div>
            <p className="mt-4 text-sm text-muted">
              PassPro's practice exams sample questions by domain in these same proportions, and
              your results break down the same way, so you can see which sections are costing
              you points.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-muted uppercase">
            Other Wisconsin licenses
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <LicenseCard key={item.key} license={item} />
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}
