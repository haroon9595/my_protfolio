"use client";

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
} from "lucide-react";

export default function Skills() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((categoryGroup, index) => {
          const isFullSpan = index === portfolioData.skills.length - 1; // Last card (Dev Tools) spans 3 columns

          return (
            <div
              key={categoryGroup.category}
              className={`glass-panel-dark rounded-2xl p-5 sm:p-6 border border-[#282046] hover:border-purple-500/50 hover:shadow-purple-glow transition-all duration-300 flex flex-col justify-between ${
                isFullSpan ? "lg:col-span-3" : ""
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#241A40]">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/40 flex items-center justify-center shadow-xs shrink-0">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {categoryGroup.category}
                    </h3>
                    <span className="text-xs text-purple-300/70">
                      {categoryGroup.skills.length} core technologies
                    </span>
                  </div>
                </div>

                {/* Grid of Real Brand Logo Tiles */}
                <div
                  className={`grid gap-2.5 sm:gap-3 ${
                    isFullSpan
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                      : "grid-cols-3 sm:grid-cols-3"
                  }`}
                >
                  {categoryGroup.skills.map((skill) => (
                    <TechIcon
                      key={skill}
                      name={skill}
                      variant="tile"
                      theme="dark"
                      size={28}
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
