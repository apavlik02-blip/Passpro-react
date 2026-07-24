import { Link, Navigate, useParams } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { getPostBySlug } from '../lib/blogPosts.js'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useDocumentMeta({
    title: post ? `${post.title} — PassPro` : 'Study Guides — PassPro',
    description: post?.description,
  })

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Content } = post

  return (
    <main className="min-h-screen bg-ink-950 text-paper">
      <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[11px] tracking-widest text-muted uppercase sm:px-10">
        <Link to="/">PassPro</Link>
        <Link className="text-gold-500" to="/blog">
          Study Guides
        </Link>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-500 uppercase">
          Study guide
        </p>
        <h1 className="mb-3 font-serif text-4xl leading-[1.15] font-medium text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-10 font-mono text-[11px] text-muted">
          {new Date(post.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {post.readingMinutes} min read
        </p>

        <Content />

        <div className="mt-12 border border-line bg-ink-900 p-7 text-center">
          <p className="mb-4 text-paper">
            Guided modules, a full practice exam, and progress tracking — all in one place.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button
                className="rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                type="button"
              >
                Start studying at PassPro
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              className="inline-block rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              to="/dashboard"
            >
              Go to your dashboard
            </Link>
          </SignedIn>
        </div>
      </article>
    </main>
  )
}
