export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  tagType?: "bidding" | "client" | "end-to-end" | "ai" | "default";
  featured?: boolean;
  description: string;
  problem?: string;
  outcome?: string;
  whyStack?: string;
  highlights: string[];
  engineeringHighlights?: string[];
  stack: string[];
  categories: ("AI Agents" | "Automation" | "Full-Stack" | "Machine Learning")[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  screenshots?: string[]; // TODO(owner): add screenshot URLs when available
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
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
  icon: string;
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
    // Using the local PDF — fast, no login required, no expiry
    cvPath: "/Muhammad_Haroon_Rashid_CV.pdf",
    profileImage:
      "https://res.cloudinary.com/drfnqdaqz/image/upload/f_auto,q_auto/v1791381225/Screenshot_2026-10-07_185319_qdodew.png",
    // TODO(owner): Replace profileImage with a proper headshot once available.
    // Update the URL above in data.ts — the component reads it from here.
    availabilityBadge: "Available for Hire",
    heroBadge: "Open to full-time and project work",
    heroHeading: "Muhammad Haroon Rashid",
    heroBio:
      "I build complete software systems — from data pipelines and AI agents to production web platforms. Real deployments include a tender intelligence system with WhatsApp assistant used for live bidding, and an AI lead-routing platform built for an engineering firm.",
    stats: {
      // Derived from portfolioData.projects.length — not hardcoded
      label: "Live deployments",
    },
    heroStack: ["Python", "n8n", "Next.js", "FastAPI", "PostgreSQL", "LangChain"],
  },

  about: {
    heading: "About Me",
    paragraph1:
      "Full-stack developer focused on AI-driven systems and automation. Takes a problem from raw data or a manual process to a working, deployed product — whether that is a web app, an API, a chatbot or an autonomous agent.",
    paragraph2:
      "Works with real business data and real users, and cares about reliability, clear structure and practical results.",
    howIWork: [
      {
        step: "01",
        title: "Understand the manual process",
        desc: "Map the workflow, the data, and the pain point before writing a line of code.",
      },
      {
        step: "02",
        title: "Build and automate it",
        desc: "Deliver a working system: backend, agents, integrations, and a frontend where needed.",
      },
      {
        step: "03",
        title: "Deploy and hand over",
        desc: "Production hosting, DNS, email, monitoring — the client gets a working product, not just code.",
      },
    ],
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
      },
    ],
  },

  services: [
    {
      id: "fullstack",
      title: "Full-Stack Application Development",
      description:
        "Web apps, dashboards, REST APIs and databases — from schema design to production deployment.",
      tech: ["Next.js", "FastAPI", "PostgreSQL", "Supabase", "Vercel"],
      icon: "code",
    },
    {
      id: "ai-agents",
      title: "AI Agents & LLM Applications",
      description:
        "Tool-calling agents, RAG systems, MCP servers and chat with private or company data.",
      tech: ["LangChain", "FastMCP", "FAISS", "Groq", "Hugging Face"],
      icon: "brain",
    },
    {
      id: "workflow-automation",
      title: "Workflow Automation & Integrations",
      description:
        "n8n pipelines, Slack and WhatsApp bots, email routing, webhooks and scheduled jobs.",
      tech: ["n8n", "Slack", "WhatsApp", "Webhooks", "Zoho SMTP"],
      icon: "workflow",
    },
    {
      id: "data-intelligence",
      title: "Data Collection & Intelligence Systems",
      description:
        "Crawlers, parsers, change detection, daily digests and structured report exports.",
      tech: ["Python", "SQLite", "Excel/PDF/Word exports", "Schedulers"],
      icon: "database",
    },
  ] as ServiceItem[],

  deploymentStrip: {
    title: "Delivery & Deployment, end to end",
    text: "Every system I build ships production-ready. I handle hosting and CI/CD (GitHub → Vercel and Render), custom domains and DNS, SSL, professional email setup (SPF, DKIM, MX), database setup, environment configuration and monitoring — so the client gets a working product, not just code.",
    chips: [
      "Hosting & CI/CD",
      "Domains & DNS",
      "Professional Email",
      "Databases",
      "Web Applications",
    ],
  },

  projects: [
    {
      id: "epads",
      title: "EPADS Tender Intelligence System + WhatsApp Assistant",
      tag: "Built for live bidding",
      tagType: "bidding",
      featured: true,
      problem:
        "Manual browsing of Pakistan's EPADS government tender portal consumed hours before every bid — listings buried across pages, documents unread, deadlines missed.",
      description:
        "A tender intelligence platform that finds, tracks and summarizes government tenders from Pakistan's EPADS portal, built to replace hours of manual browsing and document reading before every bid.",
      outcome:
        "Crawlers, a FastMCP AI-tool server, and a WhatsApp assistant now handle discovery and summarization automatically.",
      whyStack:
        "SQLite chosen for fast, file-based tender caching with zero infrastructure overhead. FastMCP exposes tenders as AI-callable tools. Python for rapid crawler iteration against a live government portal.",
      highlights: [
        "Crawler and parsers for tender listings, tender details and standard bidding documents",
        "Change detection — updates to a tender are caught automatically",
        "SQLite storage for fast, reliable tender information caching",
        "FastMCP server that lets AI assistants search and read tenders with tools like search_tenders and get_tender_details",
        "Daily digest with scheduler for new and closing tenders",
        "WhatsApp chatbot: send a tender ID and receive an instant structured summary card (Agency, Title, Closing date, Time remaining, Bid security, Required registrations)",
        "Automated report generation and export commands for Excel, PDF, and Word",
      ],
      engineeringHighlights: [
        "Live-tested against epads.gov.pk",
        "FastMCP server exposes search_tenders and get_tender_details tools",
        "Single CLI command generates Excel, PDF and Word reports",
      ],
      stack: ["Python", "FastMCP", "SQLite", "WhatsApp Integration", "Scheduler", "CLI"],
      categories: ["AI Agents", "Automation"],
      githubUrl: undefined, // Private repository
      liveUrl: undefined,
      screenshots: [], // TODO(owner): add screenshot URLs
    },
    {
      id: "iesgroup",
      title: "IES Group — AI Lead Routing & Corporate Platform",
      tag: "Client Project",
      tagType: "client",
      featured: true,
      problem:
        "Inter Engineering Services received inquiries with no routing — messages went to one inbox regardless of department, causing delays and lost leads.",
      description:
        "Delivered for Inter Engineering Services, an engineering and construction company: an AI-powered inquiry routing system that reads incoming messages, classifies them with an LLM and sends them to the right department automatically, along with the company's web platform and email infrastructure.",
      outcome:
        "Inquiries are now classified and routed to four departments automatically via n8n Cloud and Groq LLM, with acknowledgments sent through Zoho SMTP.",
      whyStack:
        "n8n Cloud chosen for no-code flow editing by the client post-handover. Groq LLM for low-latency classification. Supabase for managed lead archiving without self-hosted infrastructure.",
      highlights: [
        "LLM-based classification and routing of incoming inquiries across four specialized departments",
        "Automated email handling and acknowledgment pipelines with n8n Cloud and Zoho SMTP",
        "Company web platform built for high performance and fast loading",
        "Professional email infrastructure including SPF, DKIM and MX record configuration",
        "Supabase integration for secure lead archiving and inquiry history",
      ],
      engineeringHighlights: [
        "Four-department LLM routing pipeline in production",
        "SPF, DKIM and MX configured for professional email delivery",
        "Lead history archived in Supabase for audit trail",
      ],
      stack: ["n8n Cloud", "Groq LLM", "Zoho SMTP", "Supabase", "Vercel"],
      categories: ["Automation", "AI Agents", "Full-Stack"],
      liveUrl: "https://iesgroup.com.pk",
      githubUrl: undefined, // Client — restricted
      screenshots: [], // TODO(owner): add screenshot URLs
    },
    {
      id: "hosteldesk",
      title: "HostelDesk — AI Complaint Management System",
      tag: "Built end-to-end",
      tagType: "end-to-end",
      featured: false,
      problem:
        "Hostel students had no structured way to report complaints — emails and verbal reports got lost, Resident Tutors had no visibility into workload.",
      description:
        "An AI-powered complaint management platform that turns conversational student reports into structured complaints, automatically assigns them to the right Resident Tutor and provides staff with a real-time management dashboard.",
      outcome:
        "Students report via Slack conversation; complaints are structured, assigned and tracked in a live Next.js dashboard.",
      highlights: [
        "Conversational issue reporting directly through Slack",
        "n8n AI Agent with LLM and contextual chat memory",
        "Automatic complaint creation and normalization in PostgreSQL",
        "Intelligent Resident Tutor assignment based on hostel blocks",
        "Complete status history audit tracking and real-time Slack DMs",
        "Modern Next.js 14 staff dashboard with workload views and multi-status filters",
        "FastAPI webhook backend with secure processing",
      ],
      engineeringHighlights: [
        "n8n AI Agent with contextual chat memory for conversational intake",
        "Resident Tutor assignment logic based on hostel block mapping",
        "Full audit trail with status history in PostgreSQL",
      ],
      stack: ["n8n", "Slack", "PostgreSQL", "FastAPI", "Next.js 14", "Vercel", "Render"],
      categories: ["Full-Stack", "AI Agents", "Automation"],
      liveUrl: "https://hostel-complain-management-portal.vercel.app",
      githubUrl: undefined, // Repository available on request
      screenshots: [], // TODO(owner): add screenshot URLs
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
        "Hugging Face embeddings with local FAISS vector search",
        "Groq-hosted Llama 3.3 70B providing low-latency streaming responses",
        "Interactive conversational interface with source citations",
      ],
      engineeringHighlights: [
        "Local FAISS vector store — no external vector DB required",
        "Hugging Face embeddings run offline after first pull",
        "Groq Llama 3.3 70B for sub-second response times",
      ],
      stack: ["LangChain", "FastAPI", "Streamlit", "FAISS", "Groq", "Hugging Face"],
      categories: ["AI Agents", "Machine Learning"],
      githubUrl: "https://github.com/haroon9595/tubemind-ai", // TODO(owner): confirm this repo URL
      liveUrl: undefined,
      screenshots: [], // TODO(owner): add screenshot URLs
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
      githubUrl: undefined, // TODO(owner): confirm repo URL
    },
    {
      id: "facial-emotion",
      title: "Facial Emotion Detection",
      tag: "Computer Vision",
      description:
        "CNN + OpenCV deep learning system for real-time facial expression analysis and emotion classification across live video feeds.",
      stack: ["Python", "TensorFlow", "OpenCV", "CNN"],
      categories: ["Machine Learning"],
      githubUrl: undefined, // TODO(owner): confirm repo URL
    },
    {
      id: "phishing-detector",
      title: "Phishing Website Detection",
      tag: "Machine Learning",
      description:
        "Machine learning system for malicious URL classification and phishing website detection using extracted lexical and domain features.",
      stack: ["Python", "scikit-learn", "Feature Extraction", "Flask"],
      categories: ["Machine Learning"],
      githubUrl: undefined, // TODO(owner): confirm repo URL
    },
    {
      id: "house-price",
      title: "House Price Predictor",
      tag: "Regression Model",
      description:
        "Machine learning web application for residential property valuation with comparative regression modeling and interactive feature inputs.",
      stack: ["Python", "scikit-learn", "Pandas", "Streamlit"],
      categories: ["Machine Learning"],
      githubUrl: undefined, // TODO(owner): confirm repo URL
    },
  ],

  experience: [
    {
      role: "AI Automation & Full-Stack Developer",
      company: "IES Group — Engineering Firm",
      period: "2026 – Present",
      location: "Faisalabad, Pakistan",
      achievements: [
        "Designed and deployed an AI-powered lead routing system using n8n Cloud, Groq LLM and Zoho SMTP",
        "Automated handling of company inquiries across four specialized departments",
        "Built and deployed the company's web platform on Vercel",
        "Configured professional email infrastructure for four departments (SPF, DKIM, MX)",
        "Developed the EPADS tender intelligence system and WhatsApp assistant for live bidding workflows",
        "Builds internal automation tools for tender discovery and bidding support",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "BS Computer Science",
      institution: "UET Lahore",
      period: "2024 – 2028",
      note: "Currently enrolled",
    },
  ],

  skills: [
    {
      category: "Languages",
      icon: "code",
      skills: ["Python", "SQL", "C++", "C#", "HTML", "CSS"],
    },
    {
      category: "Backend & Automation",
      icon: "server",
      skills: ["FastAPI", "n8n", "REST APIs", "FastMCP", "Docker", "Webhooks"],
    },
    {
      category: "AI & Generative AI",
      icon: "brain",
      skills: [
        "LangChain",
        "LangGraph",
        "RAG",
        "Tool Calling",
        "LLM Agents",
        "Prompt Engineering",
        "Hugging Face",
        "FAISS",
        "pgvector",
      ],
    },
    {
      category: "Machine Learning & Data",
      icon: "bar-chart",
      skills: ["scikit-learn", "Pandas", "NumPy", "Computer Vision", "EDA"],
    },
    {
      category: "Databases",
      icon: "database",
      skills: ["PostgreSQL", "Oracle", "SQLite", "Supabase"],
    },
    {
      category: "Frontend",
      icon: "layout",
      skills: ["Next.js", "React", "Tailwind CSS", "Streamlit"],
    },
    {
      category: "Dev Tools & Platforms",
      icon: "tool",
      skills: ["Git", "GitHub", "Vercel", "Render", "Claude Code", "Antigravity"],
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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ],
};
