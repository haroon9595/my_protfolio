"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData, ProjectItem } from "@/data";
import Section from "@/components/Section";
import TechIcon from "@/components/TechIcon";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

type CategoryFilter =
  | "All"
  | "AI Agents"
  | "Automation"
  | "Full-Stack"
  | "Machine Learning";

function ArchitectureGlyph({ projectId }: { projectId: string }) {
  if (projectId === "epads") {
    return (
      <svg
        viewBox="0 0 280 44"
        fill="none"
        aria-hidden="true"
        className="w-full h-9 opacity-80 group-hover:opacity-100 transition-opacity"
      >
        <circle cx="24" cy="22" r="8" className="fill-purple-600/90" />
        <path d="M32 22H78" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="80" y="12" width="20" height="20" rx="6" className="fill-indigo-600/90" />
        <path d="M100 22H156" stroke="#818CF8" strokeWidth="2" />
        <circle cx="166" cy="22" r="10" className="fill-purple-700" />
        <path d="M176 22H224" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="226" y="14" width="16" height="16" rx="4" className="fill-emerald-600" />
      </svg>
    );
  }

  if (projectId === "iesgroup") {
    return (
      <svg
        viewBox="0 0 280 44"
        fill="none"
        aria-hidden="true"
        className="w-full h-9 opacity-80 group-hover:opacity-100 transition-opacity"
      >
        <rect x="18" y="12" width="18" height="20" rx="4" className="fill-purple-600" />
        <path d="M36 22H86" stroke="#A855F7" strokeWidth="2" />
        <circle cx="96" cy="22" r="9" className="fill-indigo-600" />
        <path d="M105 18L145 12" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M105 26L145 32" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="152" cy="12" r="6" className="fill-purple-500" />
        <circle cx="152" cy="32" r="6" className="fill-emerald-500" />
        <path d="M158 12H210" stroke="#C084FC" strokeWidth="1.5" />
        <path d="M158 32H210" stroke="#34D399" strokeWidth="1.5" />
        <rect x="212" y="14" width="16" height="16" rx="4" className="fill-purple-800" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 44"
      fill="none"
      aria-hidden="true"
      className="w-full h-9 opacity-80 group-hover:opacity-100 transition-opacity"
    >
      <circle cx="24" cy="22" r="7" className="fill-purple-500" />
      <path d="M31 22H94" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="96" y="14" width="16" height="16" rx="4" className="fill-indigo-600" />
      <path d="M112 22H174" stroke="#818CF8" strokeWidth="2" />
      <circle cx="182" cy="22" r="8" className="fill-purple-700" />
      <path d="M190 22H242" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="250" cy="22" r="7" className="fill-emerald-600" />
    </svg>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(() => {
    if (typeof window === "undefined") return null;
    const projectSlug = new URLSearchParams(window.location.search).get("project");
    if (!projectSlug) return null;
    const all = [...portfolioData.projects, ...portfolioData.moreProjects];
    return all.find((p) => p.slug === projectSlug || p.id === projectSlug) || null;
  });
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories: CategoryFilter[] = [
    "All",
    "AI Agents",
    "Automation",
    "Full-Stack",
    "Machine Learning",
  ];

  // Listen to popstate when visitor presses browser Back/Forward
  useEffect(() => {
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search).get("project");
      if (p) {
        const all = [...portfolioData.projects, ...portfolioData.moreProjects];
        const match = all.find((item) => item.slug === p || item.id === p);
        setSelectedProject(match || null);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set("project", project.slug);
    window.history.pushState({}, "", url.toString());
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.pushState({}, "", url.toString());
  };

  // Primary featured projects
  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (activeFilter === "All") return true;
    return (p.categories as readonly string[]).includes(activeFilter);
  });

  // Compact "More work" projects
  const filteredMoreProjects = portfolioData.moreProjects.filter((p: ProjectItem) => {
    if (activeFilter === "All") return true;
    return (p.categories as readonly string[]).includes(activeFilter);
  });

  // Track mobile carousel scroll to update active dot
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.86));
    setActiveCarouselIndex(index);
  };

  return (
    <Section
      id="projects"
      eyebrow="Portfolio & Systems"
      title="Production Projects"
      subtitle="Engineered from discovery through production deployment. Click any project to inspect the full case study and architecture."
      variant="white"
    >
      {/* Category Filter Chips: Horizontally scrollable row on mobile */}
      <div className="w-full overflow-x-auto scrollbar-none py-1 mb-8 sm:mb-12">
        <div className="flex items-center sm:justify-center gap-2 min-w-max px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 focus-ring cursor-pointer shrink-0 ${
                activeFilter === cat
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                  : "bg-purple-50 text-zinc-700 hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects:
          - Desktop: 2-column grid, EPADS spans both columns
          - Mobile: Horizontal snap carousel for a short, snappy page */}
      <div className="mb-12 sm:mb-16">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredProjects.map((project: ProjectItem) => {
            const isFlagship = project.slug === "epads";
            const visibleStack = project.stack.slice(0, 5);
            const remainingCount = project.stack.length - 5;

            return (
              <article
                key={project.id}
                id={project.id}
                className={`group relative rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-[#FAF9FF] hover:bg-white p-5 sm:p-7 shadow-xs hover:shadow-purple-subtle hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between snap-center shrink-0 w-[86vw] max-w-[340px] md:w-auto md:max-w-none md:shrink ${
                  isFlagship ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Top Cover Strip with subtle gradient & architecture glyph */}
                  <div className="w-full h-14 sm:h-16 rounded-xl bg-linear-to-r from-purple-100/80 via-indigo-50 to-purple-50/70 border border-purple-100/80 p-2 sm:p-2.5 mb-5 flex items-center justify-center overflow-hidden">
                    <ArchitectureGlyph projectId={project.id} />
                  </div>

                  {/* Header: Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-600 text-white shadow-xs">
                      <Sparkles size={11} aria-hidden="true" />
                      <span>{project.badge}</span>
                    </span>
                    <span className="text-[11px] font-medium text-zinc-500">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title (Max 2 lines) */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F0F14] tracking-tight line-clamp-2 mb-2 group-hover:text-purple-950 transition-colors">
                    {project.title}
                  </h3>

                  {/* Brief Summary (Max 3 lines, plain language under 150 chars) */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                    {project.summary}
                  </p>

                  {/* Tech stack chips: Up to 5 logos + "+N" */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {visibleStack.map((tech) => (
                      <TechIcon
                        key={tech}
                        name={tech}
                        variant="pill"
                        size={13}
                        theme="light"
                        className="text-[11px] py-0.5 px-2.5"
                      />
                    ))}
                    {remainingCount > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                        +{remainingCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Status Line and Action Buttons */}
                <div className="pt-3 border-t border-purple-100/70 mt-2 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="truncate max-w-[190px]">{project.status}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                    {/* Primary Button: View Details */}
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      className="flex-1 min-w-[110px] inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all focus-ring cursor-pointer"
                    >
                      <span>View details</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>

                    {/* Secondary Button: GitHub (only when githubUrl exists) */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 bg-white border border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all focus-ring shrink-0"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View on GitHub"
                      >
                        <GithubIcon size={13} />
                        <span>GitHub</span>
                      </a>
                    )}

                    {/* Secondary Button: Live / Live Demo (only when liveUrl exists) */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 bg-white border border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all focus-ring shrink-0"
                        aria-label={
                          project.liveLabel === "Live Demo"
                            ? `Watch ${project.title} live demo`
                            : `Open ${project.title} live deployment`
                        }
                        title={project.liveLabel === "Live Demo" ? "Live Demo" : "Live"}
                      >
                        <span>{project.liveLabel || "Live"}</span>
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Indicators for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-2">
          {filteredProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: idx * (carouselRef.current.clientWidth * 0.86),
                    behavior: "smooth",
                  });
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                activeCarouselIndex === idx
                  ? "w-6 bg-purple-600"
                  : "w-1.5 bg-purple-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* "More Work" Section:
          - Desktop: 4 compact columns
          - Mobile: 2-column compact grid with just title, 1-line summary, and "Details" */}
      {filteredMoreProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Additional Research & ML Work
            </h4>
            <span className="text-xs text-zinc-500 font-medium">
              {filteredMoreProjects.length} projects
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredMoreProjects.map((item: ProjectItem) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-purple-100 bg-white p-3.5 sm:p-4 hover:border-purple-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md truncate">
                      {item.badge}
                    </span>
                  </div>

                  <h5 className="text-xs sm:text-sm font-bold text-[#0F0F14] line-clamp-1 mb-1 group-hover:text-purple-900 transition-colors">
                    {item.title}
                  </h5>

                  <p className="text-[11px] text-zinc-600 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-3">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 mt-auto">
                  <button
                    type="button"
                    onClick={() => openProjectModal(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-900 transition-colors focus-ring cursor-pointer min-h-[30px]"
                  >
                    <span>Details</span>
                    <ArrowRight size={11} aria-hidden="true" />
                  </button>

                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1.5 rounded-lg text-zinc-700 bg-white border border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all focus-ring shrink-0 min-h-[30px] min-w-[30px]"
                      aria-label={`View ${item.title} on GitHub`}
                      title="View on GitHub"
                    >
                      <GithubIcon size={13} />
                    </a>
                  )}

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-1.5 rounded-lg text-purple-700 bg-white border border-purple-200 hover:bg-purple-50 hover:text-purple-900 transition-all focus-ring shrink-0 min-h-[30px] min-w-[30px]"
                      aria-label={`Watch ${item.title} live demo`}
                      title="Live Demo"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessible Detail Modal with Case Study */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={closeProjectModal}
        onSelectProject={(p) => openProjectModal(p)}
      />
    </Section>
  );
}
