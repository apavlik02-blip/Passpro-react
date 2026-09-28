// Regenerates blueprints.json from the app's license catalog, so the test
// suite can run on its own (e.g. the nightly bot) without the app's source.
// Run after changing exam weights: node tests/e2e/export-blueprints.mjs
import { writeFileSync } from 'node:fs'
import { LICENSES } from '../../src/lib/licenses.js'

const out = LICENSES.map((l) => ({ key: l.key, name: l.name, series: l.series, weights: l.exam.weights }))
writeFileSync(new URL('./blueprints.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log(`wrote ${out.length} licenses`)
