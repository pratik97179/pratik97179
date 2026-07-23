import type { ReactNode } from "react";
import type {
  ProfileContent,
  Project,
  ProjectStatus,
} from "../content/profile";
import { theme } from "../scripts/lib/theme";
import { Cell, CellRow, CellStack, Frame, HatchHeader, space } from "./shared";

const BLOCK = 36 + 52 + 36;

export function projectsHeight(count: number): number {
  const gaps = Math.max(0, count - 1);
  return 36 + space.gap + BLOCK * count + space.gap * gaps + space.y * 2;
}

const statusColor: Record<ProjectStatus, string> = {
  wip: theme.colors.primary,
  done: theme.colors.muted,
  archived: theme.colors.muted,
};

function techCells(technologies: string[]): ReactNode[] {
  const cells: ReactNode[] = [];
  technologies.forEach((tech, index) => {
    if (index > 0) cells.push(<Cell key={`sp-${tech}`} spacer />);
    cells.push(
      <Cell key={tech}>
        <div
          style={{
            display: "flex",
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            color: theme.colors.muted,
          }}
        >
          {tech}
        </div>
      </Cell>,
    );
  });
  return cells;
}

function ProjectBlock({
  project,
  isLast,
}: {
  project: Project;
  isLast: boolean;
}) {
  return (
    <CellStack style={isLast ? undefined : { marginBottom: space.gap }}>
      <CellRow>
        <Cell>
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.sans,
              fontSize: 16,
              fontWeight: 600,
              color: theme.colors.foreground,
            }}
          >
            {project.name}
          </div>
        </Cell>
        <Cell spacer />
        <Cell>
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.mono,
              fontSize: 10,
              letterSpacing: 1.4,
              color: statusColor[project.status],
            }}
          >
            {project.status.toUpperCase()}
          </div>
        </Cell>
      </CellRow>

      <CellRow>
        <Cell flex={1}>
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.sans,
              fontSize: 13,
              color: theme.colors.muted,
              lineHeight: 1.45,
            }}
          >
            {project.description}
          </div>
        </Cell>
      </CellRow>

      <CellRow>{techCells(project.technologies)}</CellRow>
    </CellStack>
  );
}

export function Projects({ content }: { content: ProfileContent }) {
  const last = content.projects.length - 1;
  return (
    <Frame height={projectsHeight(content.projects.length)}>
      <HatchHeader>Projects</HatchHeader>
      {content.projects.map((project, index) => (
        <ProjectBlock
          key={project.name}
          project={project}
          isLast={index === last}
        />
      ))}
    </Frame>
  );
}
