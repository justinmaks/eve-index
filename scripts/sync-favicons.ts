import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const publicDirectory = path.resolve("public");
const listingFiles = await fg("src/content/sites/*.md");

function warn(listing: string, reason: string) {
  console.warn(`Warning: ${listing}: ${reason}`);
}

for (const filePath of listingFiles) {
  const defaultListing = path.basename(filePath, ".md");

  try {
    const { data } = matter(await readFile(filePath, "utf8"));
    const listing = typeof data.name === "string" ? data.name : defaultListing;
    const { favicon, faviconSource } = data;

    if (favicon === undefined && faviconSource === undefined) continue;

    if (typeof favicon !== "string" || typeof faviconSource !== "string") {
      warn(listing, "invalid favicon record");
      continue;
    }

    const destination = path.resolve(publicDirectory, `.${favicon}`);
    if (
      !favicon.startsWith("/") ||
      destination === publicDirectory ||
      !destination.startsWith(`${publicDirectory}${path.sep}`)
    ) {
      warn(listing, "invalid favicon path");
      continue;
    }

    let source: URL;
    try {
      source = new URL(faviconSource);
    } catch {
      warn(listing, "invalid favicon source");
      continue;
    }

    if (source.protocol !== "https:" && source.protocol !== "http:") {
      warn(listing, "invalid favicon source");
      continue;
    }

    let response: Response;
    try {
      response = await fetch(source);
    } catch {
      warn(listing, "favicon fetch failed");
      continue;
    }

    if (!response.ok) {
      warn(listing, `favicon fetch failed (${response.status})`);
      continue;
    }

    try {
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, new Uint8Array(await response.arrayBuffer()));
    } catch {
      warn(listing, "favicon write failed");
    }
  } catch {
    warn(defaultListing, "invalid content record");
  }
}
