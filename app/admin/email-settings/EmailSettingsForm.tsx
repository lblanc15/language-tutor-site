"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailSettingsFormProps {
  activeEmail: string | null;
}

export function EmailSettingsForm({ activeEmail }: EmailSettingsFormProps) {
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState(activeEmail);
  const [email, setEmail] = useState(activeEmail ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const trimmedEmail = email.trim();
  const hasEmail = trimmedEmail.length > 0;
  const isValidEmail = hasEmail && z.email().safeParse(trimmedEmail).success;
  const emailChanged = trimmedEmail !== (currentEmail?.trim() ?? "");
  const hasFormatError = hasEmail && !isValidEmail;

  const toggleEditor = () => {
    setError("");
    setSuccess("");
    if (!isEditing) {
      setEmail(currentEmail ?? "");
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail || !emailChanged) {
      return;
    }

    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(result?.error ?? "The admin email address could not be updated.");
        return;
      }

      setCurrentEmail(email.trim());
      setIsEditing(false);
      setSuccess("The admin email address was updated.");
      router.refresh();
    } catch {
      setError("The admin email address could not be updated. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-6 max-w-xl rounded-lg border border-slate-200 bg-white p-6 font-body text-sm">
      <div className="flex items-center gap-2">
        <strong className="break-all text-lg leading-7">
          {currentEmail ?? <span className="text-slate-500">Not configured</span>}
        </strong>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={isEditing ? "Hide email editor" : "Edit email address"}
          onClick={toggleEditor}
          className="text-blue-950"
        >
          <Pencil aria-hidden="true" />
        </Button>
      </div>

      {isEditing && (
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label htmlFor="admin-email" className="sr-only">
            Admin email address
          </label>
          <Input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="admin@example.com"
            aria-invalid={Boolean(error) || hasFormatError}
            aria-describedby={
              hasFormatError
                ? "admin-email-format-error"
                : error
                  ? "admin-email-error"
                  : undefined
            }
            className="h-10"
          />
          {hasFormatError ? (
            <p id="admin-email-format-error" role="alert" className="text-xs text-red-700">
              Enter a valid email address.
            </p>
          ) : error ? (
            <p id="admin-email-error" role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={isSaving || !emailChanged || !isValidEmail}
            className="bg-blue-950 text-xs p-3 text-white hover:bg-blue-900"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      )}
      {!isEditing && success && (
        <p role="status" className="mt-2 text-sm text-green-700">
          {success}
        </p>
      )}
    </div>
  );
}
