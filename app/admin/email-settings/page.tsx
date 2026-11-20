import { EmailSettingsForm } from "./EmailSettingsForm";
import { getAdminEmailSettings } from "@/lib/settings/admin-email";

export default async function EmailSettingsPage() {
  let settings = null;
  let databaseError = false;

  try {
    settings = await getAdminEmailSettings();
  } catch {
    databaseError = true;
  }

  return (
    <div className="mt-10">
      <h2 className="font-heading text-xl font-bold text-blue-950">
        Email Settings
      </h2>
      <p className="mt-2 max-w-2xl font-body text-xs text-slate-600">
        Set the address used for contact notifications and as the reply-to address for admin replies.
      </p>
      {databaseError ? (
        <p className="mt-5 max-w-xl rounded-lg border border-red-200 bg-red-50 p-4 font-body text-sm text-red-800">
          Email settings are temporarily unavailable.
        </p>
      ) : (
        <EmailSettingsForm
          activeEmail={settings?.activeEmail ?? null}
        />
      )}
    </div>
  );
}
