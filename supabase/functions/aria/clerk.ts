// Verifies a Clerk session token server-side, without the Clerk Node SDK
// (not available in the Deno edge runtime). Clerk session tokens are RS256
// JWTs signed against a per-app JWKS — this checks the signature and
// issuer, then trusts the `sub` claim as the Clerk user id.
//
// Requires the CLERK_ISSUER secret (your Clerk "Frontend API" URL, e.g.
// https://your-app.clerk.accounts.dev or a custom domain — found in the
// Clerk dashboard under API Keys / Advanced).

import { createRemoteJWKSet, jwtVerify } from 'https://esm.sh/jose@5.9.6'

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

export async function verifyClerkToken(token: string): Promise<string> {
  const issuer = Deno.env.get('CLERK_ISSUER')
  if (!issuer) {
    throw new Error('CLERK_ISSUER is not configured')
  }

  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`))
  }

  const { payload } = await jwtVerify(token, jwks, { issuer })

  if (typeof payload.sub !== 'string') {
    throw new Error('Token missing sub claim')
  }

  return payload.sub
}
