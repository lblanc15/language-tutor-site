import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

const deleteSubmissionSchema = z.object({
  submissionId: z.number().int().positive(),
});

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

  const parsed = deleteSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact submission ID." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [deletedSubmission] = await db
      .delete(contactSubmissions)
      .where(eq(contactSubmissions.id, parsed.data.submissionId))
      .returning({ id: contactSubmissions.id });

    if (!deletedSubmission) {
      return NextResponse.json({ error: "Contact submission not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete the contact submission right now." }, { status: 500 });
  }
}
