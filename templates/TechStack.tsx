import type { ProfileContent } from "../content/profile";
import { theme } from "../scripts/lib/theme";
import { CellStack, Frame, HatchHeader, space } from "./shared";

/**
 * README SVGs are a fixed canvas that GitHub scales down on phones.
 * Use 2 columns (portfolio mobile breakpoint) so cells stay readable when scaled.
 */
const COLS = 2;

const contentW = theme.width - space.x * 2;
const cellW = contentW / COLS;
const icon = Math.round(cellW * 0.14);
const cellH = space.y + icon + space.y;
const plusSize = space.gap * 2;
const plusOffset = -space.gap;

const FILL = theme.colors.secondary;
const PLUS = "#505050";

export function techStackHeight(itemCount: number): number {
  const rows = Math.max(1, Math.ceil(itemCount / COLS));
  return space.y + 36 + space.gap + cellH * rows + space.y;
}

function cellChrome(index: number, total: number) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const rows = Math.ceil(total / COLS);
  const lastRow = row === rows - 1;
  const lastCol = col === COLS - 1;

  return {
    borderRight: !lastCol,
    borderBottom: !lastRow,
    fill: (row + col) % 2 === 0,
    plusBr: !lastCol && !lastRow && (row + col) % 2 === 0,
  };
}

function PlusNode() {
  return (
    <div
      style={{
        position: "absolute",
        right: plusOffset,
        bottom: plusOffset,
        width: plusSize,
        height: plusSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: theme.fonts.mono,
        fontSize: plusSize,
        lineHeight: 1,
        color: PLUS,
      }}
    >
      +
    </div>
  );
}

function TechCard({
  index,
  total,
  iconSrc,
}: {
  index: number;
  total: number;
  iconSrc?: string;
}) {
  const chrome = cellChrome(index, total);
  const line = `1px solid ${theme.colors.line}`;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: cellW,
        height: cellH,
        backgroundColor: chrome.fill ? FILL : theme.colors.background,
        borderRight: chrome.borderRight ? line : "1px solid transparent",
        borderBottom: chrome.borderBottom ? line : "1px solid transparent",
      }}
    >
      {iconSrc ? (
        <img src={iconSrc} width={icon} height={icon} />
      ) : (
        <div
          style={{ display: "flex", width: icon, height: icon, opacity: 0 }}
        />
      )}
      {chrome.plusBr ? <PlusNode /> : null}
    </div>
  );
}

export function TechStack({
  content,
  icons,
}: {
  content: ProfileContent;
  icons: Record<string, string>;
}) {
  const items = content.stack;
  const height = techStackHeight(items.length);

  return (
    <Frame height={height}>
      <CellStack>
        <HatchHeader>Stack</HatchHeader>
      </CellStack>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: contentW,
          borderTop: `1px solid ${theme.colors.line}`,
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: contentW,
          }}
        >
          {items.map((item, index) => (
            <TechCard
              key={item.name}
              index={index}
              total={items.length}
              iconSrc={icons[item.name]}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}
