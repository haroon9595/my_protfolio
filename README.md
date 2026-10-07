# Muhammad Haroon Rashid — Production Portfolio & AI Systems Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16%20(App%20Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

A modern, high-performance personal portfolio website for **Muhammad Haroon Rashid**, a **Full-Stack & AI Agent Developer / Automation Engineer** from Faisalabad, Pakistan.

Engineered to showcase production-ready software systems: autonomous AI agents, backend REST APIs, workflow automations, and enterprise platforms.

---

## 🚀 Key Features

* **Design & Aesthetics**: Clean `#FAF9FF` backdrop, near-black typography (`#0F0F14`), vibrant purple accents (`#7C3AED`), rounded pill buttons, and soft floating glassmorphic statistics cards.
* **Typing Animation**: Hero subtitle dynamically cycling through:
  * *Full-Stack Developer*
  * *AI Agent Developer*
  * *Automation Engineer*
* **Centralized Content Management**: All personal details, projects, skills, services, experience, and certifications are maintained in a single source of truth: [`src/data.ts`](src/data.ts).
* **Factual Project Classification**:
  * **EPADS Tender Intelligence System + WhatsApp Assistant**: Proprietary real-world bidding platform tagged as `Built for live bidding` (crawlers, SQLite caching, FastMCP tools, daily digest scheduler, WhatsApp summary cards, report exports).
  * **HostelDesk**: AI complaint management system tagged as `Built end-to-end` (Slack integration, n8n AI agent, PostgreSQL, Next.js 14 dashboard).
  * **IES Group**: Genuine client project delivered for Inter Engineering Services tagged as `Client Project` (AI lead routing with n8n Cloud and Groq LLM, corporate web platform, SPF/DKIM/MX domain email setup).
  * **TubeMind AI**: Retrieval-augmented generation video QA system tagged as `AI Application` (LangChain, FAISS, Groq Llama 3.3 70B).
* **Interactive Category Filtering**: Real-time project filters (*All*, *AI Agents*, *Automation*, *Full-Stack*, *Machine Learning*) animated with Framer Motion.
* **Delivery & Deployment Strip**: Full-width secondary section detailing end-to-end production hosting, CI/CD, DNS, SSL, professional email setup (SPF, DKIM, MX), and database operations.
* **Floating AI Assistant (AIChatbot)**:
  * Floating widget at bottom-right with quick questions and conversational Q&A.
  * Connects directly to an n8n webhook via environment variables.
  * **Security-first**: Zero Groq API keys exposed in frontend code; credentials remain secured inside n8n Cloud.
* **Production Contact Form**:
  * Interactive form with client-side validation, loading spinners, double-submission protection, and celebratory confetti.
  * Forwards inquiries to an automated n8n webhook via `/api/contact`.
* **Downloadable Resume**: Formatted CV available at `/public/Muhammad_Haroon_Rashid_CV.pdf`.

---

## 🧠 AI Assistant Architecture

```
[User Browser]
      │
      ▼
[Next.js Client Component: AIChatbot.tsx]
      │
      ▼  (POST /api/chat or client webhook)
[Next.js Server Route: /api/chat/route.ts]
      │
      ▼  (Forwarded with process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK)
[n8n Cloud Webhook Workflow]
      │
      ▼  (Secure API Call with Private Key)
[Groq LLM / Llama 3.3 70B Engine]
      │
      ▼  (Structured Answer)
[User Receives Instant Reply]
```

*Note: All Groq LLM credentials and prompt templates remain completely secured within n8n Cloud, preventing exposure in client bundles.*

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router with Turbopack)
* **Language**: TypeScript 5
* **Styling**: Tailwind CSS v4 & PostCSS
* **Animation**: Framer Motion
* **Icons**: Lucide React & Custom SVG Brand Icons
* **PDF Engine**: PDFKit

---

## 📦 Local Development

### 1. Prerequisites
* Node.js v18+ (tested on Node v24)
* npm, yarn, or pnpm

### 2. Clone & Install
```bash
git clone https://github.com/haroon9595/protfolio.git
cd protfolio
npm install
```

### 3. Environment Variables
Copy the template file to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your webhook URLs inside `.env.local`:
```env
# Contact Form n8n Webhook
NEXT_PUBLIC_N8N_CONTACT_WEBHOOK=https://your-n8n-instance.com/webhook/portfolio-contact

# AI Chatbot n8n Webhook
NEXT_PUBLIC_N8N_CHAT_WEBHOOK=https://your-n8n-instance.com/webhook/portfolio-chat
```
*(If left empty during local development, the application functions cleanly with built-in fallbacks).*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Production Build & Deployment

### Build Locally
To test the production bundle locally:
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository.
4. In **Environment Variables**, add:
   * `NEXT_PUBLIC_N8N_CONTACT_WEBHOOK`
   * `NEXT_PUBLIC_N8N_CHAT_WEBHOOK`
5. Click **Deploy**. Vercel will automatically build and deploy the production application.

---

## 📄 License
MIT License. Created for Muhammad Haroon Rashid.
