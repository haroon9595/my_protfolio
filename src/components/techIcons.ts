import {
  siPython,
  siFastapi,
  siDocker,
  siN8n,
  siPostgresql,
  siSupabase,
  siHuggingface,
  siClaude,
  siAnthropic,
  siModelcontextprotocol,
  siLangchain,
  siVercel,
  siRender,
  siGithub,
  siStreamlit,
  siTailwindcss,
  siReact,
  siNextdotjs,
  siPandas,
  siNumpy,
  siScikitlearn,
  siSqlite,
  siGit,
  siCplusplus,
  siHtml5,
  siCss,
  siJavascript,
} from "simple-icons";

export interface SimpleIconData {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

export type IconKind =
  | { type: "simple"; data: SimpleIconData; brandHex: string }
  | { type: "devicon"; name: "Oracle" | "Csharp" | "Cplusplus"; brandHex: string }
  | { type: "lucide"; icon: string; color: string }
  | { type: "text" };

export const TECH_REGISTRY: Record<string, IconKind> = {
  // Languages
  Python: { type: "simple", data: siPython, brandHex: "#3776AB" },
  JavaScript: { type: "simple", data: siJavascript, brandHex: "#F7DF1E" },
  HTML: { type: "simple", data: siHtml5, brandHex: "#E34F26" },
  HTML5: { type: "simple", data: siHtml5, brandHex: "#E34F26" },
  CSS: { type: "simple", data: siCss, brandHex: "#1572B6" },
  CSS3: { type: "simple", data: siCss, brandHex: "#1572B6" },
  "C++": { type: "simple", data: siCplusplus, brandHex: "#00599C" },
  "C#": { type: "devicon", name: "Csharp", brandHex: "#239120" },
  SQL: { type: "lucide", icon: "database", color: "#336791" },

  // Backend & Automation
  FastAPI: { type: "simple", data: siFastapi, brandHex: "#05998B" },
  n8n: { type: "simple", data: siN8n, brandHex: "#EA4B71" },
  Docker: { type: "simple", data: siDocker, brandHex: "#2496ED" },
  "REST APIs": { type: "lucide", icon: "plug", color: "#7C3AED" },
  Webhooks: { type: "lucide", icon: "webhook", color: "#EC4899" },
  "MCP / FastMCP": { type: "simple", data: siModelcontextprotocol, brandHex: "#8B5CF6" },
  FastMCP: { type: "simple", data: siModelcontextprotocol, brandHex: "#8B5CF6" },
  MCP: { type: "simple", data: siModelcontextprotocol, brandHex: "#8B5CF6" },

  // Generative AI
  LangChain: { type: "simple", data: siLangchain, brandHex: "#1C3C3C" },
  "Hugging Face": { type: "simple", data: siHuggingface, brandHex: "#FFD21E" },
  "Claude Code": { type: "simple", data: siClaude, brandHex: "#D97757" },
  Claude: { type: "simple", data: siClaude, brandHex: "#D97757" },
  Anthropic: { type: "simple", data: siAnthropic, brandHex: "#191919" },
  LangGraph: { type: "lucide", icon: "workflow", color: "#8B5CF6" },
  LLMs: { type: "lucide", icon: "brain", color: "#9333EA" },
  Embeddings: { type: "lucide", icon: "layers", color: "#3B82F6" },
  "AI Integrations": { type: "lucide", icon: "sparkles", color: "#F59E0B" },
  "LLM Agents and Tool Calling": { type: "lucide", icon: "bot", color: "#10B981" },
  RAG: { type: "lucide", icon: "search", color: "#6366F1" },
  "Prompt Engineering": { type: "lucide", icon: "terminal", color: "#EC4899" },

  // Machine Learning and Data
  "scikit-learn": { type: "simple", data: siScikitlearn, brandHex: "#F7931E" },
  Pandas: { type: "simple", data: siPandas, brandHex: "#150458" },
  NumPy: { type: "simple", data: siNumpy, brandHex: "#013243" },
  "Machine Learning": { type: "lucide", icon: "cpu", color: "#8B5CF6" },
  EDA: { type: "lucide", icon: "line-chart", color: "#06B6D4" },
  Matplotlib: { type: "lucide", icon: "bar-chart", color: "#11557C" },
  Seaborn: { type: "lucide", icon: "trending-up", color: "#3776AB" },

  // Databases
  PostgreSQL: { type: "simple", data: siPostgresql, brandHex: "#4169E1" },
  Supabase: { type: "simple", data: siSupabase, brandHex: "#3ECF8E" },
  SQLite: { type: "simple", data: siSqlite, brandHex: "#003B57" },
  Oracle: { type: "devicon", name: "Oracle", brandHex: "#F80000" },
  pgvector: { type: "simple", data: siPostgresql, brandHex: "#4169E1" },
  FAISS: { type: "lucide", icon: "search", color: "#10B981" },

  // Frontend
  "Next.js": { type: "simple", data: siNextdotjs, brandHex: "#000000" },
  React: { type: "simple", data: siReact, brandHex: "#61DAFB" },
  "Tailwind CSS": { type: "simple", data: siTailwindcss, brandHex: "#06B6D4" },
  Streamlit: { type: "simple", data: siStreamlit, brandHex: "#FF4B4B" },

  // Development & Tools
  Git: { type: "simple", data: siGit, brandHex: "#F05032" },
  GitHub: { type: "simple", data: siGithub, brandHex: "#181717" },
  Vercel: { type: "simple", data: siVercel, brandHex: "#000000" },
  Render: { type: "simple", data: siRender, brandHex: "#46E3B7" },
  Antigravity: { type: "lucide", icon: "sparkles", color: "#7C3AED" },

  // Common system technologies
  Slack: { type: "lucide", icon: "message-square", color: "#4A154B" },
  WhatsApp: { type: "lucide", icon: "phone", color: "#25D366" },
  "Zoho SMTP": { type: "lucide", icon: "mail", color: "#EA4335" },
  "Excel/PDF/Word exports": { type: "lucide", icon: "file-spreadsheet", color: "#107C41" },
  Schedulers: { type: "lucide", icon: "clock", color: "#8B5CF6" },
};

export function getTechIcon(name: string): IconKind {
  return TECH_REGISTRY[name] || { type: "text" };
}
