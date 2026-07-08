"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations";
import { submitEnquiry } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function EnquiryForm({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      message: `Hi, I'm interested in ${propertyTitle}. Is it still available? Could we arrange a viewing?`,
    },
  });

  async function onSubmit(values: EnquiryFormValues) {
    await submitEnquiry({ propertyId, ...values });
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-mist bg-paper p-6 text-center">
        <CheckCircle2 className="text-teal" size={28} />
        <p className="font-display text-base font-semibold text-ink">Enquiry sent</p>
        <p className="text-sm text-ink/60">The agent typically replies within a few hours.</p>
        <button onClick={() => setSent(false)} className="mt-2 text-sm font-medium text-teal hover:underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-mist bg-paper p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Enquire about this property</h2>
      <div className="mt-4 space-y-3">
        <div>
          <input
            {...register("name")}
            placeholder="Your full name"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.name && <p className="mt-1 text-xs text-lotus">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            placeholder="Email address"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.email && <p className="mt-1 text-xs text-lotus">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("phone")}
            placeholder="Phone number (e.g. 077 123 4567)"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.phone && <p className="mt-1 text-xs text-lotus">{errors.phone.message}</p>}
        </div>
        <div>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.message && <p className="mt-1 text-xs text-lotus">{errors.message.message}</p>}
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
