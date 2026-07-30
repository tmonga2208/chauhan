"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./credenza";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Enter your full name." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Enter at least 10 digits." })
    .max(15, { message: "That's too long for a phone number." })
    .optional()
    .or(z.literal("")),
  billingName: z.string().min(2, { message: "Enter the billing name." }),
  billingAddress: z
    .string()
    .min(5, { message: "Enter the full billing address." }),
});

type FormValues = z.infer<typeof formSchema>;

const FIELDS: {
  name: keyof FormValues;
  label: string;
  type?: string;
  hint?: string;
}[] = [
  { name: "fullName", label: "Full name" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel", hint: "Optional" },
  { name: "billingName", label: "Billing name" },
  { name: "billingAddress", label: "Billing address" },
];

export default function GetStartedButton({ price }: { price: string }) {
  const [open, setOpen] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      billingName: "",
      billingAddress: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const itemName =
      localStorage.getItem("productName")?.replace(/"/g, "") ?? "";
    const itemImg = localStorage.getItem("productImg")?.replace(/"/g, "") ?? "";

    const request = fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: values.fullName,
        clientEmail: values.email,
        WeaponPrice: price,
        phone: values.phone,
        billingName: values.billingName,
        billingAddress: values.billingAddress,
        itemName,
        itemImg,
      }),
    }).then((response) => {
      if (!response.ok) throw new Error("Request failed");
      return response;
    });

    toast.promise(request, {
      loading: "Sending your details…",
      success: () => {
        setOpen(false);
        form.reset();
        setTermsAccepted(false);
        return "Enquiry sent. We'll be in touch shortly.";
      },
      error: "That didn't send. Check your connection and try again.",
    });
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <button
          type="button"
          className="data group flex h-14 w-full items-center justify-center gap-3 bg-signal px-6 text-paper transition-colors duration-500 hover:bg-signal-bright"
        >
          {price}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </CredenzaTrigger>

      <CredenzaContent className="border-hair-strong bg-overlay">
        <CredenzaHeader>
          <CredenzaTitle className="display text-2xl text-ink">
            Place an enquiry
          </CredenzaTitle>
          <CredenzaDescription className="prose-body text-sm text-ink-muted">
            Send us your details and we&apos;ll confirm availability, shipping
            and payment by email.
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody>
          <form
            id="enquiry-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-md"
          >
            {FIELDS.map(({ name, label, type, hint }) => {
              const error = form.formState.errors[name];
              return (
                <div key={name} className="border-b border-hair py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor={name} className="data text-ink-dim">
                      {label}
                    </label>
                    {hint && (
                      <span className="data-sm text-ink-faint">{hint}</span>
                    )}
                  </div>
                  <input
                    id={name}
                    type={type ?? "text"}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...form.register(name)}
                    className={cn(
                      "mt-2 h-10 w-full bg-transparent text-base text-ink outline-none",
                      "border-b border-transparent transition-colors placeholder:text-ink-faint",
                      "focus:border-signal",
                      error && "border-signal"
                    )}
                  />
                  {error && (
                    <p
                      id={`${name}-error`}
                      className="data-sm mt-2 text-signal"
                    >
                      {error.message}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              role="checkbox"
              aria-checked={termsAccepted}
              onClick={() => setTermsAccepted((v) => !v)}
              className="group mt-5 flex w-full items-center gap-3 text-left"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-4 w-4 shrink-0 place-items-center border transition-colors",
                  termsAccepted
                    ? "border-signal bg-signal"
                    : "border-hair-strong group-hover:border-ink-dim"
                )}
              >
                {termsAccepted && <span className="h-1.5 w-1.5 bg-paper" />}
              </span>
              <span className="text-sm text-ink-muted">
                I accept the terms and conditions
              </span>
            </button>
          </form>
        </CredenzaBody>

        <CredenzaFooter>
          <button
            type="submit"
            form="enquiry-form"
            disabled={!termsAccepted || form.formState.isSubmitting}
            className="data h-12 w-full bg-signal px-6 text-paper transition-colors duration-300 hover:bg-signal-bright disabled:cursor-not-allowed disabled:bg-overlay disabled:text-ink-faint sm:w-auto"
          >
            {form.formState.isSubmitting ? "Sending…" : "Send enquiry"}
          </button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
