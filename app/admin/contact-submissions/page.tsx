import { asc, desc, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  contactInquiryTopics,
  contactSubmissionReplies,
  contactSubmissions,
  type ContactInquiryTopic,
  type ContactSubmission,
  type ContactSubmissionReplyRecord,
} from "@/lib/db/schema";
import { ContactSubmissionDelete } from "./ContactSubmissionDelete";
import { ContactInquiryTopicManager } from "./ContactInquiryTopicManager";
import { ContactSubmissionReply } from "./ContactSubmissionReply";

export default async function ContactSubmissionsPage() {
  let submissions: ContactSubmission[] = [];
  let replies: ContactSubmissionReplyRecord[] = [];
  let topics: ContactInquiryTopic[] = [];
  let databaseError = false;

  try {
    const db = await getDb();
    submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(50);
    topics = await db
      .select()
      .from(contactInquiryTopics)
      .orderBy(asc(contactInquiryTopics.topic));

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
    <div className="mt-10 pb-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-xl font-bold text-blue-950">Contact Submissions</h2>
      </div>
      {!databaseError && <ContactInquiryTopicManager initialTopics={topics} />}
      {databaseError ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 font-body text-sm text-red-800">
          Contact messages are temporarily unavailable.
        </p>
      ) : submissions.length === 0 ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 font-body text-sm text-slate-600">
          No contact messages yet.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200/80 bg-white">
          <table className="min-w-full text-left font-body text-sm">
            <thead className="border-b border-slate-200 text-xs font-medium text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Topic</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Sent replies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {submissions.map((submission) => (
                <tr key={submission.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="whitespace-nowrap px-4 py-4 align-middle text-xs text-slate-500">
                    {submission.createdAt.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 align-middle">
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-950">
                      {submission.inquiryTopic}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 align-middle font-semibold text-blue-950">
                    {submission.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 align-middle">{submission.email}</td>
                  <td className="min-w-64 max-w-xl whitespace-pre-wrap px-4 py-4 align-middle">
                    {submission.message}
                  </td>
                  <td className="min-w-64 max-w-2xl px-4 py-4 align-middle">
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
                  <td className="whitespace-nowrap px-4 py-4 align-middle">
                    <div className="flex items-center justify-end gap-1">
                      <ContactSubmissionReply
                        submissionId={submission.id}
                        name={submission.name}
                        email={submission.email}
                      />
                      <ContactSubmissionDelete
                        submissionId={submission.id}
                        name={submission.name}
                      />
                    </div>
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