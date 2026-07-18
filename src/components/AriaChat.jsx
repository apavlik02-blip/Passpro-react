import React, { useState } from 'react';

const AriaChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/aria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.body) {
        throw new Error('Readable stream not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let botMessage = { role: 'bot', content: '' };

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        botMessage.content += chunk;

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages[updatedMessages.length - 1]?.role === 'bot') {
            updatedMessages[updatedMessages.length - 1] = botMessage;
          } else {
            updatedMessages.push(botMessage);
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error processing stream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AriaChat;
