"use client";

import { portfolioData } from "@/data";
import Section from "@/components/Section";
import { MapPin, Cpu, Languages, GraduationCap, Download, CheckCircle2 } from "lucide-react";

export default function About() {
  const getIcon = (name: string) => {
    switch (name) {
      case "map-pin":
        return <MapPin size={18} className="text-purple-600" aria-hidden="true" />;
      case "cpu":
        return <Cpu size={18} className="text-purple-600" aria-hidden="true" />;
      case "languages":
        return <Languages size={18} className="text-purple-600" aria-hidden="true" />;
      case "graduation-cap":
        return <GraduationCap size={18} className="text-purple-600" aria-hidden="true" />;
      default:
        return <Cpu size={18} className="text-purple-600" aria-hidden="true" />;
    }
  };

  return (
    <Section
      id="about"
      eyebrow="Background & Approach"
      title="About Haroon"
      subtitle="Engineering real-world software, AI agent systems, and automated pipelines from raw problem to production."
      variant="tint"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Main Narrative Card */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-purple-100 rounded-3xl p-7 sm:p-9 shadow-purple-subtle relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-purple-600" aria-hidden="true" />

          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-medium text-zinc-800 leading-relaxed">
              {portfolioData.about.paragraph1}
            </p>

            <div className="border-t border-purple-100" />

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              {portfolioData.about.paragraph2}
            </p>
          </div>

          <div className="pt-6">
            <a
              href={portfolioData.personal.cvPath}
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 focus-ring"
            >
              <Download size={14} aria-hidden="true" />
              <span>Download Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </div>

        {/* 4 Quick Facts Grid: 2-column grid of equal-size tiles on mobile */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {portfolioData.about.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl p-3.5 sm:p-4 bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5"
            >
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                {getIcon(fact.icon)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-zinc-500">{fact.label}</div>
                <div className="font-bold tracking-tight text-[#0F0F14] text-sm sm:text-base mt-0.5 truncate">
                  {fact.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-item "How I Work" Strip */}
      <div className="mt-10 pt-8 border-t border-purple-100/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 text-center mb-6">
          Engineering Delivery Workflow
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {portfolioData.about.howIWork.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-600 font-mono bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    Phase {step.step}
                  </span>
                  <CheckCircle2 size={16} className="text-emerald-500" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-[#0F0F14] tracking-tight pt-1">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
