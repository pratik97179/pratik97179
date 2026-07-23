import type { ReactNode } from "react";
import type { ProfileContent } from "../content/profile";
import { theme } from "../scripts/lib/theme";
import { Cell, CellRow, CellStack, Frame, HatchHeader, space } from "./shared";

export const EXPLORING_HEIGHT = 36 + space.gap + 36 + space.y * 2;

export function Exploring({ content }: { content: ProfileContent }) {
  const itemCells: ReactNode[] = [];

  content.exploring.forEach((item, index) => {
    if (index > 0) itemCells.push(<Cell key={`sp-${index}`} spacer />);
    itemCells.push(
      <Cell key={item}>
        <div
          style={{
            display: "flex",
            fontFamily: theme.fonts.sans,
            fontSize: 14,
            fontWeight: 500,
            color: theme.colors.foreground,
          }}
        >
          {item}
        </div>
      </Cell>,
    );
  });

  return (
    <Frame height={EXPLORING_HEIGHT}>
      <CellStack>
        <HatchHeader>Exploring</HatchHeader>
        <CellRow>{itemCells}</CellRow>
      </CellStack>
    </Frame>
  );
}
