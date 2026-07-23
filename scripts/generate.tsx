import { profile } from "../content/profile";
import {
  Contributions,
  CONTRIBUTIONS_HEIGHT,
} from "../templates/Contributions";
import { Exploring, EXPLORING_HEIGHT } from "../templates/Exploring";
import { LINK_HEIGHT, LINK_WIDTH, LinkChip } from "../templates/Footer";
import { Hero, HERO_HEIGHT } from "../templates/Hero";
import { Projects, projectsHeight } from "../templates/Projects";
import { techStackHeight, TechStack } from "../templates/TechStack";
import {
  WritingArticle,
  WritingHeader,
  WRITING_HEADER_HEIGHT,
  writingArticleHeight,
} from "../templates/Writing";
import { composeReadme } from "./compose-readme";
import { fetchContributions } from "./lib/github";
import { loadTechIcons } from "./lib/icons";
import { renderSection } from "./lib/render";

async function main() {
  const started = performance.now();
  const [contributions, icons] = await Promise.all([
    fetchContributions(profile.githubUsername),
    loadTechIcons(profile.stack),
  ]);

  await Promise.all([
    renderSection("hero", <Hero content={profile} />, {
      height: HERO_HEIGHT,
    }),
    renderSection("stack", <TechStack content={profile} icons={icons} />, {
      height: techStackHeight(profile.stack.length),
    }),
    renderSection("exploring", <Exploring content={profile} />, {
      height: EXPLORING_HEIGHT,
    }),
    renderSection("projects", <Projects content={profile} />, {
      height: projectsHeight(profile.projects.length),
    }),
    renderSection("contributions", <Contributions data={contributions} />, {
      height: CONTRIBUTIONS_HEIGHT,
    }),
    renderSection("writing-header", <WritingHeader content={profile} />, {
      height: WRITING_HEADER_HEIGHT,
    }),
    ...profile.articles.map((article, index) => {
      const isLast = index === profile.articles.length - 1;
      return renderSection(
        `writing-${index}`,
        <WritingArticle article={article} isLast={isLast} />,
        { height: writingArticleHeight(isLast) },
      );
    }),
    renderSection("link-github", <LinkChip label="GitHub" />, {
      height: LINK_HEIGHT,
      width: LINK_WIDTH,
    }),
    renderSection("link-linkedin", <LinkChip label="LinkedIn" />, {
      height: LINK_HEIGHT,
      width: LINK_WIDTH,
    }),
    renderSection("link-medium", <LinkChip label="Medium" />, {
      height: LINK_HEIGHT,
      width: LINK_WIDTH,
    }),
    renderSection("link-email", <LinkChip label="Email" />, {
      height: LINK_HEIGHT,
      width: LINK_WIDTH,
    }),
  ]);

  await composeReadme(profile);

  const ms = Math.round(performance.now() - started);
  console.log(
    `Generated profile assets + README in ${ms}ms (${contributions.total} contributions, ${Object.keys(icons).length} icons)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
