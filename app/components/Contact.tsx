"use client";

import { SocialIcon } from "react-social-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

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
    <section id="Contact" className="w-full py-12 px-6 lg:px-12 bg-amber-600/90">
      <div className="uppercase mb-6 px-4 py-2 rounded-full border border-white/80 text-white/80 font-body font-light text-xs w-fit">Contact</div>
      <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 text-white/80">
        <div>
          <h2 className="text-4xl leading-10 mt-2 max-w-md mb-12 text-blue-950/90 font-bold">Get in touch with us to start your journey in learning <span className="text-white/80">Spanish</span></h2>
          <p className="text-sm font-body mb-2">Follow us on our socials</p>
          <div className="flex gap-2">
            <SocialIcon
              url="https://www.facebook.com/ricospanishacademy"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
            <SocialIcon
              url="https://www.tiktok.com/@academiadeespanolrico"
              target="_blank"
              style={{ height: 25, width: 25 }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${isSubmitSuccessful ? 'hidden' : ''} w-full font-body text-blue-950/90`}>
          <div className="space-y-4">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name" className="text-white/90 text-sm font-medium">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
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
            <Button type="submit" size="lg" disabled={isSubmitting} className="mt-4 font-body w-full text-xs py-5 font-bold bg-blue-950 hover:bg-blue-900 text-white">
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
        <section className={`${isSubmitSuccessful ? '' : 'hidden'} text-center mt-8 lg:mt-0`}>
          <div>
          <h2 className="text-4xl text-blue-950 font-bold mb-3">¡Muchas gracias!</h2>
          <p className="font-body">Your message has been sent successfully. <br /> We'll get back to you as soon as possible.</p>
          </div>
        </section>
      </article>
    </section>
  )
}