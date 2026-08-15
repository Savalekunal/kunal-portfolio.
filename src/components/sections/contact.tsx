"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSend, LuCircleCheck, LuCircleAlert, LuLoaderCircle } from "react-icons/lu";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

function validate(data: Record<string, string>): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "That email address doesn't look right.";
  }
  if (!data.subject.trim()) errors.subject = "Please add a subject.";
  if (!data.message.trim()) {
    errors.message = "Please write a message.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const inputClass =
  "w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent-line";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _subject: `Portfolio message from ${data.name}: ${data.subject}`,
          _captcha: "false",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage(
        "Couldn't reach the message service. Please email me directly instead — the link below opens your mail app."
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          title="Get in Touch"
          description="Open to SDET / QA automation roles. Send a message directly, or reach me on any channel below."
        />
      </Reveal>

      <div className="mx-auto max-w-2xl">
        <Reveal>
          <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="form-status">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-display text-[12px] text-ink-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Jane Recruiter"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-[12px] text-fail">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-display text-[12px] text-ink-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-[12px] text-fail">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block font-display text-[12px] text-ink-muted">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={inputClass}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="SDET opportunity at..."
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-[12px] text-fail">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-display text-[12px] text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${inputClass} resize-none`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me a bit about the role..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-[12px] text-fail">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <LuLoaderCircle size={15} className="animate-spin motion-reduce:animate-none" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <LuSend size={15} aria-hidden />
                </>
              )}
            </button>

            <div id="form-status" role="status" aria-live="polite">
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-accent-soft px-3.5 py-2.5 text-[13.5px] text-accent"
                  >
                    <LuCircleCheck size={16} aria-hidden />
                    Message sent successfully ✓ — I&apos;ll reply to your email soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-fail-soft px-3.5 py-2.5 text-[13.5px] text-fail"
                  >
                    <LuCircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
                    <span>
                      {errorMessage}{" "}
                      <a href={`mailto:${profile.email}`} className="underline">
                        {profile.email}
                      </a>
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
