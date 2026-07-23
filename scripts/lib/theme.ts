export const theme = {
  colors: {
    background: "#111111",
    foreground: "#D8D8D8",
    muted: "#A0A0A0",
    secondary: "#161616",
    primary: "#4EC9AF",
    primarySoft: "#76D5C1",
    line: "#2D2D2D",
  },
  fonts: {
    mono: "Geist Mono",
    sans: "Geist",
    display: "Geist",
  },
  width: 720,
  radius: 0,
} as const;

export type Theme = typeof theme;
