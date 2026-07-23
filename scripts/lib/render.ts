import { Resvg } from "@resvg/resvg-js";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import satori from "satori";
import { loadFonts } from "./fonts";
import { theme } from "./theme";

const generatedDir = join(import.meta.dir, "../../generated");

export interface RenderOptions {
  height: number;
  width?: number;
  enhance?: (svg: string) => string;
}

export async function renderSection(
  name: string,
  element: ReactNode,
  options: RenderOptions,
): Promise<{ svgPath: string; pngPath: string }> {
  const width = options.width ?? theme.width;
  const fonts = await loadFonts();

  let svg = await satori(element, {
    width,
    height: options.height,
    fonts,
  });

  if (options.enhance) {
    svg = options.enhance(svg);
  }

  await mkdir(generatedDir, { recursive: true });

  const svgPath = join(generatedDir, `${name}.svg`);
  const pngPath = join(generatedDir, `${name}.png`);

  await Bun.write(svgPath, svg);

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width * 2 },
  });
  await Bun.write(pngPath, resvg.render().asPng());

  return { svgPath, pngPath };
}
