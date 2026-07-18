import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this matches your Supabase client path

export default function AriaChat({ currentModuleId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Automatically fires and refreshes the ledger when the module changes
  useEffect(() => {
    fetchChatHistory();
  }, [currentModuleId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatHistory = async () => {
    const { data, error } = await supabase
      .from('aria_chats')
      .select('message')
      .eq('module_context', currentModuleId || 'general')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data.map(d => d.message));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Save user message to ledger
      await supabase.from('aria_chats').insert({
        user_id: user.id,
        message: userMessage,
        module_context: currentModuleId || 'general'
      });

      // Post payload with dynamic context isolation to your Edge Function
      const response = await fetch('/api/aria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          context: currentModuleId 
        }),
      });

      const data = await response.json();
      const ariaMessage = { role: 'assistant', content: data.reply };
      
      setMessages((prev) => [...prev, ariaMessage]);

      // Save Aria's breakdown back to the ledger
      await supabase.from('aria_chats').insert({
        user_id: user.id,
        message: ariaMessage,
        module_context: currentModuleId || 'general'
      });

    } catch (err) {
      console.error("Error communicating with Aria:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl font-mono text-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-sm font-semibold tracking-wider text-emerald-400">ARIA // STUDY COMPANION</h2>
        </div>
        <span className="text-xs text-neutral-500">
          {currentModuleId ? `Context: ${currentModuleId}` : 'General Session'}
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-900/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] text-xs p-3 rounded border ${
              msg.role === 'user' 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-100' 
                : 'bg-neutral-950 border-emerald-950 text-emerald-300'
            }`}>
              <span className="block font-bold text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                {msg.role === 'user' ? 'You' : 'Aria'}
              </span>
              <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Tray */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-800 bg-neutral-950 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? "Aria is analyzing..." : "Ask a compliance question..."}
          disabled={loading}
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-700 text-neutral-100 placeholder-neutral-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-4 py-2 rounded transition-colors disabled:opacity-40"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
}
