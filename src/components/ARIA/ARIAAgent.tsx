'use client';

import React, { useState, useRef, useEffect } from 'react';
import QuizRenderer from './QuizRenderer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ARIAAgentProps {
  userId?: string;
  apiUrl?: string; // defaults to your deployed passpro-aria backend
}

const MODES = [
  { id: 'study', label: 'Study', icon: '📚', desc: 'Explain concepts & mnemonics' },
  { id: 'quiz', label: 'Quiz Me', icon: '⚡', desc: 'Generate practice questions' },
  { id: 'coach', label: 'Coach', icon: '🎯', desc: 'Personalized study plan' },
];

export default function ARIAAgent({ userId, apiUrl = 'https://passpro-aria.vercel.app/api/aria' }: ARIAAgentProps) {
  const [mode, setMode] = useState<'study' | 'quiz' | 'coach'>('study');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentQuiz]);

  async function send(text?: string) {
    const t = (text || input).trim();
    if (!t || loading) return;

    setInput('');
    setLoading(true);
    setCurrentQuiz(null);

    const userMsg: Message = { role: 'user', content: t };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          mode,
          userId,
        }),
      });

      const data = await res.json();

      let assistantContent = data.message || data.content || 'Got it.';

      // Handle tool results beautifully
      if (data.type === 'tool_result' && data.tool === 'generate_practice_questions' && data.data?.questions) {
        setCurrentQuiz({
          questions: data.data.questions,
          onComplete: async (results: any) => {
            // Optional: send results back to update progress
            await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'submit_quiz_result',
                userId,
                payload: { quizResult: results },
              }),
            });
            const summary = `Quiz complete! You scored ${results.overall_score}%. Weak areas updated.`;
            setMessages(prev => [...prev, { role: 'assistant', content: summary }]);
            setCurrentQuiz(null);
          },
        });
        assistantContent = data.message || `Here are ${data.data.questions.length} targeted questions. Take the quiz below!`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);

    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, connection issue. Please try again.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function quickStart(text: string) {
    send(text);
  }

  function clearChat() {
    setMessages([]);
    setCurrentQuiz(null);
  }

  return (
    <div style={{
      minHeight: 620,
      maxHeight: 720,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(160deg, #1A120A 0%, #231509 60%, #1C100A 100%)',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(201,135,79,0.15)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(201,135,79,0.12)', background: 'rgba(0,0,0,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #C9874F, #7B3910)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF8F2', fontSize: 13, fontWeight: 700 }}>A</span>
          </div>
          <div>
            <div style={{ color: '#EDE0D4', fontSize: 16, fontWeight: 600, letterSpacing: 1.5 }}>ARIA</div>
            <div style={{ color: 'rgba(201,135,79,0.65)', fontSize: 10, letterSpacing: 1 }}>AI Coach • Wisconsin Life</div>
          </div>
        </div>
        <button onClick={clearChat} style={{ background: 'none', border: 'none', color: 'rgba(237,224,212,0.4)', fontSize: 11, cursor: 'pointer' }}>CLEAR</button>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 14px', background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(201,135,79,0.1)' }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            style={{
              background: mode === m.id ? 'rgba(201,135,79,0.18)' : 'transparent',
              border: `1px solid ${mode === m.id ? 'rgba(201,135,79,0.45)' : 'rgba(201,135,79,0.15)' }`,
              borderRadius: 999,
              padding: '5px 12px',
              color: mode === m.id ? '#C9874F' : 'rgba(237,224,212,0.55)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.length === 0 && !currentQuiz && (
          <div style={{ textAlign: 'center', paddingTop: 30, color: 'rgba(237,224,212,0.5)' }}>
            <div style={{ fontSize: 18, fontStyle: 'italic' }}>Ready when you are, Amanda.</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>What would you like to work on?</div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button onClick={() => quickStart('Give me 5 practice questions on policy provisions')} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,135,79,0.2)', color: '#EDE0D4', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>5 practice questions on policy provisions</button>
              <button onClick={() => quickStart('Create a 30-day study plan for my exam')} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,135,79,0.2)', color: '#EDE0D4', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Create a 30-day study plan</button>
              <button onClick={() => quickStart('What is the grace period in Wisconsin?')} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,135,79,0.2)', color: '#EDE0D4', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Wisconsin grace period</button>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%',
              padding: '11px 15px',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
              background: m.role === 'user' ? 'linear-gradient(135deg, #C9874F, #A0522D)' : 'rgba(255,255,255,0.06)',
              color: m.role === 'user' ? '#FFF8F2' : '#EDE0D4',
              fontSize: 14.5,
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {currentQuiz && (
          <div style={{ margin: '12px 0', background: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: 10 }}>
            <QuizRenderer 
              questions={currentQuiz.questions} 
              onComplete={currentQuiz.onComplete} 
            />
          </div>
        )}

        {loading && <div style={{ padding: '8px 14px', color: 'rgba(237,224,212,0.5)', fontSize: 13 }}>ARIA is thinking...</div>}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 14px 14px', borderTop: '1px solid rgba(201,135,79,0.1)', background: 'rgba(0,0,0,0.22)' }}>
        <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,135,79,0.22)', borderRadius: 14, padding: '6px 6px 6px 14px' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Ask ARIA in ${mode} mode...`}
            rows={1}
            style={{ flex: 1, background: 'none', border: 'none', color: '#EDE0D4', fontSize: 14.5, resize: 'none', maxHeight: 90 }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              width: 34, height: 34, borderRadius: 9, border: 'none',
              background: input.trim() && !loading ? 'linear-gradient(135deg, #C9874F, #A0522D)' : 'rgba(255,255,255,0.08)',
              cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF8F2', fontSize: 16,
            }}
          >
            ↑
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(237,224,212,0.25)', marginTop: 6 }}>SHIFT + ENTER for new line</div>
      </div>
    </div>
  );
}
