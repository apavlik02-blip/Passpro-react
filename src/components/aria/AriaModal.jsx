import { useEffect, useRef, useState } from 'react'
import { useAriaChat } from '../../hooks/useAriaChat.js'
import { AriaQuiz } from './AriaQuiz.jsx'
import { StudyScheduleRenderer } from './StudyScheduleRenderer.jsx'

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500/60"
          key={i}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export function AriaModal({ open, onClose }) {
  const { messages, quiz, loading, suggestions, configured, send, submitQuizResult } = useAriaChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, quiz])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[85vh] w-full max-w-xl flex-col border border-line bg-ink-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 font-mono text-sm font-bold text-ink-950">
              A
            </div>
            <div>
              <p className="font-serif text-base font-medium">ARIA</p>
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
                Wisconsin Exam Coach
              </p>
            </div>
          </div>
          <button
            className="rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-paper transition hover:border-gold-500/60"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {!configured ? (
            <div className="border border-line bg-ink-900 p-4 text-sm text-muted">
              ARIA isn't configured yet. Add <code className="text-paper">VITE_SUPABASE_URL</code> (and
              deploy the <code className="text-paper">aria</code> Supabase Edge Function) to enable
              coaching.
            </div>
          ) : null}

          {messages.map((message, i) => {
            const isSchedule = message.tool === 'create_study_schedule' && message.toolData
            return (
              <div
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                key={i}
              >
                <div
                  className={`${isSchedule ? 'w-full' : 'max-w-[82%]'} px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-gold-500 text-ink-950'
                      : 'border border-line bg-ink-900 text-paper'
                  }`}
                >
                  {message.content}
                  {isSchedule ? <StudyScheduleRenderer schedule={message.toolData} /> : null}
                </div>
              </div>
            )
          })}

          {quiz ? (
            <AriaQuiz
              onComplete={(quizResult) => submitQuizResult(quizResult)}
              questions={quiz}
            />
          ) : null}

          {loading ? (
            <div className="flex justify-start">
              <div className="border border-line bg-ink-900">
                <TypingDots />
              </div>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>

        {suggestions.length > 0 && !loading ? (
          <div className="flex shrink-0 flex-wrap gap-2 px-5 pb-3">
            {suggestions.map((s) => (
              <button
                className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1.5 font-mono text-xs text-gold-400 transition hover:border-gold-500/60"
                key={s}
                onClick={() => send(s)}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        <form
          className="flex shrink-0 gap-2 border-t border-line px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
            setInput('')
          }}
        >
          <input
            className="flex-1 border border-line bg-ink-900 px-3 py-2.5 text-sm text-paper outline-none focus:border-gold-500/60"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ARIA anything..."
            value={input}
          />
          <button
            className="rounded-sm bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading || !input.trim()}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
