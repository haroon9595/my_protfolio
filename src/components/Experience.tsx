"use client";

import React, { useState } from "react";
import { portfolioData, ExperienceItem, AwardItem } from "@/data";
import Section from "@/components/Section";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Building2,
  Award,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function Experience() {
  const [showMoreBullets, setShowMoreBullets] = useState(false);

  const deliverables = [
    {
      lead: "Deployed:",
      text: "AI-powered lead routing system using n8n Cloud, Groq LLM, and Zoho SMTP.",
    },
    {
      lead: "Automated:",
      text: "Handling and classification of company inquiries across four specialized engineering departments.",
    },
    {
      lead: "Built:",
      text: "Production corporate web platform deployed on Vercel with high performance and accessibility.",
    },
    {
      lead: "Configured:",
      text: "Professional enterprise email infrastructure with SPF, DKIM, and MX records verified.",
    },
    {
      lead: "Engineered:",
      text: "EPADS tender intelligence platform and WhatsApp assistant for live Pakistan government bidding workflows.",
    },
    {
      lead: "Maintained:",
      text: "Internal automation tools, web crawlers, and structured report exports for tender discovery.",
    },
  ];

  return (
    <Section
      id="experience"
      eyebrow="Career & Credentials"
      title="Experience & Education"
      subtitle="Industry engineering track, university credentials, and verified certifications."
      variant="white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Work Experience Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase size={16} aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight">
              Work Experience
            </h3>
          </div>

          <div className="relative pl-6 border-l-2 border-purple-200 space-y-8">
            {portfolioData.experience.map((exp: ExperienceItem) => (
              <div key={exp.company} className="relative">
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-xs"
                />

                <div className="bg-[#FAF9FF] border border-purple-100 rounded-3xl p-5 sm:p-8 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#0F0F14] tracking-tight">
                        {exp.role}
                      </h4>
                      <div className="flex items-center gap-2 text-zinc-600 font-semibold text-xs sm:text-sm mt-0.5">
                        <Building2 size={14} className="text-purple-600" aria-hidden="true" />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <span className="text-zinc-400 font-normal">
                            · {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold self-start sm:self-center shrink-0">
                      <Calendar size={12} aria-hidden="true" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Bullet Points with Mobile Show More Toggle */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                      Key Deliverables & Responsibilities
                    </span>
                    <ul className="space-y-2">
                      {deliverables.map((item, index) => {
                        const isHiddenOnMobile = !showMoreBullets && index >= 3;
                        return (
                          <li
                            key={item.lead}
                            className={`items-start gap-2.5 text-xs sm:text-sm text-zinc-700 ${
                              isHiddenOnMobile ? "hidden sm:flex" : "flex"
                            }`}
                          >
                            <CheckCircle2
                              size={16}
                              className="text-purple-600 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>
                              <strong className="text-zinc-900 font-bold">{item.lead}</strong>{" "}
                              {item.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Show more / show less button for phones */}
                    <div className="sm:hidden pt-2">
                      <button
                        type="button"
                        onClick={() => setShowMoreBullets(!showMoreBullets)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors focus-ring cursor-pointer"
                      >
                        <span>{showMoreBullets ? "Show fewer" : "Show more (3 more)"}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${showMoreBullets ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Mini Timeline */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <GraduationCap size={16} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight">
                Education
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-purple-200">
              {portfolioData.education.map((edu) => (
                <div key={edu.degree} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-xs"
                  />
                  <div className="bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-[#0F0F14]">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                        {edu.institution} · {edu.note}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold self-start sm:self-center shrink-0">
                      <Calendar size={12} aria-hidden="true" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Certifications & Honours (Horizontal Snap Scroller on Mobile) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Award size={16} aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight">
              Certifications & Honours
            </h3>
          </div>

          <div className="flex lg:grid lg:grid-cols-1 gap-3.5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none pb-3 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {portfolioData.certifications.map((cert: AwardItem) => (
              <div
                key={cert.title}
                className="bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all duration-200 snap-center shrink-0 w-[84vw] max-w-[320px] lg:w-auto lg:max-w-none"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={20} aria-hidden="true" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-[#0F0F14] tracking-tight">
                        {cert.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 shrink-0">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">
                      {cert.issuer}
                    </p>
                    {cert.highlight && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
                        <Sparkles size={12} className="shrink-0" aria-hidden="true" />
                        <span>{cert.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
