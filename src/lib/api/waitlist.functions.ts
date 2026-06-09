import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email() }))
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    const timestamp = new Date().toISOString();
    const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

    if (webappUrl) {
      try {
        const response = await fetch(webappUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, timestamp }),
        });
        const result = await response.json() as { success: boolean; exists?: boolean; message?: string; count?: number };
        
        if (result.success) {
          return {
            success: true,
            count: result.count ?? 0,
            message: result.message || "successfully joined the waitlist.",
          };
        } else {
          return {
            success: false,
            count: 0,
            message: result.message || "failed to join the waitlist.",
          };
        }
      } catch (e) {
        console.error("Error submitting waitlist email to Google Sheet:", e);
        return {
          success: false,
          count: 0,
          message: "failed to connect to server.",
        };
      }
    }

    // Fallback: Local SQLite
    const { getWaitlistEmails, saveWaitlistEmails } = await import("../waitlist.server");
    const emails = await getWaitlistEmails();
    const exists = emails.some((item) => item.email === email);

    if (!exists) {
      emails.push({
        email,
        timestamp,
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
  const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
  if (webappUrl) {
    try {
      const res = await fetch(webappUrl);
      const data = await res.json() as { count: number };
      return {
        count: data.count ?? 0,
      };
    } catch (e) {
      console.error("Error fetching waitlist count from Google Sheet:", e);
      return {
        count: 0,
      };
    }
  }

  // Fallback: Local SQLite
  const { getWaitlistEmails } = await import("../waitlist.server");
  const emails = await getWaitlistEmails();
  return {
    count: emails.length,
  };
});
