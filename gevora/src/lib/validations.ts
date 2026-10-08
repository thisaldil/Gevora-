import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(9, "Enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Digits only, please"),
  message: z.string().min(10, "Say a little more so the agent can help you"),
});
export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const mortgageSchema = z.object({
  propertyPrice: z.number({ message: "Enter the property price" }).positive(),
  downPayment: z.number().min(0),
  interestRate: z.number().min(0).max(30),
  years: z.number().min(1).max(35),
});
export type MortgageFormValues = z.infer<typeof mortgageSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["buyer", "agent"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegisterFormValues = z.infer<typeof registerSchema>;
