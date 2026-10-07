"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import {
  Code,
  Brain,
  Workflow,
  Database,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Services() {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code size={26} className="text-[#7C3AED]" />;
      case "brain":
        return <Brain size={26} className="text-[#7C3AED]" />;
      case "workflow":
        return <Workflow size={26} className="text-[#7C3AED]" />;
      case "database":
        return <Database size={26} className="text-[#7C3AED]" />;
      default:
        return <Code size={26} className="text-[#7C3AED]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF9FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Specialized Services
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Full-lifecycle development from raw data pipelines and AI agent
            orchestration to robust production web applications.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        {/* 4 Primary Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {portfolioData.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-purple-100 hover:border-[#7C3AED]/40 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 group-hover:bg-[#7C3AED]/10 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-3xl font-black text-purple-100 font-mono">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F14] tracking-tight group-hover:text-[#7C3AED] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tech Pills */}
                <div className="bg-[#FAF9FF] border border-purple-100/60 rounded-xl px-4 py-2.5 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 block mb-1">
                    Technologies
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">
                    {service.tech}
                  </span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-purple-50">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] group-hover:translate-x-1 transition-all duration-200"
                >
                  <span>Discuss a project</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery & Deployment Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-purple-100/80 border-l-4 border-l-[#7C3AED] relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#7C3AED]">
                  <Rocket size={18} />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#0F0F14] tracking-tight">
                  {portfolioData.deploymentStrip.title}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                {portfolioData.deploymentStrip.text}
              </p>

              {/* 5 Small Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {portfolioData.deploymentStrip.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9FF] border border-purple-200/80 text-purple-900 shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-[#7C3AED]" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:self-center shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-md shadow-purple-500/20 hover:shadow-lg transition-all"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
