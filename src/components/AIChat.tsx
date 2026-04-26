import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat({ currentCode }: { currentCode: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Code context:\n\`\`\`\n${currentCode}\n\`\`\`\n\nUser Question: ${input}` }]
          }
        ],
        config: {
          systemInstruction: "You are Kayan Code AI, a professional coding assistant. You help users write and debug code. Keep responses concise and practical. Use Markdown for code blocks."
        }
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "Sorry, I couldn't generate a response." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'حدث خطأ في الاتصال بالذكاء الاصطناعي.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#333]">
      <div className="p-4 border-b border-[#333] flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="font-medium text-gray-300">مساعد كيان</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-50 space-y-2">
            <Bot className="w-12 h-12 mx-auto" />
            <p className="text-sm">اسألني أي شيء عن الكود الخاص بك</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex gap-3 text-sm animate-in fade-in slide-in-from-bottom-2",
            m.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              m.role === 'assistant' ? "bg-purple-600 text-white" : "bg-[#333] text-gray-400"
            )}>
              {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={cn(
              "p-3 rounded-2xl max-w-[85%]",
              m.role === 'assistant' ? "bg-[#252525] text-gray-200 border border-[#333]" : "bg-purple-600/20 text-white border border-purple-500/30"
            )}>
              <div className="markdown-body prose prose-invert prose-xs max-w-none">
                <ReactMarkdown>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 text-sm animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            </div>
            <div className="p-3 rounded-2xl bg-[#252525] border border-[#333] text-gray-400 italic">
              جاري التفكير...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#333]">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اسأل كيان..."
            className="w-full bg-[#2a2a2a] border border-[#444] rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-purple-500 pr-12 transition-colors rtl"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
