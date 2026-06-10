import crypto from "node:crypto";
import process from "node:process";
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "12UtKs3OC_aS9OudoECT8vlM1BOeg9iAdrUIa6UQFxaE";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
function signJwt(email, privateKey) {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  const iat = Math.floor(Date.now() / 1e3);
  const exp = iat + 3600;
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat
  };
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signInput = `${base64Header}.${base64Payload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);
  const signature = sign.sign(privateKey.replace(/\\n/g, "\n"), "base64url");
  return `${signInput}.${signature}`;
}
async function getAccessToken(email, privateKey) {
  const assertion = signJwt(email, privateKey);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OAuth token fetch failed: ${err}`);
  }
  const data = await response.json();
  return data.access_token;
}
async function addEmailToGoogleSheet(email, timestamp) {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Google Service Account credentials are not configured.");
  }
  const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:A`;
  const readRes = await fetch(readUrl, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  let exists = false;
  let countAdjusted = 0;
  if (readRes.ok) {
    const data = await readRes.json();
    const rows = data.values || [];
    countAdjusted = rows.length > 0 ? rows.length - 1 : 0;
    exists = rows.some((row) => row[0] && row[0].toString().toLowerCase().trim() === email.toLowerCase().trim());
  } else {
    console.warn("Failed to read sheet for duplicates (might be empty/new).");
  }
  if (!exists) {
    const values = [];
    if (countAdjusted === 0) {
      values.push(["Email", "Timestamp"]);
    }
    values.push([email, timestamp]);
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:B:append?valueInputOption=USER_ENTERED`;
    const appendRes = await fetch(appendUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        range: "A:B",
        majorDimension: "ROWS",
        values
      })
    });
    if (!appendRes.ok) {
      const err = await appendRes.text();
      throw new Error(`Google Sheets append failed: ${err}`);
    }
    countAdjusted += 1;
  }
  return {
    success: true,
    exists,
    count: countAdjusted,
    message: exists ? "you are already on the waitlist." : "successfully joined the waitlist."
  };
}
async function getGoogleSheetCount() {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Google Service Account credentials are not configured.");
  }
  const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:A`;
  const res = await fetch(readUrl, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (!res.ok) {
    throw new Error(`Google Sheets read failed: ${await res.text()}`);
  }
  const data = await res.json();
  const rows = data.values || [];
  return rows.length > 0 ? rows.length - 1 : 0;
}
export {
  addEmailToGoogleSheet,
  getGoogleSheetCount
};
