// Forms a visitor can use without signing in.
import { expect, test } from '@playwright/test'
import { env } from './env.mjs'
import { watchErrors } from './helpers.mjs'

test.describe('agency pilot form (/agencies)', () => {
  test('blocks an incomplete request', async ({ page }) => {
    await page.goto('/agencies')
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /request my free pilot/i }) })
    await form.getByRole('button', { name: /request my free pilot/i }).click()
    // Either native validation or the page's own message stops it; no thank-you.
    await expect(page.getByText(/thanks,/i)).toHaveCount(0)
  })

  test('submits a complete request', async ({ page }) => {
    const errors = watchErrors(page)
    if (!env.realWrites) {
      // Answer the lead call ourselves so nightly runs don't fill the lead table.
      await page.route('**/functions/v1/agency', async (route) => {
        const body = route.request().postDataJSON?.() ?? {}
        if (body.action === 'submit_lead') return route.fulfill({ json: { ok: true } })
        return route.continue()
      })
    }
    await page.goto('/agencies')
    const form = page.locator('form').filter({ has: page.getByRole('button', { name: /request my free pilot/i }) })
    const inputs = form.locator('input:not([type=email]):not([type=hidden])')
    await inputs.nth(0).fill('QA Bot')
    await inputs.nth(1).fill('QA Test Agency (automated)')
    await form.locator('input[type=email]').fill('qa-bot@passpro.company')
    await form.getByRole('button', { name: /request my free pilot/i }).click()
    await expect(page.getByText(/thanks, qa/i)).toBeVisible()
    expect(errors).toEqual([])
  })

  test('savings calculator does its math', async ({ page }) => {
    await page.goto('/agencies')
    const inputs = page.locator('#root input[inputmode=numeric]')
    test.skip((await inputs.count()) < 3, 'calculator not on this version of the page')
    await inputs.nth(0).fill('30')
    await inputs.nth(1).fill('50')
    await inputs.nth(2).fill('2000')
    await expect(page.locator('main')).toContainText('$30,000')
  })
})

test('a bad invite link explains itself', async ({ page }) => {
  await page.goto('/join/not-a-real-code')
  await expect(page.getByText(/isn't valid/i)).toBeVisible()
})
