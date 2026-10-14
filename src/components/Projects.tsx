"use client";

import { useState } from "react";
import { portfolioData, ProjectItem } from "@/data";
import Section from "@/components/Section";
import TechIcon from "@/components/TechIcon";
import ProjectArchitectureDiagram from "@/components/ProjectArchitectureDiagram";
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  HelpCircle,
  Zap,
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

  // Primary 4 case study projects
  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (activeFilter === "All") return true;
    return (p.categories as readonly string[]).includes(activeFilter);
  });

  // Secondary ML/GenAI experiments
  const filteredMoreProjects = portfolioData.moreProjects.filter((p) => {
    if (activeFilter === "All") return true;
    return (p.categories as readonly string[]).includes(activeFilter);
  });

  const getTagBadge = (tag: string, tagType?: string) => {
    switch (tagType) {
      case "bidding":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-xs">
            <Sparkles size={12} aria-hidden="true" />
            <span>{tag}</span>
          </span>
        );
      case "client":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
            <CheckCircle2 size={12} aria-hidden="true" />
            <span>{tag}</span>
          </span>
        );
      case "end-to-end":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
            <Zap size={12} aria-hidden="true" />
            <span>{tag}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-white shadow-xs">
            <span>{tag}</span>
          </span>
        );
    }
  };

  return (
    <Section
      id="projects"
      eyebrow="Case Studies"
      title="Featured Production Systems"
      subtitle="Complete software systems engineered from discovery through production deployment."
      variant="white"
    >
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 focus-ring cursor-pointer ${
              activeFilter === cat
                ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                : "bg-purple-50 text-zinc-700 hover:bg-purple-100 hover:text-purple-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Projects Grid: 4 Case Studies */}
      <div className="space-y-12 md:space-y-16">
        {filteredProjects.map((project: ProjectItem) => (
          <article
            key={project.id}
            id={project.id}
            className="rounded-3xl border border-purple-100 bg-[#FAF9FF] p-6 sm:p-8 lg:p-10 shadow-purple-subtle hover:shadow-purple-md transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Problem / What I Built / Outcome Case Study */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  {getTagBadge(project.tag, project.tagType)}
                  <span className="text-xs font-medium text-zinc-500">
                    {project.categories.join(" · ")}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F14] tracking-tight">
                  {project.title}
                </h3>

                {/* Problem Statement */}
                {project.problem && (
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-900 text-xs sm:text-sm leading-relaxed">
                    <span className="font-bold block text-amber-950 mb-0.5">Problem:</span>
                    {project.problem}
                  </div>
                )}

                {/* What I Built */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                    What I built:
                  </span>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Outcome */}
                {project.outcome && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                      Outcome:
                    </span>
                    <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                )}

                {/* Why this stack */}
                {project.whyStack && (
                  <div className="text-xs text-zinc-600 bg-white p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-zinc-800">Why this stack: </span>
                    {project.whyStack}
                  </div>
                )}

                {/* Engineering Highlights (3 facts) */}
                {project.engineeringHighlights && project.engineeringHighlights.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                      Engineering highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {project.engineeringHighlights.map((fact: string) => (
                        <li
                          key={fact}
                          className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700"
                        >
                          <CheckCircle2
                            size={15}
                            className="text-purple-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack Chips with TechIcon */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                    Technologies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech: string) => (
                      <TechIcon
                        key={tech}
                        name={tech}
                        variant="pill"
                        size={15}
                        theme="light"
                        showTooltip
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons & Access Status */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all duration-200 focus-ring"
                    >
                      <span>Live System</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-zinc-800 bg-white border border-purple-200 hover:bg-purple-50 transition-all duration-200 focus-ring"
                    >
                      <GithubIcon size={16} />
                      <span>Source Code</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
                      <ShieldAlert size={14} className="text-zinc-500" aria-hidden="true" />
                      <span>Production Code (Restricted / On Request)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Inline Architecture Diagram */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Responsive Architecture Diagram */}
                <ProjectArchitectureDiagram projectId={project.id} />

                {/* TODO(owner): add screenshots once available.
                    If screenshots array is populated, render them here.
                    Currently empty so no empty placeholder frames are rendered. */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="mt-4">
                    {/* Screenshots container */}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* "More work: ML and GenAI experiments" Section */}
      <div className="mt-20 pt-12 border-t border-purple-100">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F0F14] tracking-tight">
            More Work: ML & GenAI Experiments
          </h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-xl mx-auto">
            Practical models, computer vision systems, and hackathon prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMoreProjects.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl p-5 bg-[#FAF9FF] border border-purple-100/80 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                    {exp.tag}
                  </span>
                  {exp.githubUrl ? (
                    <a
                      href={exp.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-purple-600 focus-ring rounded"
                      aria-label={`${exp.title} GitHub`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span title="Available on request" className="text-zinc-400">
                      <HelpCircle size={14} />
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-[#0F0F14]">{exp.title}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{exp.description}</p>
              </div>

              <div className="pt-4 flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <TechIcon
                    key={tech}
                    name={tech}
                    variant="pill"
                    size={13}
                    theme="light"
                    className="text-[10px] px-2 py-0.5"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
