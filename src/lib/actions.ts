"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.string(),
  message: z.string(),
});

export async function handleContactForm(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  // In a real application, you would send an email, save to a database, etc.
  console.log("New contact form submission:", parsed.data);

  return { success: true };
}
