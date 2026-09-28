// Backend checks with no browser: edge functions refuse bad callers, private
// tables stay private to the public key, and each license has enough questions.
import { expect, test } from '@playwright/test'
import { env, functionUrl } from './env.mjs'
import { readFileSync } from 'node:fs'

const LICENSES = JSON.parse(readFileSync(new URL('./blueprints.json', import.meta.url), 'utf8'))

test.skip(!env.supabaseUrl || !env.supabaseAnonKey, 'Supabase URL/key not configured')

const anonHeaders = () => ({ apikey: env.supabaseAnonKey, Authorization: `Bearer ${env.supabaseAnonKey}` })

test.describe('edge functions reject bad callers', () => {
  for (const [name, body] of [
    ['agency', { action: 'dashboard' }],
    ['agency', { action: 'me' }],
    ['access', { code: 'NOT-A-CODE' }],
    ['aria', { message: 'hello' }],
  ]) {
    test(`${name} ${body.action ?? ''} without sign-in is refused`, async ({ request }) => {
      const res = await request.post(functionUrl(name), { data: body })
      expect([401, 403]).toContain(res.status())
    })
  }

  test('agency lead with missing fields is rejected', async ({ request }) => {
    const res = await request.post(functionUrl('agency'), { data: { action: 'submit_lead', email: 'not-an-email' } })
    expect(res.status()).toBe(400)
  })

  test('invite preview for an unknown code says invalid', async ({ request }) => {
    const res = await request.post(functionUrl('agency'), { data: { action: 'invite_preview', code: 'not-a-real-code' } })
    expect(res.ok()).toBeTruthy()
    expect((await res.json()).valid).toBe(false)
  })
})

test.describe('private tables are invisible to the public key', () => {
  const PRIVATE = [
    'access_codes', 'user_access', 'user_entitlements', 'aria_progress', 'agencies', 'agency_members',
    'agency_invites', 'agency_leads', 'recruit_journeys', 'recruit_steps', 'profiles', 'users',
    'billing_events', 'ledger', 'soletrak_ledgers', 'notifications', 'flashcard_progress', 'flashcard_reviews',
  ]
  for (const table of PRIVATE) {
    test(`${table} returns no rows`, async ({ request }) => {
      const res = await request.get(`${env.supabaseUrl}/rest/v1/${table}?select=*&limit=1`, { headers: anonHeaders() })
      if (res.ok()) expect(await res.json(), `${table} leaked rows`).toEqual([])
      else expect([401, 403, 404]).toContain(res.status())
    })
  }
})

test.describe('question bank can build every full exam', () => {
  let counts = {}
  test.beforeAll(async ({ request }) => {
    const res = await request.get(`${env.supabaseUrl}/rest/v1/questions?select=domain`, {
      headers: { ...anonHeaders(), Range: '0-9999' },
    })
    expect(res.ok()).toBeTruthy()
    for (const { domain } of await res.json()) counts[domain] = (counts[domain] ?? 0) + 1
  })

  for (const license of LICENSES) {
    test(`${license.name} (${license.series}) has enough questions per domain`, async () => {
      const short = Object.entries(license.weights)
        .filter(([domain, need]) => (counts[domain] ?? 0) < need)
        .map(([domain, need]) => `${domain}: ${counts[domain] ?? 0} of ${need}`)
      expect(short, `not enough questions for a full ${license.name} exam`).toEqual([])
    })
  }
})
