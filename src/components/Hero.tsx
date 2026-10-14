"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { heroContainer, heroItem } from "@/lib/motion";
import TechIcon from "@/components/TechIcon";
import {
  Download,
  Send,
  Mail,
  Layers,
  Phone,
  Award,
  ArrowRight,
  ShieldCheck,
  Building2,
  Workflow,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import SmartEmailLink from "@/components/SmartEmailLink";

// 12 Key technologies for the infinite logo marquee
const MARQUEE_TECH = [
  "Python",
  "FastAPI",
  "Next.js",
  "n8n",
  "PostgreSQL",
  "Docker",
  "LangChain",
  "Supabase",
  "Hugging Face",
  "Tailwind CSS",
  "React",
  "SQLite",
];

export default function Hero() {
  const titles = portfolioData.personal.roleTitles;
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(portfolioData.personal.roleTitles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect with reserved height to prevent CLS
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
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
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white"
    >
      {/* Decorative ambient background: faint grid + soft gradient blobs (aria-hidden) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(#E9D5FF_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute top-16 left-1/4 w-[450px] h-[450px] bg-purple-200/35 rounded-full blur-3xl" />
        <div className="absolute top-48 right-1/4 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bio & Calls to Action */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold tracking-wide shadow-xs"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span>{portfolioData.personal.heroBadge}</span>
            </motion.div>

            {/* Main Heading: Clamp typography to guarantee max 2 lines */}
            <motion.div variants={heroItem}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F0F14] tracking-tight leading-[1.15]">
                Muhammad Haroon Rashid
              </h1>

              {/* Typed Role Line with reserved height to eliminate CLS */}
              <div className="pt-2 h-9 flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-purple-600 font-mono tracking-tight">
                  {displayText || portfolioData.personal.roleTitles[0]}
                </span>
                <span
                  className="inline-block w-0.5 h-6 ml-1 bg-purple-600 animate-pulse"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Sub-line: mentions EPADS + IES directly */}
            <motion.p
              variants={heroItem}
              className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl"
            >
              {portfolioData.personal.heroBio}
            </motion.p>

            {/* Primary & Secondary CTAs: Stacked full-width on mobile */}
            <motion.div
              variants={heroItem}
              className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200 focus-ring min-h-[48px]"
              >
                <span>Hire Me</span>
                <Send size={15} aria-hidden="true" />
              </Link>

              <a
                href={portfolioData.personal.cvPath}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-purple-700 bg-white border border-purple-300 hover:bg-purple-50 hover:border-purple-400 hover:-translate-y-0.5 transition-all duration-200 shadow-xs focus-ring min-h-[48px]"
              >
                <span>Download CV</span>
                <Download size={15} aria-hidden="true" />
              </a>

              {/* Tertiary Icon Buttons with Tooltips */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 sm:pt-0 sm:pl-2">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:border-purple-300 hover:shadow-sm transition-all duration-200 focus-ring"
                  aria-label="GitHub Profile (haroon9595)"
                  title="GitHub Profile"
                >
                  <GithubIcon size={17} />
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:border-purple-300 hover:shadow-sm transition-all duration-200 focus-ring"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={17} />
                </a>

                <SmartEmailLink
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:border-purple-300 hover:shadow-sm transition-all duration-200 focus-ring"
                  aria-label="Email me via Gmail"
                  title="Email me via Gmail"
                >
                  <Mail size={17} />
                </SmartEmailLink>

                <a
                  href={portfolioData.personal.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 focus-ring"
                  aria-label="WhatsApp Chat"
                  title="Chat on WhatsApp"
                >
                  <Phone size={17} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Circular Profile Hero & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="lg:col-span-5 relative flex justify-center items-center py-4"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[390px] md:h-[390px] flex items-center justify-center">
              {/* Soft purple gradient ring & background behind photo */}
              <div
                aria-hidden="true"
                className="absolute inset-1 rounded-full bg-gradient-to-tr from-purple-200 via-purple-100 to-indigo-50 shadow-inner"
              />

              {/* Circular Cropped Profile Image */}
              <div className="relative w-[270px] h-[270px] sm:w-[325px] sm:h-[325px] md:w-[355px] md:h-[355px] rounded-full overflow-hidden border-4 border-white shadow-xl shadow-purple-950/10 bg-gradient-to-b from-purple-100 to-white">
                <Image
                  src={portfolioData.personal.profileImage}
                  alt="Muhammad Haroon Rashid - Full-Stack & AI Agent Developer"
                  fill
                  priority
                  sizes="(max-width: 640px) 270px, (max-width: 768px) 325px, 355px"
                  className="object-cover object-top select-none scale-105"
                />
              </div>

              {/* Card A (Top-Right): Verifiable live deployments - placed outside face */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-purple-900/10 border border-purple-100 flex items-center gap-2.5 sm:gap-3 float-slow-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Layers size={16} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#0F0F14] tracking-tight leading-none">
                    Live Systems
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-purple-700 mt-0.5 sm:mt-1 whitespace-nowrap">
                    EPADS · IES · HostelDesk
                  </div>
                </div>
              </div>

              {/* Card B (Bottom-Left): Core stack with REAL logo tiles - placed outside face */}
              <div className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-lg shadow-purple-900/10 border border-purple-100 flex flex-col gap-1 sm:gap-1.5 float-slow-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    Core Stack
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
                  <TechIcon name="Python" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />
                  <TechIcon name="FastAPI" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />
                  <TechIcon name="n8n" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />
                  <TechIcon name="Next.js" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />
                  <TechIcon name="PostgreSQL" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />
                  <TechIcon name="LangChain" variant="icon" size={15} showTooltip className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-50 border border-zinc-200" />

                  <Link
                    href="#skills"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center font-bold text-xs transition-colors focus-ring"
                    title="View all skills"
                    aria-label="View all skills"
                  >
                    +
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Proof Strip Directly Under Hero (Horizontal snap scroller on mobile) */}
        <div className="mt-14 pt-8 border-t border-purple-100">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Proof Item 1: EPADS */}
            <Link
              href="#projects"
              className="group flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 transition-all duration-200 focus-ring snap-center shrink-0 w-[82vw] max-w-[280px] sm:w-auto sm:max-w-none"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-zinc-900 group-hover:text-purple-700 flex items-center gap-1 transition-colors">
                  <span>EPADS Intelligence</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-zinc-600 line-clamp-2">
                  Built for live Pakistan government bidding workflows
                </p>
              </div>
            </Link>

            {/* Proof Item 2: IES Group */}
            <Link
              href="#projects"
              className="group flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 transition-all duration-200 focus-ring snap-center shrink-0 w-[82vw] max-w-[280px] sm:w-auto sm:max-w-none"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Building2 size={16} aria-hidden="true" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-zinc-900 group-hover:text-purple-700 flex items-center gap-1 transition-colors">
                  <span>IES Group Platform</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-zinc-600 line-clamp-2">
                  AI lead routing across four industrial engineering departments
                </p>
              </div>
            </Link>

            {/* Proof Item 3: HostelDesk */}
            <Link
              href="#projects"
              className="group flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 transition-all duration-200 focus-ring snap-center shrink-0 w-[82vw] max-w-[280px] sm:w-auto sm:max-w-none"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Workflow size={16} aria-hidden="true" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-zinc-900 group-hover:text-purple-700 flex items-center gap-1 transition-colors">
                  <span>HostelDesk System</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-zinc-600 line-clamp-2">
                  Live full-stack complaint dispatch system on Next.js & n8n
                </p>
              </div>
            </Link>

            {/* Proof Item 4: Anthropic Education */}
            <Link
              href="#experience"
              className="group flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100 transition-all duration-200 focus-ring snap-center shrink-0 w-[82vw] max-w-[280px] sm:w-auto sm:max-w-none"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Award size={16} aria-hidden="true" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-bold text-zinc-900 group-hover:text-purple-700 flex items-center gap-1 transition-colors">
                  <span>Anthropic Education</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-zinc-600 line-clamp-2">
                  Claude Code in Action verified certificate
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* "Tech I Ship With" Marquee */}
        <div className="mt-10 pt-6 border-t border-purple-100/60">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 whitespace-nowrap shrink-0">
              Tech I ship with:
            </span>

            {/* Infinite CSS Scroller Container */}
            <div className="w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee flex items-center gap-3">
                {/* First sequence */}
                {MARQUEE_TECH.map((tech) => (
                  <TechIcon
                    key={`m1-${tech}`}
                    name={tech}
                    variant="pill"
                    size={16}
                    showTooltip
                  />
                ))}
                {/* Duplicated sequence marked aria-hidden */}
                {MARQUEE_TECH.map((tech) => (
                  <TechIcon
                    key={`m2-${tech}`}
                    name={tech}
                    variant="pill"
                    size={16}
                    aria-hidden="true"
                    className="select-none"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
