import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { ContactAdminEmail, ContactConfirmationEmail } from "@/app/email-templates/plunk";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the submitted contact details." },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    try {
      const db = await getDb();
      await db.insert(contactSubmissions).values({
        name,
        email,
        message,
      });
    } catch {
      return NextResponse.json(
        { error: "We could not save your message. Please try again." },
        { status: 503 }
      );
    }

    const { env } = await getCloudflareContext({ async: true });
    const rawApiKey = env.PLUNK_API_KEY || process.env.PLUNK_API_KEY;
    const rawAdminEmail = env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const apiKey = rawApiKey?.trim().replace(/^["']|["']$/g, "");
    const adminEmail = rawAdminEmail?.trim();

    if (!apiKey || !adminEmail) {
      return NextResponse.json(
        { error: "Your message was saved, but notification is temporarily unavailable." },
        { status: 503 }
      );
    }
    const adminUrl = new URL("/admin", request.url).toString();
    const [adminEmailHtml, confirmationEmailHtml] = await Promise.all([
      render(ContactAdminEmail({ name, email, message, adminUrl })),
      render(ContactConfirmationEmail({ name })),
    ]);

    const sendEmail = async (payload: {
      to: string;
      subject: string;
      body: string;
      replyTo: string;
    }) => {
      const response = await fetch("https://next-api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          ...payload,
          from: "contact@ricospanishacademy.com",
        }),
      });

      return response.ok;
    };

    const [adminEmailSent, confirmationEmailSent] = await Promise.all([
      sendEmail({
        to: adminEmail,
        subject: `[New Contact Inquiry] ${name}`,
        body: adminEmailHtml,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: "We received your inquiry | Academia de Espanol Rico",
        body: confirmationEmailHtml,
        replyTo: adminEmail,
      }),
    ]);

    if (!adminEmailSent || !confirmationEmailSent) {
      return NextResponse.json(
        { error: "Your message was saved, but notification is temporarily unavailable." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}