"use client";

import React from "react";

interface DiagramProps {
  projectId: string;
}

export default function ProjectArchitectureDiagram({ projectId }: DiagramProps) {
  if (projectId === "epads") {
    return (
      <div
        role="img"
        aria-label="EPADS Tender Intelligence System Architecture Diagram"
        className="w-full bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-center"
      >
        <span className="sr-only">
          EPADS portal sends raw data to Crawler and Parsers, stored in SQLite cache. Change detection triggers FastMCP server exposing search_tenders and get_tender_details tools. Connects to WhatsApp assistant for structured summary cards, and exports to Excel, PDF, and Word via CLI.
        </span>

        <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
            Architecture Workflow
          </span>
          <span className="text-[10px] font-medium text-zinc-500">Live Production Pipeline</span>
        </div>

        <svg
          viewBox="0 0 540 230"
          className="w-full h-auto text-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Row: Intake & Storage */}
          {/* Node 1: EPADS Portal */}
          <rect x="10" y="15" width="105" height="44" rx="8" fill="#FFFFFF" stroke="#D8B4FE" strokeWidth="1.5" />
          <text x="62" y="34" fill="#0F0F14" fontWeight="700" fontSize="11" textAnchor="middle">epads.gov.pk</text>
          <text x="62" y="48" fill="#6B7280" fontSize="9" textAnchor="middle">Gov Tender Portal</text>

          {/* Arrow 1 */}
          <path d="M115 37 H140" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="143,37 138,34 138,40" fill="#7C3AED" />

          {/* Node 2: Crawler & Parsers */}
          <rect x="145" y="15" width="115" height="44" rx="8" fill="#FAF5FF" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="202" y="34" fill="#6B21A8" fontWeight="700" fontSize="11" textAnchor="middle">Python Crawler</text>
          <text x="202" y="48" fill="#7C3AED" fontSize="9" textAnchor="middle">Listing & Doc Parsers</text>

          {/* Arrow 2 */}
          <path d="M260 37 H285" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="288,37 283,34 283,40" fill="#7C3AED" />

          {/* Node 3: SQLite Cache */}
          <rect x="290" y="15" width="105" height="44" rx="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
          <text x="342" y="34" fill="#1E3A8A" fontWeight="700" fontSize="11" textAnchor="middle">SQLite Storage</text>
          <text x="342" y="48" fill="#60A5FA" fontSize="9" textAnchor="middle">Local Cache & Index</text>

          {/* Arrow 3 */}
          <path d="M395 37 H420" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="423,37 418,34 418,40" fill="#7C3AED" />

          {/* Node 4: Change Detection */}
          <rect x="425" y="15" width="105" height="44" rx="8" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
          <text x="477" y="34" fill="#065F46" fontWeight="700" fontSize="11" textAnchor="middle">Change Detection</text>
          <text x="477" y="48" fill="#10B981" fontSize="9" textAnchor="middle">Diff & Updates</text>

          {/* Middle Connecting Arrow (downward from SQLite & Change Detection) */}
          <path d="M342 59 V95 H270 V115" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="270,118 267,113 273,113" fill="#7C3AED" />

          {/* Core Hub: FastMCP Server */}
          <rect x="180" y="120" width="180" height="50" rx="10" fill="#7C3AED" />
          <text x="270" y="142" fill="#FFFFFF" fontWeight="800" fontSize="12" textAnchor="middle">FastMCP AI Server</text>
          <text x="270" y="157" fill="#E9D5FF" fontSize="10" textAnchor="middle">tools: search_tenders · get_tender</text>

          {/* Branch Arrows from FastMCP */}
          {/* To WhatsApp */}
          <path d="M180 145 H125 V175" stroke="#25D366" strokeWidth="1.5" />
          <polygon points="125,178 122,173 128,173" fill="#25D366" />

          {/* To Report Exports */}
          <path d="M360 145 H415 V175" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="415,178 412,173 418,173" fill="#7C3AED" />

          {/* Bottom Left: WhatsApp Assistant */}
          <rect x="50" y="180" width="150" height="42" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
          <text x="125" y="198" fill="#166534" fontWeight="700" fontSize="11" textAnchor="middle">WhatsApp Assistant</text>
          <text x="125" y="212" fill="#15803D" fontSize="9" textAnchor="middle">Summary Cards & Alerts</text>

          {/* Bottom Right: Exports & CLI */}
          <rect x="340" y="180" width="150" height="42" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="415" y="198" fill="#0F172A" fontWeight="700" fontSize="11" textAnchor="middle">CLI & Daily Digest</text>
          <text x="415" y="212" fill="#64748B" fontSize="9" textAnchor="middle">Excel · PDF · Word Export</text>
        </svg>
      </div>
    );
  }

  if (projectId === "iesgroup") {
    return (
      <div
        role="img"
        aria-label="IES Group AI Inquiry Routing Architecture Diagram"
        className="w-full bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-center"
      >
        <span className="sr-only">
          Website inquiry arrives at n8n Cloud webhook. Groq LLM classifies intent into one of four specialized departments. Routes via Zoho SMTP professional email with auto-acknowledgment and Supabase lead archiving.
        </span>

        <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
            Routing Workflow
          </span>
          <span className="text-[10px] font-medium text-zinc-500">Production AI Pipeline</span>
        </div>

        <svg
          viewBox="0 0 540 210"
          className="w-full h-auto text-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Step 1: Website Form */}
          <rect x="10" y="80" width="110" height="46" rx="8" fill="#FFFFFF" stroke="#DDD6FE" strokeWidth="1.5" />
          <text x="65" y="100" fill="#0F0F14" fontWeight="700" fontSize="11" textAnchor="middle">iesgroup.com.pk</text>
          <text x="65" y="115" fill="#6B7280" fontSize="9" textAnchor="middle">Inquiry Web Form</text>

          {/* Arrow 1 */}
          <path d="M120 103 H148" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="152,103 147,100 147,106" fill="#7C3AED" />

          {/* Step 2: n8n Cloud */}
          <rect x="155" y="80" width="105" height="46" rx="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
          <text x="207" y="100" fill="#9F1239" fontWeight="700" fontSize="11" textAnchor="middle">n8n Cloud</text>
          <text x="207" y="115" fill="#E11D48" fontSize="9" textAnchor="middle">Webhook Receiver</text>

          {/* Arrow 2 */}
          <path d="M260 103 H288" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="292,103 287,100 287,106" fill="#7C3AED" />

          {/* Step 3: Groq LLM */}
          <rect x="295" y="75" width="115" height="56" rx="10" fill="#7C3AED" />
          <text x="352" y="98" fill="#FFFFFF" fontWeight="800" fontSize="11" textAnchor="middle">Groq LLM Engine</text>
          <text x="352" y="112" fill="#E9D5FF" fontSize="9" textAnchor="middle">Zero-shot Classification</text>
          <text x="352" y="123" fill="#C4B5FD" fontSize="8" textAnchor="middle">Fast Inference API</text>

          {/* Multi-branch arrow to 4 departments */}
          <path d="M410 103 H430" stroke="#7C3AED" strokeWidth="1.5" />

          {/* 4 Department Outputs */}
          {/* Dept 1: Mechanical */}
          <path d="M430 103 V25 H445" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="445" y="10" width="85" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="487" y="27" fill="#1E293B" fontWeight="600" fontSize="9" textAnchor="middle">Mechanical Dept</text>

          {/* Dept 2: Electrical */}
          <path d="M430 103 V75 H445" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="445" y="60" width="85" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="487" y="77" fill="#1E293B" fontWeight="600" fontSize="9" textAnchor="middle">Electrical Dept</text>

          {/* Dept 3: Civil / Struct */}
          <path d="M430 103 V125 H445" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="445" y="110" width="85" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="487" y="127" fill="#1E293B" fontWeight="600" fontSize="9" textAnchor="middle">Civil Engineering</text>

          {/* Dept 4: Procurement */}
          <path d="M430 103 V175 H445" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="445" y="160" width="85" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text x="487" y="177" fill="#1E293B" fontWeight="600" fontSize="9" textAnchor="middle">Procurement</text>

          {/* Bottom Bar: Zoho SMTP & Supabase Archive */}
          <path d="M207 126 V180 H240" stroke="#9333EA" strokeWidth="1.2" strokeDasharray="3 3" />
          <rect x="245" y="165" width="165" height="34" rx="6" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1" />
          <text x="327" y="181" fill="#581C87" fontWeight="700" fontSize="9" textAnchor="middle">Zoho SMTP + Supabase</text>
          <text x="327" y="192" fill="#7E22CE" fontSize="8" textAnchor="middle">SPF/DKIM/MX Config & Lead History</text>
        </svg>
      </div>
    );
  }

  if (projectId === "hosteldesk") {
    return (
      <div
        role="img"
        aria-label="HostelDesk AI Complaint Management Architecture Diagram"
        className="w-full bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-center"
      >
        <span className="sr-only">
          Student issues complaint on Slack. n8n AI Agent with LLM and chat memory structures the issue and maps to hostel blocks. Stored in PostgreSQL with status history. Dispatches Slack DM to Resident Tutor, while FastAPI webhook updates Next.js 14 staff dashboard.
        </span>

        <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
            Full-Stack Architecture
          </span>
          <span className="text-[10px] font-medium text-zinc-500">Live Complaint Portal</span>
        </div>

        <svg
          viewBox="0 0 540 210"
          className="w-full h-auto text-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Step 1: Student on Slack */}
          <rect x="10" y="30" width="115" height="44" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="67" y="49" fill="#0F172A" fontWeight="700" fontSize="11" textAnchor="middle">Student on Slack</text>
          <text x="67" y="63" fill="#64748B" fontSize="9" textAnchor="middle">Conversational Intake</text>

          {/* Arrow 1 */}
          <path d="M125 52 H155" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="158,52 153,49 153,55" fill="#7C3AED" />

          {/* Step 2: n8n AI Agent */}
          <rect x="160" y="24" width="135" height="56" rx="10" fill="#7C3AED" />
          <text x="227" y="46" fill="#FFFFFF" fontWeight="800" fontSize="11" textAnchor="middle">n8n AI Agent</text>
          <text x="227" y="60" fill="#E9D5FF" fontSize="9" textAnchor="middle">LLM + Chat Memory</text>
          <text x="227" y="71" fill="#C4B5FD" fontSize="8" textAnchor="middle">Block Normalization</text>

          {/* Arrow 2 */}
          <path d="M295 52 H325" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="328,52 323,49 323,55" fill="#7C3AED" />

          {/* Step 3: PostgreSQL Database */}
          <rect x="330" y="30" width="115" height="44" rx="8" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
          <text x="387" y="49" fill="#1E3A8A" fontWeight="700" fontSize="11" textAnchor="middle">PostgreSQL DB</text>
          <text x="387" y="63" fill="#3B82F6" fontSize="9" textAnchor="middle">Audit & Status History</text>

          {/* Arrow to Resident Tutor */}
          <path d="M445 52 H465" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="468,52 463,49 463,55" fill="#7C3AED" />

          {/* RT Assignment */}
          <rect x="470" y="30" width="60" height="44" rx="8" fill="#ECFDF5" stroke="#86EFAC" strokeWidth="1.5" />
          <text x="500" y="49" fill="#065F46" fontWeight="700" fontSize="10" textAnchor="middle">RT DM</text>
          <text x="500" y="63" fill="#10B981" fontSize="8" textAnchor="middle">Auto-assign</text>

          {/* Downward Path to Webhook & Dashboard */}
          <path d="M227 80 V130 H260" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="263,130 258,127 258,133" fill="#7C3AED" />

          {/* FastAPI Webhook */}
          <rect x="265" y="112" width="115" height="40" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5" />
          <text x="322" y="130" fill="#115E59" fontWeight="700" fontSize="10" textAnchor="middle">FastAPI Webhook</text>
          <text x="322" y="143" fill="#0D9488" fontSize="8" textAnchor="middle">Secure Event Stream</text>

          {/* Arrow to Next.js 14 */}
          <path d="M380 132 H410" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="413,132 408,129 408,135" fill="#7C3AED" />

          {/* Next.js 14 Dashboard */}
          <rect x="415" y="105" width="115" height="54" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          <text x="472" y="125" fill="#000000" fontWeight="800" fontSize="10" textAnchor="middle">Next.js 14 Portal</text>
          <text x="472" y="139" fill="#4B5563" fontSize="8" textAnchor="middle">Staff Dashboard UI</text>
          <text x="472" y="150" fill="#7C3AED" fontSize="8" textAnchor="middle">Filter & Workload View</text>
        </svg>
      </div>
    );
  }

  if (projectId === "tubemind") {
    return (
      <div
        role="img"
        aria-label="TubeMind AI RAG Architecture Diagram"
        className="w-full bg-[#FAF9FF] border border-purple-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-center"
      >
        <span className="sr-only">
          YouTube transcript extraction and chunking feeds Hugging Face embeddings stored in local FAISS vector store. Groq Llama 3.3 70B synthesizes retrieval results into streaming conversational responses via FastAPI.
        </span>

        <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
            RAG Pipeline Architecture
          </span>
          <span className="text-[10px] font-medium text-zinc-500">Local Vector Embeddings</span>
        </div>

        <svg
          viewBox="0 0 540 180"
          className="w-full h-auto text-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Step 1: YouTube Transcript */}
          <rect x="10" y="30" width="100" height="44" rx="8" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
          <text x="60" y="49" fill="#991B1B" fontWeight="700" fontSize="10" textAnchor="middle">YouTube Video</text>
          <text x="60" y="63" fill="#DC2626" fontSize="8" textAnchor="middle">Transcript Fetch</text>

          {/* Arrow 1 */}
          <path d="M110 52 H135" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="138,52 133,49 133,55" fill="#7C3AED" />

          {/* Step 2: Semantic Chunking */}
          <rect x="140" y="30" width="100" height="44" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="190" y="49" fill="#1E293B" fontWeight="700" fontSize="10" textAnchor="middle">Text Chunking</text>
          <text x="190" y="63" fill="#64748B" fontSize="8" textAnchor="middle">Semantic Windows</text>

          {/* Arrow 2 */}
          <path d="M240 52 H265" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="268,52 263,49 263,55" fill="#7C3AED" />

          {/* Step 3: Hugging Face Embeddings */}
          <rect x="270" y="24" width="125" height="56" rx="8" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
          <text x="332" y="45" fill="#92400E" fontWeight="700" fontSize="10" textAnchor="middle">Hugging Face</text>
          <text x="332" y="58" fill="#B45309" fontSize="8" textAnchor="middle">Vector Embeddings</text>
          <text x="332" y="69" fill="#D97706" fontSize="8" textAnchor="middle">Offline Local Cache</text>

          {/* Arrow 3 */}
          <path d="M395 52 H420" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="423,52 418,49 418,55" fill="#7C3AED" />

          {/* Step 4: FAISS Vector Index */}
          <rect x="425" y="30" width="105" height="44" rx="8" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
          <text x="477" y="49" fill="#065F46" fontWeight="700" fontSize="10" textAnchor="middle">FAISS Store</text>
          <text x="477" y="63" fill="#10B981" fontSize="8" textAnchor="middle">Similarity Search</text>

          {/* Retrieval query to LLM */}
          <path d="M477 74 V115 H370" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="367,115 372,112 372,118" fill="#7C3AED" />

          {/* Step 5: Groq Llama 3.3 70B & FastAPI Streaming */}
          <rect x="140" y="98" width="220" height="54" rx="10" fill="#7C3AED" />
          <text x="250" y="120" fill="#FFFFFF" fontWeight="800" fontSize="11" textAnchor="middle">Groq Llama 3.3 70B</text>
          <text x="250" y="134" fill="#E9D5FF" fontSize="9" textAnchor="middle">FastAPI Streaming Context Synthesis</text>
          <text x="250" y="145" fill="#C4B5FD" fontSize="8" textAnchor="middle">Sub-second Latency Response</text>

          {/* Stream to Client */}
          <path d="M140 125 H90" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="87,125 92,122 92,128" fill="#7C3AED" />

          {/* Client UI */}
          <rect x="10" y="105" width="75" height="40" rx="8" fill="#FFFFFF" stroke="#DDD6FE" strokeWidth="1.5" />
          <text x="47" y="124" fill="#581C87" fontWeight="700" fontSize="9" textAnchor="middle">Streamlit</text>
          <text x="47" y="136" fill="#7E22CE" fontSize="8" textAnchor="middle">Chat UI</text>
        </svg>
      </div>
    );
  }

  return null;
}
