import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "@neondatabase/serverless",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = await Bun.file("package.json").json();
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  const result = await Bun.build({
    entrypoints: ["./server/index.ts"],
    outdir: "./dist",
    target: "node",
    format: "cjs",
    naming: "index.cjs",
    minify: true,
    external: externals,
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    sourcemap: "external",
  });

  if (!result.success) {
    console.error("Server build failed:");
    for (const log of result.logs) {
      console.error(log);
    }
    process.exit(1);
  }

  console.log(`  dist/index.cjs  ${(result.outputs[0]?.size / 1024).toFixed(1)}kb`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
