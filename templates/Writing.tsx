import type { ReactNode } from "react";
import type { Article, ProfileContent } from "../content/profile";
import { theme } from "../scripts/lib/theme";
import {
  Cell,
  CellRow,
  CellStack,
  HatchHeader,
  space,
  Tag,
} from "./shared";

const ROW = {
  meta: 36,
  title: 44,
  summary: 52,
} as const;

export const WRITING_HEADER_HEIGHT = space.y + 36 + space.gap;
export const WRITING_ARTICLE_HEIGHT = ROW.meta + ROW.title + ROW.summary;
export const WRITING_ARTICLE_GAP = space.gap;
export const WRITING_FOOT_HEIGHT = space.y * 2;

export function writingArticleHeight(isLast: boolean): number {
  return isLast
    ? WRITING_ARTICLE_HEIGHT + WRITING_FOOT_HEIGHT
    : WRITING_ARTICLE_HEIGHT + WRITING_ARTICLE_GAP;
}

function metaCells(article: Article): ReactNode[] {
  const cells: ReactNode[] = [
    <Cell key="topic" style={{ height: ROW.meta, minHeight: ROW.meta }}>
      <Tag tone="brand">{article.topic.toUpperCase()}</Tag>
    </Cell>,
  ];

  article.tags.slice(0, 3).forEach((tag, index) => {
    cells.push(<Cell key={`sp-tag-${index}`} spacer />);
    cells.push(
      <Cell key={tag} style={{ height: ROW.meta, minHeight: ROW.meta }}>
        <Tag>{tag}</Tag>
      </Cell>,
    );
  });

  cells.push(<Cell key="sp-date" spacer />);
  cells.push(
    <Cell key="date" style={{ height: ROW.meta, minHeight: ROW.meta }}>
      <div
        style={{
          display: "flex",
          fontFamily: theme.fonts.mono,
          fontSize: 10,
          color: theme.colors.muted,
        }}
      >
        {article.published}
      </div>
    </Cell>,
  );
  return cells;
}

function ArticleBody({
  article,
  withGap,
}: {
  article: Article;
  withGap: boolean;
}) {
  return (
    <CellStack>
      <CellRow>{metaCells(article)}</CellRow>

      <CellRow>
        <Cell flex={1} style={{ height: ROW.title, minHeight: ROW.title }}>
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.sans,
              fontSize: 15,
              fontWeight: 600,
              color: theme.colors.foreground,
              letterSpacing: -0.2,
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </div>
        </Cell>
      </CellRow>

      <CellRow>
        <Cell
          flex={1}
          style={{ height: ROW.summary, minHeight: ROW.summary }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.sans,
              fontSize: 12,
              color: theme.colors.muted,
              lineHeight: 1.4,
            }}
          >
            {article.summary}
          </div>
        </Cell>
        <Cell spacer />
        <Cell style={{ height: ROW.summary, minHeight: ROW.summary }}>
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.mono,
              fontSize: 10,
              letterSpacing: 1,
              color: theme.colors.primary,
            }}
          >
            Read
          </div>
        </Cell>
      </CellRow>

      {withGap ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: space.gap,
            flexShrink: 0,
            opacity: 0,
          }}
        />
      ) : null}
    </CellStack>
  );
}

function SectionSlice({
  height,
  children,
  padTop = 0,
  padBottom = 0,
}: {
  height: number;
  children: ReactNode;
  padTop?: number;
  padBottom?: number;
}) {
  return (
    <div
      style={{
        width: theme.width,
        height,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        paddingTop: padTop,
        paddingBottom: padBottom,
        paddingLeft: space.x,
        paddingRight: space.x,
        fontFamily: theme.fonts.sans,
      }}
    >
      {children}
    </div>
  );
}

export function WritingHeader({ content }: { content: ProfileContent }) {
  return (
    <SectionSlice height={WRITING_HEADER_HEIGHT} padTop={space.y}>
      <HatchHeader
        trailing={
          <div
            style={{
              display: "flex",
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              color: theme.colors.muted,
            }}
          >
            {content.articles.length} pieces
          </div>
        }
      >
        Writing
      </HatchHeader>
    </SectionSlice>
  );
}

export function WritingArticle({
  article,
  isLast = false,
}: {
  article: Article;
  isLast?: boolean;
}) {
  return (
    <SectionSlice
      height={writingArticleHeight(isLast)}
      padBottom={isLast ? WRITING_FOOT_HEIGHT : 0}
    >
      <ArticleBody article={article} withGap={!isLast} />
    </SectionSlice>
  );
}
