"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Minimize2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

let msgIdCounter = 0;
function createMessageId(prefix: string): string {
  msgIdCounter += 1;
  return `${prefix}-${msgIdCounter}-${Math.random().toString(36).slice(2, 7)}`;
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
        "👋 Hello! I am Haroon's portfolio assistant. Ask me anything about his real-world systems, AI agents, EPADS tender platform, tech stack, or career track.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

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
      id: createMessageId("user"),
      role: "user",
      content: textToSend.trim(),
    };

    // Maintain conversation history formatted for n8n AI Assistant
    const conversationHistory = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsLoading(true);

    try {
      const webhookUrl =
        process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK ||
        "https://haroonrashid.duckdns.org/webhook/haroon-ai-assistant";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat webhook returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantAnswer =
        data?.answer ||
        data?.output ||
        data?.reply ||
        data?.response ||
        data?.message;

      if (
        !assistantAnswer ||
        typeof assistantAnswer !== "string" ||
        !assistantAnswer.trim()
      ) {
        throw new Error("Response did not contain an answer");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId("assistant"),
          role: "assistant",
          content: assistantAnswer.trim(),
        },
      ]);
    } catch (err) {
      console.error("AI Assistant connection error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId("error"),
          role: "assistant",
          content:
            "Sorry, I had trouble reaching Haroon's assistant service right now. You can reach out directly via WhatsApp or email!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (FAB) - Hidden when modal is open to prevent collision */}
      {!isOpen && (
        <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-purple-100 text-xs font-semibold text-zinc-700 shadow-purple-900/10 select-none"
          >
            <Sparkles size={13} className="text-purple-600" aria-hidden="true" />
            <span>Ask Haroon&apos;s AI</span>
          </motion.div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative cursor-pointer focus-ring bg-gradient-to-tr from-purple-600 to-purple-700 text-white shadow-purple-600/35 hover:shadow-purple-600/50 hover:scale-105 active:scale-95"
            aria-label="Open chat assistant"
            aria-expanded={isOpen}
          >
            {/* Green online status indicator dot */}
            <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>

            {/* Large 🤖 Emoji with gentle idle float/wave */}
            <span className="text-2xl bot-idle-wave select-none" aria-hidden="true">
              🤖
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Mobile Bottom Sheet (100dvh on mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Haroon's AI Assistant"
            className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:right-6 z-50 w-full sm:w-[410px] h-[100dvh] sm:h-[540px] max-h-[100dvh] sm:max-h-[82vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-purple-950/25 border border-purple-100 flex flex-col overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-full flex items-center justify-center pt-2.5 pb-1 bg-white">
              <div className="w-12 h-1.5 rounded-full bg-zinc-300" />
            </div>

            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 border-b border-purple-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-purple-700 flex items-center justify-center text-lg shadow-sm text-white shrink-0">
                  <span aria-hidden="true">🤖</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F0F14] flex items-center gap-1.5">
                    <span>Haroon&apos;s AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-500">
                    Ask about my work and projects
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-purple-100/50 transition-colors focus-ring cursor-pointer"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-purple-100/50 transition-colors focus-ring cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF9FF]/60 text-xs sm:text-sm">
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
                        ? "bg-purple-600 text-white rounded-br-xs"
                        : "bg-white text-zinc-800 border border-purple-100 rounded-bl-xs"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Three Bouncing Dots Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="sr-only">Haroon&apos;s AI is thinking...</span>
                  </div>
                </div>
              )}

              {/* Suggested prompts: horizontally scrollable on mobile */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
                    Suggested Questions
                  </span>
                  <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible scrollbar-none pb-1 sm:pb-0 -mx-1 px-1">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-white hover:bg-purple-50 text-zinc-700 hover:text-purple-700 border border-purple-100 rounded-xl px-3.5 py-2.5 transition-all cursor-pointer shadow-2xs focus-ring shrink-0 whitespace-nowrap sm:whitespace-normal"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar with 16px text on mobile and safe-area padding */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-purple-100 flex items-center gap-2 shrink-0 pb-5 sm:pb-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about systems, stack, projects..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF9FF] border border-purple-100 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-base sm:text-sm text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus-ring"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md shadow-purple-500/20 focus-ring"
                aria-label="Send message"
              >
                <Send size={15} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
