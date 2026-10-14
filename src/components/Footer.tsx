"use client";

import Link from "next/link";
import { portfolioData } from "@/data";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9FF] border-t border-purple-100 py-10 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-100/70">
          {/* Logo & Role */}
          <div className="text-center md:text-left space-y-1">
            <Link
              href="#home"
              className="text-xl font-extrabold text-[#0F0F14] tracking-tight inline-flex items-center focus-ring rounded"
            >
              <span>{portfolioData.personal.shortName}</span>
              <span className="text-purple-600">.</span>
            </Link>
            <p className="text-xs text-zinc-600 font-medium">
              Full-Stack Developer · AI Agents & Systems
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-purple-600 hover:border-purple-300 transition-colors focus-ring"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-purple-600 hover:border-purple-300 transition-colors focus-ring"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-purple-600 hover:border-purple-300 transition-colors focus-ring"
              aria-label="Send Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={portfolioData.personal.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors focus-ring"
              aria-label="WhatsApp Chat"
            >
              <Phone size={16} />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors focus-ring px-3 py-1.5 rounded-full hover:bg-purple-50"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 text-center sm:text-left">
          <p suppressHydrationWarning>
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
          <p>
            Deployed on Vercel · Production Ready
          </p>
        </div>
      </div>
    </footer>
  );
}
