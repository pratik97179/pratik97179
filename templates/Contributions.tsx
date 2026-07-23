import type { ContributionData } from "../scripts/lib/github";
import { theme } from "../scripts/lib/theme";
import {
  Cell,
  CellRow,
  CellStack,
  Col,
  Frame,
  HatchHeader,
  Row,
  space,
} from "./shared";

const CELL = 10;
const DOT_GAP = 2;
const CHART_H = CELL * 7 + DOT_GAP * 6;
const CHART_PAD = space.gap;

export const CONTRIBUTIONS_HEIGHT =
  36 + space.gap + (CHART_H + CHART_PAD * 2) + 36 + space.y * 2;

const LEVEL: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#21262d",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

export function Contributions({ data }: { data: ContributionData }) {
  const weeks = data.weeks.slice(-53);

  return (
    <Frame height={CONTRIBUTIONS_HEIGHT}>
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
            {data.total.toLocaleString("en-US")} last year
          </div>
        }
      >
        Contributions
      </HatchHeader>

      <CellStack>
        <CellRow>
          <Cell
            flex={1}
            pad={false}
            style={{ padding: CHART_PAD }}
          >
            <Col style={{ width: "100%" }}>
              <Row style={{ alignItems: "flex-start" }}>
                {weeks.map((week, weekIndex) => (
                  <Col
                    key={`week-${weekIndex}`}
                    style={{
                      marginRight:
                        weekIndex === weeks.length - 1 ? 0 : DOT_GAP,
                    }}
                  >
                    {week.days.map((day, dayIndex) => (
                      <div
                        key={day.date}
                        style={{
                          display: "flex",
                          width: CELL,
                          height: CELL,
                          backgroundColor: LEVEL[day.level],
                          marginBottom:
                            dayIndex === week.days.length - 1 ? 0 : DOT_GAP,
                        }}
                      />
                    ))}
                  </Col>
                ))}
              </Row>
            </Col>
          </Cell>
        </CellRow>

        <CellRow>
          <Cell>
            <Row style={{ alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: theme.fonts.mono,
                  fontSize: 10,
                  color: theme.colors.muted,
                  marginRight: space.gap,
                }}
              >
                Less
              </div>
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <div
                  key={level}
                  style={{
                    display: "flex",
                    width: 10,
                    height: 10,
                    backgroundColor: LEVEL[level],
                    marginRight: level === 4 ? space.gap : space.gap / 3,
                  }}
                />
              ))}
              <div
                style={{
                  display: "flex",
                  fontFamily: theme.fonts.mono,
                  fontSize: 10,
                  color: theme.colors.muted,
                }}
              >
                More
              </div>
            </Row>
          </Cell>
        </CellRow>
      </CellStack>
    </Frame>
  );
}
