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

// Validate the line before writing anything. The gate counts characters,
// not bytes: the em dash in the line is one character but three UTF-8 bytes,
// so the byte count of entry.txt will be larger than the character count.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`Line must be 1-199 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line");
}
// Reject every control character (including tab and DEL) — a joke has no
// business containing one, and the gate requires plain UTF-8 text.
for (const ch of LINE) {
  const code = ch.charCodeAt(0);
  if (code < 0x20 || code === 0x7f) {
    throw new Error(`Line must not contain control characters (U+${code.toString(16).padStart(4, "0")})`);
  }
}
// Confirm the line survives a UTF-8 round trip unchanged.
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("Line is not valid UTF-8 text");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote entry.txt (${LINE.length} characters)`);
