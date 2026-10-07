import { NextResponse } from "next/server";
import { portfolioData } from "@/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim();
    const webhookUrl =
      process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK ||
      process.env.N8N_CHAT_WEBHOOK_URL;

    // 1. If n8n Chat Webhook is configured, forward to n8n Cloud (Groq credentials stay inside n8n)
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMsg,
            history: history || [],
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply =
            data.output ||
            data.reply ||
            data.response ||
            data.message ||
            (typeof data === "string" ? data : JSON.stringify(data));
          return NextResponse.json({ reply });
        } else {
          console.error("n8n chat webhook responded with:", response.status);
        }
      } catch (webhookErr) {
        console.error("Error calling n8n chat webhook:", webhookErr);
      }
    }

    // 2. Intelligent local fallback grounded in actual portfolio data
    // (Used when n8n webhook is not yet configured, ensuring zero broken UI)
    const lower = trimmedMsg.toLowerCase();
    let fallbackReply = "";

    if (
      lower.includes("epads") ||
      lower.includes("tender") ||
      lower.includes("bidding")
    ) {
      fallbackReply =
        "The EPADS Tender Intelligence System is Muhammad Haroon's proprietary real-world bidding platform. It craws, parses, and summarizes government tenders from Pakistan's EPADS portal, caches data in SQLite, exposes tools via a FastMCP server (search_tenders, get_tender_details), provides a daily digest scheduler, and delivers instant tender cards and report exports (Excel, PDF, Word) via WhatsApp.";
    } else if (
      lower.includes("ies") ||
      lower.includes("lead") ||
      lower.includes("client")
    ) {
      fallbackReply =
        "IES Group is a genuine client project delivered for Inter Engineering Services (an engineering & construction company). Haroon built an AI-driven lead classification and routing workflow with n8n Cloud and Groq LLM across four departments, along with company web infrastructure and SPF/DKIM/MX domain email setup.";
    } else if (
      lower.includes("hostel") ||
      lower.includes("complaint") ||
      lower.includes("hosteldesk")
    ) {
      fallbackReply =
        "HostelDesk is an end-to-end AI complaint management platform. It transforms conversational reports in Slack into structured PostgreSQL tickets, assigns Resident Tutors automatically based on hostel blocks, and gives administrators a real-time Next.js 14 dashboard.";
    } else if (
      lower.includes("stack") ||
      lower.includes("technolog") ||
      lower.includes("skill") ||
      lower.includes("language")
    ) {
      fallbackReply =
        "Haroon's core tech stack covers: Python, TypeScript, Next.js, React, Tailwind CSS, FastAPI, n8n automation, PostgreSQL, SQLite, Supabase, FastMCP / MCP servers, LangChain, Groq APIs, and FAISS vector databases.";
    } else if (
      lower.includes("resume") ||
      lower.includes("cv") ||
      lower.includes("download")
    ) {
      fallbackReply = `You can download Haroon's verified Curriculum Vitae directly from the top banner, the About section, or via this direct link: ${portfolioData.personal.cvPath} (or view on Google Drive: ${portfolioData.personal.cvDriveUrl}).`;
    } else if (
      lower.includes("contact") ||
      lower.includes("hire") ||
      lower.includes("email") ||
      lower.includes("reach") ||
      lower.includes("whatsapp")
    ) {
      fallbackReply = `You can reach Muhammad Haroon directly via email at ${portfolioData.personal.email} or on WhatsApp at ${portfolioData.personal.whatsapp}. He is based in Faisalabad, Pakistan and is Available for Hire for full-time engineering roles and contract deployments.`;
    } else if (
      lower.includes("who") ||
      lower.includes("about") ||
      lower.includes("haroon")
    ) {
      fallbackReply =
        "Muhammad Haroon Rashid is a Full-Stack & AI Agent Developer from Faisalabad, Pakistan. He specializes in shipping complete software systems: web apps, backend APIs, autonomous tool-calling AI agents, n8n workflow automations, and tender data intelligence platforms.";
    } else {
      fallbackReply =
        "I'm Haroon's portfolio assistant. Haroon specializes in Full-Stack web apps (Next.js, FastAPI, PostgreSQL), AI Agent systems (FastMCP, RAG, tool calling), and business automation (n8n, Slack, WhatsApp bots). Feel free to ask about his featured systems like EPADS or IES Group, or use the contact form to discuss opportunities!";
    }

    return NextResponse.json({ reply: fallbackReply }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing message." },
      { status: 500 }
    );
  }
}
