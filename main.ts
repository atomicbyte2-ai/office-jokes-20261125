// One-Line Office Jokes — entry program.
//
// Holds a single one-line joke about office life, validates it against the
// sealed gate (UTF-8 text, 1-199 characters, single line, not only
// whitespace), then writes it to entry.txt inside MAKEFUN_OUTPUT_DIR
// (default "/output") with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The office printer has paper, ink, and power — and a personal vendetta against page two.";

// Validate the line before writing anything.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`Line must be 1-199 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line");
}
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
    throw new Error("Line must not contain control characters");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${LINE.length} characters)`);
