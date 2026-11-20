import { auth } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { ContactReplyEmail } from "@/app/email-templates/plunk";
import { getDb } from "@/lib/db";
import { contactSubmissionReplies, contactSubmissions } from "@/lib/db/schema";
import { sendPlunkEmail } from "@/lib/email/send-plunk-email";
import { getConfiguredAdminEmail } from "@/lib/settings/admin-email";

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
    const apiKey = rawApiKey?.trim().replace(/^['"]|['"]$/g, "");
    const adminEmail = await getConfiguredAdminEmail();

    if (!apiKey || !adminEmail) {
      return NextResponse.json({ error: "Email sending is not configured." }, { status: 503 });
    }
    if (!z.email().safeParse(adminEmail).success) {
      return NextResponse.json(
        { error: "The active admin email address is invalid." },
        { status: 503 }
      );
    }

    const emailHtml = await render(
      ContactReplyEmail({ name: submission.name, message: parsed.data.message })
    );
    const sent = await sendPlunkEmail(apiKey, {
      to: submission.email,
      subject: "Re: Your inquiry | Academia de Espanol Rico",
      body: emailHtml,
      reply: adminEmail,
    });

    if (!sent) {
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