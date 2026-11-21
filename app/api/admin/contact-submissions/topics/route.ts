import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactInquiryTopics } from "@/lib/db/schema";

const createTopicSchema = z.object({
  topic: z.string().trim().min(1).max(80),
});

const deleteTopicSchema = z.object({
  id: z.number().int().positive(),
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

  const parsed = createTopicSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a topic with 1 to 80 characters." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [topic] = await db
      .insert(contactInquiryTopics)
      .values({ topic: parsed.data.topic })
      .onConflictDoNothing()
      .returning({
        id: contactInquiryTopics.id,
        topic: contactInquiryTopics.topic,
      });

    if (!topic) {
      return NextResponse.json({ error: "That inquiry topic already exists." }, { status: 409 });
    }

    return NextResponse.json({ topic });
  } catch {
    return NextResponse.json({ error: "Unable to add the inquiry topic right now." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

  const parsed = deleteTopicSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid inquiry topic ID." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [deletedTopic] = await db
      .delete(contactInquiryTopics)
      .where(eq(contactInquiryTopics.id, parsed.data.id))
      .returning({ id: contactInquiryTopics.id });

    if (!deletedTopic) {
      return NextResponse.json({ error: "Inquiry topic not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to remove the inquiry topic right now." }, { status: 500 });
  }
}
