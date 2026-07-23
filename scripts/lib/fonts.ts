import { join } from "node:path";
import type { Font } from "satori";

const fontsDir = join(import.meta.dir, "../../assets/fonts");

async function load(file: string): Promise<ArrayBuffer> {
  return Bun.file(join(fontsDir, file)).arrayBuffer();
}

let cache: Font[] | null = null;

export async function loadFonts(): Promise<Font[]> {
  if (cache) return cache;

  const [
    geistRegular,
    geistMedium,
    geistSemiBold,
    monoRegular,
    monoMedium,
    interItalic,
    interMediumItalic,
  ] = await Promise.all([
    load("Geist-Regular.ttf"),
    load("Geist-Medium.ttf"),
    load("Geist-SemiBold.ttf"),
    load("GeistMono-Regular.ttf"),
    load("GeistMono-Medium.ttf"),
    load("Inter-Italic.ttf"),
    load("Inter-MediumItalic.ttf"),
  ]);

  cache = [
    { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
    { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
    { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
    { name: "Geist Mono", data: monoRegular, weight: 400, style: "normal" },
    { name: "Geist Mono", data: monoMedium, weight: 500, style: "normal" },
    { name: "Inter", data: interItalic, weight: 400, style: "italic" },
    { name: "Inter", data: interMediumItalic, weight: 500, style: "italic" },
  ];

  return cache;
}
