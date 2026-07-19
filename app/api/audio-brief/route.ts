import { NextResponse } from 'next/server'
import { synthesizeSpeech } from '../../../server/audioBrief/handlers'

export async function POST(request: Request) {
  try {
    const { scriptText } = await request.json()
    if (!scriptText || typeof scriptText !== 'string') {
      return NextResponse.json({ error: 'scriptText is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not configured' }, { status: 500 })
    }

    const buffer = await synthesizeSpeech(scriptText, apiKey)
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="daily_brief.mp3"',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Audio processing engine down' }, { status: 500 })
  }
}
