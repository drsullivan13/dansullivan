import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, the bundled output is at dist/index.cjs
  // and static files are at dist/public/
  // Use the directory of the executed script (works with bundled output)
  const scriptDir = path.dirname(process.argv[1]);
  const distPath = path.resolve(scriptDir, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
