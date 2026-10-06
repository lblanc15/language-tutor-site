import { asc, desc, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  contactSubmissionReplies,
  contactSubmissions,
  type ContactSubmission,
  type ContactSubmissionReplyRecord,
} from "@/lib/db/schema";
import { ContactSubmissionReply } from "./ContactSubmissionReply";

export default async function ContactSubmissionsPage() {
  let submissions: ContactSubmission[] = [];
  let replies: ContactSubmissionReplyRecord[] = [];
  let databaseError = false;

  try {
    const db = await getDb();
    submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(50);

    if (submissions.length > 0) {
      replies = await db
        .select()
        .from(contactSubmissionReplies)
        .where(inArray(contactSubmissionReplies.submissionId, submissions.map(({ id }) => id)))
        .orderBy(asc(contactSubmissionReplies.sentAt));
    }
  } catch {
    databaseError = true;
  }

  const repliesBySubmission = new Map<number, ContactSubmissionReplyRecord[]>();
  for (const reply of replies) {
    const submissionReplies = repliesBySubmission.get(reply.submissionId) ?? [];
    submissionReplies.push(reply);
    repliesBySubmission.set(reply.submissionId, submissionReplies);
  }

  return (
    <div className="mt-10">
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
                <th className="px-4 py-3 font-semibold">Sent replies</th>
                <th className="px-4 py-3 font-semibold">Reply</th>
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
                  <td className="min-w-64 max-w-2xl px-4 py-3 align-top">
                    {(repliesBySubmission.get(submission.id) ?? []).length > 0 ? (
                      <div className="space-y-3">
                        {(repliesBySubmission.get(submission.id) ?? []).map((reply) => (
                          <article key={reply.id}>
                            <p className="mb-1 text-xs font-semibold text-slate-500">
                              Sent {reply.sentAt.toLocaleString(undefined, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                            <p className="whitespace-pre-wrap">{reply.message}</p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">No replies sent</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top">
                    <ContactSubmissionReply
                      submissionId={submission.id}
                      name={submission.name}
                      email={submission.email}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}