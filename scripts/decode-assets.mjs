#!/usr/bin/env node
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.name.endsWith(".b64")) out.push(p);
  }
  return out;
}

const files = await walk(join(root, "public"));
let n = 0;
for (const b64path of files) {
  const target = b64path.slice(0, -4); // strip .b64
  try {
    const existing = await stat(target);
    if (existing.size > 0) continue; // already decoded
  } catch {
    // missing — decode
  }
  const b64 = (await readFile(b64path, "utf8")).replace(/\s+/g, "");
  await writeFile(target, Buffer.from(b64, "base64"));
  n++;
  console.log("[decode-assets]", basename(target));
}
if (n === 0) console.log("[decode-assets] nothing to decode");
