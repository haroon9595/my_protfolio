"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, ProjectItem } from "@/data";
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpRight,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  Bot,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

type CategoryFilter =
  | "All"
  | "AI Agents"
  | "Automation"
  | "Full-Stack"
  | "Machine Learning";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = [
    "All",
    "AI Agents",
    "Automation",
    "Full-Stack",
    "Machine Learning",
  ];

  // Filter primary projects
  const filteredProjects = portfolioData.projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.categories.includes(activeFilter as any);
  });

  // Filter more projects
  const filteredMoreProjects = portfolioData.moreProjects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.categories.includes(activeFilter as any);
  });

  const getTagBadge = (tag: string, tagType?: string) => {
    switch (tagType) {
      case "bidding":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED] text-white shadow-sm shadow-purple-500/30">
            <Sparkles size={12} />
            <span>{tag}</span>
          </span>
        );
      case "client":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED] text-white shadow-sm shadow-purple-500/30">
            <CheckCircle2 size={12} />
            <span>{tag}</span>
          </span>
        );
      case "end-to-end":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#7C3AED] border border-purple-200">
            <Layers size={12} />
            <span>{tag}</span>
          </span>
        );
      case "ai":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
            <Bot size={12} />
            <span>{tag}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700">
            {tag}
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/70 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
            Featured Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0F14] tracking-tight">
            Production & Real-World Projects
          </h2>
          <p className="text-base text-zinc-600 max-w-2xl mx-auto">
            Practical systems built with real data, real API integrations, and
            autonomous tool-calling intelligence.
          </p>
          <div className="w-12 h-1 bg-[#7C3AED] rounded-full mx-auto mt-2" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === category
                  ? "bg-[#7C3AED] text-white shadow-md shadow-purple-500/25 scale-105"
                  : "bg-[#FAF9FF] text-zinc-600 hover:text-[#7C3AED] border border-purple-100/80 hover:bg-purple-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Projects List */}
        <div className="space-y-12 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFirstFeatured = project.featured;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                    isFirstFeatured
                      ? "bg-gradient-to-br from-[#FAF9FF] via-white to-purple-50/40 border-purple-200/90 shadow-lg shadow-purple-900/5 p-8 sm:p-12 ring-1 ring-purple-400/20"
                      : "bg-[#FAF9FF] border-purple-100/80 shadow-xs hover:shadow-lg p-7 sm:p-10"
                  }`}
                >
                  {/* Decorative top accent for featured */}
                  {isFirstFeatured && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7C3AED] via-purple-500 to-[#C4B5FD]" />
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    {/* Left details */}
                    <div className="space-y-5 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        {getTagBadge(project.tag, project.tagType)}

                        {isFirstFeatured && (
                          <span className="text-xs font-bold uppercase tracking-wider text-purple-900/70 bg-purple-100/80 px-2.5 py-0.5 rounded-md">
                            Flagship System
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-black text-[#0F0F14] tracking-tight ${
                          isFirstFeatured
                            ? "text-2xl sm:text-3xl lg:text-4xl leading-tight"
                            : "text-xl sm:text-2xl lg:text-3xl"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                          What it does & System Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {project.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 bg-white/80 border border-purple-100/60 p-2.5 sm:p-3 rounded-xl shadow-2xs"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-[#7C3AED] shrink-0 mt-0.5"
                              />
                              <span className="leading-snug">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-purple-200/70 text-zinc-800 shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-md shadow-purple-500/20 hover:shadow-lg transition-all"
                          >
                            <span>Live System</span>
                            <ExternalLink size={14} />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-700 bg-white border border-purple-200 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all shadow-2xs"
                          >
                            <GithubIcon size={15} />
                            <span>GitHub</span>
                          </a>
                        )}

                        {!project.liveUrl && !project.githubUrl && (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 bg-zinc-100">
                            <span>Production / Client Restricted Code</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right summary preview box for EPADS / HostelDesk */}
                    {isFirstFeatured && (
                      <div className="lg:w-80 shrink-0 bg-white rounded-2xl p-6 border border-purple-100 shadow-md space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                          <MessageSquare size={16} />
                          <span>WhatsApp Bot Summary</span>
                        </div>
                        <div className="bg-[#FAF9FF] p-4 rounded-xl text-xs space-y-2 border border-purple-50 font-mono text-zinc-700">
                          <p className="font-bold text-zinc-900">
                            📋 Tender Summary Card:
                          </p>
                          <p>• Agency: EPADS Portal</p>
                          <p>• Closing: Real-time countdown</p>
                          <p>• Bid Security: Structured terms</p>
                          <p>• FastMCP: AI Tool Calling</p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 pt-2 border-t border-purple-50">
                          <span className="flex items-center gap-1">
                            <FileSpreadsheet size={14} className="text-emerald-600" />
                            Excel
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={14} className="text-rose-600" />
                            PDF
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={14} className="text-blue-600" />
                            Word
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* More Work Section */}
        {filteredMoreProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-purple-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0F0F14] tracking-tight">
                  More Specialized Systems & Models
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Computer vision, machine learning models, and GenAI utilities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMoreProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#FAF9FF] rounded-2xl p-6 border border-purple-100 hover:border-[#7C3AED]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100/80 text-[#7C3AED] mb-3">
                      {project.tag}
                    </div>

                    <h4 className="text-base font-bold text-[#0F0F14] tracking-tight mb-2">
                      {project.title}
                    </h4>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-zinc-700 border border-purple-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9]"
                      >
                        <GithubIcon size={13} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
