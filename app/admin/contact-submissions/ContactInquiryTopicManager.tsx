"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactInquiryTopic } from "@/lib/db/schema";
import { z } from "zod";

const createdTopicResponseSchema = z.object({
  topic: z.object({
    id: z.number().int(),
    topic: z.string(),
  }),
});
const topicErrorResponseSchema = z.object({ error: z.string() });

function getErrorMessage(body: unknown, fallback: string) {
  const parsed = topicErrorResponseSchema.safeParse(body);
  return parsed.success ? parsed.data.error : fallback;
}

interface ContactInquiryTopicManagerProps {
  initialTopics: ContactInquiryTopic[];
}

export function ContactInquiryTopicManager({ initialTopics }: ContactInquiryTopicManagerProps) {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      setError("Enter a topic before adding it.");
      return;
    }

    setError("");
    setIsAdding(true);

    try {
      const response = await fetch("/api/admin/contact-submissions/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: trimmedTopic }),
      });
      const result: unknown = await response.json().catch(() => null);
      const parsedTopic = createdTopicResponseSchema.safeParse(result);

      if (!response.ok || !parsedTopic.success) {
        setError(getErrorMessage(result, "The inquiry topic could not be added. Please try again."));
        return;
      }

      const addedTopic = parsedTopic.data.topic;
      setTopics((currentTopics) =>
        [...currentTopics, addedTopic].sort((a, b) => a.topic.localeCompare(b.topic)),
      );
      setTopic("");
      toast.success("Topic added to the contact form.");
      router.refresh();
    } catch {
      setError("The inquiry topic could not be added. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = async (topicId: number) => {
    setError("");
    setRemovingId(topicId);

    try {
      const response = await fetch("/api/admin/contact-submissions/topics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: topicId }),
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setError(getErrorMessage(result, "The inquiry topic could not be removed. Please try again."));
        return;
      }

      setTopics((currentTopics) => currentTopics.filter(({ id }) => id !== topicId));
      toast.success("Topic removed. Existing inquiries keep their saved topic.");
      router.refresh();
    } catch {
      setError("The inquiry topic could not be removed. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <section className="mt-4 rounded-lg border border-slate-200 bg-white p-4 font-body text-sm">
      <h3 className="font-semibold text-blue-950">Inquiry topics</h3>
      <p className="mt-1 text-xs text-slate-600">
        These choices appear in the contact form. Removing a topic does not change existing inquiries.
      </p>
      <form onSubmit={handleAdd} className="mt-4 flex max-w-xl flex-col gap-2 sm:flex-row">
        <label htmlFor="new-inquiry-topic" className="sr-only">
          New inquiry topic
        </label>
        <Input
          id="new-inquiry-topic"
          name="topic"
          required
          maxLength={80}
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
            setError("");
          }}
          placeholder="Add a topic"
          aria-invalid={Boolean(error)}
          className="h-10"
          disabled={isAdding || removingId !== null}
        />
        <Button
          type="submit"
          size="sm"
          className="h-10 bg-blue-950 px-3 text-white hover:bg-blue-900"
          disabled={isAdding || removingId !== null || !topic.trim()}
        >
          <Plus aria-hidden="true" />
          {isAdding ? "Adding..." : "Add topic"}
        </Button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {topics.length > 0 ? (
        <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200/80 bg-white">
          {topics.map(({ id, topic: topicLabel }) => (
            <li
              key={id}
              className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-50/80"
            >
              <span className="font-medium text-blue-950">{topicLabel}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${topicLabel}`}
                title={`Remove ${topicLabel}`}
                onClick={() => handleRemove(id)}
                disabled={isAdding || removingId !== null}
                className="text-slate-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 aria-hidden="true" />
                {removingId === id && <span className="sr-only">Removing...</span>}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          No inquiry topics yet. Add at least one to enable the contact form.
        </p>
      )}
    </section>
  );
}
