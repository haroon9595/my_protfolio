const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outputPath = path.join(__dirname, '..', 'public', 'Muhammad_Haroon_Rashid_CV.pdf');
const doc = new PDFDocument({ margin: 40, size: 'A4' });

doc.pipe(fs.createWriteStream(outputPath));

// Colors
const primaryColor = '#7C3AED';
const darkColor = '#0F0F14';
const grayColor = '#4B5563';
const lightGray = '#9CA3AF';

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor(darkColor).text('MUHAMMAD HAROON RASHID', { align: 'left' });
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('Full-Stack & AI Agent Developer', { align: 'left' });
doc.moveDown(0.4);

// Contact Line
doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  'Faisalabad, Pakistan  |  haroon11005@gmail.com  |  +92 347 6379600  |  github.com/haroon9595  |  linkedin.com/in/muhammadharoonrashid848777287'
);
doc.moveDown(0.6);

// Divider
doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
doc.moveDown(0.6);

// Section: Summary
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('PROFESSIONAL PROFILE');
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica').fillColor(darkColor).text(
  'Full-stack and AI developer specializing in autonomous AI agents, workflow automation, and production web systems. Proven record building end-to-end solutions from data extraction and vector search pipelines to client-facing dashboards and enterprise lead operations. Experienced with Python, FastMCP, n8n, Next.js, and PostgreSQL.',
  { lineGap: 2 }
);
doc.moveDown(0.8);

// Section: Experience
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('EXPERIENCE');
doc.moveDown(0.2);

doc.fontSize(10).font('Helvetica-Bold').fillColor(darkColor).text('AI Automation & Full-Stack Developer', { continued: true });
doc.font('Helvetica').fillColor(grayColor).text('  |  IES Group — Engineering Firm  |  2026 – Present');
doc.moveDown(0.2);

const experiencePoints = [
  'Architected and deployed an AI-powered inquiry classification and lead routing system with n8n Cloud, Groq LLM, and Zoho SMTP across 4 company departments.',
  'Configured enterprise domain email infrastructure including SPF, DKIM, and MX routing protocols for seamless client communication.',
  'Engineered the EPADS tender intelligence system and WhatsApp assistant for real-world government bidding workflows, reducing manual tender discovery time significantly.',
  'Built and deployed high-performance corporate web platform with Vercel and Render CI/CD pipelines.'
];

experiencePoints.forEach(pt => {
  doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(`•  ${pt}`, { indent: 10, lineGap: 1.5 });
});
doc.moveDown(0.8);

// Section: Featured Systems
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('FEATURED SYSTEMS & PROJECTS');
doc.moveDown(0.2);

// EPADS
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(darkColor).text('EPADS Tender Intelligence System + WhatsApp Assistant', { continued: true });
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('  [Built for live bidding]');
doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  '•  Automated crawler and parsers for government tender listings, change detection, and SQLite caching.\n•  FastMCP server exposing search_tenders and get_tender_details tools for AI agent orchestration.\n•  WhatsApp chatbot delivering structured tender cards and export commands for Excel, PDF, and Word reports.\n•  Stack: Python, FastMCP, SQLite, WhatsApp Integration, Scheduler, CLI',
  { indent: 10, lineGap: 1.5 }
);
doc.moveDown(0.4);

// HostelDesk
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(darkColor).text('HostelDesk — AI Complaint Management System', { continued: true });
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('  [Built end-to-end]');
doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  '•  Multi-channel platform converting conversational Slack reports into structured PostgreSQL complaints.\n•  n8n AI agent with LLM memory and automated Resident Tutor dispatch based on residential blocks.\n•  Next.js 14 management dashboard with real-time status history tracking and FastAPI webhook backend.\n•  Stack: Next.js 14, n8n, Slack, PostgreSQL, FastAPI, Vercel, Render',
  { indent: 10, lineGap: 1.5 }
);
doc.moveDown(0.4);

// IES Group
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(darkColor).text('IES Group — AI Lead Routing & Corporate Platform', { continued: true });
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('  [Client Project]');
doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  '•  Delivered for Inter Engineering Services: automated LLM inquiry classification across four engineering teams.\n•  Automated response dispatch with Zoho SMTP and Supabase historical archiving.\n•  Stack: n8n Cloud, Groq LLM, Zoho SMTP, Supabase, Vercel',
  { indent: 10, lineGap: 1.5 }
);
doc.moveDown(0.4);

// TubeMind AI
doc.fontSize(9.5).font('Helvetica-Bold').fillColor(darkColor).text('TubeMind AI — Video Question Answering System', { continued: true });
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(primaryColor).text('  [AI Application]');
doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  '•  RAG application combining transcript extraction, FAISS vector indexing, and Groq-hosted Llama 3.3 70B for low-latency streaming responses.\n•  Stack: LangChain, FastAPI, Streamlit, FAISS, Groq',
  { indent: 10, lineGap: 1.5 }
);
doc.moveDown(0.8);

// Technical Skills
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('TECHNICAL SKILLS');
doc.moveDown(0.2);

const skills = [
  { label: 'Languages', items: 'Python, TypeScript, C++, C#, SQL' },
  { label: 'Backend & Automation', items: 'FastAPI, n8n, REST APIs, FastMCP / MCP, Docker, Webhooks' },
  { label: 'AI & Machine Learning', items: 'LLM Agents, Tool Calling, RAG, LangChain, pgvector, FAISS, Groq APIs' },
  { label: 'Frontend & UI', items: 'Next.js, React, Tailwind CSS, Streamlit' },
  { label: 'Data & Tools', items: 'PostgreSQL, SQLite, Supabase, Pandas, NumPy, Git, GitHub, Claude Code' }
];

skills.forEach(s => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(darkColor).text(`${s.label}: `, { continued: true });
  doc.font('Helvetica').fillColor(grayColor).text(s.items);
});
doc.moveDown(0.6);

// Certifications & Education
doc.fontSize(11).font('Helvetica-Bold').fillColor(primaryColor).text('HONOURS & EDUCATION');
doc.moveDown(0.2);

doc.fontSize(8.5).font('Helvetica').fillColor(grayColor).text(
  '•  Claude Code in Action — Anthropic Education (May 2026)\n•  Generative AI Application Developer — UETIANS / HEC Pakistan / Pak Angels (Top Performer)\n•  CM Laptop Award — Chief Minister Punjab (March 2025)\n•  Honhar Scholarship — Government of Punjab (October 2024)\n•  BS Computer Science — UET Lahore (2024–2028)',
  { indent: 10, lineGap: 1.5 }
);

doc.end();
console.log('CV PDF generated successfully at:', outputPath);
