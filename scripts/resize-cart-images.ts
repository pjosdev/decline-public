import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const PROJECT_ROOT = process.cwd();

const TARGETS = [
  {
    sourceDir: path.join(PROJECT_ROOT, "src/assets/products/mens/3-4"),
    outputDir: path.join(PROJECT_ROOT, "src/assets/products/mens/cart"),
  },
  {
    sourceDir: path.join(PROJECT_ROOT, "src/assets/products/womens/3-4"),
    outputDir: path.join(PROJECT_ROOT, "src/assets/products/womens/cart"),
  },
];

function runFfmpeg(inputPath: string, outputPath: string) {
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      inputPath,
      "-vf",
      "scale=400:-2",
      "-c:v",
      "libwebp",
      "-q:v",
      "82",
      outputPath,
    ],
    { stdio: "pipe" },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `ffmpeg failed for ${path.basename(inputPath)}: ${result.stderr.toString()}`,
    );
  }
}

async function resizeDirectory(
  sourceDir: string,
  outputDir: string,
): Promise<number> {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const webpFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".webp"))
    .map((entry) => entry.name)
    .sort();

  for (const filename of webpFiles) {
    const inputPath = path.join(sourceDir, filename);
    const outputPath = path.join(outputDir, filename);
    runFfmpeg(inputPath, outputPath);
  }

  return webpFiles.length;
}

async function main() {
  const ffmpegCheck = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
  if (ffmpegCheck.status !== 0) {
    throw new Error("ffmpeg is not installed or not available in PATH");
  }

  let total = 0;

  for (const target of TARGETS) {
    const count = await resizeDirectory(target.sourceDir, target.outputDir);
    total += count;
    console.log(`Resized ${count} images -> ${path.relative(PROJECT_ROOT, target.outputDir)}`);
  }

  console.log(`Done. Generated ${total} cart images at 400px width.`);
}

main().catch((error) => {
  console.error("Failed to generate cart images:", error);
  process.exit(1);
});
