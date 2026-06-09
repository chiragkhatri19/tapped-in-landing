import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    // Import server-only code inside handler to keep client bundle clean
    const { getWaitlistEmails, saveWaitlistEmails } = await import("../waitlist.server");

    const email = data.email.trim().toLowerCase();

    // Get existing list
    const emails = await getWaitlistEmails();

    // Check if email already exists
    const exists = emails.some((item) => item.email === email);

    if (!exists) {
      emails.push({
        email,
        timestamp: new Date().toISOString(),
      });
      await saveWaitlistEmails(emails);
    }

    return {
      success: true,
      count: emails.length,
      message: exists ? "you are already on the waitlist." : "successfully joined the waitlist.",
    };
  });

export const getWaitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const { getWaitlistEmails } = await import("../waitlist.server");
  const emails = await getWaitlistEmails();
  return {
    count: emails.length,
  };
});
