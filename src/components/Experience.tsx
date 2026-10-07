"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { Briefcase, Calendar, CheckCircle2, Building2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FAF9FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Career Track
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Work Experience
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Practical engineering delivering production software systems, AI
            workflows, and enterprise lead operations.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all relative overflow-hidden"
            >
              {/* Left purple indicator */}
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-[#7C3AED] to-purple-400" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-8 h-8 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                      <Briefcase size={16} />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F0F14] tracking-tight">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-600 font-semibold text-sm">
                    <Building2 size={16} className="text-[#7C3AED]" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-[#7C3AED] text-xs font-bold self-start sm:self-center border border-purple-100">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Achievements list */}
              <div className="space-y-3.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Key Deliverables & Engineering Impact
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {exp.achievements.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 bg-[#FAF9FF] p-3.5 rounded-2xl border border-purple-100/60"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#7C3AED] shrink-0 mt-0.5"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </div>
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
