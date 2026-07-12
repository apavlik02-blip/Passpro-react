import { Content as WisconsinExamStudyGuide } from '../content/blog/wisconsin-exam-study-guide.jsx'
import { Content as WisconsinGracePeriod } from '../content/blog/wisconsin-grace-period.jsx'
import { Content as WisconsinFreeLookPeriod } from '../content/blog/wisconsin-free-look-period.jsx'
import { Content as WisconsinTwistingChurningRebating } from '../content/blog/wisconsin-twisting-churning-rebating.jsx'

// Add new posts here — the Content import above and a metadata entry below.
export const BLOG_POSTS = [
  {
    slug: 'wisconsin-life-health-exam-study-guide',
    title: 'Wisconsin Life & Health Insurance License Exam: The Complete Study Guide',
    description:
      "Everything you need to know about Wisconsin's life and health insurance licensing exam — format, content outline, the state-specific rules candidates miss most, and how to actually prepare.",
    date: '2026-07-12',
    readingMinutes: 6,
    Content: WisconsinExamStudyGuide,
  },
  {
    slug: 'wisconsin-life-insurance-grace-period',
    title: 'Wisconsin Life Insurance Grace Period: How Many Days?',
    description:
      "The Wisconsin life insurance grace period is 31 days, not the 30 days most generic study guides assume. Here's what it covers and why the exact number matters for the licensing exam.",
    date: '2026-07-12',
    readingMinutes: 3,
    Content: WisconsinGracePeriod,
  },
  {
    slug: 'wisconsin-free-look-period',
    title: 'Wisconsin Free Look Period: 10 Days, or 20–30 for Replacements',
    description:
      "Wisconsin's free look period is 10 days for a new individual life policy, but 20-30 days if it's replacing an existing one. Here's the distinction and why the exam tests it.",
    date: '2026-07-12',
    readingMinutes: 3,
    Content: WisconsinFreeLookPeriod,
  },
  {
    slug: 'wisconsin-twisting-churning-rebating',
    title: 'Twisting vs. Churning vs. Rebating: Wisconsin Insurance Law Explained',
    description:
      "Twisting, churning, and rebating are three separate unfair trade practices under Wisconsin insurance law. Here's how to tell them apart for the licensing exam.",
    date: '2026-07-12',
    readingMinutes: 4,
    Content: WisconsinTwistingChurningRebating,
  },
].sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
