import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { ContactAdminEmail, ContactConfirmationEmail } from "@/app/email-templates/plunk";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactInquiryTopics, contactSubmissions } from "@/lib/db/schema";
import { sendPlunkEmail } from "@/lib/email/send-plunk-email";
import { getConfiguredAdminEmail } from "@/lib/settings/admin-email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  inquiryTopic: z.string().trim().min(1, "Please select an inquiry topic").max(80),
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

    const { name, email, inquiryTopic, message } = parsed.data;

    try {
      const db = await getDb();
      const [activeTopic] = await db
        .select({ id: contactInquiryTopics.id })
        .from(contactInquiryTopics)
        .where(eq(contactInquiryTopics.topic, inquiryTopic))
        .limit(1);

      if (!activeTopic) {
        return NextResponse.json(
          { error: "Please select a valid inquiry topic." },
          { status: 400 }
        );
      }

      await db.insert(contactSubmissions).values({
        name,
        email,
        inquiryTopic,
        message,
      });
    } catch {
      return NextResponse.json(
        { error: "We could not save your message. Please try again." },
        { status: 503 }
      );
    }

    const { env } = await getCloudflareContext({ async: true });
    const emailNotificationsEnabled =
      (env.EMAIL_NOTIFICATIONS_ENABLED || process.env.EMAIL_NOTIFICATIONS_ENABLED)?.trim() ===
      "true";

    // Emails are opt-in: when disabled, submissions are only saved to D1 (visible in /admin).
    if (!emailNotificationsEnabled) {
      return NextResponse.json({ success: true });
    }

    const rawApiKey = env.PLUNK_API_KEY || process.env.PLUNK_API_KEY;

    const apiKey = rawApiKey?.trim().replace(/^["']|["']$/g, "");
    const adminEmail = await getConfiguredAdminEmail();

    if (!apiKey || !adminEmail) {
      return NextResponse.json(
        { error: "Your message was saved, but notification is temporarily unavailable." },
        { status: 503 }
      );
    }

    if (!z.email().safeParse(adminEmail).success) {
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

    const [adminEmailSent, confirmationEmailSent] = await Promise.all([
      sendPlunkEmail(apiKey, {
        to: adminEmail,
        subject: `[New Contact Inquiry] ${name}`,
        body: adminEmailHtml,
        reply: email,
      }),
      sendPlunkEmail(apiKey, {
        to: email,
        subject: "We received your inquiry | Academia de Espanol Rico",
        body: confirmationEmailHtml,
        reply: adminEmail,
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