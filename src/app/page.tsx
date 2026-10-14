import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { portfolioData } from "@/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Haroon Rashid",
    url: "https://haroonrashid.dev",
    jobTitle: "Full-Stack & AI Agent Developer",
    description:
      "Full-stack developer focused on AI-driven systems and automation. Builds complete software systems from data pipelines and AI agents to production web platforms.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faisalabad",
      addressCountry: "PK",
    },
    sameAs: [
      portfolioData.personal.github,
      portfolioData.personal.linkedin,
    ],
    knowsAbout: [
      "Full-Stack Development",
      "AI Agents",
      "LangChain",
      "FastAPI",
      "Next.js",
      "Workflow Automation",
      "n8n",
      "RAG Systems",
      "PostgreSQL",
    ],
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#7C3AED] focus:text-white focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />
      <main
        id="main-content"
        className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#0F0F14]"
      >
        <Hero />
        <About />
        <Projects />
        <Services />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>
      {/* AIChatbot rendered outside main to allow fixed positioning without z-index issues */}
      <AIChatbot />
    </>
  );
}
