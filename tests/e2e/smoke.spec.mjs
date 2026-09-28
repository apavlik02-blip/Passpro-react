// Smoke: every public page loads, shows its heading, throws no errors, and fits
// the screen. Runs on desktop and phone.
import { expect, test } from '@playwright/test'
import { expectNoSidewaysScroll, watchErrors } from './helpers.mjs'

const PAGES = [
  { path: '/', text: /pass your wisconsin insurance exam/i },
  { path: '/licenses', text: /which wisconsin license/i },
  { path: '/licenses/property', text: /property/i },
  { path: '/agencies', text: /recruits licensed in/i },
  { path: '/pricing', text: /pick the level of support/i },
  { path: '/exam-prep', text: /stop reading/i },
  { path: '/blog', text: /everything you need to pass/i },
  { path: '/blog/wisconsin-grace-period', text: /31 days/i },
  { path: '/blog/wisconsin-property-casualty-license-guide', text: /property/i },
  { path: '/terms', text: /terms of service/i },
  { path: '/privacy', text: /privacy policy/i },
  { path: '/refunds', text: /refund policy/i },
]

for (const { path, text } of PAGES) {
  test(`page loads: ${path}`, async ({ page }) => {
    const errors = watchErrors(page)
    const res = await page.goto(path)
    expect(res?.status(), 'HTTP status').toBeLessThan(400)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('body')).toContainText(text)
    await expectNoSidewaysScroll(page)
    expect(errors, 'errors on the page').toEqual([])
  })
}

test('unknown pages go home instead of a blank screen', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('h1').first()).toBeVisible()
})

test('signed-out visitors are sent away from member pages', async ({ page }) => {
  for (const path of ['/dashboard', '/study', '/practice-exam', '/agency']) {
    await page.goto(path)
    await expect(page, `${path} should redirect home`).toHaveURL(/\/$/)
  }
})

test('robots.txt and sitemap.xml are served', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBeTruthy()
  expect(await robots.text()).toMatch(/sitemap/i)
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  expect(await sitemap.text()).toContain('<urlset')
})
