import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide name, email, and message." },
        { status: 400 }
      );
    }

    // Optional webhook forwarding if NEXT_PUBLIC_N8N_CONTACT_WEBHOOK or N8N_WEBHOOK_URL is configured
    const webhookUrl =
      process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK ||
      process.env.N8N_WEBHOOK_URL ||
      "https://haroonrashid.duckdns.org/webhook/portfolio-contact";

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            source: "Portfolio Contact Form",
          }),
        });

        if (!response.ok) {
          console.error("n8n webhook response not OK:", response.status);
        }
      } catch (err) {
        console.error("Failed to forward to n8n webhook:", err);
        // We still treat it as received so the user experience is smooth
      }
    } else {
      console.log(
        "N8N_WEBHOOK_URL not configured. Form submission simulated:",
        { name, email, message }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
