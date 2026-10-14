"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data";
import { Menu, X, ArrowUpRight, Download, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll listener for blur, shrink & progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for accurate scrollspy across all sections
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "projects",
      "services",
      "skills",
      "experience",
      "contact",
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility (Escape closes mobile menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF9FF]/95 backdrop-blur-md py-3 shadow-xs border-b border-purple-100/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="text-2xl font-extrabold tracking-tight text-[#0F0F14] flex items-center group focus-ring rounded-lg px-1"
          >
            <span>{portfolioData.personal.shortName}</span>
            <span className="text-purple-600 group-hover:scale-125 transition-transform duration-300">
              .
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center space-x-7"
          >
            {portfolioData.navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-bold tracking-wider transition-colors duration-200 uppercase relative py-1.5 focus-ring rounded ${
                    isActive
                      ? "text-purple-600"
                      : "text-zinc-600 hover:text-purple-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Status Badge & Contact Button */}
          <div className="hidden sm:flex items-center gap-3.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{portfolioData.personal.availabilityBadge}</span>
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 hover:-translate-y-0.5 focus-ring cursor-pointer"
            >
              Contact Me
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="#contact"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-purple-600 focus-ring"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar fixed under navbar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-purple-500 via-purple-600 to-indigo-500 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Accessible Mobile Menu Sheet with large 48px tap targets */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="sm:hidden fixed inset-x-0 top-[60px] bg-[#FAF9FF] border-b border-purple-100 px-6 py-6 shadow-2xl max-h-[calc(100dvh-60px)] overflow-y-auto z-40"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium w-fit mb-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{portfolioData.personal.availabilityBadge}</span>
            </div>

            <nav className="flex flex-col space-y-1 mb-6">
              {portfolioData.navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold tracking-wide uppercase text-zinc-800 hover:text-purple-600 transition-colors py-3 min-h-[48px] flex items-center justify-between border-b border-purple-50"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={15} className="text-zinc-400" />
                </Link>
              ))}
            </nav>

            {/* Actions: CV Download & Contact */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={portfolioData.personal.cvPath}
                download
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-purple-600 bg-white border border-purple-600 hover:bg-purple-50 transition-colors focus-ring"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-purple-600 shadow-md shadow-purple-500/20 focus-ring"
              >
                <Send size={16} />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-purple-100">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={portfolioData.personal.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-zinc-700 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                aria-label="WhatsApp Contact"
              >
                <WhatsappIcon size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
