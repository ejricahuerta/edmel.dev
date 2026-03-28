import { z } from "zod";

export const PROJECT_TYPES = [
  "Custom web application",
  "Multi-tenant SaaS platform",
  "AI / automation integration",
  "Auth & identity (SSO / OAuth)",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required"),
  projectType: z.enum(PROJECT_TYPES),
  message: z.string().trim().min(1, "Tell me about your project").max(10000),
});

export type ContactPayload = z.infer<typeof contactSchema>;
