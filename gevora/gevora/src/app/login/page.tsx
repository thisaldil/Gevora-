"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    await new Promise((r) => setTimeout(r, 500));
    console.info("[mock] login", values);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Sign in</h1>
      <p className="mt-1 text-ink/60">Access your saved properties, alerts, and enquiries.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Email</label>
          <input
            {...register("email")}
            className="w-full rounded-lg border border-mist bg-paper px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.email && <p className="mt-1 text-xs text-lotus">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded-lg border border-mist bg-paper px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.password && <p className="mt-1 text-xs text-lotus">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        New to Gevora?{" "}
        <Link href="/register" className="font-medium text-teal hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
