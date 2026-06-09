import { DatabaseSync } from "node:sqlite";
import * as path from "node:path";
import process from "node:process";

const DB_PATH = process.env.SQLITE_DB_PATH || path.join(process.cwd(), "waitlist.db");

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
    // Initialize schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS waitlist (
        email TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL
      )
    `);
  }
  return db;
}

export interface WaitlistRecord {
  email: string;
  timestamp: string;
}

// Helper to safely read waitlist emails from the SQLite DB
export async function getWaitlistEmails(): Promise<WaitlistRecord[]> {
  try {
    const database = getDb();
    const query = database.prepare("SELECT email, timestamp FROM waitlist ORDER BY timestamp ASC");
    const results = query.all() as { email: string; timestamp: string }[];
    return results;
  } catch (error) {
    console.error("Error reading waitlist from SQLite:", error);
    return [];
  }
}

// Helper to save waitlist emails to the SQLite DB
export async function saveWaitlistEmails(emails: WaitlistRecord[]) {
  try {
    const database = getDb();
    const insertStmt = database.prepare(
      "INSERT OR IGNORE INTO waitlist (email, timestamp) VALUES (?, ?)",
    );
    for (const record of emails) {
      insertStmt.run(record.email, record.timestamp);
    }
  } catch (error) {
    console.error("Error saving waitlist to SQLite:", error);
  }
}
