'use client';
import React, { useState, useRef, useEffect } from 'react';
import QuizRenderer from './QuizRenderer';

export default function ARIAAgent({ userId, apiUrl = 'https://passpro-aria.vercel.app/api/aria' }) {
  const [mode, setMode] = useState('study');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function send(text) {
    const t = (text || input).trim();
    if (!t || loading) return;
    setInput(''); setLoading(true); setCurrentQuiz(null);
    const userMsg = { role: 'user', content: t };
    const updated = [...messages, userMsg];
    setMessages(updated);
    try {
      const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: updated, mode, userId }) });
      const data = await res.json();
      let content = data.message || data.content || 'Got it.';
      if (data.type === 'tool_result' && data.tool === 'generate_practice_questions' && data.data?.questions) {
        setCurrentQuiz({ questions: data.data.questions, onComplete: async (results) => { await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'submit_quiz_result', userId, payload: { quizResult: results } }) }); setMessages(p => [...p, { role: 'assistant', content: `Quiz complete! Score: ${results.overall_score}%` }]); setCurrentQuiz(null); } });
      }
      setMessages(p => [...p, { role: 'assistant', content }]);
    } catch (e) { setMessages(p => [...p, { role: 'assistant', content: 'Connection error.' }]); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: 600, background: '#1A120A', color: '#EDE0D4', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(201,135,79,0.2)' }}>
      <div style={{ padding: 16, borderBottom: '1px solid rgba(201,135,79,0.1)', display: 'flex', gap: 8 }}>
        {['study','quiz','coach'].map(m => <button key={m} onClick={() => setMode(m)} style={{ padding: '6px 14px', borderRadius: 999, background: mode === m ? 'rgba(201,135,79,0.2)' : 'transparent', border: '1px solid rgba(201,135,79,0.3)', color: mode === m ? '#C9874F' : '#EDE0D4' }}>{m}</button>)}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, minHeight: 400 }}>
        {messages.map((m, i) => <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', marginBottom: 12 }}><div style={{ display: 'inline-block', padding: '10px 14px', borderRadius: 16, background: m.role === 'user' ? '#C9874F' : 'rgba(255,255,255,0.06)' }}>{m.content}</div></div>)}
        {currentQuiz && <div style={{ marginTop: 12 }}><QuizRenderer questions={currentQuiz.questions} onComplete={currentQuiz.onComplete} /></div>}
        {loading && <div>Thinking...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: 12, borderTop: '1px solid rgba(201,135,79,0.1)' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask ARIA..." style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,135,79,0.2)', borderRadius: 12, color: '#EDE0D4' }} />
      </div>
    </div>
  );
}
