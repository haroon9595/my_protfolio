"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { portfolioData } from "@/data";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll listener for blur & shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          ? "bg-[#FAF9FF]/95 backdrop-blur-md py-3 shadow-sm border-b border-purple-100/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="text-2xl sm:text-2xl font-extrabold tracking-tight text-[#0F0F14] flex items-center group focus-ring rounded-lg px-1"
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
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"
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
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 hover:-translate-y-0.5 focus-ring"
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
              className="p-2 rounded-xl text-zinc-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="sm:hidden fixed inset-x-0 top-[60px] bg-[#FAF9FF] border-b border-purple-100 px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium w-fit mb-4">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{portfolioData.personal.availabilityBadge}</span>
          </div>

          <nav className="flex flex-col space-y-3.5 mb-6">
            {portfolioData.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-wide uppercase text-zinc-800 hover:text-purple-600 transition-colors py-2 flex items-center justify-between border-b border-purple-50"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-zinc-400" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={portfolioData.personal.cvPath}
              download
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-purple-600 bg-white border border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Download CV
            </a>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold text-white bg-purple-600 shadow-md shadow-purple-500/20"
            >
              Contact Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
