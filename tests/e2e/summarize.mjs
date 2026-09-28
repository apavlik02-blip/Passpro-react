// Turns Playwright's JSON report into a short plain-English summary.
// Usage: node tests/e2e/summarize.mjs [results/report.json]
import { readFileSync } from 'node:fs'

const file = process.argv[2] ?? new URL('./results/report.json', import.meta.url)
const report = JSON.parse(readFileSync(file, 'utf8'))
const rows = []
const walk = (suite, trail = []) => {
  const here = suite.title && !suite.title.endsWith('.mjs') ? [...trail, suite.title] : trail
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests ?? []) {
      const last = t.results?.at(-1)
      rows.push({
        name: [...here, spec.title].join(' › '),
        project: t.projectName,
        status: t.status === 'expected' ? 'passed' : t.status === 'skipped' ? 'skipped' : t.status === 'flaky' ? 'flaky' : 'failed',
        error: (last?.error?.message ?? '').replace(/\u001b\[[0-9;]*m/g, '').split('\n').find((l) => l.trim()) ?? '',
        screenshot: last?.attachments?.find((a) => a.name === 'screenshot')?.path,
      })
    }
  }
  for (const child of suite.suites ?? []) walk(child, here)
}
for (const s of report.suites ?? []) walk(s)

const count = (st) => rows.filter((r) => r.status === st).length
console.log(`PassPro test run: ${count('passed')} passed, ${count('failed')} failed, ${count('flaky')} flaky, ${count('skipped')} skipped.`)
const failed = rows.filter((r) => r.status === 'failed')
if (failed.length) {
  console.log('\nFailures:')
  for (const r of failed) console.log(`- [${r.project}] ${r.name}: ${r.error.slice(0, 200)}${r.screenshot ? `\n  screenshot: ${r.screenshot}` : ''}`)
}
process.exitCode = failed.length ? 1 : 0
