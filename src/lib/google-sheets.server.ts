import crypto from "node:crypto";
import process from "node:process";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "12UtKs3OC_aS9OudoECT8vlM1BOeg9iAdrUIa6UQFxaE";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

function signJwt(email: string, privateKey: string): string {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour
  
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: exp,
    iat: iat
  };
  
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  
  const signInput = `${base64Header}.${base64Payload}`;
  
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);
  const signature = sign.sign(privateKey.replace(/\\n/g, "\n"), "base64url");
  
  return `${signInput}.${signature}`;
}

async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const assertion = signJwt(email, privateKey);
  
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: assertion
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OAuth token fetch failed: ${err}`);
  }
  
  const data = await response.json() as { access_token: string };
  return data.access_token;
}

export async function addEmailToGoogleSheet(email: string, timestamp: string): Promise<{ success: boolean; exists: boolean; count: number; message: string }> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Google Service Account credentials are not configured.");
  }
  
  const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
  
  // 1. Check for duplicates by reading existing sheet rows
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:A`;
  const readRes = await fetch(readUrl, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  
  let exists = false;
  let countAdjusted = 0;
  
  if (readRes.ok) {
    const data = await readRes.json() as { values?: any[] };
    const rows = data.values || [];
    countAdjusted = rows.length > 0 ? rows.length - 1 : 0;
    
    exists = rows.some((row: any) => row[0] && row[0].toString().toLowerCase().trim() === email.toLowerCase().trim());
  } else {
    console.warn("Failed to read sheet for duplicates (might be empty/new).");
  }
  
  if (!exists) {
    // 2. Append row
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
        values: values
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
    exists: exists,
    count: countAdjusted,
    message: exists ? "you are already on the waitlist." : "successfully joined the waitlist."
  };
}

export async function getGoogleSheetCount(): Promise<number> {
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
  
  const data = await res.json() as { values?: any[] };
  const rows = data.values || [];
  return rows.length > 0 ? rows.length - 1 : 0; // Subtract header
}
