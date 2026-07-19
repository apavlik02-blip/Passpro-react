import { NextResponse } from 'next/server'
import { generateScript } from '../../../server/audioBrief/handlers'

export async function POST(request: Request) {
  try {
    const { weakSpots } = await request.json()
    if (!Array.isArray(weakSpots) || weakSpots.length === 0) {
      return NextResponse.json({ error: 'weakSpots array is required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured' }, { status: 500 })
    }

    const scriptText = await generateScript(weakSpots, apiKey)
    return NextResponse.json({ scriptText })
  } catch {
    return NextResponse.json({ error: 'Failed to synthesize script framework' }, { status: 500 })
  }
}
