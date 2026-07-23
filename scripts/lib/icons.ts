import { Resvg } from "@resvg/resvg-js";

const cache = new Map<string, ArrayBuffer>();

function tintSvg(svg: string, color: string): string {
  const hex = color.startsWith("#") ? color : `#${color}`;
  if (/\bfill="/i.test(svg)) {
    return svg.replace(/\bfill="(?!none)[^"]*"/gi, `fill="${hex}"`);
  }
  return svg.replace(/<svg\b/i, `<svg fill="${hex}"`);
}

async function fetchIconSvg(slug: string): Promise<string> {
  const urls = [
    `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`,
    `https://raw.githubusercontent.com/simple-icons/simple-icons/11.14.0/icons/${slug}.svg`,
  ];

  let lastError: unknown;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status} for ${url}`);
        continue;
      }
      return await response.text();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`Icon fetch failed for ${slug}`);
}

export function iconDataUrl(buffer: ArrayBuffer): string {
  return `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
}

export async function loadTechIcon(
  slug: string,
  color = "D8D8D8",
  size = 96,
): Promise<ArrayBuffer> {
  const key = `${slug}:${color}:${size}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const svg = tintSvg(await fetchIconSvg(slug), color);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  });
  const png = resvg.render().asPng();
  const buffer = png.buffer.slice(
    png.byteOffset,
    png.byteOffset + png.byteLength,
  ) as ArrayBuffer;

  cache.set(key, buffer);
  return buffer;
}

export async function loadTechIcons(
  items: Array<{ name: string; icon: string }>,
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    items.map(async (item) => {
      try {
        const data = await loadTechIcon(item.icon);
        return [item.name, iconDataUrl(data)] as const;
      } catch (error) {
        console.warn(`Skipping icon ${item.icon}:`, error);
        return null;
      }
    }),
  );

  const map: Record<string, string> = {};
  for (const entry of entries) {
    if (entry) map[entry[0]] = entry[1];
  }
  return map;
}
