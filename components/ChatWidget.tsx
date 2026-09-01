"use client";

import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      
      if (data.content && data.content[0]?.text) {
        setMessages([...newMessages, { role: 'assistant', content: data.content[0].text }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-primary/90 transition-transform hover:scale-110 z-50"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border shadow-xl rounded-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-primary text-on-primary p-4 font-heading font-bold flex justify-between items-center">
            RazorGrow AI Assistant
            <button onClick={() => setIsOpen(false)} className="text-xl">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-muted/20 space-y-4">
            <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
              Hello! How can I help you with your shopping today?
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-primary text-on-primary self-end ml-auto' : 'bg-muted text-muted-foreground'}`}>
                {m.content}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-border flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..." 
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
            <button type="submit" className="bg-accent text-on-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
