"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import {
  Code2,
  Terminal,
  Download,
  Send,
  Mail,
  Layers,
  Phone,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Hero() {
  const titles = portfolioData.personal.roleTitles;
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(portfolioData.personal.roleTitles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#FAF9FF]"
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Calls to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small purple badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles size={13} className="text-[#7C3AED]" />
              <span>{portfolioData.personal.heroBadge}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F0F14] tracking-tight leading-[1.12]">
                Hello, I&apos;m{" "}
                <span className="block mt-1 text-[#0F0F14]">
                  Muhammad Haroon Rashid
                </span>
              </h1>

              {/* Typing Animation Subtitle */}
              <div className="pt-2 flex items-center min-h-[36px]">
                <span className="text-lg sm:text-2xl font-bold text-[#7C3AED] font-mono">
                  {displayText}
                </span>
                <span className="inline-block w-0.5 h-6 ml-1 bg-[#7C3AED] animate-pulse" />
              </div>
            </div>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              {portfolioData.personal.heroBio}
            </p>

            {/* Buttons: Hire Me & Download CV */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Hire Me</span>
                <Send size={16} />
              </Link>

              <a
                href={portfolioData.personal.cvPath}
                download="Muhammad_Haroon_Rashid_CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#7C3AED] bg-white border-2 border-[#7C3AED] hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <span>Download CV</span>
                <Download size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-[#7C3AED] hover:border-[#7C3AED] hover:shadow-md transition-all duration-200"
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-[#7C3AED] hover:border-[#7C3AED] hover:shadow-md transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>

                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="w-10 h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-[#7C3AED] hover:border-[#7C3AED] hover:shadow-md transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>

                <a
                  href={portfolioData.personal.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-emerald-600 hover:border-emerald-500 hover:shadow-md transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Circular Profile Composition & Floating Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] flex items-center justify-center">
              {/* Soft purple gradient background circle behind photo */}
              <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-[#DDD6FE] via-[#EDE9FE] to-[#F5F3FF] shadow-inner" />

              {/* Decorative floating purple dots */}
              <div className="absolute top-8 left-4 w-3.5 h-3.5 rounded-full bg-[#7C3AED] opacity-80 animate-ping" />
              <div className="absolute top-1/2 -left-6 w-2.5 h-2.5 rounded-full bg-[#C4B5FD]" />
              <div className="absolute bottom-8 right-2 w-5 h-5 rounded-full bg-[#A78BFA] opacity-75" />
              <div className="absolute -top-3 right-16 w-3 h-3 rounded-full bg-[#7C3AED]/50" />

              {/* Top-Left Diamond Badge (Code/Terminal instead of WordPress) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute top-6 left-6 z-20"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-purple-500/30 border-2 border-white">
                  <div className="-rotate-45 text-white flex items-center justify-center">
                    <Terminal size={20} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              {/* Circular Cropped Profile Image */}
              <div
                style={{ position: "relative" }}
                className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[410px] md:h-[410px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl shadow-purple-950/15 bg-gradient-to-b from-purple-100/50 to-white"
              >
                <Image
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 410px"
                  className="object-cover object-top select-none scale-105"
                />
              </div>

              {/* Floating Card 1: Top-Right "4+ Systems built" */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-purple-900/10 border border-purple-100 flex items-center gap-3.5 hover:shadow-2xl transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                  <Layers size={22} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0F0F14] tracking-tight leading-none">
                    {portfolioData.personal.stats.number}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-zinc-500 mt-1 whitespace-nowrap">
                    {portfolioData.personal.stats.label}
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: Bottom-Left Stack Card (n8n, Python, Next.js, PostgreSQL) */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-purple-900/10 border border-purple-100 flex flex-col gap-1.5 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    Core Stack
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {/* n8n icon chip */}
                  <div
                    className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-[10px]"
                    title="n8n Automation"
                  >
                    n8n
                  </div>

                  {/* Python icon chip */}
                  <div
                    className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-[10px]"
                    title="Python"
                  >
                    Py
                  </div>

                  {/* Next.js icon chip */}
                  <div
                    className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-900 font-bold text-[10px]"
                    title="Next.js"
                  >
                    Next
                  </div>

                  {/* PostgreSQL icon chip */}
                  <div
                    className="w-8 h-8 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-[10px]"
                    title="PostgreSQL"
                  >
                    SQL
                  </div>

                  {/* Purple plus badge */}
                  <div
                    className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/30"
                    title="More Tools"
                  >
                    +
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
