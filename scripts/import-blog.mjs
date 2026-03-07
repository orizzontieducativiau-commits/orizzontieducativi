#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import readline from "readline";
import os from "os";

const PROJECT_ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  ".."
);
const CONTENT_DIR = path.join(PROJECT_ROOT, "content/blog");
const IMAGES_DIR = path.join(PROJECT_ROOT, "public/images/blog");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
]);

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function findFiles(dir) {
  const results = { markdown: null, images: [] };

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      // Skip macOS metadata and hidden files
      if (entry.name.startsWith(".") || entry.name === "__MACOSX") continue;

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        if (!results.markdown) results.markdown = fullPath;
      } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        results.images.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

function extractTitle(markdownContent) {
  // Look for first H1 heading
  const h1Match = markdownContent.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();

  // Fallback: first non-empty line
  const lines = markdownContent.split("\n").filter((l) => l.trim());
  return lines.length > 0 ? lines[0].trim() : "Titolo da compilare";
}

function updateImagePaths(content, slug, imageFiles) {
  let updated = content;

  for (const imgPath of imageFiles) {
    const filename = path.basename(imgPath);
    const newPath = `/images/blog/${slug}/${filename}`;

    // Replace markdown image references: ![alt](old-path/filename)
    // Match any relative path ending with this filename
    const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `(!\\[[^\\]]*\\]\\()([^)]*${escapedFilename})(\\))`,
      "g"
    );
    updated = updated.replace(regex, `$1${newPath}$3`);
  }

  return updated;
}

function removeH1(content) {
  // Remove first H1 since it becomes the frontmatter title
  return content.replace(/^#\s+.+\n*/m, "");
}

async function main() {
  const zipPath = process.argv[2];

  if (!zipPath) {
    console.error("\n  Uso: node scripts/import-blog.mjs <percorso-file.zip>\n");
    process.exit(1);
  }

  const resolvedZip = path.resolve(zipPath);
  if (!fs.existsSync(resolvedZip)) {
    console.error(`\n  File non trovato: ${resolvedZip}\n`);
    process.exit(1);
  }

  console.log("\n  Importatore Articoli Blog");
  console.log("  ========================\n");
  console.log(`  ZIP: ${resolvedZip}\n`);

  // Ask for slug
  const slug = await ask("  Inserisci lo slug dell'articolo: ");

  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.error(
      '\n  Slug non valido. Usa solo lettere minuscole, numeri e trattini (es. "il-mio-articolo").\n'
    );
    process.exit(1);
  }

  // Check if slug already exists
  const mdxTarget = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdxTarget)) {
    console.error(
      `\n  Esiste già un articolo con slug "${slug}" in content/blog/.\n`
    );
    process.exit(1);
  }

  // Extract ZIP to temp directory
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-import-"));

  try {
    console.log("\n  Estrazione ZIP...");
    execSync(`unzip -q -o "${resolvedZip}" -d "${tmpDir}"`);

    // Find markdown and images
    const files = findFiles(tmpDir);

    if (!files.markdown) {
      console.error("\n  Nessun file .md trovato nello ZIP.\n");
      process.exit(1);
    }

    console.log(`  Trovato markdown: ${path.basename(files.markdown)}`);
    console.log(`  Trovate ${files.images.length} immagini`);

    // Read markdown content
    let markdownContent = fs.readFileSync(files.markdown, "utf-8");

    // Extract title from H1
    const title = extractTitle(markdownContent);
    console.log(`  Titolo estratto: "${title}"`);

    // Remove H1 from content (will be in frontmatter)
    markdownContent = removeH1(markdownContent);

    // Copy images
    const imagesTarget = path.join(IMAGES_DIR, slug);
    if (files.images.length > 0) {
      fs.mkdirSync(imagesTarget, { recursive: true });
      for (const imgPath of files.images) {
        const filename = path.basename(imgPath);
        const dest = path.join(imagesTarget, filename);
        fs.copyFileSync(imgPath, dest);
      }
      console.log(`  Immagini copiate in: public/images/blog/${slug}/`);
    }

    // Update image paths in markdown
    markdownContent = updateImagePaths(markdownContent, slug, files.images);

    // Determine cover image (first image found, if any)
    const coverImage =
      files.images.length > 0
        ? `/images/blog/${slug}/${path.basename(files.images[0])}`
        : "/images/blog/placeholder.jpg";

    // Build frontmatter
    const today = new Date().toISOString().split("T")[0];
    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "DA COMPILARE"
slug: "${slug}"
date: "${today}"
image: "${coverImage}"
tags: []
---

${markdownContent.trim()}
`;

    // Write MDX file
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    fs.writeFileSync(mdxTarget, mdxContent, "utf-8");

    // Summary
    console.log("\n  ========================");
    console.log("  Importazione completata!");
    console.log("  ========================\n");
    console.log(`  Articolo:  content/blog/${slug}.mdx`);
    if (files.images.length > 0) {
      console.log(`  Immagini:  public/images/blog/${slug}/ (${files.images.length} file)`);
    }
    console.log(`\n  DA FARE: apri content/blog/${slug}.mdx e compila:`);
    console.log(`    - description: "..."  (breve descrizione per la card)`);
    console.log(`    - tags: ["...", "..."]  (tag dell'articolo)`);
    console.log(`    - image: "..."  (verifica immagine di copertina)`);
    console.log("");
  } finally {
    // Cleanup temp directory
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("\n  Errore:", err.message, "\n");
  process.exit(1);
});
