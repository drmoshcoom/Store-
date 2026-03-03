'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  X, 
  Maximize2, 
  Minimize2,
  Search,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI, ThinkingLevel, GenerateContentResponse } from "@google/genai";
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'مرحباً! أنا مساعدك الذكي في يمن ساس. كيف يمكنني مساعدتك اليوم في إدارة متجرك؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'fast' | 'pro' | 'search'>('fast');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseText = '';
      
      if (mode === 'pro') {
        // Thinking Mode using gemini-3.1-pro-preview
        const response = await ai.models.generateContent({
          model: "gemini-3.1-pro-preview",
          contents: input,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
            systemInstruction: "أنت مساعد ذكي لمنصة يمن ساس (YemenSaaS). ساعد أصحاب المتاجر في اليمن في تحليل بياناتهم، اقتراح استراتيجيات تسويقية، وحل المشكلات المعقدة. تحدث بلهجة مهنية وودودة بالعربية."
          }
        });
        responseText = response.text || 'عذراً، لم أتمكن من معالجة طلبك.';
      } else if (mode === 'search') {
        // Search Grounding using gemini-3-flash-preview
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: input,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: "أنت مساعد ذكي يستخدم بحث جوجل لتوفير معلومات دقيقة ومحدثة حول التجارة الإلكترونية والأسواق في اليمن."
          }
        });
        responseText = response.text || 'عذراً، لم أتمكن من العثور على معلومات.';
      } else {
        // Fast Mode using gemini-3-flash-preview
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: input,
          config: {
            systemInstruction: "أنت مساعد سريع وذكي في منصة يمن ساس. ساعد في المهام البسيطة مثل كتابة وصف المنتجات أو الرد على استفسارات العملاء."
          }
        });
        responseText = response.text || 'عذراً، حدث خطأ ما.';
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، واجهت مشكلة في الاتصال. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-indigo-700 transition-colors"
      >
        <Sparkles size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? 'calc(100% - 64px)' : '400px',
              height: isMaximized ? 'calc(100% - 64px)' : '600px',
              left: isMaximized ? '32px' : '32px',
              bottom: isMaximized ? '32px' : '100px',
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-[60] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">مساعد يمن ساس الذكي</h3>
                  <p className="text-[10px] text-indigo-100">مدعوم بتقنيات Gemini AI</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMaximized(!isMaximized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="p-2 bg-slate-50 border-b border-slate-100 flex gap-2">
              <button 
                onClick={() => setMode('fast')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'fast' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <MessageSquare size={14} /> سريع
              </button>
              <button 
                onClick={() => setMode('pro')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'pro' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <BrainCircuit size={14} /> تفكير عميق
              </button>
              <button 
                onClick={() => setMode('search')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'search' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Search size={14} /> بحث جوجل
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-50">
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {msg.role === 'user' ? 'أنت' : 'المساعد'}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-slate">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex items-center gap-3">
                    <Loader2 className="animate-spin text-indigo-600" size={18} />
                    <span className="text-sm text-slate-500">جاري التفكير...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسأل أي شيء حول متجرك..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pr-4 pl-12 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute left-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center">
                قد يرتكب الذكاء الاصطناعي أخطاء. يرجى التحقق من المعلومات المهمة.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
