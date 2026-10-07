"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Minimize2,
  Loader2,
  CornerDownLeft,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What systems has Haroon built?",
  "Tell me about the EPADS Tender Intelligence system",
  "What is Haroon's core tech stack?",
  "How can I contact Haroon for a project or role?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am Haroon's portfolio assistant. Ask me anything about his real-world systems, AI agents, EPADS tender platform, tech stack, or career track.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsLoading(true);

    try {
      // Prioritize client webhook if configured directly, else use secure /api/chat proxy
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK;
      let replyContent = "";

      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            history: messages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          replyContent =
            data.output ||
            data.reply ||
            data.response ||
            data.message ||
            (typeof data === "string" ? data : JSON.stringify(data));
        }
      }

      // If no reply yet, invoke /api/chat proxy
      if (!replyContent) {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            history: messages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          replyContent = data.reply || "Message received.";
        } else {
          throw new Error("Unable to reach assistant.");
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: replyContent,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Haroon's assistant is momentarily offline. Feel free to reach out directly via haroon11005@gmail.com or WhatsApp (+92 347 6379600).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-purple-100 text-xs font-semibold text-zinc-700 shadow-purple-900/10"
          >
            <Sparkles size={13} className="text-[#7C3AED]" />
            <span>Ask Haroon&apos;s AI</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative cursor-pointer ${
            isOpen
              ? "bg-zinc-900 text-white shadow-zinc-900/30"
              : "bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] text-white shadow-purple-600/35 hover:shadow-purple-600/50"
          }`}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {/* Online green indicator dot */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          )}

          {isOpen ? <X size={22} /> : <Bot size={24} />}
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl shadow-purple-950/20 border border-purple-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center text-white shadow-sm shadow-purple-500/30">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F0F14] flex items-center gap-2">
                    <span>Haroon&apos;s AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-500">
                    n8n Workflow & Groq Orchestrated
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-purple-100/50 transition-colors cursor-pointer"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-purple-100/50 transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9FF]/60 text-xs sm:text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-xs ${
                      m.role === "user"
                        ? "bg-[#7C3AED] text-white rounded-br-xs"
                        : "bg-white text-zinc-800 border border-purple-100/80 rounded-bl-xs"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-xs px-4 py-2.5 flex items-center gap-2 text-zinc-500 shadow-xs">
                    <Loader2 size={14} className="animate-spin text-[#7C3AED]" />
                    <span className="text-xs">Processing query...</span>
                  </div>
                </div>
              )}

              {/* Suggested prompts on initial screen */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
                    Suggested Questions
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-white hover:bg-purple-50 text-zinc-700 hover:text-[#7C3AED] border border-purple-100/80 rounded-xl px-3 py-2 transition-all cursor-pointer shadow-2xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-purple-100 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about systems, stack, projects..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF9FF] border border-purple-100 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] text-xs sm:text-sm text-zinc-800 outline-none transition-all placeholder:text-zinc-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md shadow-purple-500/20"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
