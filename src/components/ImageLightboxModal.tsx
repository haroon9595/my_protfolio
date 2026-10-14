"use client";

import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
}

export default function ImageLightboxModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
}: ImageLightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || alt}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between pb-3 text-white">
          <div className="min-w-0 pr-4">
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {title}
              </h3>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus-ring cursor-pointer shrink-0"
            aria-label="Close image viewer"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Main Image Viewport */}
        <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-2xl p-1 sm:p-2">
          {/* Standard img tag for high-res responsive modal display without layout shifts */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl select-none"
            loading="lazy"
          />
        </div>

        {/* Footer: Open in new tab */}
        <div className="pt-3 flex items-center gap-2">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-white/15 hover:bg-white/25 transition-colors focus-ring"
          >
            <span>Open in new tab</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
