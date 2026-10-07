"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { MapPin, Cpu, Languages, GraduationCap, Download } from "lucide-react";

export default function About() {
  const getIcon = (name: string) => {
    switch (name) {
      case "map-pin":
        return <MapPin size={20} className="text-[#7C3AED]" />;
      case "cpu":
        return <Cpu size={20} className="text-[#7C3AED]" />;
      case "languages":
        return <Languages size={20} className="text-[#7C3AED]" />;
      case "graduation-cap":
        return <GraduationCap size={18} className="text-zinc-400" />;
      default:
        return <Cpu size={20} className="text-[#7C3AED]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-[#FAF9FF] border border-purple-100/80 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#7C3AED]" />

              <p className="text-lg sm:text-xl font-medium text-zinc-800 leading-relaxed">
                {portfolioData.about.paragraph1}
              </p>

              <div className="my-6 border-t border-purple-100" />

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                {portfolioData.about.paragraph2}
              </p>

              <div className="pt-4">
                <a
                  href={portfolioData.personal.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-[#7C3AED] bg-white border border-[#7C3AED] hover:bg-purple-50 transition-all duration-200 shadow-xs hover:-translate-y-0.5"
                >
                  <Download size={15} />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Facts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Quick Facts
            </h3>

            <div className="grid grid-cols-1 gap-3.5">
              {portfolioData.about.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className={`rounded-2xl p-4 transition-all duration-200 border ${
                    fact.secondary
                      ? "bg-zinc-50/60 border-zinc-200/60 text-zinc-500 py-3 text-xs"
                      : "bg-white border-purple-100 hover:border-[#7C3AED]/30 hover:shadow-md hover:shadow-purple-500/5 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        fact.secondary
                          ? "bg-zinc-100"
                          : "bg-purple-50 text-[#7C3AED]"
                      }`}
                    >
                      {getIcon(fact.icon)}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-semibold ${
                          fact.secondary ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {fact.label}
                      </div>
                      <div
                        className={`font-semibold tracking-tight ${
                          fact.secondary
                            ? "text-zinc-600 text-xs mt-0.5"
                            : "text-[#0F0F14] text-base mt-0.5"
                        }`}
                      >
                        {fact.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
