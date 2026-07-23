import { theme } from "../scripts/lib/theme";
import { space } from "./shared";

export const LINK_HEIGHT = 36;
export const LINK_WIDTH = Math.floor((theme.width - space.x * 2) / 4);
const LABEL_SIZE = 13;

export function LinkChip({ label }: { label: string }) {
  return (
    <div
      style={{
        width: LINK_WIDTH,
        height: LINK_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          border: `1px solid ${theme.colors.line}`,
          backgroundColor: theme.colors.background,
          marginLeft: -1,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: theme.fonts.mono,
            fontSize: LABEL_SIZE,
            letterSpacing: 1.1,
            color: theme.colors.primary,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
