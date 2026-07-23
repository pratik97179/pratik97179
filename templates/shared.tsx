import type { CSSProperties, ReactNode } from "react";
import { theme } from "../scripts/lib/theme";

export const space = {
  x: 32,
  y: 16,
  gap: 12,
  cellY: 10,
  cellX: 12,
} as const;

export function Frame({
  children,
  height,
}: {
  children: ReactNode;
  height: number;
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
        paddingTop: space.y,
        paddingBottom: space.y,
        paddingLeft: space.x,
        paddingRight: space.x,
        fontFamily: theme.fonts.sans,
      }}
    >
      {children}
    </div>
  );
}

export function CellRow({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
        marginBottom: -1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Cell({
  children,
  flex,
  width,
  minWidth,
  spacer = false,
  align = "flex-start",
  pad = true,
  style,
}: {
  children?: ReactNode;
  flex?: number;
  width?: number | string;
  minWidth?: number;
  spacer?: boolean;
  align?: "flex-start" | "center" | "flex-end";
  pad?: boolean;
  style?: CSSProperties;
}) {
  if (spacer) {
    const gap: CSSProperties = {
      display: "flex",
      flexShrink: 0,
      width: width ?? space.gap,
      height: 1,
      opacity: 0,
    };
    if (typeof flex === "number") gap.flex = flex;
    return <div style={{ ...gap, ...style }} />;
  }

  const box: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: align,
    border: `1px solid ${theme.colors.line}`,
    marginLeft: -1,
    backgroundColor: theme.colors.background,
    paddingTop: !pad ? 0 : space.cellY,
    paddingBottom: !pad ? 0 : space.cellY,
    paddingLeft: !pad ? 0 : space.cellX,
    paddingRight: !pad ? 0 : space.cellX,
    minHeight: 36,
  };

  if (typeof flex === "number") box.flex = flex;
  if (width !== undefined) box.width = width;
  if (minWidth !== undefined) box.minWidth = minWidth;

  return (
    <div style={{ ...box, ...style }}>
      {children ?? (
        <div style={{ display: "flex", width: 1, height: 1, opacity: 0 }} />
      )}
    </div>
  );
}

export function CellStack({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  const text =
    typeof children === "string" ? children.toUpperCase() : children;
  return (
    <div
      style={{
        display: "flex",
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 1.8,
        color: theme.colors.muted,
      }}
    >
      {text}
    </div>
  );
}

export function HatchHeader({
  children,
  trailing,
}: {
  children: ReactNode;
  trailing?: ReactNode;
}) {
  const cells: ReactNode[] = [
    <Cell key="title">
      <SectionLabel>{children}</SectionLabel>
    </Cell>,
  ];

  if (trailing) {
    cells.push(<Cell key="sp" spacer width={space.gap} />);
    cells.push(
      <Cell key="trail" align="flex-end">
        {trailing}
      </Cell>,
    );
  }

  return (
    <CellStack style={{ marginBottom: space.gap }}>
      <CellRow>{cells}</CellRow>
    </CellStack>
  );
}

export function Tag({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <div
      style={{
        display: "flex",
        fontFamily: theme.fonts.mono,
        fontSize: 10,
        letterSpacing: 1.2,
        color: brand ? theme.colors.primary : theme.colors.muted,
      }}
    >
      {children}
    </div>
  );
}

export function Row({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Col({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
