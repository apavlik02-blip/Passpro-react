// Test settings, read from the environment. Falls back to the app's own
// .env.local for the public Supabase URL/anon key so local runs need no setup.
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))

function readDotEnv() {
  const values = {}
  for (const name of ['.env.local', '.env']) {
    const path = root + name
    if (!existsSync(path)) continue
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/)
      if (m && !(m[1] in values)) values[m[1]] = m[2]
    }
  }
  return values
}

const dot = readDotEnv()
const pick = (...keys) => keys.map((k) => process.env[k] ?? dot[k]).find(Boolean)

export const env = {
  // Site under test: the live site by default for the nightly run.
  baseURL: pick('PASSPRO_URL') ?? 'https://passpro.company',
  supabaseUrl: pick('SUPABASE_URL', 'VITE_SUPABASE_URL'),
  supabaseAnonKey: pick('SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY'),
  // A Clerk test user (development instance): any address containing
  // "+clerk_test" signs in with the fixed code 424242. Unset = auth tests skip.
  qaEmail: pick('QA_EMAIL'),
  // An access code reserved for the QA user. Unset = access-unlock test skips.
  qaAccessCode: pick('QA_ACCESS_CODE'),
  // Set to 1 to let form tests write real rows (e.g. pilot leads). Default: stubbed.
  realWrites: pick('QA_REAL_WRITES') === '1',
}

export const functionUrl = (name) => `${env.supabaseUrl}/functions/v1/${name}`
