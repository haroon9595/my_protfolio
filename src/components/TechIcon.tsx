"use client";

import React from "react";
import { getTechIcon } from "./techIcons";
import {
  Database,
  Plug,
  Webhook,
  Brain,
  Layers,
  Sparkles,
  Bot,
  Search,
  Terminal,
  Workflow,
  Cpu,
  LineChart,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  FileSpreadsheet,
  Clock,
  Code2,
} from "lucide-react";

interface TechIconProps {
  name: string;
  size?: number;
  variant?: "icon" | "pill" | "tile";
  theme?: "light" | "dark";
  className?: string;
  showTooltip?: boolean;
}

export default function TechIcon({
  name,
  size = 20,
  variant = "pill",
  theme = "light",
  className = "",
  showTooltip = false,
}: TechIconProps) {
  const iconInfo = getTechIcon(name);

  // Helper to render Lucide icon by string
  const renderLucide = (iconName: string, iconColor: string, iconSize: number) => {
    const props = {
      size: iconSize,
      color: theme === "dark" ? "#D8B4FE" : iconColor,
      "aria-hidden": "true" as const,
    };
    switch (iconName) {
      case "database":
        return <Database {...props} />;
      case "plug":
        return <Plug {...props} />;
      case "webhook":
        return <Webhook {...props} />;
      case "brain":
        return <Brain {...props} />;
      case "layers":
        return <Layers {...props} />;
      case "sparkles":
        return <Sparkles {...props} />;
      case "bot":
        return <Bot {...props} />;
      case "search":
        return <Search {...props} />;
      case "terminal":
        return <Terminal {...props} />;
      case "workflow":
        return <Workflow {...props} />;
      case "cpu":
        return <Cpu {...props} />;
      case "line-chart":
        return <LineChart {...props} />;
      case "bar-chart":
        return <BarChart3 {...props} />;
      case "trending-up":
        return <TrendingUp {...props} />;
      case "message-square":
        return <MessageSquare {...props} />;
      case "phone":
        return <Phone {...props} />;
      case "mail":
        return <Mail {...props} />;
      case "file-spreadsheet":
        return <FileSpreadsheet {...props} />;
      case "clock":
        return <Clock {...props} />;
      default:
        return <Code2 {...props} />;
    }
  };

function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return 0.5;
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

  // Render SVG Icon itself
  const renderIcon = (iconSize: number) => {
    if (iconInfo.type === "simple") {
      const { path, brandHex } = { path: iconInfo.data.path, brandHex: iconInfo.brandHex };
      const lum = getRelativeLuminance(brandHex);
      const isDarkBrand = lum < 0.22;

      // In dark theme, if variant is tile and brand is dark, render inside a white tile
      if (theme === "dark" && isDarkBrand && variant === "tile") {
        return (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/95 flex items-center justify-center p-1 shadow-xs">
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={iconSize - 6}
              height={iconSize - 6}
              fill={brandHex === "#000000" ? "#111827" : brandHex}
              aria-hidden="true"
              className="shrink-0"
            >
              <path d={path} />
            </svg>
          </div>
        );
      }

      // If in dark theme on pill or other, dark brand switches to white
      const fillHex =
        theme === "dark" && isDarkBrand
          ? "#FFFFFF"
          : brandHex;

      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill={fillHex}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200"
        >
          <path d={path} />
        </svg>
      );
    }

    if (iconInfo.type === "devicon") {
      // SVG paths for Devicons (Oracle & C#)
      if (iconInfo.name === "Oracle") {
        return (
          <svg
            role="img"
            viewBox="0 0 128 128"
            width={iconSize}
            height={iconSize}
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              fill="#F80000"
              d="M42.4 17.5c-23.4 0-42.4 19-42.4 42.4s19 42.4 42.4 42.4c23.4 0 42.4-19 42.4-42.4s-19-42.4-42.4-42.4zm0 69.8c-15.1 0-27.4-12.3-27.4-27.4s12.3-27.4 27.4-27.4 27.4 12.3 27.4 27.4-12.3 27.4-27.4 27.4zm43.2-69.8c-7.9 0-15.2 2.2-21.5 6 8.3 7.8 13.5 18.8 13.5 31.1s-5.2 23.3-13.5 31.1c6.3 3.8 13.6 6 21.5 6 23.4 0 42.4-19 42.4-42.4s-19-42.4-42.4-42.4zm0 69.8c-15.1 0-27.4-12.3-27.4-27.4s12.3-27.4 27.4-27.4 27.4 12.3 27.4 27.4-12.3 27.4-27.4 27.4z"
            />
          </svg>
        );
      }
      if (iconInfo.name === "Csharp") {
        return (
          <svg
            role="img"
            viewBox="0 0 128 128"
            width={iconSize}
            height={iconSize}
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              fill="#239120"
              d="M117.5 33.5L67.1 4.4c-1.9-1.1-4.3-1.1-6.2 0L10.5 33.5c-1.9 1.1-3.1 3.2-3.1 5.4v58.2c0 2.2 1.2 4.3 3.1 5.4l50.4 29.1c1 0.6 2.1 0.9 3.1 0.9s2.1-0.3 3.1-0.9l50.4-29.1c1.9-1.1 3.1-3.2 3.1-5.4V38.9c0-2.2-1.2-4.3-3.1-5.4zm-64.8 59.8c-15.7 0-28.5-12.8-28.5-28.5s12.8-28.5 28.5-28.5c7.8 0 14.8 3.1 20 8.2l-8.5 8.5c-3-2.9-7-4.7-11.5-4.7-9.1 0-16.5 7.4-16.5 16.5s7.4 16.5 16.5 16.5c4.5 0 8.5-1.8 11.5-4.7l8.5 8.5c-5.2 5.1-12.2 8.2-20 8.2zm45.9-25.5h-5.2v5.2h-3.9v-5.2h-5.2v-3.9h5.2v-5.2h3.9v5.2h5.2v3.9z"
            />
          </svg>
        );
      }
    }

    if (iconInfo.type === "lucide") {
      return renderLucide(iconInfo.icon, iconInfo.color, iconSize);
    }

    // Fallback: subtle code icon
    return (
      <Code2
        size={iconSize}
        color={theme === "dark" ? "#A78BFA" : "#7C3AED"}
        aria-hidden="true"
      />
    );
  };

  // 1. Just the icon
  if (variant === "icon") {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        title={showTooltip ? name : undefined}
        aria-label={name}
      >
        {renderIcon(size)}
      </span>
    );
  }

  // 2. Chip / Pill variant (used in projects, services, marquee)
  if (variant === "pill") {
    const pillStyles =
      theme === "dark"
        ? "bg-purple-950/40 text-purple-200 border-purple-800/40 hover:bg-purple-900/60 hover:border-purple-600/60"
        : "bg-white text-zinc-800 border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 shadow-xs";

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${pillStyles} ${className}`}
        title={showTooltip ? name : undefined}
      >
        {renderIcon(size)}
        <span className="truncate">{name}</span>
      </span>
    );
  }

  // 3. Tile variant (used in the deep-purple Skills section)
  const tileStyles =
    theme === "dark"
      ? "bg-[#18142A]/80 border-[#322554] text-[#E9E4F5] hover:border-purple-500 hover:bg-[#201B38] hover:shadow-purple-glow-sm"
      : "bg-white border-purple-100 text-zinc-800 hover:border-purple-300 hover:shadow-md";

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={name}
      className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl border transition-all duration-200 focus-ring hover:-translate-y-1 cursor-default ${tileStyles} ${className}`}
    >
      <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform duration-200">
        {renderIcon(size || 26)}
      </div>
      <span className="text-[11px] sm:text-xs font-medium text-center leading-tight break-words text-purple-100/90 w-full line-clamp-2 min-h-[26px] flex items-center justify-center">
        {name}
      </span>
      {/* Accessible Tooltip on hover/focus */}
      <span className="sr-only">{name}</span>
    </div>
  );
}
