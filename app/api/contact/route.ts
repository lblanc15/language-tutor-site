import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { ContactEmail } from "@/app/email-templates/plunk";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Clean API Key and Admin Email strings strictly
    const apiKey = process.env.PLUNK_API_KEY?.trim().replace(/^["']|["']$/g, '');
    const adminEmail = process.env.ADMIN_EMAIL?.trim();

    if (!apiKey || !adminEmail) {
      return NextResponse.json(
        { error: "Server configuration missing API key or Admin email." },
        { status: 500 }
      );
    }

    const emailHtml = await render(ContactEmail({ name, email, message }));

    // Send payload using standard endpoint & strict authorization header
    const response = await fetch("https://next-api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: adminEmail,
        subject: `[Contact Form] ${name}`,
        body: emailHtml,
        from: "contact@ricospanishacademy.com",
        replyTo: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || data.message || "Failed to send email." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}