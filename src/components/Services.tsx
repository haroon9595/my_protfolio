"use client";

import Link from "next/link";
import { portfolioData, ServiceItem } from "@/data";
import Section from "@/components/Section";
import TechIcon from "@/components/TechIcon";
import {
  Code,
  Brain,
  Workflow,
  Database,
  ArrowRight,
  Rocket,
  CheckCircle2,
} from "lucide-react";

export default function Services() {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code size={22} className="text-purple-600" aria-hidden="true" />;
      case "brain":
        return <Brain size={22} className="text-purple-600" aria-hidden="true" />;
      case "workflow":
        return <Workflow size={22} className="text-purple-600" aria-hidden="true" />;
      case "database":
        return <Database size={22} className="text-purple-600" aria-hidden="true" />;
      default:
        return <Code size={22} className="text-purple-600" aria-hidden="true" />;
    }
  };

  return (
    <Section
      id="services"
      eyebrow="Capabilities"
      title="Services & Systems Delivery"
      subtitle="Engineering complete software architectures from data pipelines and agents to production platforms."
      variant="tint"
    >
      {/* 4 Primary Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {portfolioData.services.map((service: ServiceItem, index: number) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100/90 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Decorative Index */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>
                <span
                  aria-hidden="true"
                  className="text-2xl font-black text-purple-200 font-mono select-none"
                >
                  0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F0F14] tracking-tight mb-2">
                {service.title}
              </h3>

              {/* Shorter One-Line Description */}
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Real Technology Badges */}
            <div className="pt-4 border-t border-purple-50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-2.5">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((techName: string) => (
                  <TechIcon
                    key={techName}
                    name={techName}
                    variant="pill"
                    size={15}
                    theme="light"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* One Unified CTA Row Below Grid */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-3xl bg-white border border-purple-200/80 shadow-purple-subtle mb-10 gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-[#0F0F14] tracking-tight">
            Have a project or engineering role in mind?
          </h4>
          <p className="text-xs sm:text-sm text-zinc-600">
            Tell me about your requirements, data sources, or automation scope.
          </p>
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-500/20 hover:shadow-md transition-all duration-200 focus-ring shrink-0"
        >
          <span>Discuss a project</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {/* End-to-End Delivery Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-2xs">
        <div className="flex items-center gap-2.5 mb-2.5">
          <Rocket size={18} className="text-purple-600" aria-hidden="true" />
          <h4 className="text-sm sm:text-base font-bold text-[#0F0F14]">
            {portfolioData.deploymentStrip.title}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 max-w-4xl">
          {portfolioData.deploymentStrip.text}
        </p>
        <div className="flex flex-wrap gap-2">
          {portfolioData.deploymentStrip.chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100"
            >
              <CheckCircle2 size={12} className="text-purple-600" aria-hidden="true" />
              <span>{chip}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
