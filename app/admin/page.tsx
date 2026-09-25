import { UserButton } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactSubmissions, type ContactSubmission } from "@/lib/db/schema";

export default async function AdminPage() {
  let submissions: ContactSubmission[] = [];
  let databaseError = false;

  try {
    const db = await getDb();
    submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(50);
  } catch {
    databaseError = true;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 lg:px-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-blue-950">Admin</h1>
          <p className="mt-2 font-body text-sm text-slate-700">
            Welcome to the Academia de Espanol Rico admin area.
          </p>
        </div>
        <UserButton />
      </div>
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-xl font-bold text-blue-950">Contact messages</h2>
          <span className="font-body text-xs text-slate-500">Latest 50</span>
        </div>
        {databaseError ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 font-body text-sm text-red-800">
            Contact messages are temporarily unavailable.
          </p>
        ) : submissions.length === 0 ? (
          <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 font-body text-sm text-slate-600">
            No contact messages yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left font-body text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-slate-500">
                      {submission.createdAt.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top font-semibold text-blue-950">
                      {submission.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top">{submission.email}</td>
                    <td className="min-w-64 max-w-xl whitespace-pre-wrap px-4 py-3 align-top">
                      {submission.message}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-xs font-semibold">
                      {submission.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}