import { useRef, useState } from 'react'

interface AudioBriefButtonProps {
  topics: string[]
}

type BriefStatus = 'idle' | 'generating' | 'playing'

export default function AudioBriefButton({ topics }: AudioBriefButtonProps) {
  const [status, setStatus] = useState<BriefStatus>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }

  const startAudioBriefCycle = async () => {
    cleanupAudio()
    setStatus('generating')

    try {
      const scriptResponse = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weakSpots: topics }),
      })

      if (!scriptResponse.ok) {
        throw new Error('Script generation failed')
      }

      const { scriptText } = await scriptResponse.json()
      if (!scriptText) {
        throw new Error('Empty script returned')
      }

      const audioResponse = await fetch('/api/audio-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptText }),
      })

      if (!audioResponse.ok) {
        throw new Error('Audio synthesis failed')
      }

      const audioBlob = await audioResponse.blob()
      const mediaUrl = URL.createObjectURL(audioBlob)
      objectUrlRef.current = mediaUrl

      const audioEngine = new Audio(mediaUrl)
      audioRef.current = audioEngine
      audioEngine.onended = () => {
        cleanupAudio()
        setStatus('idle')
      }

      setStatus('playing')
      await audioEngine.play()
    } catch (err) {
      console.error('Audio generation timeline interrupted', err)
      cleanupAudio()
      setStatus('idle')
    }
  }

  const isBusy = status !== 'idle'
  const buttonLabel =
    status === 'generating'
      ? 'Generating your audio brief...'
      : status === 'playing'
        ? 'Playing your audio brief...'
        : 'Generate 1-min audio brief'

  return (
    <article className="border border-line bg-ink-900 p-6">
      <p className="mb-2 font-mono text-[11px] font-bold tracking-widest text-gold-500 uppercase">
        On-the-go prep
      </p>
      <p className="mb-4 text-sm text-muted">
        Listen to a one-minute voice breakdown tailored to your review errors.
      </p>

      {topics.length ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
              key={topic}
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      <button
        className="w-full bg-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isBusy || topics.length === 0}
        onClick={startAudioBriefCycle}
        type="button"
      >
        {buttonLabel}
      </button>
    </article>
  )
}
