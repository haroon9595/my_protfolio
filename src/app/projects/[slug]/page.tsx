import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/data";
import TechIcon from "@/components/TechIcon";
import ProjectArchitectureDiagram from "@/components/ProjectArchitectureDiagram";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study | Muhammad Haroon Rashid`,
    description: project.summary,
    alternates: {
      canonical: `https://haroonrashid.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.summary,
      url: `https://haroonrashid.dev/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { details } = project;

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-purple-50/20 to-white text-zinc-900 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-purple-100">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors focus-ring rounded-lg px-2 py-1"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to All Projects</span>
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100/70 text-purple-800">
            {project.badge}
          </span>
        </div>

        {/* 1. Header: Title, Category Badges, Status & Links */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-xs">
              <Sparkles size={12} aria-hidden="true" />
              <span>{project.category}</span>
            </span>
            <span className="text-xs font-medium text-zinc-500">
              {project.categories.join(" · ")}
            </span>
            <span className="text-xs font-medium text-purple-700/80 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F0F14] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Links Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-zinc-800 bg-white border border-purple-200 hover:bg-purple-50 transition-all focus-ring"
                aria-label={`View ${project.title} on GitHub`}
                title="View on GitHub"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all focus-ring"
                aria-label={
                  project.liveLabel === "Live Demo"
                    ? `Watch ${project.title} live demo`
                    : `Open ${project.title} live deployment`
                }
                title={project.liveLabel === "Live Demo" ? "Live Demo" : "Live"}
              >
                <span>{project.liveLabel || "Live System"}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}

            {!project.githubUrl && !project.liveUrl && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
                <ShieldAlert size={14} className="text-zinc-500" aria-hidden="true" />
                <span>Production / Restricted Source Code</span>
              </div>
            )}
          </div>
        </header>

        {/* 2. Problem Statement */}
        {details.problem && (
          <section className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm tracking-wide uppercase">
              <Zap size={16} className="text-amber-600" aria-hidden="true" />
              <span>The Problem</span>
            </div>
            <p className="text-sm sm:text-base text-amber-950 leading-relaxed">
              {details.problem}
            </p>
          </section>
        )}

        {/* 3. What I Built & 4. Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
              What I Built
            </span>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {details.whatIBuilt}
            </p>
          </section>

          {details.outcome && (
            <section className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Measurable Outcome
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                {details.outcome}
              </p>
            </section>
          )}
        </div>

        {/* 5. Why This Stack */}
        {details.whyThisStack && (
          <section className="p-6 rounded-2xl bg-white border border-purple-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
              Architecture Rationale — Why This Stack
            </span>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {details.whyThisStack}
            </p>
          </section>
        )}

        {/* 6. Engineering Highlights */}
        {details.engineeringHighlights && details.engineeringHighlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Layers size={20} className="text-purple-600" aria-hidden="true" />
              <span>Engineering Highlights</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.engineeringHighlights.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-purple-50/50 border border-purple-100/80 text-xs sm:text-sm text-zinc-800"
                >
                  <CheckCircle2
                    size={16}
                    className="text-purple-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Detailed Feature Highlights if present */}
        {details.highlights && details.highlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              System Capabilities & Specifications
            </h2>
            <ul className="space-y-2.5">
              {details.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-zinc-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. Architecture Diagram */}
        {details.diagram && (
          <section className="space-y-4 pt-4">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
              System Architecture Diagram
            </h2>
            <div className="rounded-2xl border border-purple-100 p-4 sm:p-6 bg-[#FAF9FF]">
              <ProjectArchitectureDiagram projectId={project.id} />
            </div>
          </section>
        )}

        {/* 8. Technologies Logo Chips */}
        <section className="space-y-4 pt-4 border-t border-purple-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
            Technologies & Frameworks
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <TechIcon
                key={tech}
                name={tech}
                variant="pill"
                size={16}
                theme="light"
                showTooltip
              />
            ))}
          </div>
        </section>

        {/* 9. Closing CTA: Discuss a similar project */}
        <section className="pt-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-br from-purple-900 via-indigo-900 to-[#18142A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Interested in a system like this?
              </h3>
              <p className="text-purple-200/90 text-sm max-w-lg">
                I take complex processes from raw requirements to production deployments with robust architecture and fast delivery.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-purple-950 hover:bg-purple-50 transition-all shadow-md shrink-0 focus-ring"
            >
              <MessageSquare size={16} aria-hidden="true" />
              <span>Discuss a Similar Project</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
