"use client";

import React, { useSyncExternalStore } from "react";
import { emailConfig } from "@/data";

interface SmartEmailLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getClientSnapshot(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Hook to detect mobile devices cleanly using useSyncExternalStore (SSR-safe, React 19 recommended)
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export default function SmartEmailLink({
  children,
  className = "",
  ariaLabel = "Email me via Gmail",
  title = "Email me via Gmail",
  onClick,
  ...props
}: SmartEmailLinkProps) {
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Dynamically check at click time
    if (typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault();
      // On mobile: trigger native mail client directly without opening a blank tab
      window.location.href = emailConfig.mailtoUrl;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={isMobile ? emailConfig.mailtoUrl : emailConfig.gmailUrl}
      target={isMobile ? undefined : "_blank"}
      rel={isMobile ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
