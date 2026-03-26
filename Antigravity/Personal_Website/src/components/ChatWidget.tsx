"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([
    { role: "model", content: "Hi! I'm Maruf's Digital Twin. Ask me anything about my research, projects, or background." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMsg }] }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "model", content: "Sorry, my neural link seems to be offline." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "model", content: "Connection error. Please try again later." }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 transition-all z-50 transform hover:scale-110 active:scale-95 flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-slate-800 text-cyan-400 text-xs py-1 px-3 rounded shadow-md border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with my Twin
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] max-h-[600px] h-[80vh] glass-panel rounded-2xl flex flex-col overflow-hidden z-40 border-cyan-500/30 shadow-2xl shadow-cyan-900/40"
          >
            {/* Header */}
            <div className="bg-slate-900/80 p-4 border-b border-slate-700/50 flex items-center justify-between backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <div>
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                  <Bot size={18} className="text-cyan-400" />
                  AI RAG Twin
                </h3>
                <p className="text-xs text-slate-400 mt-1">Md. Maruf Mullah&apos;s Digital Persona</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={cn("flex items-start gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div
                    className={cn(
                      "p-2 rounded-full shrink-0 flex items-center justify-center border",
                      msg.role === "user"
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "bg-slate-800 border-slate-700 text-slate-300"
                    )}
                  >
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed max-w-[75%]",
                      msg.role === "user"
                        ? "bg-cyan-500 text-white rounded-tr-sm"
                        : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-sm glass-panel"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 flex-row">
                  <div className="p-2 rounded-full shrink-0 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-300">
                    <Bot size={16} />
                  </div>
                  <div className="bg-slate-800/80 text-slate-200 border border-slate-700/50 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2 text-sm">
                    <Loader2 size={16} className="animate-spin text-cyan-500" /> Processing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800/50 backdrop-blur-md">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-200 placeholder-slate-500 text-sm rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-full text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
