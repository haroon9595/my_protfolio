import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Muhammad Haroon Rashid | Full-Stack & AI Agent Developer",
  description:
    "Personal portfolio of Muhammad Haroon Rashid, Full-Stack & AI Agent Developer. Specializing in AI agents, workflow automation, backend APIs, tender intelligence, and production web applications.",
  keywords: [
    "Muhammad Haroon Rashid",
    "Full-Stack Developer",
    "AI Agent Developer",
    "Automation Engineer",
    "Next.js",
    "Python",
    "FastMCP",
    "n8n",
    "PostgreSQL",
    "Faisalabad",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Haroon Rashid", url: "https://github.com/haroon9595" }],
  creator: "Muhammad Haroon Rashid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haroonrashid.dev",
    title: "Muhammad Haroon Rashid | Full-Stack & AI Agent Developer",
    description:
      "Production web apps, autonomous AI agents, workflow automation pipelines, and data intelligence systems.",
    siteName: "Muhammad Haroon Rashid Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/drfnqdaqz/image/upload/v1791381225/Screenshot_2026-10-07_185319_qdodew.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Haroon Rashid - Full-Stack & AI Agent Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Haroon Rashid | Full-Stack & AI Agent Developer",
    description:
      "Production web apps, autonomous AI agents, workflow automation pipelines, and data intelligence systems.",
    images: [
      "https://res.cloudinary.com/drfnqdaqz/image/upload/v1791381225/Screenshot_2026-10-07_185319_qdodew.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#FAF9FF] text-[#0F0F14] font-sans antialiased selection:bg-[#7C3AED]/20 selection:text-[#7C3AED]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
