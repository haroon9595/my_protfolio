export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  tagType?: "bidding" | "client" | "end-to-end" | "ai" | "default";
  featured?: boolean;
  description: string;
  highlights: string[];
  stack: string[];
  categories: ("AI Agents" | "Automation" | "Full-Stack" | "Machine Learning")[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tech: string;
  icon: "code" | "brain" | "workflow" | "database";
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  achievements: string[];
}

export interface AwardItem {
  title: string;
  issuer: string;
  date: string;
  highlight?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const portfolioData = {
  personal: {
    name: "Muhammad Haroon Rashid",
    shortName: "Haroon",
    roleTitles: [
      "Full-Stack Developer",
      "AI Agent Developer",
      "Automation Engineer",
    ],
    location: "Faisalabad, Pakistan",
    email: "haroon11005@gmail.com",
    whatsapp: "+92 347 6379600",
    whatsappLink: "https://wa.me/923476379600",
    github: "https://github.com/haroon9595",
    githubDisplay: "github.com/haroon9595",
    linkedin: "https://linkedin.com/in/muhammadharoonrashid848777287",
    linkedinDisplay: "linkedin.com/in/muhammadharoonrashid848777287",
    cvPath:
      "https://drive.google.com/uc?export=download&id=1epvkm_BPC5EWDNnjKpO2U1uIQE_92r9i",
    cvDriveUrl:
      "https://drive.google.com/file/d/1epvkm_BPC5EWDNnjKpO2U1uIQE_92r9i/view?usp=drive_link",
    profileImage:
      "https://res.cloudinary.com/drfnqdaqz/image/upload/v1791381225/Screenshot_2026-10-07_185319_qdodew.png",
    availabilityBadge: "Available for Hire",
    heroBadge: "Get Started",
    heroHeading: "Hello, I'm Muhammad Haroon Rashid",
    heroBio:
      "I build complete software systems, from backend and data pipelines to AI agents and the apps people actually use. My work includes real-world tender intelligence, WhatsApp automation, business workflow systems and AI-powered platforms.",
    stats: {
      number: "4+",
      label: "Systems built",
    },
    heroStack: [
      { name: "n8n", icon: "workflow" },
      { name: "Python", icon: "python" },
      { name: "Next.js", icon: "nextjs" },
      { name: "PostgreSQL", icon: "postgres" },
    ],
  },

  about: {
    heading: "About Me",
    paragraph1:
      "Full-stack developer focused on AI-driven systems and automation. Takes a problem from raw data or a manual process to a working, deployed product, whether that is a web app, an API, a chatbot or an autonomous agent.",
    paragraph2:
      "Works with real business data and real users, and cares about reliability, clear structure and practical results.",
    quickFacts: [
      {
        label: "Location",
        value: "Faisalabad, Pakistan",
        icon: "map-pin",
      },
      {
        label: "Focus",
        value: "Full-stack, AI agents, automation",
        icon: "cpu",
      },
      {
        label: "Languages",
        value: "Punjabi/Urdu native, English",
        icon: "languages",
      },
      {
        label: "Education",
        value: "BS Computer Science, UET Lahore, 2024–2028",
        icon: "graduation-cap",
        secondary: true,
      },
    ],
  },

  services: [
    {
      id: "fullstack",
      title: "Full-Stack Application Development",
      description: "Web apps, dashboards, REST APIs and databases.",
      tech: "Next.js, FastAPI, PostgreSQL",
      icon: "code",
    },
    {
      id: "ai-agents",
      title: "AI Agents & LLM Applications",
      description:
        "Tool-calling agents, RAG systems, MCP servers and chat with private/company data.",
      tech: "LangChain, Groq/LLM APIs, vector databases",
      icon: "brain",
    },
    {
      id: "workflow-automation",
      title: "Workflow Automation & Integrations",
      description:
        "n8n pipelines, Slack and WhatsApp bots, email routing, webhooks and scheduled jobs.",
      tech: "n8n, Webhooks, Slack & WhatsApp integrations",
      icon: "workflow",
    },
    {
      id: "data-intelligence",
      title: "Data Collection & Intelligence Systems",
      description:
        "Crawlers, parsers, change detection, daily digests and structured report exports.",
      tech: "Export formats: Excel, PDF, Word",
      icon: "database",
    },
  ] as ServiceItem[],

  deploymentStrip: {
    title: "Delivery & Deployment, end to end",
    text: "Every system I build ships production-ready. I handle hosting and CI/CD (GitHub to Vercel and Render), custom domains and DNS, SSL, professional email setup (SPF, DKIM, MX), database setup, environment configuration, and monitoring, so the client gets a working product, not just code. I also build company websites and web portals when a project needs a public-facing side.",
    chips: [
      "Hosting & CI/CD",
      "Domains & DNS",
      "Professional Email",
      "Databases",
      "Company Websites",
    ],
  },

  projects: [
    {
      id: "epads",
      title: "EPADS Tender Intelligence System + WhatsApp Assistant",
      tag: "Built for live bidding",
      tagType: "bidding",
      featured: true,
      description:
        "A tender intelligence platform that finds, tracks and summarizes government tenders from Pakistan's EPADS portal, built to replace hours of manual browsing and document reading before every bid.",
      highlights: [
        "Crawler and parsers for tender listings, tender details and standard bidding documents",
        "Change detection, so updates to a tender are caught automatically",
        "SQLite storage for fast, reliable tender information caching",
        "FastMCP server that lets AI assistants search and read tenders with tools like search_tenders and get_tender_details",
        "Daily digest with scheduler for new and closing tenders",
        "WhatsApp chatbot: send a tender ID and receive an instant structured summary card (Agency, Title, Closing date, Time remaining, Bid security, Required registrations)",
        "Automated report generation and export commands for Excel, PDF, and Word",
      ],
      stack: [
        "Python",
        "FastMCP",
        "SQLite",
        "WhatsApp Integration",
        "Scheduler",
        "CLI",
      ],
      categories: ["AI Agents", "Automation"],
      githubUrl: "https://github.com/haroon9595",
      liveUrl: undefined,
    },
    {
      id: "hosteldesk",
      title: "HostelDesk — AI Complaint Management System",
      tag: "Built end-to-end",
      tagType: "end-to-end",
      featured: false,
      description:
        "An AI-powered complaint management platform that turns conversational student reports into structured complaints, automatically assigns them to the right Resident Tutor and provides staff with a real-time management dashboard.",
      highlights: [
        "Conversational issue reporting directly through Slack",
        "n8n AI Agent with LLM and contextual chat memory",
        "Automatic complaint creation and normalization in PostgreSQL",
        "Intelligent Resident Tutor assignment based on hostel blocks",
        "Complete status history audit tracking and real-time Slack DMs",
        "Modern Next.js 14 staff dashboard with workload views and multi-status filters",
        "FastAPI webhook backend with secure processing",
      ],
      stack: [
        "n8n",
        "Slack",
        "PostgreSQL",
        "FastAPI",
        "Next.js 14",
        "Vercel",
        "Render",
      ],
      categories: ["Full-Stack", "AI Agents", "Automation"],
      liveUrl: "https://hostel-complain-management-portal.vercel.app",
      githubUrl: "https://github.com/haroon9595",
    },
    {
      id: "iesgroup",
      title: "IES Group — AI Lead Routing & Corporate Platform",
      tag: "Client Project",
      tagType: "client",
      featured: false,
      description:
        "Delivered for Inter Engineering Services, an engineering and construction company: an AI-powered inquiry routing system that reads incoming messages, classifies them with an LLM and sends them to the right department automatically, along with the company's web platform and email infrastructure.",
      highlights: [
        "LLM-based classification and routing of incoming inquiries across four specialized departments",
        "Automated email handling and acknowledgment pipelines with n8n Cloud and Zoho SMTP",
        "Company web platform built for high performance and fast loading",
        "Professional email infrastructure including SPF, DKIM and MX record configuration",
        "Supabase integration for secure lead archiving and inquiry history",
      ],
      stack: [
        "n8n Cloud",
        "Groq LLM",
        "Zoho SMTP",
        "Supabase",
        "Vercel",
      ],
      categories: ["Automation", "AI Agents", "Full-Stack"],
      liveUrl: "https://iesgroup.com.pk",
      githubUrl: undefined,
    },
    {
      id: "tubemind",
      title: "TubeMind AI — Chat With Any YouTube Video",
      tag: "AI Application",
      tagType: "ai",
      featured: false,
      description:
        "An AI application that lets users ask questions about YouTube videos using a retrieval-augmented generation (RAG) pipeline.",
      highlights: [
        "Automated YouTube transcript extraction and timestamp alignment",
        "Smart semantic text chunking for high retrieval accuracy",
        "HuggingFace embeddings with local FAISS vector search",
        "Groq-hosted Llama 3.3 70B providing low-latency streaming responses",
        "Interactive conversational interface with source citations",
      ],
      stack: ["LangChain", "FastAPI", "Streamlit", "FAISS", "Groq"],
      categories: ["AI Agents", "Machine Learning"],
      githubUrl: "https://github.com/haroon9595",
      liveUrl: undefined,
    },
  ] as ProjectItem[],

  moreProjects: [
    {
      id: "agriscribe",
      title: "AgriScribe",
      tag: "GenAI Assistant",
      description:
        "GenAI crop-disease assistant built for a hackathon, combining computer vision leaf diagnosis with conversational treatment recommendations.",
      stack: ["Python", "Gemini API", "Streamlit", "Computer Vision"],
      categories: ["AI Agents", "Machine Learning"],
      githubUrl: "https://github.com/haroon9595",
    },
    {
      id: "facial-emotion",
      title: "Facial Emotion Detection",
      tag: "Computer Vision",
      description:
        "CNN + OpenCV deep learning system for real-time facial expression analysis and emotion classification across live video feeds.",
      stack: ["Python", "TensorFlow/Keras", "OpenCV", "CNN"],
      categories: ["Machine Learning"],
      githubUrl: "https://github.com/haroon9595",
    },
    {
      id: "phishing-detector",
      title: "Phishing Website Detection",
      tag: "Machine Learning",
      description:
        "Machine learning system for malicious URL classification and phishing website detection using extracted lexical and domain features.",
      stack: ["Python", "Scikit-Learn", "Feature Extraction", "Flask"],
      categories: ["Machine Learning"],
      githubUrl: "https://github.com/haroon9595",
    },
    {
      id: "house-price",
      title: "House Price Predictor",
      tag: "Regression Model",
      description:
        "Machine learning web application for residential property valuation with comparative regression modeling and interactive feature inputs.",
      stack: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
      categories: ["Machine Learning"],
      githubUrl: "https://github.com/haroon9595",
    },
  ],

  experience: [
    {
      role: "AI Automation & Full-Stack Developer",
      company: "IES Group — Engineering Firm",
      period: "2026 to Present",
      achievements: [
        "Designed and deployed an AI-powered lead routing system using n8n Cloud, Groq LLM and Zoho SMTP",
        "Automated handling of company inquiries across departments",
        "Built and deployed the company's web platform",
        "Configured professional email infrastructure for four departments (SPF, DKIM, MX)",
        "Builds internal automation tools for tender discovery and bidding support",
        "Developed the EPADS tender intelligence system and WhatsApp assistant for real-world bidding workflows",
      ],
    },
  ] as ExperienceItem[],

  skills: [
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "C++", "C#", "SQL"],
    },
    {
      category: "Backend & Automation",
      skills: [
        "FastAPI",
        "n8n",
        "REST APIs",
        "MCP / FastMCP",
        "Docker",
        "Webhooks",
      ],
    },
    {
      category: "AI & Machine Learning",
      skills: [
        "LLM Agents",
        "Tool Calling",
        "RAG",
        "LangChain",
        "Vector Databases",
        "pgvector",
        "FAISS",
        "Prompt Engineering",
        "Groq APIs",
      ],
    },
    {
      category: "Frontend",
      skills: ["Next.js", "React", "Tailwind CSS", "Streamlit"],
    },
    {
      category: "Data & Tools",
      skills: [
        "PostgreSQL",
        "SQLite",
        "Supabase",
        "Pandas",
        "NumPy",
        "Git",
        "GitHub",
        "Claude Code",
      ],
    },
  ] as SkillCategory[],

  certifications: [
    {
      title: "Claude Code in Action",
      issuer: "Anthropic Education",
      date: "May 2026",
      highlight: "Advanced agentic coding & tool orchestration",
    },
    {
      title: "Generative AI Application Developer",
      issuer: "UETIANS / HEC Pakistan / Pak Angels",
      date: "2025",
      highlight: "Top Performer in LLM system design & RAG",
    },
    {
      title: "CM Laptop Award",
      issuer: "Chief Minister Punjab",
      date: "March 2025",
      highlight: "Merit distinction in computer science",
    },
    {
      title: "Honhar Scholarship",
      issuer: "Government of Punjab",
      date: "October 2024",
      highlight: "Merit-based undergraduate fellowship",
    },
  ] as AwardItem[],

  navLinks: [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
  ],
};
