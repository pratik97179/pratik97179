import type { ProfileContent } from "../content/profile";
import { theme } from "../scripts/lib/theme";
import { Cell, CellRow, CellStack, Frame, space } from "./shared";

const NAME_H = 40;
const TITLE_H = 78;
const TAGLINE_H = 44;

export const HERO_HEIGHT = space.y + NAME_H + TITLE_H + TAGLINE_H + space.y;

export function Hero({ content }: { content: ProfileContent }) {
  const { identity } = content;
  const { tagline } = identity;

  return (
    <Frame height={HERO_HEIGHT}>
      <CellStack>
        <CellRow>
          <Cell style={{ height: NAME_H, minHeight: NAME_H }}>
            <div
              style={{
                display: "flex",
                fontFamily: theme.fonts.mono,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: 2.2,
                color: theme.colors.primary,
              }}
            >
              {identity.name}
            </div>
          </Cell>
        </CellRow>

        <CellRow>
          <Cell
            pad={false}
            style={{
              height: TITLE_H,
              minHeight: TITLE_H,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingTop: space.cellY,
              paddingBottom: space.cellY,
              paddingLeft: space.cellX,
              paddingRight: space.cellX,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: theme.fonts.display,
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: -0.8,
                color: theme.colors.foreground,
                lineHeight: 1.125,
                height: 36,
              }}
            >
              {identity.title}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: 14,
                marginTop: 8,
                fontFamily: theme.fonts.mono,
                fontSize: 11,
                letterSpacing: 0.8,
                color: theme.colors.muted,
              }}
            >
              <span>{identity.location}</span>
              <span
                style={{
                  marginLeft: space.gap / 2,
                  marginRight: space.gap / 2,
                }}
              >
                ·
              </span>
              <span>{identity.yearsExperience} yrs experience</span>
            </div>
          </Cell>
        </CellRow>

        <CellRow>
          <Cell>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "baseline",
                maxWidth: 580,
              }}
            >
              <span
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: 16,
                  color: theme.colors.muted,
                  whiteSpace: "pre-wrap",
                }}
              >
                {tagline.before}
              </span>
              <span
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.colors.foreground,
                  whiteSpace: "pre-wrap",
                }}
              >
                {` ${tagline.emphasis}`}
              </span>
              <span
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: 16,
                  color: theme.colors.muted,
                  whiteSpace: "pre-wrap",
                }}
              >
                {tagline.middle}
              </span>
              <span
                style={{
                  fontFamily: theme.fonts.sans,
                  fontSize: 16,
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: theme.colors.primary,
                  whiteSpace: "pre-wrap",
                }}
              >
                {tagline.contrast}
              </span>
            </div>
          </Cell>
        </CellRow>
      </CellStack>
    </Frame>
  );
}
