import { expect } from '@playwright/test'

// Collect uncaught page errors and console errors during a test. Third-party
// noise (Clerk dev-mode warnings, font loads) is ignored.
const IGNORED = [/clerk.*development/i, /Clerk has been loaded with development keys/i, /fonts\.g/i, /favicon/i]

export function watchErrors(page) {
  const errors = []
  page.on('pageerror', (e) => errors.push(`page error: ${e.message}`))
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (!IGNORED.some((re) => re.test(text))) errors.push(`console: ${text}`)
  })
  return errors
}

export async function expectNoSidewaysScroll(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, 'page scrolls sideways on this screen size').toBeLessThanOrEqual(1)
}

// Sign in through Clerk's modal with a "+clerk_test" address (code 424242).
export async function signIn(page, email) {
  await page.goto('/')
  await page.getByRole('button', { name: /sign in/i }).first().click()
  const emailBox = page.getByLabel(/email address/i)
  await emailBox.fill(email)
  await page.getByRole('button', { name: /^continue$/i }).click()
  // Clerk may offer password first; switch to the email code if so.
  const codeInput = page.locator('input[autocomplete="one-time-code"], input[name="codeInput-0"]').first()
  const otherMethod = page.getByRole('link', { name: /use another method/i })
  await Promise.race([codeInput.waitFor({ timeout: 15_000 }), otherMethod.waitFor({ timeout: 15_000 })]).catch(() => {})
  if (!(await codeInput.isVisible().catch(() => false)) && (await otherMethod.isVisible().catch(() => false))) {
    await otherMethod.click()
    await page.getByRole('button', { name: /email code/i }).click()
  }
  await codeInput.waitFor({ timeout: 15_000 })
  await page.keyboard.type('424242')
  // Signed in when Clerk's user menu appears.
  await expect(page.locator('.cl-userButtonTrigger, .cl-userButtonBox').first()).toBeVisible({ timeout: 20_000 })
}
