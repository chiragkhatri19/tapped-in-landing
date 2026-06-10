import { DatabaseSync } from "node:sqlite";
import * as path from "node:path";
import process from "node:process";
const DB_PATH = process.env.SQLITE_DB_PATH || path.join(process.cwd(), "waitlist.db");
let db = null;
function getDb() {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
    db.exec(`
      CREATE TABLE IF NOT EXISTS waitlist (
        email TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL
      )
    `);
  }
  return db;
}
async function getWaitlistEmails() {
  try {
    const database = getDb();
    const query = database.prepare("SELECT email, timestamp FROM waitlist ORDER BY timestamp ASC");
    const results = query.all();
    return results;
  } catch (error) {
    console.error("Error reading waitlist from SQLite:", error);
    return [];
  }
}
async function saveWaitlistEmails(emails) {
  try {
    const database = getDb();
    const insertStmt = database.prepare(
      "INSERT OR IGNORE INTO waitlist (email, timestamp) VALUES (?, ?)"
    );
    for (const record of emails) {
      insertStmt.run(record.email, record.timestamp);
    }
  } catch (error) {
    console.error("Error saving waitlist to SQLite:", error);
  }
}
export {
  getWaitlistEmails,
  saveWaitlistEmails
};
