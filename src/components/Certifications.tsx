"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { Award, Trophy, CheckCircle, Calendar } from "lucide-react";

export default function Certifications() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF9FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Recognition
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Certifications & Honours
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Official industry accreditations, hackathon distinctions, and
            government honors.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.certifications.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-purple-100/90 shadow-sm hover:shadow-lg hover:shadow-purple-500/5 hover:border-[#7C3AED]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-4">
                  {index === 0 ? <Award size={20} /> : <Trophy size={18} />}
                </div>

                <h3 className="text-base font-bold text-[#0F0F14] tracking-tight leading-snug mb-1">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-[#7C3AED] mb-2">
                  {item.issuer}
                </p>

                {item.highlight && (
                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                    {item.highlight}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-purple-50 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
                <Calendar size={12} />
                <span>{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
