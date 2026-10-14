"use client";

import React, { useEffect, useRef } from "react";
import { ProjectItem, getAllProjects } from "@/data";
import TechIcon from "@/components/TechIcon";
import ProjectArchitectureDiagram from "@/components/ProjectArchitectureDiagram";
import {
  X,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const allProjects = getAllProjects();
  const currentIndex = project ? allProjects.findIndex((p) => p.slug === project.slug) : -1;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  useEffect(() => {
    if (project) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus close button initially for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        } else if (e.key === "ArrowLeft" && prevProject) {
          onSelectProject(prevProject);
        } else if (e.key === "ArrowRight" && nextProject) {
          onSelectProject(nextProject);
        } else if (e.key === "Tab" && modalRef.current) {
          // Trap focus inside modal
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [project, onClose, prevProject, nextProject, onSelectProject]);

  if (!project) return null;

  const { details } = project;

  const handleDiscussClick = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className="w-full max-h-[92dvh] sm:max-h-[88vh] max-w-4xl lg:max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-purple-100 animate-scale-in"
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-full flex items-center justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-zinc-300" />
        </div>

        {/* Modal Sticky Header with Prev/Next and Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
              {project.badge}
            </span>
            <span className="hidden sm:inline text-xs text-zinc-500 font-medium">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Buttons */}
            <div className="flex items-center bg-purple-50 rounded-lg p-0.5 border border-purple-100">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="p-1.5 text-zinc-600 hover:text-purple-700 hover:bg-white rounded-md transition-colors focus-ring"
                aria-label={`Previous project: ${prevProject.title}`}
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="p-1.5 text-zinc-600 hover:text-purple-700 hover:bg-white rounded-md transition-colors focus-ring"
                aria-label={`Next project: ${nextProject.title}`}
                title={`Next: ${nextProject.title}`}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-purple-100 transition-colors focus-ring cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-8 flex-1">
          {/* Header Section */}
          <div className="space-y-4">
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#0F0F14] tracking-tight leading-snug"
            >
              {project.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {project.summary}
            </p>

            {/* Links and Status */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-zinc-800 bg-white border border-purple-200 hover:bg-purple-50 transition-all focus-ring"
                  aria-label={`View ${project.title} on GitHub`}
                  title="View on GitHub"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all focus-ring"
                  aria-label={
                    project.liveLabel === "Live Demo"
                      ? `Watch ${project.title} live demo`
                      : `Open ${project.title} live deployment`
                  }
                  title={project.liveLabel === "Live Demo" ? "Live Demo" : "Live"}
                >
                  <span>{project.liveLabel || "Live"}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}

              {!project.githubUrl && !project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
                  <ShieldAlert size={13} className="text-zinc-500" aria-hidden="true" />
                  <span>Production (Restricted / Private)</span>
                </span>
              )}

              <span className="text-xs font-medium text-zinc-500">
                Status: <strong className="text-zinc-700">{project.status}</strong>
              </span>
            </div>
          </div>

          {/* Desktop 2-Column or Mobile Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Problem, What I Built, Outcome, Engineering Highlights */}
            <div className="lg:col-span-7 space-y-6">
              {/* Problem */}
              {details.problem && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                    <Zap size={14} className="text-amber-600" aria-hidden="true" />
                    Problem
                  </span>
                  <p>{details.problem}</p>
                </div>
              )}

              {/* What I Built */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                  What I Built:
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {details.whatIBuilt}
                </p>
              </div>

              {/* Outcome */}
              {details.outcome && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                    Outcome:
                  </span>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    {details.outcome}
                  </p>
                </div>
              )}

              {/* Why this stack */}
              {details.whyThisStack && (
                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-zinc-700 space-y-1">
                  <span className="font-bold text-purple-900 block">
                    Why this stack:
                  </span>
                  <p className="leading-relaxed">{details.whyThisStack}</p>
                </div>
              )}

              {/* Engineering Highlights */}
              {details.engineeringHighlights && details.engineeringHighlights.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 block flex items-center gap-1.5">
                    <Layers size={14} className="text-purple-600" aria-hidden="true" />
                    Engineering Highlights:
                  </span>
                  <ul className="space-y-2">
                    {details.engineeringHighlights.map((fact) => (
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
            </div>

            {/* Right Column: Architecture Diagram & Tech Stack */}
            <div className="lg:col-span-5 space-y-6">
              {/* Architecture Diagram */}
              {details.diagram && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                    System Architecture
                  </span>
                  <div className="rounded-2xl border border-purple-100 p-3 sm:p-4 bg-[#FAF9FF] shadow-xs">
                    <ProjectArchitectureDiagram projectId={project.id} />
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechIcon
                      key={tech}
                      name={tech}
                      variant="pill"
                      size={14}
                      theme="light"
                      showTooltip
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Feature Highlights if present */}
          {details.highlights && details.highlights.length > 0 && (
            <div className="pt-4 border-t border-purple-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                Detailed System Features & Integrations
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {details.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-zinc-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 9. Closing CTA: Discuss a similar project */}
          <div className="pt-4 pb-2">
            <div className="p-6 rounded-2xl bg-linear-to-r from-purple-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-white text-base">
                  Need a similar production system?
                </h4>
                <p className="text-xs text-purple-200/90">
                  Let&apos;s discuss your workflow, architecture, and timeline.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDiscussClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-purple-950 hover:bg-purple-50 transition-all shadow-md shrink-0 cursor-pointer focus-ring"
              >
                <MessageSquare size={14} aria-hidden="true" />
                <span>Discuss This Project</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
