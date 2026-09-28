import { defineConfig, devices } from '@playwright/test'
import { env } from './env.mjs'

export default defineConfig({
  testDir: '.',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['json', { outputFile: 'results/report.json' }]],
  outputDir: 'results/artifacts',
  use: {
    baseURL: env.baseURL,
    screenshot: 'only-on-failure',
    // Vercel preview deployments are password-protected; this header lets the bot in.
    extraHTTPHeaders: process.env.VERCEL_BYPASS_SECRET
      ? { 'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_SECRET }
      : undefined,
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    // The cloud sandbox ships Chromium at a fixed path; locally Playwright finds its own.
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
  },
  projects: [
    { name: 'api', testMatch: /api\.spec\.mjs/ },
    { name: 'desktop', testMatch: /(smoke|forms|member)\.spec\.mjs/, use: { ...devices['Desktop Chrome'] } },
    {
      name: 'phone',
      testMatch: /(smoke|forms)\.spec\.mjs/,
      use: { ...devices['Pixel 7'] },
    },
  ],
})
