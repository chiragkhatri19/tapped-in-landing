import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-BCbsrueW.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const joinWaitlist_createServerFn_handler = createServerRpc({
  id: "b232b7d28df608ca66400bfe3954e980a68804a3e2aca52359abaab8e51da368",
  name: "joinWaitlist",
  filename: "src/lib/api/waitlist.functions.ts"
}, (opts) => joinWaitlist.__executeServer(opts));
const joinWaitlist = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email()
})).handler(joinWaitlist_createServerFn_handler, async ({
  data
}) => {
  const email = data.email.trim().toLowerCase();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (serviceAccountEmail && privateKey) {
    try {
      const {
        addEmailToGoogleSheet
      } = await import("./google-sheets.server-DLAvYScy.mjs");
      return await addEmailToGoogleSheet(email, timestamp);
    } catch (e) {
      console.error("Error submitting waitlist email to Google Sheets API:", e);
      return {
        success: false,
        count: 0,
        message: "failed to connect to sheets server."
      };
    }
  }
  const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
  if (webappUrl) {
    try {
      const url = `${webappUrl}?action=signup&email=${encodeURIComponent(email)}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        return {
          success: true,
          count: result.count ?? 0,
          message: result.message || "successfully joined the waitlist."
        };
      } else {
        return {
          success: false,
          count: 0,
          message: result.message || "failed to join the waitlist."
        };
      }
    } catch (e) {
      console.error("Error submitting waitlist email to Google Sheet:", e);
      return {
        success: false,
        count: 0,
        message: "failed to connect to server."
      };
    }
  }
  const {
    getWaitlistEmails,
    saveWaitlistEmails
  } = await import("./waitlist.server--W3tbCtE.mjs");
  const emails = await getWaitlistEmails();
  const exists = emails.some((item) => item.email === email);
  if (!exists) {
    emails.push({
      email,
      timestamp
    });
    await saveWaitlistEmails(emails);
  }
  return {
    success: true,
    count: emails.length,
    message: exists ? "you are already on the waitlist." : "successfully joined the waitlist."
  };
});
const getWaitlistCount_createServerFn_handler = createServerRpc({
  id: "5338d8458f92f0c0a4eb17982746ff1114500791b6ef7234bac0a3231a3950df",
  name: "getWaitlistCount",
  filename: "src/lib/api/waitlist.functions.ts"
}, (opts) => getWaitlistCount.__executeServer(opts));
const getWaitlistCount = createServerFn({
  method: "GET"
}).handler(getWaitlistCount_createServerFn_handler, async () => {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (serviceAccountEmail && privateKey) {
    try {
      const {
        getGoogleSheetCount
      } = await import("./google-sheets.server-DLAvYScy.mjs");
      const count = await getGoogleSheetCount();
      return {
        count
      };
    } catch (e) {
      console.error("Error fetching waitlist count from Google Sheets API:", e);
      return {
        count: 0
      };
    }
  }
  const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
  if (webappUrl) {
    try {
      const res = await fetch(webappUrl);
      const data = await res.json();
      return {
        count: data.count ?? 0
      };
    } catch (e) {
      console.error("Error fetching waitlist count from Google Sheet:", e);
      return {
        count: 0
      };
    }
  }
  const {
    getWaitlistEmails
  } = await import("./waitlist.server--W3tbCtE.mjs");
  const emails = await getWaitlistEmails();
  return {
    count: emails.length
  };
});
export {
  getWaitlistCount_createServerFn_handler,
  joinWaitlist_createServerFn_handler
};
