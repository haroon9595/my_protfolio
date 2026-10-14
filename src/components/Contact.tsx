"use client";

import { useState } from "react";
import { portfolioData } from "@/data";
import Section from "@/components/Section";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lookingFor: "Full-time role",
    message: "",
    honeypot: "", // Bot prevention field
  });

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    // Honeypot check for spambots
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const webhookUrl =
        process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK ||
        "https://haroonrashid.duckdns.org/webhook/portfolio-contact";

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          lookingFor: formData.lookingFor,
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          source: "Portfolio Contact Form",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        lookingFor: "Full-time role",
        message: "",
        honeypot: "",
      });

      // Celebration confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#7C3AED", "#A78BFA", "#C4B5FD", "#3B82F6"],
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please reach out directly."
      );
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Initiate Contact"
      title="Let's build something together"
      subtitle="Tell me about your project or role. I reply by email or WhatsApp."
      variant="tint"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-8">
        {/* Form FIRST on mobile (order-1), right on desktop (lg:order-2) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
            <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight mb-5">
              Send a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className={`space-y-4 ${status === "error" ? "animate-shake" : ""}`}
            >
              {/* Honeypot field (hidden for spam bot trapping) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_title">Leave this empty</label>
                <input
                  type="text"
                  id="company_title"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5"
                  >
                    Your Name <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    inputMode="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9FF] border border-purple-100 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus-ring"
                    disabled={status === "loading"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5"
                  >
                    Email Address <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9FF] border border-purple-100 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus-ring"
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              {/* "I am looking for" Dropdown */}
              <div>
                <label
                  htmlFor="lookingFor"
                  className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5"
                >
                  I am looking for
                </label>
                <select
                  id="lookingFor"
                  value={formData.lookingFor}
                  onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9FF] border border-purple-100 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 text-base text-zinc-900 outline-none transition-all focus-ring cursor-pointer"
                  disabled={status === "loading"}
                >
                  <option value="Full-time role">Full-time role</option>
                  <option value="Project / freelance work">Project / freelance work</option>
                  <option value="Something else">Something else</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5"
                >
                  Message <span className="text-purple-600">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your requirements, timeline, or company opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9FF] border border-purple-100 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-500/20 text-base text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus-ring resize-none"
                  disabled={status === "loading"}
                />
              </div>

              {/* Status Notifications */}
              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium"
                >
                  <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div
                  role="status"
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold animate-scale-in"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>Thanks, I will get back to you shortly!</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full min-h-[48px] py-3.5 rounded-full text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-70 shadow-md shadow-purple-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus-ring"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Direct Channels Column (order-2 on mobile, lg:order-1 on desktop) */}
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
          <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div>
              <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                Feel free to email or message directly on WhatsApp. I typically respond within a few hours.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      Email
                    </span>
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="text-xs sm:text-sm font-bold text-[#0F0F14] hover:text-purple-600 truncate block transition-colors"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors focus-ring shrink-0 cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Card */}
              <a
                href={portfolioData.personal.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between gap-3 group hover:border-emerald-400 transition-colors focus-ring"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                      WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors truncate block">
                      {portfolioData.personal.whatsapp}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
                  Chat Now
                </span>
              </a>
            </div>

            {/* Social Profile Buttons */}
            <div className="pt-3 border-t border-purple-100">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                Online Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF9FF] border border-purple-100 text-xs font-bold text-zinc-700 hover:text-purple-600 hover:border-purple-300 transition-colors focus-ring"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF9FF] border border-purple-100 text-xs font-bold text-zinc-700 hover:text-purple-600 hover:border-purple-300 transition-colors focus-ring"
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
