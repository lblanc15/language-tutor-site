"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactSubmissionReplyProps {
  submissionId: number;
  name: string;
  email: string;
}

export function ContactSubmissionReply({
  submissionId,
  name,
  email,
}: ContactSubmissionReplyProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Write a message before sending.");
      return;
    }

    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/admin/contact-submissions/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, message: trimmedMessage }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(result?.error ?? "The reply could not be sent. Please try again.");
        return;
      }

      setMessage("");
      setIsOpen(false);
      toast.success("Reply email sent successfully.");
      router.refresh();
    } catch {
      setError("The reply could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        aria-label={`Reply to ${name}`}
        className="border-blue-200 text-blue-950 hover:bg-blue-50 hover:text-blue-950"
      >
        <Mail aria-hidden="true" />
        Reply
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border border-slate-200 bg-white p-6 font-body sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-body font-bold text-blue-950">Reply to {name}</DialogTitle>
            <DialogDescription className="font-body text-blue-950/70">
              To: <span className="font-semibold text-blue-950">{email}</span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <label htmlFor={`reply-message-${submissionId}`} className="mb-2 block font-body text-sm font-semibold text-blue-950">
              Message
            </label>
            <textarea
              id={`reply-message-${submissionId}`}
              name="message"
              required
              maxLength={10000}
              rows={8}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your reply..."
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `reply-error-${submissionId}` : undefined}
              className="h-42 w-full resize-none overflow-y-auto rounded-lg border border-slate-300 bg-white px-3 py-2 font-body text-sm text-blue-950/90 placeholder:text-slate-400 outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-950/20 aria-invalid:border-red-700"
            />
            {error && (
              <p id={`reply-error-${submissionId}`} role="alert" className="mt-2 font-body text-sm text-red-700">
                {error}
              </p>
            )}
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSending}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSending || !message.trim()}
                className="bg-blue-950 text-white hover:bg-blue-900"
              >
                <Send aria-hidden="true" />
                {isSending ? "Sending..." : "Send reply"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}