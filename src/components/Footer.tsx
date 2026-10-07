"use client";

import Link from "next/link";
import { portfolioData } from "@/data";
import { Mail, Phone, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9FF] border-t border-purple-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-purple-100/70">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <Link
              href="#home"
              className="text-2xl font-extrabold text-[#0F0F14] tracking-tight inline-flex items-center"
            >
              <span>{portfolioData.personal.shortName}</span>
              <span className="text-[#7C3AED]">.</span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
              Full-Stack & AI Agent Developer. Engineering production web apps,
              autonomous agents, and data systems.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-600">
            {portfolioData.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#7C3AED] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={portfolioData.personal.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-zinc-600 hover:text-emerald-600 hover:border-emerald-500 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p suppressHydrationWarning>
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
