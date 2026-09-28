// Signed-in flows, run as the QA test user (a Clerk "+clerk_test" address).
// Serial: one sign-in, then each member area in turn.
import { expect, test } from '@playwright/test'
import { env } from './env.mjs'
import { signIn, watchErrors } from './helpers.mjs'

test.skip(!env.qaEmail, 'QA_EMAIL not set: create the QA test user first (see README)')
test.describe.configure({ mode: 'serial' })

let page
let errors
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  errors = watchErrors(page)
  await signIn(page, env.qaEmail)
})
test.afterAll(async () => page?.close())

test('account page shows access status', async () => {
  await page.goto('/account')
  await expect(page.getByText(/access/i).first()).toBeVisible()
})

test('a wrong access code is refused with a clear message', async () => {
  await page.goto('/account')
  const box = page.locator('#access-code')
  test.skip(!(await box.isVisible().catch(() => false)), 'QA user already has access')
  await box.fill('definitely-not-a-code')
  await page.getByRole('button', { name: /unlock access/i }).click()
  await expect(page.getByText(/not valid/i)).toBeVisible()
})

test('the QA access code unlocks study pages', async () => {
  await page.goto('/account')
  const box = page.locator('#access-code')
  if (await box.isVisible().catch(() => false)) {
    test.skip(!env.qaAccessCode, 'QA_ACCESS_CODE not set')
    await box.fill(env.qaAccessCode)
    await page.getByRole('button', { name: /unlock access/i }).click()
  }
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/dashboard/)
})

test('dashboard loads', async () => {
  await page.goto('/dashboard')
  await expect(page.locator('main')).toBeVisible()
  await expect(page.getByText(/checking your access/i)).toHaveCount(0, { timeout: 15_000 })
  await expect(page).toHaveURL(/\/dashboard/)
})

test('a study lesson opens', async () => {
  await page.goto('/study')
  const first = page.locator('a[href^="/study/"]').first()
  await expect(first).toBeVisible()
  await first.click()
  await expect(page).toHaveURL(/\/study\/.+/)
  await expect(page.locator('h1, h2').first()).toBeVisible()
})

test('flashcards show a card and reveal the answer', async () => {
  await page.goto('/flashcards')
  const reveal = page.getByRole('button', { name: /show answer/i })
  await expect(reveal).toBeVisible()
  await reveal.click()
  await expect(page.getByRole('button', { name: /good/i }).first()).toBeVisible()
})

test('a 10-question drill can be finished and scored', async () => {
  await page.goto('/practice-exam?drill=insurance_regulation')
  for (let i = 0; i < 10; i += 1) {
    await page.locator('input[type=radio]').first().check()
    const next = page.getByRole('button', { name: /^next$/i })
    if (await next.isVisible()) await next.click()
  }
  await page.getByRole('button', { name: /submit exam/i }).click()
  await expect(page.getByText(/\d+%/).first()).toBeVisible()
  await expect(page.getByText(/pass|below passing/i).first()).toBeVisible()
})

test('license path page loads', async () => {
  await page.goto('/journey')
  await expect(page.locator('main')).toContainText(/30-day|day \d+ of 30|start my 30-day path/i)
})

test('agency page loads; an owner can create and cancel an invite', async () => {
  await page.goto('/agency')
  const main = page.locator('main')
  await expect(main).toContainText(/agency|recruit/i)
  const nameBox = page.getByLabel('Recruit name')
  test.skip(!(await nameBox.isVisible().catch(() => false)), 'QA user is not an agency owner')
  const label = `QA invite ${Date.now()}`
  await nameBox.fill(label)
  await page.getByRole('button', { name: /create link/i }).click()
  const row = page.locator('div', { hasText: label }).last()
  await expect(row).toBeVisible()
  await row.getByRole('button', { name: /^cancel$/i }).click()
  await expect(page.getByText(label)).toHaveCount(0)
})

test('no errors while signed in', async () => {
  expect(errors).toEqual([])
})
