import { Content as WisconsinExamStudyGuide } from '../content/blog/wisconsin-exam-study-guide.jsx'

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
].sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
