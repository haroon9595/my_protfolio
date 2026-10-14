"use client";

import React, { useState } from "react";
import ImageLightboxModal from "@/components/ImageLightboxModal";
import { Sparkles, Eye } from "lucide-react";

interface ProjectScreenshotSectionProps {
  screenshotUrl: string;
  title?: string;
  alt?: string;
}

export default function ProjectScreenshotSection({
  screenshotUrl,
  title = "Live WhatsApp Bot Demo",
  alt = "WhatsApp tender chatbot screenshot showing SEPCO tender details reply",
}: ProjectScreenshotSectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
            <Sparkles size={15} className="text-purple-600" aria-hidden="true" />
            <span>{title}</span>
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
            <Eye size={12} className="text-purple-600" aria-hidden="true" />
            <span>Click to zoom</span>
          </span>
        </div>

        <div
          onClick={() => setIsLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Enlarge ${title}`}
          className="group relative cursor-zoom-in rounded-2xl overflow-hidden border border-purple-200/80 bg-zinc-950/5 shadow-md hover:shadow-xl transition-all duration-300 focus-ring"
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[440px] bg-zinc-900/5 flex items-center justify-center overflow-hidden">
            {/* Standard responsive img with explicit aspect-ratio and lazy loading to prevent layout shifts */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotUrl}
              alt={alt}
              loading="lazy"
              width={1200}
              height={675}
              className="w-full h-full object-contain group-hover:scale-[1.015] transition-transform duration-300 select-none"
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/85 text-white text-xs font-semibold shadow-lg backdrop-blur-xs">
                <Eye size={14} aria-hidden="true" />
                <span>Fullscreen Zoom</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={screenshotUrl}
        alt={alt}
        title={title}
      />
    </>
  );
}
