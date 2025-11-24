export const THEME = {
  DAY: "day",
  NIGHT: "night",
  SYSTEM: "system",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];
