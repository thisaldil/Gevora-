"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema), defaultValues: { role: "buyer" } });

  const role = watch("role");

  async function onSubmit(values: RegisterFormValues) {
    await new Promise((r) => setTimeout(r, 500));
    console.info("[mock] register", values);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Create your account</h1>
      <p className="mt-1 text-ink/60">Save properties, set up alerts, or list on Gevora as an agent.</p>

      <div className="mt-6 flex gap-2 rounded-lg border border-mist bg-paper p-1">
        {(["buyer", "agent"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setValue("role", r)}
            className={cn(
              "flex-1 rounded-md py-2 text-sm font-medium capitalize",
              role === r ? "bg-teal text-paper" : "text-ink/60"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Full name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-mist bg-paper px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.name && <p className="mt-1 text-xs text-lotus">{errors.name.message}</p>}
        </div>
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
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Confirm password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-mist bg-paper px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-lotus">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-teal hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
