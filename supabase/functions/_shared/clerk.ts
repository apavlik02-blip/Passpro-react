// Verifies a Clerk session token server-side, without the Clerk Node SDK
// (not available in the Deno edge runtime). Clerk session tokens are RS256
// JWTs signed against a per-app JWKS — this checks the signature and
// issuer, then trusts the `sub` claim as the Clerk user id.
//
// Requires the CLERK_ISSUER secret: one or more Clerk "Frontend API" URLs,
// comma-separated (e.g. https://your-app.clerk.accounts.dev — found in the
// Clerk dashboard under API Keys, or by base64-decoding the publishable
// key). Multiple values exist because the production site and local dev
// have historically used different Clerk instances; a token is only
// accepted if its own issuer is in this allowlist, and it is then verified
// against that issuer's JWKS.
//
// Shared across functions (aria, entitlement, access) — do not duplicate.

import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'https://esm.sh/jose@5.9.6'

const jwksByIssuer = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

function allowedIssuers(): string[] {
  return (Deno.env.get('CLERK_ISSUER') ?? '')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean)
}

export async function verifyClerkToken(token: string): Promise<string> {
  const issuers = allowedIssuers()
  if (issuers.length === 0) {
    throw new Error('CLERK_ISSUER is not configured')
  }

  // Unverified decode only picks which allowlisted issuer's JWKS to verify
  // against — the signature check below is what actually authenticates.
  const unverified = decodeJwt(token)
  const issuer =
    typeof unverified.iss === 'string' ? unverified.iss.replace(/\/$/, '') : ''
  if (!issuers.includes(issuer)) {
    throw new Error(`untrusted issuer: ${issuer || 'missing'}`)
  }

  let jwks = jwksByIssuer.get(issuer)
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`))
    jwksByIssuer.set(issuer, jwks)
  }

  // clockTolerance absorbs small clock skew between Clerk and the edge
  // runtime — without it, tokens from a just-created session can fail nbf.
  const { payload } = await jwtVerify(token, jwks, { issuer, clockTolerance: 10 })

  if (typeof payload.sub !== 'string') {
    throw new Error('Token missing sub claim')
  }

  return payload.sub
}
