import type { VercelRequest, VercelResponse } from '@vercel/node'
import { synthesizeSpeech } from '../server/audioBrief/handlers'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { scriptText } = req.body ?? {}
    if (!scriptText || typeof scriptText !== 'string') {
      return res.status(400).json({ error: 'scriptText is required' })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' })
    }

    const buffer = await synthesizeSpeech(scriptText, apiKey)
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', 'inline; filename="daily_brief.mp3"')
    return res.status(200).send(buffer)
  } catch {
    return res.status(500).json({ error: 'Audio processing engine down' })
  }
}
