// Post-build step: give every public page its own static <head>.
//
// The site is a client-rendered SPA, so dist/index.html has one generic
// title/description for every URL. Browsers fix that at runtime with
// useDocumentMeta, but link previews (Facebook, LinkedIn, iMessage) and a
// crawler's first pass only read the raw HTML. This script writes
// dist/<route>/index.html for each public route with the right title,
// description, canonical URL and Open Graph tags. Vercel serves these static
// files before the SPA rewrite in vercel.json, and the React app still boots
// from them exactly as before.
//
// Titles and descriptions come from the same sources the pages use:
// src/lib/blogPosts.js, src/lib/licenses.js, and the useDocumentMeta({...})
// call in each page component.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const SITE = 'https://passpro.company'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

// Static public pages: route -> page component that calls useDocumentMeta.
const STATIC_PAGES = {
  '/': 'HomePage.jsx',
  '/exam-prep': 'LaunchLandingPage.jsx',
  '/pricing': 'PricingPage.jsx',
  '/licenses': 'LicensesPage.jsx',
  '/agencies': 'AgenciesPage.jsx',
  '/blog': 'BlogIndexPage.jsx',
  '/terms': 'TermsPage.jsx',
  '/privacy': 'PrivacyPage.jsx',
  '/refunds': 'RefundPage.jsx',
}

// Pulls the first literal useDocumentMeta({ title: '...', description: '...' })
// out of a page file. Handles '...', "..." and `...` literals without ${}.
function metaFromPage(file) {
  const src = readFileSync(join(ROOT, 'src/pages', file), 'utf8')
  const call = src.match(/useDocumentMeta\(\{([\s\S]*?)\}\)/)
  if (!call) throw new Error(`No useDocumentMeta call in ${file}`)
  const str = (key) => {
    const m = call[1].match(new RegExp(`${key}:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`))
    return m ? m[2].replace(/\\(['"`\\])/g, '$1') : null
  }
  const title = str('title')
  const description = str('description')
  if (!title || !description) throw new Error(`Could not read title/description in ${file}`)
  return { title, description }
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headFor({ title, description, path, type = 'website' }) {
  const url = SITE + (path === '/' ? '/' : path)
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="PassPro" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
  ].join('\n    ')
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const TITLE_RE = /<title>[\s\S]*?<\/title>/
const DESC_RE = /<meta\s+name="description"[\s\S]*?\/>/
if (!TITLE_RE.test(template) || !DESC_RE.test(template)) {
  throw new Error('dist/index.html is missing the <title> or description tag this script replaces')
}

function render(meta) {
  return template.replace(DESC_RE, '').replace(TITLE_RE, headFor(meta))
}

function write(path, meta) {
  const html = render({ ...meta, path })
  const out = path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}

// Load the data modules through Vite so their JSX imports resolve.
const vite = await createServer({
  root: ROOT,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})

let count = 0
try {
  const { BLOG_POSTS } = await vite.ssrLoadModule('/src/lib/blogPosts.js')
  const { LICENSES } = await vite.ssrLoadModule('/src/lib/licenses.js')

  for (const [path, file] of Object.entries(STATIC_PAGES)) {
    write(path, metaFromPage(file))
    count++
  }
  for (const license of LICENSES) {
    write(`/licenses/${license.key}`, {
      title: `Wisconsin ${license.name} Exam (Series ${license.series}) — PassPro`,
      description: license.description,
    })
    count++
  }
  for (const post of BLOG_POSTS) {
    write(`/blog/${post.slug}`, {
      title: `${post.title} — PassPro`,
      description: post.description,
      type: 'article',
    })
    count++
  }
} finally {
  await vite.close()
}

console.log(`prerender-meta: wrote static <head> for ${count} public pages`)
