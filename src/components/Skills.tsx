"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import {
  Code2,
  Server,
  Bot,
  Layout,
  Database,
} from "lucide-react";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 size={18} className="text-[#7C3AED]" />;
      case "Backend & Automation":
        return <Server size={18} className="text-[#7C3AED]" />;
      case "AI & Machine Learning":
        return <Bot size={18} className="text-[#7C3AED]" />;
      case "Frontend":
        return <Layout size={18} className="text-[#7C3AED]" />;
      case "Data & Tools":
        return <Database size={18} className="text-[#7C3AED]" />;
      default:
        return <Code2 size={18} className="text-[#7C3AED]" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Technical Repertoire
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Skills & Core Tooling
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Practical competencies utilized in shipping real-world architectures
            and autonomous systems.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((categoryGroup, index) => (
            <motion.div
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#FAF9FF] rounded-3xl p-6 sm:p-7 border border-purple-100/80 hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-purple-100 flex items-center justify-center shadow-xs">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F0F14] tracking-tight">
                    {categoryGroup.category}
                  </h3>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {categoryGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-purple-100 hover:border-[#7C3AED]/50 text-zinc-800 hover:text-[#7C3AED] shadow-2xs hover:shadow-xs transition-all duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
