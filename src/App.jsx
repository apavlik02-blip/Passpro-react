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
import { useEntitlement } from './hooks/useEntitlement.js'
import { MemberLayout } from './components/layout/MemberLayout.jsx'
import { MissingClerkConfiguration } from './components/config/MissingClerkConfiguration.jsx'
import { MissingSupabaseConfiguration } from './components/config/MissingSupabaseConfiguration.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BlogIndexPage } from './pages/BlogIndexPage.jsx'
import { BlogPostPage } from './pages/BlogPostPage.jsx'
import { TermsPage } from './pages/TermsPage.jsx'
import { PrivacyPage } from './pages/PrivacyPage.jsx'
import { RefundPage } from './pages/RefundPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { StudyPage } from './pages/StudyPage.jsx'
import { PracticeExamPage } from './pages/PracticeExamPage.jsx'
import { ProgressPage } from './pages/ProgressPage.jsx'
import { AccountPage } from './pages/AccountPage.jsx'

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

function PaywallRoute() {
  const { hasPaid, loading, configured } = useEntitlement()
  // Outlet resets context unless explicitly forwarded — MemberLayout passes
  // `openAria` down via outlet context, and DashboardPage reads it.
  const outletContext = useOutletContext()

  if (configured && loading) {
    return (
      <div className="font-mono text-sm text-muted">Checking your access...</div>
    )
  }

  if (configured && !hasPaid) {
    return <Navigate to="/account" replace />
  }

  return <Outlet context={outletContext} />
}

function App({ clerkEnabled, stripePaymentLinkUrl }) {
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              error={error}
              loading={loading}
              questionCount={questionBank.length}
              stripePaymentLinkUrl={stripePaymentLinkUrl}
              studyModuleCount={studyModules.length}
              supabaseConfigured={supabaseConfigured}
            />
          }
        />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refunds" element={<RefundPage />} />
        <Route element={<ProtectedRoute clerkEnabled={clerkEnabled} />}>
          <Route element={<SupabaseRoute supabaseConfigured={supabaseConfigured} />}>
            <Route
              element={<MemberLayout stripePaymentLinkUrl={stripePaymentLinkUrl} />}
            >
              <Route element={<PaywallRoute />}>
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
                  path="/progress"
                  element={
                    <ProgressPage
                      categories={categories}
                      error={error}
                      loading={loading}
                      questionBank={questionBank}
                      studyModules={studyModules}
                      totalEstimatedMinutes={totalEstimatedMinutes}
                    />
                  }
                />
              </Route>
              <Route
                path="/account"
                element={<AccountPage stripePaymentLinkUrl={stripePaymentLinkUrl} />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
