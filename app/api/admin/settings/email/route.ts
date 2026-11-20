import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { adminEmailSettings } from "@/lib/db/schema";
import { ADMIN_EMAIL_SETTINGS_ID } from "@/lib/settings/admin-email";

const requestSchema = z.object({
  email: z.string().trim().max(254).pipe(z.email()),
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

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const now = new Date();
    const db = await getDb();

    await db
      .insert(adminEmailSettings)
      .values({
        id: ADMIN_EMAIL_SETTINGS_ID,
        activeEmail: parsed.data.email,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: adminEmailSettings.id,
        set: {
          activeEmail: parsed.data.email,
          updatedAt: now,
        },
      });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to update the admin email right now." },
      { status: 500 }
    );
  }
}
