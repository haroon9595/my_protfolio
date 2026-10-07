import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <ClientOnly>
      <main className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#0F0F14]">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
        <AIChatbot />
      </main>
    </ClientOnly>
  );
}
