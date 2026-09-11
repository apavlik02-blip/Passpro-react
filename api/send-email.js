// api/send-email.js
// Vercel Serverless Function — plain Node runtime (no Next.js required).
// Lives at the repo root under /api, same pattern as your Claude API proxy.
//
// Env var required: RESEND_API_KEY  (auto-added if you installed Resend
// via the Vercel Marketplace integration — check Project Settings > Env Vars
// to confirm it landed in Production, not just Preview).

import { Resend } from 'resend';
import { signupConfirmationEmail } from '../src/lib/email-templates/signup-confirmation.js';
import { receiptEmail } from '../src/lib/email-templates/receipt.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Swap this once your Resend domain is verified.
const FROM_ADDRESS = 'PassPro <hello@passpro.company>';

// Simple allowlist so this endpoint can't be used to send arbitrary email.
const TEMPLATES = {
  'signup-confirmation': signupConfirmationEmail,
  receipt: receiptEmail,
};

export default async function handler(req, res) {
  // CORS — tighten origin to your real frontend URL before going live.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { template, to, data } = req.body ?? {};

    if (!template || !TEMPLATES[template]) {
      return res.status(400).json({
        error: `Unknown template "${template}". Valid: ${Object.keys(TEMPLATES).join(', ')}`,
      });
    }
    if (!to || typeof to !== 'string') {
      return res.status(400).json({ error: 'Missing "to" email address' });
    }

    const { subject, html } = TEMPLATES[template](data ?? {});

    const { data: sendResult, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Email send failed', details: error });
    }

    return res.status(200).json({ id: sendResult?.id });
  } catch (err) {
    console.error('send-email handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
