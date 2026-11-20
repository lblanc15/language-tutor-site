import "server-only";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { adminEmailSettings } from "@/lib/db/schema";

const ADMIN_EMAIL_SETTINGS_ID = 1;

export async function getAdminEmailSettings() {
  const db = await getDb();
  const [settings] = await db
    .select()
    .from(adminEmailSettings)
    .where(eq(adminEmailSettings.id, ADMIN_EMAIL_SETTINGS_ID))
    .limit(1);

  return settings ?? null;
}

export async function getConfiguredAdminEmail() {
  const settings = await getAdminEmailSettings();
  return settings?.activeEmail ?? null;
}

export { ADMIN_EMAIL_SETTINGS_ID };
