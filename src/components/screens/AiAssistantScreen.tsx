import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, Bot, User, ArrowLeft, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopAppBar } from '../common/Navigation';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantScreen: React.FC = () => {
  const { navigateTo, userProfile, totalCalories, totalProtein, waterLiters } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hi ${userProfile.name} 👋\nHow can I help you today? Ask me anything about your Indian diet plan, today's calories, or workout routines!`,
      time: '09:41 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What should I eat?',
    "Check today's calories",
    'Create a workout',
    'Analyze my progress',
    'High-protein Tamil meals',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // Send to backend /api/ai/chat
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          userContext: {
            name: userProfile.name,
            goal: userProfile.goal,
            targetCalories: userProfile.targetCalories,
            loggedCalories: totalCalories,
            protein: totalProtein,
            waterLiters: waterLiters,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      // Realistic offline / fallback AI logic
      setTimeout(() => {
        let fallbackReply = `Based on your goal (${userProfile.goal}), you have consumed ${totalCalories} / ${userProfile.targetCalories} kcal with ${totalProtein}g protein. For dinner, try 2 Phulkas with 150g Paneer Bhurji or Grilled Chicken Breast for clean protein!`;
        if (query.toLowerCase().includes('calorie')) {
          fallbackReply = `Today you have logged ${totalCalories} kcal. You have ${Math.max(0, userProfile.targetCalories - totalCalories)} kcal remaining to hit your ${userProfile.targetCalories} kcal daily target.`;
        } else if (query.toLowerCase().includes('tamil')) {
          fallbackReply = `Here are great high-protein Tamil foods: 1) Pesarattu (Green Gram Dosa) - 18g protein. 2) Soya Chunks Kuzhambu - 30g protein. 3) Egg Podimas (3 eggs) - 18g protein. 4) Sundal (boiled chickpea) - 12g protein.`;
        }

        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-full h-full flex flex-col justify-between bg-[#070b14] text-white">
      {/* Header */}
      <TopAppBar
        title="AI Coach"
        subtitle="Your personal nutrition & fitness assistant"
        showBack
        onBack={() => navigateTo('HOME')}
        actions={
          <button
            onClick={() => navigateTo('VOICE_ASSISTANT')}
            className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 cursor-pointer"
          >
            <Mic className="w-4 h-4" />
          </button>
        }
      />

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'ai'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              <span
                className={`text-[9px] block text-right mt-1 ${
                  msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-10">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
            </div>
            <span className="text-[11px]">AI Coach is analyzing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Bar */}
      <div className="p-3 bg-[#0a0f1d] border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={() => navigateTo('VOICE_ASSISTANT')}
          className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-400 flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Ask your AI Coach..."
          className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
