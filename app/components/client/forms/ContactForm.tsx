"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  inquiryTopic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const topicsResponseSchema = z.object({
  topics: z.array(
    z.object({
      id: z.number().int(),
      topic: z.string(),
    }),
  ),
});
const topicsErrorSchema = z.object({ error: z.string() });

type FormData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [topics, setTopics] = useState<z.infer<typeof topicsResponseSchema>["topics"]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [hasLoadedTopics, setHasLoadedTopics] = useState(false);
  const [topicsError, setTopicsError] = useState("");
  const isLoadingTopicsRef = useRef(false);
  const {
    control,
    getValues,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      inquiryTopic: "",
      message: "",
    },
  });

  const loadTopics = async () => {
    if (isLoadingTopicsRef.current) {
      return;
    }

    isLoadingTopicsRef.current = true;
    setIsLoadingTopics(true);
    setTopicsError("");

    try {
      const response = await fetch("/api/contact/topics", { cache: "no-store" });
      const result: unknown = await response.json().catch(() => null);
      const parsedTopics = topicsResponseSchema.safeParse(result);

      if (!response.ok || !parsedTopics.success) {
        const parsedError = topicsErrorSchema.safeParse(result);
        setTopicsError(
          (parsedError.success ? parsedError.data.error : undefined) ??
            "Inquiry topics could not be loaded. Close and reopen the selector to try again.",
        );
        return;
      }

      const loadedTopics = parsedTopics.data.topics;
      const selectedTopic = getValues("inquiryTopic");
      setTopics(loadedTopics);
      if (selectedTopic && !loadedTopics.some(({ topic }) => topic === selectedTopic)) {
        setValue("inquiryTopic", "", { shouldValidate: true });
      }
    } catch {
      setTopicsError(
        "Inquiry topics could not be loaded. Close and reopen the selector to try again.",
      );
    } finally {
      isLoadingTopicsRef.current = false;
      setIsLoadingTopics(false);
      setHasLoadedTopics(true);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError("root", {
          message: result?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      reset();
    } catch {
      setError("root", {
        message: "Could not reach the server. Please check your connection and try again.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${isSubmitSuccessful ? 'hidden' : ''} w-full font-body text-blue-950/90`}>
        <div className="space-y-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name" className="text-white/90 text-sm font-medium">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              {...register("name")}
              className="text-blue-950/90 bg-white/80 py-6 border-white/20"
            />
            <FieldError className="text-red-600 text-xs mt-1" errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className="text-white/90 text-sm font-medium">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="text-blue-950/90 bg-white/80 py-6 border-white/20"
            />
            <FieldError className="text-red-600 text-xs mt-1" errors={[errors.email]} />
          </Field>
          <Field data-invalid={!!errors.inquiryTopic}>
            <FieldLabel htmlFor="inquiryTopic" className="text-white/90 text-sm font-medium">
              Topic
            </FieldLabel>
            <Controller
              name="inquiryTopic"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  required
                  items={topics.map(({ id, topic }) => ({
                    value: id.toString(),
                    label: topic,
                  }))}
                  value={topics.find(({ topic }) => topic === field.value)?.id.toString() ?? null}
                  onValueChange={(value) => {
                    const selectedTopic = topics.find(({ id }) => id.toString() === value);
                    if (selectedTopic) {
                      field.onChange(selectedTopic.topic);
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open) {
                      void loadTopics();
                    }
                  }}
                >
                  <SelectTrigger
                    id="inquiryTopic"
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-invalid={!!errors.inquiryTopic}
                    aria-required="true"
                    className="w-full h-8 rounded-lg border-white/20 bg-white/80 px-3 py-6 font-body text-blue-950/90 focus-visible:border-white/50 focus-visible:ring-white/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-white/80"
                  >
                    <SelectValue
                      placeholder="Select a topic"
                      className="text-blue-950/60"
                    />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    alignItemWithTrigger={false}
                    className="border border-slate-200 bg-white font-body text-blue-950"
                  >
                    {isLoadingTopics ? (
                      <SelectItem
                        value="status-loading"
                        disabled
                        aria-label="Loading topics"
                        className="w-full p-0"
                      >
                        <span className="flex w-full items-center justify-center py-3">
                          <LoaderCircle aria-hidden="true" className="size-4 animate-spin text-blue-950/60" />
                        </span>
                      </SelectItem>
                    ) : (
                      <>
                        {topicsError && (
                          <SelectItem value="status-error" disabled>
                            Topics could not be loaded.
                          </SelectItem>
                        )}
                        {!topicsError && hasLoadedTopics && topics.length === 0 && (
                          <SelectItem value="status-empty" disabled>
                            No topics are configured yet.
                          </SelectItem>
                        )}
                        {topics.map(({ id, topic }) => (
                          <SelectItem
                            key={id}
                            value={id.toString()}
                            disabled={topicsError.length > 0}
                          >
                            {topic}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError className="text-red-600 text-xs mt-1" errors={[errors.inquiryTopic]} />
            {topicsError ? (
              <p role="alert" className="text-red-600 text-xs mt-1">
                {topicsError} Close and reopen the selector to try again.
              </p>
            ) : hasLoadedTopics && !isLoadingTopics && topics.length === 0 ? (
              <p role="status" className="text-white/90 text-xs mt-1">
                Inquiry topics are not configured yet. Please try again later.
              </p>
            ) : null}
          </Field>
          <Field data-invalid={!!errors.message}>
            <FieldLabel htmlFor="message" className="text-white text-sm font-medium">Message</FieldLabel>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows={4}
              aria-invalid={!!errors.message}
              {...register("message")}
              className="resize-none aria-invalid:ring-3 aria-invalid:ring-destructive/20 w-full px-3 h-42 py-2 rounded-lg bg-white/80 placeholder:text-muted-foreground text-sm text-blue-950/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FieldError className="text-red-600 text-xs mt-1" errors={[errors.message]} />
          </Field>
          {errors.root && (
            <p role="alert" className="text-red-600 text-xs">{errors.root.message}</p>
          )}
          {isSubmitSuccessful && !isDirty && (
            <p role="status" className="text-blue-950 text-xs font-medium">Message sent successfully. We&apos;ll get back to you soon.</p>
          )}
          <p className="font-body text-[11px] text-white/80">* Information submitted here is used solely to respond to your message and is kept strictly confidential.</p>
          <Button
            type="submit"
            size="lg"
            disabled={
              isSubmitting ||
              !hasLoadedTopics ||
              isLoadingTopics ||
              topicsError.length > 0 ||
              topics.length === 0
            }
            className="mt-2 font-body w-full text-xs py-5 font-bold bg-blue-950 hover:bg-blue-900 text-white"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
      <section className={`${isSubmitSuccessful ? '' : 'hidden'} text-center mt-8 lg:mt-0`}>
        <div>
        <h2 className="text-4xl text-blue-950 font-bold mb-3">¡Muchas gracias!</h2>
        <p className="font-body">Your message has been sent successfully. <br /> We&apos;ll get back to you as soon as possible.</p>
        </div>
      </section>
    </>
  )
}