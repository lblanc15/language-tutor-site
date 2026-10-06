import { auth } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ContactReplyEmail } from "@/app/email-templates/plunk";
import { getDb } from "@/lib/db";
import { contactSubmissionReplies, contactSubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const replySchema = z.object({
  submissionId: z.number().int().positive(),
  message: z.string().trim().min(1, "Message is required.").max(10000),
});

export async function POST(request: Request) {
  const { has } = await auth();

  if (!has({ role: "org:admin" })) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = replySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a message before sending." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [submission] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, parsed.data.submissionId))
      .limit(1);

    if (!submission) {
      return NextResponse.json({ error: "Contact submission not found." }, { status: 404 });
    }

    const { env } = await getCloudflareContext({ async: true });
    const rawApiKey = env.PLUNK_API_KEY || process.env.PLUNK_API_KEY;
    const rawAdminEmail = env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const apiKey = rawApiKey?.trim().replace(/^['"]|['"]$/g, "");
    const adminEmail = rawAdminEmail?.trim();

    if (!apiKey || !adminEmail) {
      return NextResponse.json({ error: "Email sending is not configured." }, { status: 503 });
    }

    const emailHtml = await render(
      ContactReplyEmail({ name: submission.name, message: parsed.data.message })
    );
    const response = await fetch("https://next-api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: submission.email,
        subject: "Re: Your inquiry | Academia de Espanol Rico",
        body: emailHtml,
        from: "contact@ricospanishacademy.com",
        reply: adminEmail,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Plunk could not send the reply." }, { status: 502 });
    }

    await db.insert(contactSubmissionReplies).values({
      submissionId: submission.id,
      message: parsed.data.message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to send the reply right now." }, { status: 500 });
  }
}