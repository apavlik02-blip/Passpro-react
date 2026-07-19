import type { VercelRequest, VercelResponse } from '@vercel/node'
import { generateScript } from '../server/audioBrief/handlers'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { weakSpots } = req.body ?? {}
    if (!Array.isArray(weakSpots) || weakSpots.length === 0) {
      return res.status(400).json({ error: 'weakSpots array is required' })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' })
    }

    const scriptText = await generateScript(weakSpots, apiKey)
    return res.status(200).json({ scriptText })
  } catch {
    return res.status(500).json({ error: 'Failed to synthesize script framework' })
  }
}
