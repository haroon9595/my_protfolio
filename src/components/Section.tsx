import React from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "tint" | "dark";
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  variant = "white",
}: SectionProps) {
  const bgStyles = {
    white: "bg-white text-[#0F0F14]",
    tint: "bg-[#FAF8FF] text-[#0F0F14] border-y border-[#F0EAFE]",
    dark: "bg-[#0B0914] text-white border-y border-[#201838]",
  }[variant];

  const eyebrowStyles = {
    white: "bg-purple-50 text-purple-700 border border-purple-200/70",
    tint: "bg-purple-100/70 text-purple-800 border border-purple-200",
    dark: "bg-purple-950/70 text-purple-300 border border-purple-700/50 shadow-purple-glow-sm",
  }[variant];

  const titleStyles = {
    white: "text-[#0F0F14]",
    tint: "text-[#0F0F14]",
    dark: "text-white",
  }[variant];

  const subtitleStyles = {
    white: "text-[#585767]",
    tint: "text-[#585767]",
    dark: "text-[#B3AFC9]",
  }[variant];

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 scroll-mt-20 transition-colors duration-200 ${bgStyles} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3.5 ${eyebrowStyles}`}
          >
            <span>{eyebrow}</span>
          </div>
          
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${titleStyles}`}
          >
            {title}
          </h2>

          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${subtitleStyles}`}
          >
            {subtitle}
          </p>

          <div
            className="w-12 h-1 bg-purple-600 rounded-full mt-4 origin-center animate-draw-center"
            aria-hidden="true"
          />
        </div>

        {/* Section Body */}
        {children}
      </div>
    </section>
  );
}
