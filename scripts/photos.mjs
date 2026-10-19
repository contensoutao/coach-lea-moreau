#!/usr/bin/env node
/**
 * Télécharge des photos Unsplash dans public/photos/ et tient à jour les crédits.
 *
 *   node scripts/photos.mjs <slug> "<recherche>" [options]
 *   node scripts/photos.mjs --list photos.json
 *
 * Options :
 *   --pick N          prend le Nᵉ résultat au lieu du premier (défaut 1)
 *   --orientation X   landscape (défaut) | portrait | squarish
 *   --width N         largeur en pixels (défaut 1600)
 *
 * La clé vit dans ~/.secrets/unsplash.env — jamais dans le projet, jamais sur GitHub.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const KEY_FILE = path.join(os.homedir(), ".secrets", "unsplash.env");
const PHOTOS_DIR = "public/photos";
const CREDITS_FILE = "src/app/credits.json";

function loadKey() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ Clé introuvable : ${KEY_FILE}`);
    console.error("   Récupère-la sur unsplash.com/oauth/applications");
    process.exit(1);
  }
  const match = fs.readFileSync(KEY_FILE, "utf8").match(/UNSPLASH_ACCESS_KEY=(.+)/);
  if (!match) {
    console.error(`❌ ${KEY_FILE} ne contient pas UNSPLASH_ACCESS_KEY=…`);
    process.exit(1);
  }
  return match[1].trim();
}

const KEY = loadKey();
const api = (url) =>
  fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } }).then((r) => {
    if (!r.ok) throw new Error(`Unsplash a répondu ${r.status} — ${url}`);
    return r.json();
  });

async function grab(slug, query, { pick = 1, orientation = "landscape", width = 1600 } = {}) {
  const search = new URL("https://api.unsplash.com/search/photos");
  search.searchParams.set("query", query);
  search.searchParams.set("per_page", String(Math.max(pick, 10)));
  search.searchParams.set("orientation", orientation);
  search.searchParams.set("content_filter", "high");

  const { results } = await api(search);
  const photo = results?.[pick - 1];
  if (!photo) {
    console.log(`⚠️  ${slug.padEnd(16)} aucun résultat pour « ${query} »`);
    return null;
  }

  // Les règles d'Unsplash imposent de signaler le téléchargement. Ça ne coûte
  // rien et c'est ce qui garde le compte en règle pour un usage commercial.
  api(photo.links.download_location).catch(() => {});

  const src = new URL(photo.urls.raw);
  src.searchParams.set("w", String(width));
  src.searchParams.set("q", "82");
  src.searchParams.set("fm", "jpg");
  src.searchParams.set("fit", "crop");

  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  const out = path.join(PHOTOS_DIR, `${slug}.jpg`);
  const bytes = Buffer.from(await (await fetch(src)).arrayBuffer());
  fs.writeFileSync(out, bytes);

  const credit = {
    slug,
    author: photo.user.name,
    license: "Unsplash",
    // Le lien créditant le photographe : exigé par les règles d'Unsplash.
    source: `${photo.links.html}?utm_source=site_builder&utm_medium=referral`,
    alt: photo.alt_description || photo.description || query,
  };

  console.log(
    `✅ ${slug.padEnd(16)} ${(bytes.length / 1024).toFixed(0).padStart(5)} Ko  © ${credit.author}`,
  );
  return credit;
}

function saveCredits(fresh) {
  let existing = [];
  if (fs.existsSync(CREDITS_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(CREDITS_FILE, "utf8"));
    } catch {
      existing = [];
    }
  }
  const bySlug = new Map(existing.map((c) => [c.slug, c]));
  for (const c of fresh) bySlug.set(c.slug, c);
  fs.mkdirSync(path.dirname(CREDITS_FILE), { recursive: true });
  fs.writeFileSync(CREDITS_FILE, JSON.stringify([...bySlug.values()], null, 2));
  console.log(`\n${fresh.length} photo(s) · crédits à jour dans ${CREDITS_FILE}`);
}

// ---------------------------------------------------------------- CLI
const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};

const jobs = [];

if (argv[0] === "--list") {
  const list = JSON.parse(fs.readFileSync(argv[1], "utf8"));
  for (const item of list) jobs.push(item);
} else if (argv.length >= 2 && !argv[0].startsWith("--")) {
  jobs.push({
    slug: argv[0],
    query: argv[1],
    pick: Number(flag("pick", 1)),
    orientation: flag("orientation", "landscape"),
    width: Number(flag("width", 1600)),
  });
} else {
  console.error("Usage : node scripts/photos.mjs <slug> \"<recherche>\"");
  console.error("        node scripts/photos.mjs --list photos.json");
  process.exit(1);
}

const credits = [];
for (const job of jobs) {
  const c = await grab(job.slug, job.query, job);
  if (c) credits.push(c);
}
if (credits.length) saveCredits(credits);
