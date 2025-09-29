import fs from "node:fs";
import path from "node:path";

export function cleanDist() {
  const distPath = path.resolve("./dist");
  if (!distPath) return;
  fs.rmSync(distPath, { recursive: true, force: true });
}
