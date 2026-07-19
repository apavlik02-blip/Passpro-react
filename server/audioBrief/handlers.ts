import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

export async function generateScript(weakSpots: string[], apiKey: string): Promise<string> {
  const anthropic = new Anthropic({ apiKey })
  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 400,
    system: 'You are a motivating, elite audio tutor for insurance exams.',
    messages: [
      {
        role: 'user',
        content: `Write a punchy, ultra-focused 60-second audio script summarizing these topics: ${weakSpots.join(', ')}. Keep it under 140 words so it takes exactly one minute to read. Focus entirely on clear analogies and key time frames/numbers. Do not include introductory text, brackets, or scene directions—output only the spoken audio script.`,
      },
    ],
  })

  const block = msg.content[0]
  return block.type === 'text' ? block.text : ''
}

export async function synthesizeSpeech(scriptText: string, apiKey: string): Promise<Buffer> {
  const openai = new OpenAI({ apiKey })
  const mp3Response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: scriptText,
  })

  return Buffer.from(await mp3Response.arrayBuffer())
}
