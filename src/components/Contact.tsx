"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Basic email check
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
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          source: "Portfolio Contact Form",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await res.json().catch(() => null);
      if (data && data.success === false) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#7C3AED", "#A78BFA", "#C4B5FD", "#3B82F6"],
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred. Please reach out directly."
      );
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Initiate Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Let&apos;s build something together
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Open to full-time roles and project-based work. Web applications, AI
            agents, automation and backend systems — I can take a practical idea
            from concept to deployment.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#FAF9FF] border border-purple-100 rounded-3xl p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight">
                Direct Channels
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Feel free to email or message directly on WhatsApp. I typically
                respond within a few hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-purple-100/80 hover:border-[#7C3AED]/40 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Email
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-zinc-800 group-hover:text-[#7C3AED] transition-colors">
                      {portfolioData.personal.email}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={portfolioData.personal.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-purple-100/80 hover:border-emerald-500/40 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      WhatsApp
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-zinc-800 group-hover:text-emerald-600 transition-colors">
                      {portfolioData.personal.whatsapp}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-purple-100/80">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Location
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-zinc-800">
                      {portfolioData.personal.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="pt-4 border-t border-purple-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                  Online Profiles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-purple-100 text-xs font-bold text-zinc-700 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-purple-100 text-xs font-bold text-zinc-700 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9FF] border border-purple-100 rounded-3xl p-8 sm:p-10 shadow-xs">
              <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-zinc-600 mb-6">
                Connected to automated processing and email delivery.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-100 focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-200 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-100 focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-200 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2"
                  >
                    Project Details or Role Inquiry
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your requirements, timeline, or company opportunity..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-purple-100 focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-200 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 resize-none"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Status Banners */}
                {status === "error" && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>
                      Thank you! Your message has been received. I will get back
                      to you shortly.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-full text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-70 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
