"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
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

interface ContactSubmissionDeleteProps {
  submissionId: number;
  name: string;
}

export function ContactSubmissionDelete({ submissionId, name }: ContactSubmissionDeleteProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch("/api/admin/contact-submissions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(result?.error ?? "The inquiry could not be deleted. Please try again.");
        return;
      }

      setIsOpen(false);
      toast.success("Inquiry and reply history deleted.");
      router.refresh();
    } catch {
      setError("The inquiry could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
        aria-label={`Delete inquiry from ${name}`}
        title={`Delete inquiry from ${name}`}
        className="text-slate-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 aria-hidden="true" />
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setIsOpen(open);
          }
        }}
      >
        <DialogContent
          className="border border-slate-200 bg-white p-6 font-body sm:max-w-lg"
          showCloseButton={!isDeleting}
        >
          <DialogHeader>
            <DialogTitle className="font-body font-bold text-blue-950">
              Delete this inquiry?
            </DialogTitle>
            <DialogDescription className="font-body text-blue-950/70">
              This permanently deletes the inquiry from{" "}
              <span className="font-semibold text-blue-950">{name}</span> and its sent reply history.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p role="alert" className="font-body text-sm text-red-700">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete inquiry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
