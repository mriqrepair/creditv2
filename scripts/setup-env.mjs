#!/usr/bin/env node
/**
 * Pull Supabase secret key and sync to .env.local + Vercel.
 * Requires Supabase CLI logged into the project account, or SUPABASE_ACCESS_TOKEN.
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/setup-env.mjs
 *   # or after `supabase login`:
 *   node scripts/setup-env.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const projectRef = "xdqswjetcpfejckraeve";
const vercelScope = "usemriqapp-6230s-projects";

function getApiKeys() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  if (token) {
    const res = execSync(
      `curl -s "https://api.supabase.com/v1/projects/${projectRef}/api-keys?reveal=true" -H "Authorization: Bearer ${token}"`,
      { encoding: "utf8" }
    );
    const data = JSON.parse(res);
    if (data.message) throw new Error(data.message);
    return data;
  }

  const raw = execSync(
    `supabase projects api-keys --project-ref ${projectRef} --reveal -o json`,
    { encoding: "utf8" }
  );
  return JSON.parse(raw);
}

function findSecretKey(keys) {
  const list = Array.isArray(keys) ? keys : keys.keys ?? keys;
  return (
    list.find((k) => k.name === "service_role")?.api_key ??
    list.find((k) => k.type === "secret" || k.name === "default")?.api_key ??
    list.find((k) => String(k.api_key ?? k.token ?? "").startsWith("sb_secret_"))
      ?.api_key
  );
}

const keys = getApiKeys();
const secretKey = findSecretKey(keys);

if (!secretKey) {
  console.error("Could not find Supabase secret/service_role key.");
  process.exit(1);
}

const envPath = join(root, ".env.local");
let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

if (/^SUPABASE_SERVICE_ROLE_KEY=.*$/m.test(content)) {
  content = content.replace(
    /^SUPABASE_SERVICE_ROLE_KEY=.*$/m,
    `SUPABASE_SERVICE_ROLE_KEY=${secretKey}`
  );
} else {
  content += `\nSUPABASE_SERVICE_ROLE_KEY=${secretKey}\n`;
}

writeFileSync(envPath, content);
console.log("Updated .env.local with SUPABASE_SERVICE_ROLE_KEY");

for (const target of ["production", "preview", "development"]) {
  execSync(
    `printf '%s\\n' '${secretKey.replace(/'/g, "'\\''")}' | vercel env add SUPABASE_SERVICE_ROLE_KEY ${target} --scope ${vercelScope} --yes`,
    { stdio: "inherit", cwd: root }
  );
}

console.log("Added SUPABASE_SERVICE_ROLE_KEY to Vercel (production, preview, development)");
