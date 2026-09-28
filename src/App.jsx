import { Suspense, lazy } from 'react'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from 'react-router-dom'
import { useLearningContent } from './hooks/useLearningContent.js'
import { useAccess } from './hooks/useAccess.js'
import { LicenseProvider } from './hooks/useLicense.jsx'
import { MemberLayout } from './components/layout/MemberLayout.jsx'
import { MissingClerkConfiguration } from './components/config/MissingClerkConfiguration.jsx'
import { MissingSupabaseConfiguration } from './components/config/MissingSupabaseConfiguration.jsx'
import { HomePage } from './pages/HomePage.jsx'

// Route-level code splitting: only the home page ships in the initial bundle.
const page = (loader, name) => lazy(() => loader().then((module) => ({ default: module[name] })))
const LaunchLandingPage = page(() => import('./pages/LaunchLandingPage.jsx'), 'LaunchLandingPage')
const BlogIndexPage = page(() => import('./pages/BlogIndexPage.jsx'), 'BlogIndexPage')
const BlogPostPage = page(() => import('./pages/BlogPostPage.jsx'), 'BlogPostPage')
const TermsPage = page(() => import('./pages/TermsPage.jsx'), 'TermsPage')
const PrivacyPage = page(() => import('./pages/PrivacyPage.jsx'), 'PrivacyPage')
const RefundPage = page(() => import('./pages/RefundPage.jsx'), 'RefundPage')
const DashboardPage = page(() => import('./pages/DashboardPage.jsx'), 'DashboardPage')
const StudyPage = page(() => import('./pages/StudyPage.jsx'), 'StudyPage')
const StudyLessonPage = page(() => import('./pages/StudyLessonPage.jsx'), 'StudyLessonPage')
const PracticeExamPage = page(() => import('./pages/PracticeExamPage.jsx'), 'PracticeExamPage')
const FlashcardsPage = page(() => import('./pages/FlashcardsPage.jsx'), 'FlashcardsPage')
const ProgressPage = page(() => import('./pages/ProgressPage.jsx'), 'ProgressPage')
const AccountPage = page(() => import('./pages/AccountPage.jsx'), 'AccountPage')
const PricingPage = page(() => import('./pages/PricingPage.jsx'), 'PricingPage')
const LicensesPage = page(() => import('./pages/LicensesPage.jsx'), 'LicensesPage')
const LicenseDetailPage = page(() => import('./pages/LicensesPage.jsx'), 'LicenseDetailPage')
const AgenciesPage = page(() => import('./pages/AgenciesPage.jsx'), 'AgenciesPage')
const JoinPage = page(() => import('./pages/JoinPage.jsx'), 'JoinPage')
const JourneyPage = page(() => import('./pages/JourneyPage.jsx'), 'JourneyPage')
const AgencyDashboardPage = page(() => import('./pages/AgencyDashboardPage.jsx'), 'AgencyDashboardPage')

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 font-mono text-[11px] tracking-widest text-muted uppercase">
      Loading…
    </div>
  )
}

function ProtectedRoute({ clerkEnabled }) {
  if (!clerkEnabled) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  )
}

function SupabaseRoute({ supabaseConfigured }) {
  return supabaseConfigured ? <Outlet /> : <MissingSupabaseConfiguration />
}

function AccessRoute() {
  const { hasAccess, loading, configured } = useAccess()
  // Outlet resets context unless explicitly forwarded — MemberLayout passes
  // `openAria` down via outlet context, and DashboardPage reads it.
  const outletContext = useOutletContext()

  if (configured && loading) {
    return (
      <div className="font-mono text-sm text-muted">Checking your access...</div>
    )
  }

  if (configured && !hasAccess) {
    return <Navigate to="/account" replace />
  }

  return <Outlet context={outletContext} />
}

function App({ clerkEnabled }) {
  const { studyModules, questionBank, loading, error, supabaseConfigured } =
    useLearningContent()

  const totalEstimatedMinutes = studyModules.reduce(
    (sum, module) => sum + module.estimatedMinutes,
    0,
  )

  const questionsByCategory = questionBank.reduce((groups, question) => {
    if (!groups[question.category]) {
      groups[question.category] = []
    }

    groups[question.category].push(question)
    return groups
  }, {})

  const categories = Object.entries(questionsByCategory).map(([name, questions]) => ({
    name,
    questionCount: questions.length,
  }))

  if (!clerkEnabled) {
    return <MissingClerkConfiguration />
  }

  return (
    <LicenseProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  error={error}
                  loading={loading}
                  questionCount={questionBank.length}
                  studyModuleCount={studyModules.length}
                  supabaseConfigured={supabaseConfigured}
                />
              }
            />
            <Route path="/exam-prep" element={<LaunchLandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/licenses" element={<LicensesPage />} />
            <Route path="/licenses/:licenseKey" element={<LicenseDetailPage />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/join/:code" element={<JoinPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refunds" element={<RefundPage />} />
            <Route element={<ProtectedRoute clerkEnabled={clerkEnabled} />}>
              <Route element={<SupabaseRoute supabaseConfigured={supabaseConfigured} />}>
                <Route element={<MemberLayout />}>
                  <Route element={<AccessRoute />}>
                    <Route
                      path="/dashboard"
                      element={
                        <DashboardPage
                          categories={categories}
                          error={error}
                          loading={loading}
                          questionBank={questionBank}
                          studyModules={studyModules}
                          totalEstimatedMinutes={totalEstimatedMinutes}
                        />
                      }
                    />
                    <Route
                      path="/study"
                      element={
                        <StudyPage
                          error={error}
                          loading={loading}
                          studyModules={studyModules}
                        />
                      }
                    />
                    <Route
                      path="/study/:moduleId"
                      element={
                        <StudyLessonPage
                          error={error}
                          loading={loading}
                          studyModules={studyModules}
                        />
                      }
                    />
                    <Route
                      path="/practice-exam"
                      element={
                        <PracticeExamPage
                          error={error}
                          loading={loading}
                          questionBank={questionBank}
                        />
                      }
                    />
                    <Route
                      path="/flashcards"
                      element={
                        <FlashcardsPage error={error} loading={loading} questionBank={questionBank} />
                      }
                    />
                    <Route path="/progress" element={<ProgressPage />} />
                  </Route>
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/journey" element={<JourneyPage />} />
                  <Route path="/agency" element={<AgencyDashboardPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LicenseProvider>
  )
}

export default App
