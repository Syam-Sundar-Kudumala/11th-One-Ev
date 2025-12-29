import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

console.log("🔍 DATABASE_URL =", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing (injected via npm script)");
}

const sqlite = new Database(
  process.env.DATABASE_URL.replace("file:", "")
);

export const db = drizzle(sqlite);
