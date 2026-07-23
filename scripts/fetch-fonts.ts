import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const fontsDir = join(import.meta.dir, "../assets/fonts");

const fonts: Record<string, string> = {
  "Geist-Regular.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.ttf",
  "Geist-Medium.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-500-normal.ttf",
  "Geist-SemiBold.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-600-normal.ttf",
  "GeistMono-Regular.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.ttf",
  "GeistMono-Medium.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-500-normal.ttf",
  "Inter-Italic.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-italic.ttf",
  "Inter-MediumItalic.ttf":
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-italic.ttf",
};

async function main() {
  await mkdir(fontsDir, { recursive: true });

  for (const [file, url] of Object.entries(fonts)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}: ${response.status}`);
    }
    await Bun.write(join(fontsDir, file), await response.arrayBuffer());
    console.log(`Saved ${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
