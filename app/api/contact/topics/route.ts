import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { contactInquiryTopics } from "@/lib/db/schema";

export async function GET() {
  try {
    const db = await getDb();
    const topics = await db
      .select({
        id: contactInquiryTopics.id,
        topic: contactInquiryTopics.topic,
      })
      .from(contactInquiryTopics)
      .orderBy(asc(contactInquiryTopics.topic));

    return NextResponse.json(
      { topics },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Inquiry topics are temporarily unavailable." }, { status: 503 });
  }
}
