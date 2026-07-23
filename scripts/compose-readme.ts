import { join } from "node:path";
import type { ProfileContent } from "../content/profile";
import { LINK_WIDTH } from "../templates/Footer";
import { theme } from "./lib/theme";

const root = join(import.meta.dir, "..");

export async function composeReadme(content: ProfileContent): Promise<void> {
  const { links, articles, identity } = content;
  const width = theme.width;

  const articleBlocks = articles
    .map(
      (article, index) => `<div align="center">
  <a href="${article.url}"><img src="./generated/writing-${index}.svg" width="${width}" alt="${article.title}" /></a>
</div>`,
    )
    .join("\n\n");

  const readme = `<div align="center">
  <img src="./generated/hero.svg" width="${width}" alt="${identity.name} · ${identity.title}" />
</div>

<div align="center">
  <img src="./generated/stack.svg" width="${width}" alt="Tech stack" />
</div>

<div align="center">
  <img src="./generated/exploring.svg" width="${width}" alt="Exploring" />
</div>

<div align="center">
  <img src="./generated/projects.svg" width="${width}" alt="Selected projects" />
</div>

<div align="center">
  <img src="./generated/contributions.svg" width="${width}" alt="GitHub contributions" />
</div>

<div align="center">
  <img src="./generated/writing-header.svg" width="${width}" alt="Writing" />
</div>

${articleBlocks}

<div align="center">
  <a href="${links.github}"><img src="./generated/link-github.svg" width="${LINK_WIDTH}" alt="GitHub" /></a><a href="${links.linkedin}"><img src="./generated/link-linkedin.svg" width="${LINK_WIDTH}" alt="LinkedIn" /></a><a href="${links.medium}"><img src="./generated/link-medium.svg" width="${LINK_WIDTH}" alt="Medium" /></a><a href="${links.email}"><img src="./generated/link-email.svg" width="${LINK_WIDTH}" alt="Email" /></a>
</div>
`;

  await Bun.write(join(root, "README.md"), readme);
}
