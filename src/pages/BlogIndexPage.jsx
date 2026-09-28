import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { BLOG_POSTS } from '../lib/blogPosts.js'

export function BlogIndexPage() {
  useDocumentMeta({
    title: 'Study Guides — PassPro',
    description:
      'Wisconsin insurance exam study guides for Life, Accident & Health, Property, Casualty, and Personal Lines — exam format, content outline, and the state-specific rules candidates miss most.',
  })

  return (
    <main className="min-h-screen bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <Link to="/">PassPro</Link>
        <span className="text-gold-500">Study Guides</span>
      </div>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Study guides
        </p>
        <h1 className="mb-10 font-serif text-4xl leading-[1.15] font-medium text-balance">
          Everything you need to pass the Wisconsin exam.
        </h1>

        <div className="flex flex-col gap-px border border-line bg-line">
          {BLOG_POSTS.map((post) => (
            <Link
              className="block bg-ink-950 px-6 py-6 transition hover:bg-ink-900"
              key={post.slug}
              to={`/blog/${post.slug}`}
            >
              <p className="mb-2 font-mono text-[11px] text-muted">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                · {post.readingMinutes} min read
              </p>
              <h2 className="mb-2 font-serif text-2xl font-medium">{post.title}</h2>
              <p className="text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
