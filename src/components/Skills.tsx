"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data";
import Section from "@/components/Section";
import TechIcon from "@/components/TechIcon";
import {
  Code2,
  Server,
  Brain,
  Cpu,
  Database,
  Layout,
  Wrench,
  ChevronDown,
} from "lucide-react";

export default function Skills() {
  // Mobile accordion state: first category open by default
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    [portfolioData.skills[0].category]: true,
  });

  const toggleAccordion = (category: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 size={20} className="text-purple-400" aria-hidden="true" />;
      case "Backend & Automation":
        return <Server size={20} className="text-purple-400" aria-hidden="true" />;
      case "AI & Generative AI":
        return <Brain size={20} className="text-purple-400" aria-hidden="true" />;
      case "Machine Learning & Data":
        return <Cpu size={20} className="text-purple-400" aria-hidden="true" />;
      case "Databases":
        return <Database size={20} className="text-purple-400" aria-hidden="true" />;
      case "Frontend":
        return <Layout size={20} className="text-purple-400" aria-hidden="true" />;
      case "AI-Assisted Development & Tools":
      case "Dev Tools & Platforms":
        return <Wrench size={20} className="text-purple-400" aria-hidden="true" />;
      default:
        return <Code2 size={20} className="text-purple-400" aria-hidden="true" />;
    }
  };

  return (
    <Section
      id="skills"
      eyebrow="Technical Stack"
      title="Skills & Engineering Tooling"
      subtitle="Real technology brand logos and tools used in shipping real-world architectures, autonomous agents, and data systems."
      variant="dark"
    >
      {/* 
        Responsive Grid:
        - Mobile (<640px): 1 column with collapsible accordion
        - Tablet (>=640px): 2 columns
        - Desktop (>=1024px): 3 columns
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {portfolioData.skills.map((categoryGroup, index) => {
          const isFullSpan = index === portfolioData.skills.length - 1;
          const isOpen = !!openAccordions[categoryGroup.category];

          return (
            <div
              key={categoryGroup.category}
              className={`glass-panel-dark rounded-2xl p-4 sm:p-6 border border-[#282046] hover:border-purple-500/50 hover:shadow-purple-glow transition-all duration-300 flex flex-col justify-between ${
                isFullSpan ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div>
                {/* Category Header: Button toggle on mobile, static on desktop */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(categoryGroup.category)}
                  className="w-full flex items-center justify-between pb-3 sm:mb-5 sm:pb-3 border-b border-[#241A40] text-left cursor-pointer sm:cursor-default focus-ring rounded-lg"
                  aria-expanded={isOpen}
                  aria-controls={`skills-group-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-950/70 border border-purple-800/40 flex items-center justify-center shadow-xs shrink-0">
                      {getCategoryIcon(categoryGroup.category)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                        {categoryGroup.category}
                      </h3>
                      <span className="text-xs text-purple-200/80 font-medium">
                        {categoryGroup.skills.length} core technologies
                      </span>
                    </div>
                  </div>

                  {/* Accordion Chevron Indicator on Phones */}
                  <div className="sm:hidden p-1 text-purple-400">
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Grid of Real Brand Logo Tiles (3 per row, wrapped labels) */}
                <div
                  id={`skills-group-${index}`}
                  className={`pt-3 sm:pt-0 ${
                    isOpen ? "grid" : "hidden sm:grid"
                  } gap-2 sm:gap-3 ${
                    isFullSpan
                      ? "grid-cols-3 sm:grid-cols-3 md:grid-cols-6"
                      : "grid-cols-3"
                  }`}
                >
                  {categoryGroup.skills.map((skill) => (
                    <TechIcon
                      key={skill}
                      name={skill}
                      variant="tile"
                      theme="dark"
                      size={26}
                      showTooltip
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
