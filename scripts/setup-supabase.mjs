#!/usr/bin/env node
/**
 * Apply supabase/schema.sql using DATABASE_URL from .env.local
 * Usage: node scripts/setup-supabase.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

function loadEnv() {
  if (!existsSync(envPath)) {
    throw new Error(".env.local not found");
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return env;
}

const env = loadEnv();
const connectionString = env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL missing in .env.local");
}

const sql = readFileSync(join(root, "supabase/schema.sql"), "utf8");
const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  const { rows } = await client.query(
    "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename"
  );
  console.log("Schema applied. Tables:", rows.map((r) => r.tablename).join(", "));
} catch (error) {
  console.error("Schema setup failed:", error.message);
  console.error(
    "If DNS fails, paste supabase/schema.sql into the Supabase SQL Editor and run it manually."
  );
  process.exit(1);
} finally {
  await client.end();
}
