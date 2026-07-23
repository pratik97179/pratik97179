export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  username: string;
  total: number;
  weeks: ContributionWeek[];
}

function levelFromCount(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function packWeeks(days: ContributionDay[]): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  let current: ContributionDay[] = [];

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push({ days: current });
      current = [];
    }
  }
  if (current.length > 0) weeks.push({ days: current });
  return weeks;
}

async function fetchViaGraphql(
  username: string,
  token: string,
): Promise<ContributionData | null> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "github-profile-generator",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!response.ok) {
    console.warn(`GitHub GraphQL failed: HTTP ${response.status}`);
    return null;
  }

  const json = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
                contributionLevel:
                  | "NONE"
                  | "FIRST_QUARTILE"
                  | "SECOND_QUARTILE"
                  | "THIRD_QUARTILE"
                  | "FOURTH_QUARTILE";
              }>;
            }>;
          };
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    console.warn(`GitHub GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  const levelMap = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  } as const;

  return {
    username,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel],
      })),
    })),
  };
}

async function fetchViaPublicApi(
  username: string,
): Promise<ContributionData | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { headers: { "User-Agent": "github-profile-generator" } },
    );
    if (!response.ok) {
      console.warn(`jogruber contributions API failed: HTTP ${response.status}`);
      return null;
    }

    const json = (await response.json()) as {
      total?: Record<string, number>;
      contributions?: Array<{ date: string; count: number; level: number }>;
    };

    const contributions = json.contributions ?? [];
    if (contributions.length === 0) return null;

    const days: ContributionDay[] = contributions.map((day) => {
      const level = Math.min(
        4,
        Math.max(0, day.level),
      ) as ContributionDay["level"];
      return {
        date: day.date,
        count: day.count,
        level: level || levelFromCount(day.count),
      };
    });

    const total =
      json.total?.lastYear ??
      contributions.reduce((sum, day) => sum + day.count, 0);

    return { username, total, weeks: packWeeks(days) };
  } catch (error) {
    console.warn(
      `jogruber contributions API error: ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

async function fetchViaHtmlScrape(
  username: string,
): Promise<ContributionData | null> {
  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; github-profile-generator)",
          Accept: "text/html",
        },
      },
    );
    if (!response.ok) {
      console.warn(`GitHub contributions HTML failed: HTTP ${response.status}`);
      return null;
    }

    const html = await response.text();
    const days: ContributionDay[] = [];
    const cellRe =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"|data-level="([0-4])"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;

    for (const match of html.matchAll(cellRe)) {
      const date = match[1] ?? match[4];
      const level = Number(match[2] ?? match[3]) as ContributionDay["level"];
      if (!date) continue;
      days.push({ date, count: level, level });
    }

    if (days.length === 0) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));

    const totalMatch = html.match(
      /(\d[\d,]*)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );
    const total = totalMatch
      ? Number(totalMatch[1].replace(/,/g, ""))
      : days.reduce((sum, day) => sum + day.count, 0);

    return { username, total, weeks: packWeeks(days) };
  } catch (error) {
    console.warn(
      `GitHub contributions HTML error: ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

function emptyYear(username: string): ContributionData {
  const weeks: ContributionWeek[] = [];
  const start = new Date();
  start.setDate(start.getDate() - 371);
  const cursor = new Date(start);
  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      days.push({
        date: cursor.toISOString().slice(0, 10),
        count: 0,
        level: 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push({ days });
  }
  return { username, total: 0, weeks };
}

export async function fetchContributions(
  username: string,
): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (token) {
    const graphql = await fetchViaGraphql(username, token);
    if (graphql) return graphql;
  }

  const publicApi = await fetchViaPublicApi(username);
  if (publicApi) return publicApi;

  const scraped = await fetchViaHtmlScrape(username);
  if (scraped) return scraped;

  console.warn(
    `Could not fetch contributions for ${username}. Using empty grid. Set GITHUB_TOKEN or check network.`,
  );

  return emptyYear(username);
}
